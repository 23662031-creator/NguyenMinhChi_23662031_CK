import React, { useState } from "react";
import "./assets/css/contact.css";
import { supabase } from "./supabaseClient";

export default function Contact() {
  const [messageSent, setMessageSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const message = formData.get("message");

    // 👉 Gửi dữ liệu vào Supabase
    const { data, error } = await supabase.from("contact_messages").insert([
      {
        name,
        email,
        phone,
        message,
      },
    ]);

    if (error) {
      alert("❌ Gửi thất bại, vui lòng thử lại!");
      setSending(false);
      return;
    }

    // Hiện thông báo
    setMessageSent(true);

    // Xóa form
    e.target.reset();

    setSending(false);

    // Ẩn thông báo sau 3 giây
    setTimeout(() => setMessageSent(false), 3000);
  };

  return (
    <div className="contact-container">
      {/* Banner */}
      <div className="contact-banner">
        <img
          src="data:image/jpeg;base64,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"
          alt="banner"
        />
        <div className="contact-banner-text">
          <h1>Liên hệ với chúng tôi</h1>
          <p>Mọi thắc mắc – Chúng tôi luôn sẵn sàng hỗ trợ bạn</p>
        </div>
      </div>

      {/* Thông báo */}
      {messageSent && (
        <div className="contact-alert">
          🎉 Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.
        </div>
      )}

      {/* Nội dung */}
      <div className="contact-content">
        {/* Thông tin liên hệ */}
        <div className="contact-info">
          <h2>Thông tin liên hệ</h2>
          <p>
            <strong>Địa chỉ:</strong> 33 Vĩnh Viễn, Phường Vườn Lài, Tp.HCM
          </p>
          <p>
            <strong>Email:</strong> 23662031@kthcm.edu.vn
          </p>
          <p>
            <strong>Số điện thoại:</strong> 0903 780 551
          </p>
          <p>
            <strong>Giờ làm việc:</strong> 8:00 – 22:00 (T2 – CN)
          </p>
        </div>

        {/* Form liên hệ */}
        <div className="contact-form">
          <h2>Gửi tin nhắn cho chúng tôi</h2>

          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Họ và tên" required />
            <input
              type="email"
              name="email"
              placeholder="Email liên hệ"
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Số điện thoại"
              required
            />
            <textarea
              name="message"
              placeholder="Nội dung cần hỗ trợ"
              rows="5"
              required
            ></textarea>

            <button type="submit" className="contact-btn" disabled={sending}>
              {sending ? "Đang gửi..." : "Gửi liên hệ"}
            </button>
          </form>
        </div>
      </div>

      {/* Google Map */}
      <div className="map-section">
        <h2>Vị trí của chúng tôi</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5093375412867!2d106.679983!3d10.771958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752eee3be0a67f%3A0x7a5d6c2adf0b8f!2zR8O0IFZpw6puIEPGoSBQaMawxqFuZw!5e0!3m2!1svi!2s!4v1700000000000"
          width="100%"
          height="350"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}
