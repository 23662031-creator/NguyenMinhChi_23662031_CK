import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import "./assets/css/ListProduct.css"; // dùng chung css

const ListProductHome = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLimitProducts = async () => {
      const { data, error } = await supabase
        .from("product1")
        .select("*")
        .limit(8); // 🟢 Chỉ lấy 8 sản phẩm

      if (!error) setProducts(data);
    };

    fetchLimitProducts();
  }, []);

  const addToCart = (product, e) => {
    e.stopPropagation();

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const found = cart.find((item) => item.id === product.id);

    if (found) {
      found.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.title,
        price: Number(product.price),
        image: product.image,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Đã thêm vào giỏ hàng!");
  };

  return (
    <div className="list-container">
      <h2>Sản phẩm mới</h2>

      <div className="product-grid">
        {products.map((p) => (
          <div
            className="product-card"
            key={p.id}
            onClick={() => navigate(`/ProductDetail/${p.id}`)}
          >
            <img src={p.image} alt={p.title} className="product-img" />
            <h4 className="product-title">{p.title}</h4>

            <p className="product-price">
              {Number(p.price).toLocaleString("vi-VN")}đ
            </p>

            <div className="btn-group">
              <button className="btn-buy" onClick={(e) => navigate("/giohang")}>
                Mua ngay
              </button>

              <button className="btn-cart" onClick={(e) => addToCart(p, e)}>
                Thêm giỏ hàng
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProductHome;
