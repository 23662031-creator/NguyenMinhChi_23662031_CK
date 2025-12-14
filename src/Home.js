import React, { useState, useEffect } from "react";
import "./css/main.css";
import { useNavigate } from "react-router-dom";
import ListProduct from "./ListProductHome";
// 🖼 Banner quảng cáo
import banner1 from "./assets/images/ipxmaa.jpg";
import banner2 from "./assets/images/ip16pro.jpg.png";
import banner3 from "./assets/images/ip01.jpeg";


const Home = () => {
  const banners = [banner1, banner2, banner3];
  const [index, setIndex] = useState(0);
  const navigate = useNavigate(); // ✅ thêm dòng này

  // 🕒 Tự động đổi ảnh sau 2 giây
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 2000);
    return () => clearInterval(interval);
  }, [index]);

  // 👉 Chuyển ảnh tiếp theo
  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  // 👈 Chuyển ảnh trước đó
  const prevSlide = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

//   // 📦 Danh sách sản phẩm nổi bật
//   const products = [
//     { id: 1, name: "Nike Air Zoom", price: "2.450.000đ", image: sp1 },
//     { id: 2, name: "Adidas Ultraboost", price: "3.200.000đ", image: sp2 },
//     { id: 3, name: "Puma RS-X", price: "2.850.000đ", image: sp3 },
//     { id: 4, name: "Converse Classic", price: "1.200.000đ", image: sp4 },
//   ];

  return (
    <div className="home-page">
      <h1 className="title">Store Mobile Phone Chính Hãng</h1>

      {/* 🖼 Banner quảng cáo */}
      <div className="slideshow-container">
        <div className="slideshow-wrapper">
          <button className="arrow left" onClick={prevSlide}>
            ❮
          </button>
          <img
            src={banners[index]}
            alt="Quảng cáo giày"
            className="slideshow-image"
          />
          <button className="arrow right" onClick={nextSlide}>
            ❯
          </button>
        </div>
      </div>

      {/* 🌟 Sản phẩm nổi bật */}

      {/* <div className="product-list">
        {products.map((item) => (
          <div
            className="product-card"
            key={item.id}
            onClick={() => navigate(`/sanpham/${item.id}`)} // ✅ thêm sự kiện click
            style={{ cursor: "pointer" }} // ✅ đổi con trỏ chuột
          >
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p className="price">{item.price}</p>
            <button className="btn-buy">Mua ngay</button>
          </div>
        ))}
      </div> */}

      <ListProduct />

      {/* --- QUẢNG CÁO DƯỚI SẢN PHẨM --- */}
      <div className="ads-section">
        <div className="ads-left">
          <h2>🔥 SALE CHIỀU NAY - GIẢM 1 TRIỆU!</h2>
          <p>
            Trả góp 0% - Bao duyệt nợ xấu
            Chỉ cần CCCD - Không trả trước
            Tặng tai nghe + ốp lưng + cường lực
            Bảo hành 12 tháng khi mua sản phẩm
          </p>
          <p>✔ Giao hàng miễn phí toàn quốc</p>
          <p>✔ Đổi trả trong vòng 30 ngày</p>
          <button className="btn-ads" onClick={() => navigate("/ListProduct")}>
            Mua ngay →
          </button>
        </div>

        <div className="ads-right">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXQCLKgJBlfGEhszv05HMMQaAP8l194jGheg&s"
            alt="Quảng cáo"
            className="ads-image"
          />
        </div>
      </div>

      {/* --- FOOTER --- */}
      <footer className="footer">
        <div className="footer-container">
          {/* Cột 1: Giới thiệu */}
          <div className="footer-section">
            <h3>Store Mobile Phone Chính Hãng</h3>
            <p>
              Cung cấp điện thoại chính hãng IPhone , SamSung, Oppo, Xiaomi
              Cam kết 100% hàng thật – đổi trả miễn phí trong 30 ngày.
            </p>
          </div>

          {/* Cột 2: Liên hệ */}
          <div className="footer-section">
            <h3>Liên hệ</h3>
            <ul>
              <li>🏠 33 vĩnh viễn ,P2, Q10 TP.HCM</li>
              <li>📞 0903 780 551</li>
              <li>✉️ chibuyphone@buymobilephone.vn</li>
            </ul>
          </div>

          {/* Cột 3: Liên kết nhanh */}
          <div className="footer-section">
            <h3>Liên kết nhanh</h3>
            <ul>
              <li>
                <a href="#">Trang chủ</a>
              </li>
              <li>
                <a href="ListProduct">Sản phẩm</a>
              </li>
              <li>
                <a href="ListProduct">Khuyến mãi</a>
              </li>
              <li>
                <a href="Contact">Liên hệ</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 Store Mobile Phone Chính Hãng | Thiết kế bởi MinhChi</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
