import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "./supabaseClient";
import "./assets/css/ListProduct.css";

const ListProduct = () => {
  const [listproduct, setListProduct] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 👉 State phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const navigate = useNavigate();
  const location = useLocation();

  // =============================
  // 1️⃣ LẤY TỪ KHÓA TÌM KIẾM TỪ URL
  // =============================
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const searchText = query.get("search") || "";
    setSearchTerm(searchText);
  }, [location.search]);

  // =============================
  // 2️⃣ FETCH DỮ LIỆU TỪ SUPABASE
  // =============================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from("product1")
          .select("id, title, price, image");

        if (error) throw error;
        setListProduct(data);
        setFilteredList(data);
      } catch (err) {
        setError("Không thể tải sản phẩm");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // =============================
  // 3️⃣ TÌM KIẾM + LỌC GIÁ
  // =============================
  useEffect(() => {
    let result = [...listproduct];

    if (searchTerm.trim() !== "") {
      result = result.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (priceFilter === "asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (priceFilter === "desc") {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredList(result);
    setCurrentPage(1); // Khi lọc → quay về trang 1
  }, [searchTerm, priceFilter, listproduct]);

  // =============================
  // 4️⃣ TÍNH PHÂN TRANG
  // =============================
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;

  const currentProducts = filteredList.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredList.length / productsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    }
  };

  // =============================
  // 5️⃣ THÊM GIỎ HÀNG
  // =============================
  const addToCart = (product, e, go = false) => {
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

    if (go) navigate("/giohang");
    else alert("Đã thêm vào giỏ hàng!");
  };

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="list-container">
      <h2>Danh sách sản phẩm</h2>

      {/* TÌM KIẾM + LỌC GIÁ */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Tìm sản phẩm..."
          className="search-box"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="filter-select"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        >
          <option value="all">Lọc theo giá</option>
          <option value="asc">Giá tăng dần</option>
          <option value="desc">Giá giảm dần</option>
        </select>
      </div>

      {/* DANH SÁCH SẢN PHẨM */}
      <div className="product-grid">
        {currentProducts.length > 0 ? (
          currentProducts.map((p) => (
            <div
              key={p.id}
              className="product-card"
              onClick={() => navigate(`/ProductDetail/${p.id}`)}
            >
              <img src={p.image} alt={p.title} className="product-img" />

              <h4 className="product-title">{p.title}</h4>
              <p className="product-price">
                {Number(p.price).toLocaleString("vi-VN")}đ
              </p>

              <div className="btn-group">
                <button
                  className="btn-buy"
                  onClick={(e) => addToCart(p, e, true)}
                >
                  Mua ngay
                </button>

                <button className="btn-cart" onClick={(e) => addToCart(p, e)}>
                  Thêm giỏ hàng
                </button>
              </div>
            </div>
          ))
        ) : (
          <h3 style={{ color: "red" }}>Không tìm thấy sản phẩm!</h3>
        )}
      </div>

      {/* PHÂN TRANG */}
      <div
        className="pagination"
        style={{ marginTop: "20px", textAlign: "center" }}
      >
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          style={{ padding: "8px 15px", marginRight: "10px" }}
        >
          ←
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i + 1)}
            style={{
              padding: "8px 12px",
              margin: "0 5px",
              background: currentPage === i + 1 ? "#1d3557" : "#eee",
              color: currentPage === i + 1 ? "#fff" : "#000",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{ padding: "8px 15px", marginLeft: "10px" }}
        >
          →
        </button>
      </div>
    </div>
  );
};

export default ListProduct;
