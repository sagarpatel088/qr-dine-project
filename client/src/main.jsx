import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext.jsx";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <App />

      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="colored"
      />

    </CartProvider>
  </StrictMode>
);