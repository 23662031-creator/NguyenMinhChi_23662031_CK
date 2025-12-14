import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import "./assets/css/EditProduct.css";
const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [rating_rate, setRatingRate] = useState(0);
  const [rating_count, setRatingCount] = useState(0);

  useEffect(() => {
    if (id !== "new") {
      const fetchProduct = async () => {
        const { data, error } = await supabase
          .from("product1")
          .select("*")
          .eq("id", id)
          .single();

        if (!error && data) {
          setTitle(data.title);
          setPrice(data.price);
          setImage(data.image);
          setRatingRate(data.rating_rate);
          setRatingCount(data.rating_count);
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id === "new") {
      const { error } = await supabase
        .from("product1")
        .insert([{ title, price, image, rating_rate, rating_count }]);

      if (!error) navigate("/ListProducts_SP_Admin");
      else alert("Lỗi thêm mới");
    } else {
      const { error } = await supabase
        .from("product1")
        .update({ title, price, image, rating_rate, rating_count })
        .eq("id", id);

      if (!error) navigate("/ListProducts_SP_Admin");
      else alert("Lỗi sửa");
    }
  };

  return (
    <div className="edit-container">
      <div className="edit-card">
        <h2>{id === "new" ? "➕ Thêm sản phẩm mới" : "✏️ Sửa sản phẩm"}</h2>

        <form onSubmit={handleSubmit}>
          <label>Tên sản phẩm</label>
          <input
            type="text"
            value={title}
            placeholder="Nhập tên sản phẩm..."
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label>Giá</label>
          <input
            type="number"
            value={price}
            placeholder="Nhập giá..."
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <label>Link hình ảnh</label>
          <input
            type="text"
            value={image}
            placeholder="https://..."
            onChange={(e) => setImage(e.target.value)}
          />

          <label>Đánh giá (rate)</label>
          <input
            type="number"
            value={rating_rate}
            onChange={(e) => setRatingRate(e.target.value)}
          />

          <label>Số đánh giá</label>
          <input
            type="number"
            value={rating_count}
            onChange={(e) => setRatingCount(e.target.value)}
          />

          <div className="btn-group">
            <button type="submit" className="btn save">
              {id === "new" ? "Thêm mới" : "Lưu thay đổi"}
            </button>

            <button
              type="button"
              className="btn cancel"
              onClick={() => navigate("/ListProducts_SP_Admin")}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
