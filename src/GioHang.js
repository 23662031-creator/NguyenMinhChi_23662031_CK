import "./assets/css/giohang.css";
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

const GioHang = () => {
  const [cartItems, setCartItems] = useState([]);
  const [openForm, setOpenForm] = useState(false);

  // Dữ liệu form thanh toán
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    payment: "cod", // mặc định: Tiền mặt
  });

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const updateCart = (newCart) => {
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const tang = (id) => {
    updateCart(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const giam = (id) => {
    updateCart(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const xoa = (id) => {
    updateCart(cartItems.filter((item) => item.id !== id));
  };

  const tongTien = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // ⭐ Mở form thanh toán
  const moFormThanhToan = () => {
    if (cartItems.length === 0) {
      alert("Giỏ hàng trống!");
      return;
    }
    setOpenForm(true);
  };

  // ⭐ ĐẶT HÀNG (Supabase)
  const datHang = async () => {
    if (!form.name || !form.phone || !form.address) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      // 1. Lưu đơn hàng vào bảng orders
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert([
          {
            fullname: form.name,
            phone: form.phone,
            address: form.address,
            payment: form.payment,
            total: tongTien,
          },
        ])
        .select()
        .single();

      if (orderError) {
        console.error(orderError);
        alert("❌ Lỗi lưu đơn hàng!");
        return;
      }

      // 2. Lưu chi tiết sản phẩm vào order_items
      const itemsToInsert = cartItems.map((item) => ({
        order_id: orderData.id,
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
      }));

      const { error: itemError } = await supabase
        .from("order_items")
        .insert(itemsToInsert);

      if (itemError) {
        console.error(itemError);
        alert("❌ Lỗi lưu chi tiết sản phẩm!");
        return;
      }

      // 3. Xóa giỏ hàng
      localStorage.removeItem("cart");
      setCartItems([]);

      // 4. Thông báo thành công
      alert("🎉 Đặt hàng thành công!");

      // 5. Quay về trang chủ sau 1 giây
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);

      setOpenForm(false);
    } catch (e) {
      console.error(e);
      alert("❌ Lỗi hệ thống khi đặt hàng!");
    }
  };

  return (
    <div className="giohang-container">
      <h2>🛒 GIỎ HÀNG CỦA BẠN</h2>

      {cartItems.length === 0 ? (
        <p>Giỏ hàng trống</p>
      ) : (
        <>
          <table className="giohang-table">
            <thead>
              <tr>
                <th>Ảnh</th>
                <th>Sản phẩm</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
                <th>Xóa</th>
              </tr>
            </thead>

            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "contain",
                      }}
                    />
                  </td>

                  <td>{item.name}</td>

                  <td>{item.price.toLocaleString("vi-VN")}đ</td>

                  <td>
                    <button onClick={() => giam(item.id)}>-</button>
                    <span className="sl">{item.quantity}</span>
                    <button onClick={() => tang(item.id)}>+</button>
                  </td>

                  <td>
                    {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                  </td>

                  <td>
                    <button className="xoa" onClick={() => xoa(item.id)}>
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className="tongtien">
            TỔNG TIỀN: {tongTien.toLocaleString("vi-VN")}đ
          </h3>

          <button className="btn-thanhtoan" onClick={moFormThanhToan}>
            💳 Thanh toán
          </button>
        </>
      )}

      {/* FORM THANH TOÁN */}
      {openForm && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Thông tin thanh toán</h3>

            <label>Họ tên:</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <label>Số điện thoại:</label>
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            <label>Địa chỉ:</label>
            <textarea
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />

            <label>Phương thức thanh toán:</label>
            <div className="payment-options">
              <label className="radio">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={form.payment === "cod"}
                  onChange={(e) =>
                    setForm({ ...form, payment: e.target.value })
                  }
                />
                Tiền mặt khi nhận hàng (COD)
              </label>

              <label className="radio">
                <input
                  type="radio"
                  name="payment"
                  value="banking"
                  checked={form.payment === "banking"}
                  onChange={(e) =>
                    setForm({ ...form, payment: e.target.value })
                  }
                />
                Chuyển khoản ngân hàng
              </label>
            </div>

            <div className="modal-actions">
              <button className="btn-confirm" onClick={datHang}>
                🛒 Đặt hàng
              </button>

              <button className="btn-cancel" onClick={() => setOpenForm(false)}>
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GioHang;
