import "./assets/css/layout.css";
import logo from "./assets/images/logo4.png";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Layout = () => {
  const navigate = useNavigate();

  const [cartCount, setCartCount] = useState(0);
  const [searchText, setSearchText] = useState("");

  // LẤY USER TỪ LOCALSTORAGE
  const savedUser = JSON.parse(localStorage.getItem("user") || "null");
  const role = savedUser?.role || "guest";
  const username = savedUser?.username || null;

  // HÀM XỬ LÝ TÌM KIẾM
  const handleSearch = () => {
    if (searchText.trim() === "") return;
    navigate(`/ListProduct?search=${encodeURIComponent(searchText)}`);
  };

  // CẬP NHẬT GIỎ HÀNG
  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(total);
  };

  useEffect(() => {
    updateCartCount();
    const handleStorageChange = () => updateCartCount();
    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const interval = setInterval(updateCartCount, 500);
    return () => clearInterval(interval);
  }, []);

  // ĐĂNG XUẤT
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/LoginPage";
  };

  return (
    <div>
      <header>
        <div id="header" className="header">
          <div id="banner" className="banner">
            {/* LOGO */}
            <div id="logo-container">
              <img src={logo} alt="Logo" className="logo" />
            </div>

            {/* MENU */}
            <nav id="menutrai">
              <ul className="menutrai">
                <li>
                  <Link to="/" className="menutrai">
                    TRANG CHỦ
                  </Link>
                </li>
                <li>
                  <Link to="/ListProduct" className="menutrai">
                    SẢN PHẨM
                  </Link>
                </li>
                <li>
                  <Link to="/About" className="menutrai">
                    GIỚI THIỆU
                  </Link>
                </li>
                <li>
                  <Link to="/Contact" className="menutrai">
                    LIÊN HỆ
                  </Link>
                </li>
                {/* <li>
                  <Link to="/trang2" className="menutrai">
                    SINH VIÊN
                  </Link>
                </li> */}

                {role === "admin" && (
                  <li>
                    <Link to="/ListProducts_SP_Admin" className="menutrai">
                      QUẢN TRỊ
                    </Link>
                  </li>
                )}

                {!username && (
                  <li>
                    <Link to="/LoginPage" className="menutrai">
                      ĐĂNG NHẬP
                    </Link>
                  </li>
                )}

                {username && (
                  <>
                    <li
                      className="menutrai"
                      style={{
                        fontWeight: "bold",
                        color: "yellow",
                        marginLeft: "10px",
                      }}
                    >
                      Xin chào, {username}
                    </li>

                    <li>
                      <button
                        onClick={handleLogout}
                        style={{
                          padding: "5px 10px",
                          borderRadius: "5px",
                          border: "none",
                          cursor: "pointer",
                          background: "#e74c3c",
                          color: "#fff",
                          marginLeft: "10px",
                        }}
                      >
                        ĐĂNG XUẤT
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </nav>

            {/* SEARCH + CART */}
            <div id="search-cart">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="search-input"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />

              <button className="search-btn" onClick={handleSearch}>
                Tìm
              </button>

              <Link to="/giohang" className="cart-container">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="cart-icon"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1a1 1 0 0 1 1-1h1.5a.5.5 0 0 1 .485.379L3.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L1.01 1.607 0 1zM5 12a1 1 0 1 0 0 2zm7 0a1 1 0 1 0 0 2z" />
                </svg>

                {cartCount > 0 && (
                  <span className="cart-count">{cartCount}</span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      {/* NÚT CHAT */}
      <Link to="/chat" className="chat-bubble">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="white"
          viewBox="0 0 24 24"
        >
          <path d="M12 3C7.03 3 3 6.58 3 11c0 2.08.93 3.97 2.48 5.39L5 21l4.37-2.31c.84.22 1.76.31 2.63.31 4.97 0 9-3.58 9-8s-4.03-8-9-8zm0 14c-.92 0-1.85-.12-2.69-.35l-.48-.13L7 18l.47-1.78-.41-.36C5.71 14.68 5 12.89 5 11c0-3.31 3.13-6 7-6s7 2.69 7 6-3.13 6-7 6zm-1-9h2v2h-2V8zm0 4h2v2h-2v-2z" />
        </svg>
      </Link>
    </div>
  );
};

export default Layout;
