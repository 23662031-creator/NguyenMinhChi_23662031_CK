import React from "react";
import { useCart } from "./cartContext";

const CartPage = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    totalItems,
    totalPrice,
    clearCart,
  } = useCart();

  if (!cart || cart.length === 0) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Giỏ hàng</h2>
        <p>Giỏ hàng của bạn đang trống.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Giỏ hàng</h2>
      <div style={{ display: "grid", gap: 12 }}>
        {cart.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
              padding: 12,
              border: "1px solid #ddd",
              borderRadius: 8,
              background: "#fff",
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: 90,
                height: 90,
                objectFit: "cover",
                borderRadius: 6,
              }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong>{item.title}</strong>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
              <div
                style={{
                  marginTop: 8,
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                }}
              >
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  min={1}
                  onChange={(e) => {
                    const v = Number(e.target.value) || 1;
                    updateQuantity(item.id, v);
                  }}
                  style={{ width: 60, textAlign: "center" }}
                />
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{ marginLeft: 12 }}
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        ))}

        <div style={{ textAlign: "right", marginTop: 6 }}>
          <div>
            <strong>Tổng sản phẩm:</strong> {totalItems}
          </div>
          <div>
            <strong>Tổng tiền:</strong> ${totalPrice.toFixed(2)}
          </div>
          <div style={{ marginTop: 8 }}>
            <button onClick={() => alert("Thanh toán chưa được triển khai.")}>
              Thanh toán
            </button>
            <button onClick={clearCart} style={{ marginLeft: 8 }}>
              Xóa giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
