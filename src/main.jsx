import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { TeamProvider } from "./context/TeamContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TeamProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </TeamProvider>
  </StrictMode>
);
