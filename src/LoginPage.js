import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import "./assets/css/login.css";

const LoginPage = ({ setIsAdmin }) => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // ---------------------------
  // 🔥 LOGIN
  // ---------------------------
  const handleLogin = async () => {
    if (!username || !password) {
      setMessage("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .eq("password", password)
      .single();

    if (error || !data) {
      setMessage("Sai tài khoản hoặc mật khẩu!");
      return;
    }

    localStorage.setItem("user", JSON.stringify(data));
    setIsAdmin(data.role === "admin");

    navigate("/");
  };

  // ---------------------------
  // 🔥 REGISTER
  // ---------------------------
  const handleRegister = async () => {
    if (!username || !password || !fullname || !email) {
      setMessage("Vui lòng nhập đầy đủ các trường!");
      return;
    }

    const { data: checkUser } = await supabase
      .from("users")
      .select("*")
      .eq("username", username);

    if (checkUser && checkUser.length > 0) {
      setMessage("Tên đăng nhập đã tồn tại!");
      return;
    }

    const { data, error } = await supabase
      .from("users")
      .insert([{ username, password, fullname, email, role: "user" }])
      .select("*")
      .single();

    if (error) {
      setMessage("Lỗi đăng ký!");
      return;
    }

    localStorage.setItem("user", JSON.stringify(data));
    setIsAdmin(false);
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>{isRegisterMode ? "Đăng ký tài khoản" : "Đăng nhập hệ thống"}</h2>

        <input
          type="text"
          placeholder="Tên đăng nhập..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />

        <input
          type="password"
          placeholder="Mật khẩu..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />

        {isRegisterMode && (
          <>
            <input
              type="text"
              placeholder="Họ và tên..."
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="login-input"
            />
            <input
              type="email"
              placeholder="Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
            />
          </>
        )}

        <button
          className="login-btn"
          onClick={isRegisterMode ? handleRegister : handleLogin}
        >
          {isRegisterMode ? "Đăng ký" : "Đăng nhập"}
        </button>

        <p
          className="toggle-mode"
          onClick={() => {
            setIsRegisterMode(!isRegisterMode);
            setMessage("");
          }}
        >
          {isRegisterMode
            ? "Đã có tài khoản? Đăng nhập ngay"
            : "Chưa có tài khoản? Tạo tài khoản mới"}
        </p>

        {message && <p className="error">{message}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
