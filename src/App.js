import "./styles.css";
// @ts-ignore
import Home from "./Home";
// @ts-ignore
import Layout from "./Layout";
// @ts-ignore
// import Trang2 from "./Trang2";
// // @ts-ignore
import ListProduct from "./ListProduct";
// @ts-ignore
import Chitietsanpham from "./Chitietsanpham";
// @ts-ignore
import ListProducts_SP from "./ListProduct_SP";
// @ts-ignore
import ProductDetail from "./ProductDetail";
// @ts-ignore
import LoginPage from "./LoginPage";
// @ts-ignore
import ListProducts_SP_Admin from "./ListProducts_SP_Admin";
// @ts-ignore
import EditProduct from "./EditProduct";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// @ts-ignore
import GioHang from "./GioHang";
// @ts-ignore
import Contact from "./Contact";
// @ts-ignore
import About from "./About";
// @ts-ignore
import ChatAI from "./ChatAI";
import { useState, useEffect } from "react";

const App = () => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Load từ localStorage khi refresh trang
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      const u = JSON.parse(saved);
      setUser(u);
      setIsAdmin(u.role === "admin");
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout user={user} isAdmin={isAdmin} />}>
          <Route index element={< Home />} />

          <Route path="About" element={<About />} />
          <Route path="Contact" element={<Contact />} />
          <Route path="sanpham/:id" element={<Chitietsanpham />} />
          {/* <Route path="Trang2" element={<Trang2 />} /> */}
          <Route path="ListProducts_SP" element={<ListProducts_SP />} />
          <Route path="ListProduct" element={<ListProduct />} />
          <Route path="ProductDetail/:id" element={<ProductDetail />} />

          {/* Truyền setIsAdmin xuống LoginPage */}
          <Route
            path="LoginPage"
            element={<LoginPage setIsAdmin={setIsAdmin} />}
          />

          <Route path="GioHang" element={<GioHang />} />
          <Route path="chat" element={<ChatAI />} />

          {/* Trang admin */}
          <Route
            path="ListProducts_SP_Admin"
            element={<ListProducts_SP_Admin />}
          />

          <Route path="admin/edit/:id" element={<EditProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
