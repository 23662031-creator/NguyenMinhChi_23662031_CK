import React from "react";
import { useNavigate } from "react-router-dom"; // 👉 Thêm dòng này
import "./assets/css/About.css";
 import bannerAbout from "./assets/images/ip16pro.jpg.png";

const About = () => {
  const navigate = useNavigate(); // 👉 Khai báo navigate

  return (
    <div className="about-container">
      {/* Banner */}
      <div className="about-banner">
        <img src={bannerAbout} alt="Giới thiệu" /> 
        <div className="about-banner-text">
          <h1>Giới Thiệu Về Store Giày Chính Hãng</h1>
          <p>Uy tín – Chất lượng – Giá tốt nhất thị trường</p>
        </div>
      </div>

      {/* Nội dung */}
      <div className="about-content">
        <section className="about-section">
          <h2>Chào mừng bạn đến với chúng </h2>
          <p>
          Store Điện Thoại Chính Hãng là địa chỉ mua sắm thiết bị di động uy tín hàng đầu tại Việt Nam. 
          Chúng tôi cung cấp các sản phẩm từ những thương hiệu nổi tiếng như Apple, Samsung, Xiaomi, OPPO… với 
          cam kết 100% hàng chính hãng, chất lượng đảm bảo và chế độ bảo hành rõ ràng..
          </p>
        </section>

        <section className="about-section highlight">
          <h2>Nhiệm vụ của Store Mobile Phone</h2>
          <ul>
            <li>✔ Mang đến sản phẩm chất lượng cao nhất.</li>
            <li>✔ Giá thành cạnh tranh và ưu đãi hấp dẫn.</li>
            <li>✔ Chính sách đổi trả minh bạch – hỗ trợ tối đa.</li>
            <li>✔ Trải nghiệm mua sắm hiện đại, tiện lợi.</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Lý do vì sao bạn lại tin dùng sản phẩm của chúng tôi</h2>

          <div className="about-features">
            <div className="feature-box">
              <h3>🎯 100% Chính Hãng</h3>
              <p>Nhập trực tiếp từ nhà phân phối, hóa đơn đầy đủ.</p>
            </div>

            <div className="feature-box">
              <h3>⚡ Giao hàng nhanh</h3>
              <p>
                Ship toàn quốc từ 1–3 ngày, kiểm tra hàng trước khi trả tiền.
              </p>
            </div>

            <div className="feature-box">
              <h3>💙 Hỗ trợ 24/7</h3>
              <p>Đội ngũ CSKH luôn sẵn sàng hỗ trợ bạn mọi lúc.</p>
            </div>
          </div>
        </section>

        {/* Kết luận */}
        <section className="about-section center">
          <h2>Store Mobile Phone luôn luôn đồng hành cùng mọi người</h2>
          <p>
            Cảm ơn các quý anh chị đã tin tưởng mua dùng sản phẩm của chúng tôi 
            Hẹn gặp lại quý anh chị vào dịp khác!
          </p>

          <button
            className="about-btn"
            onClick={() => navigate("/ListProduct")}
          >
            Xem Sản Phẩm
          </button>
        </section>
      </div>
    </div>
  );
};

export default About;
