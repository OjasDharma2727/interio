import React from "react";
import ProductPage from "./ProductPage";
import Footer from "./Footer";

function App() {
  return (
    // Set display flex to ensure the footer sticks to the very bottom after scrolling content
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <ProductPage />
      <Footer />
    </div>
  );
}

export default App;
