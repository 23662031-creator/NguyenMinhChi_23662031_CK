import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const navigate = useNavigate();

  // ================= LẤY SẢN PHẨM HIỆN TẠI =================
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from("product1")
          .select("*")
          .eq("id", Number(id))
          .single();

        if (error) throw error;

        setProduct(data);

        // 🔥 ĐỂ 4 SẢN PHẨM LIÊN QUAN KHÔNG LỌC THEO CATEGORY
        fetchRelatedProducts(Number(id));
      } catch (err) {
        console.error("Lỗi khi lấy sản phẩm:", err.message);
      }
    };

    fetchProduct();
  }, [id]);

  // ================= LẤY 4 SẢN PHẨM LIÊN QUAN =================
  const fetchRelatedProducts = async (currentId) => {
    try {
      const { data, error } = await supabase
        .from("product1")
        .select("*")
        .limit(20); // lấy nhiều 1 chút để lọc

      if (error) throw error;

      // Bỏ sản phẩm hiện tại
      const filtered = data.filter((item) => item.id !== currentId);

      // Lấy 4 cái đầu tiên
      setRelated(filtered.slice(0, 4));
    } catch (err) {
      console.error("Lỗi lấy sản phẩm liên quan:", err.message);
    }
  };

  // ================= THÊM GIỎ =================
  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const found = cart.find((item) => item.id === product.id);

    if (found) found.quantity += 1;
    else
      cart.push({
        id: product.id,
        name: product.title,
        price: Number(product.price),
        image: product.image,
        quantity: 1,
      });

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Đã thêm vào giỏ hàng!");
  };

  if (!product) {
    return <p style={{ textAlign: "center" }}>Đang tải...</p>;
  }

  return (
    <div style={{ maxWidth: "900px", margin: "30px auto", padding: "20px" }}>
      {/* Nút quay lại */}
      <button
        onClick={() => navigate(-1)}
        style={{
          backgroundColor: "#007bff",
          color: "white",
          padding: "8px 14px",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        ← Quay lại
      </button>

      {/* ================= CHI TIẾT SẢN PHẨM ================= */}
      <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
        {/* Ảnh */}
        <div
          style={{
            flex: "1 1 300px",
            maxWidth: "400px",
            padding: "15px",
            background: "#f9f9f9",
            borderRadius: "10px",
          }}
        >
          <img
            src={product.image}
            alt={product.title}
            style={{ width: "100%", objectFit: "contain" }}
          />
        </div>

        {/* Thông tin */}
        <div style={{ flex: "1 1 300px" }}>
          <h2>{product.title}</h2>

          <p
            style={{ fontSize: "1.4rem", color: "#e63946", fontWeight: "bold" }}
          >
            {Number(product.price).toLocaleString("vi-VN")} đ
          </p>

          <p style={{ color: "#777" }}>
            ⭐ {product.rating_rate} ({product.rating_count} đánh giá)
          </p>

          <p style={{ marginTop: "20px", lineHeight: "1.6" }}>
            {product.description || "Chưa có mô tả sản phẩm"}
          </p>

          <button
            onClick={addToCart}
            style={{
              marginTop: "20px",
              background: "linear-gradient(135deg, #ff9800, #ff5722)",
              color: "white",
              padding: "12px 20px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            🛒 Thêm vào giỏ hàng
          </button>
        </div>
      </div>

      {/* ================= SẢN PHẨM LIÊN QUAN ================= */}
      <h3 style={{ marginTop: "40px" }}>🔥 Sản phẩm liên quan</h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {related.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/ProductDetail/${item.id}`)}
            style={{
              cursor: "pointer",
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "10px",
              textAlign: "center",
              background: "#fafafa",
              transition: "0.2s",
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{ width: "100%", height: "160px", objectFit: "contain" }}
            />

            <p style={{ fontWeight: "bold", marginTop: "10px" }}>
              {item.title}
            </p>

            <p style={{ color: "#e63946" }}>
              {Number(item.price).toLocaleString("vi-VN")} đ
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetail;
