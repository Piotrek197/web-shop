import { useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Checkout from "./components/Checkout";
import ProductList from "./components/ProductList";
import ProductPage from "./components/ProductPage";
import useCart from "./hooks/useCart";
import Cart from "./components/Cart";

function App() {


  const content = (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  );

  return content;
}

export default App;
