import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Menu from "../pages/Menu";
import Cart from "../pages/Cart";
import Table from "../pages/Table";
import OrderSuccess from "../pages/OrderSuccess";
import Navbar from "../components/Navbar";

function AppRoutes() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
  <Route path="/" element={<Home/>} />
  <Route path="/menu" element={<Menu/>} />
  <Route path="/cart" element={<Cart/>} />
  <Route path="/table/:tableId" element={<Table/>} />
  <Route path="/order-success" element={<OrderSuccess/>} 
/>
</Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;