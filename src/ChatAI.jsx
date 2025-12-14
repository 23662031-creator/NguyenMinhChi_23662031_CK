import React, { useState } from "react";
import "./assets/css/chatbox.css";

const API_KEY = "YOUR_API_KEY"; // ⚠️ Đổi API key của bạn

const ChatAI = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const send = async () => {
    if (!input.trim()) return;

    const newMsg = [...messages, { role: "user", text: input }];
    setMessages(newMsg);
    setInput("");

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: input }] }],
          }),
        }
      );

      const data = await res.json();
      const reply =
        data.candidates?.[0]?.content?.parts?.[0]?.text || "AI không trả lời";

      setMessages((prev) => [...prev, { role: "bot", text: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "❌ Lỗi khi gọi AI" },
      ]);
    }
  };

  return (
    <div className="chat-wrapper">
      <div className="chat-box">
        <div className="chat-header">🤖 AI Assistant</div>

        <div className="chat-content">
          {messages.map((m, i) => (
            <div key={i} className={`msg ${m.role}`}>
              {m.text}
            </div>
          ))}
        </div>

        <div className="chat-input">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nhập tin nhắn..."
          />
          <button onClick={send}>➤</button>
        </div>
      </div>
    </div>
  );
};

export default ChatAI;
