import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import ProductPage from "./components/ProductPage";

function App() {
  const [viewCart, setViewCart] = useState(false);

  // const pageContent = viewCart ? <Cart /> : <ProductList />;

  const content = (
    <BrowserRouter>
      <Header viewCart={viewCart} setViewCart={setViewCart} />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
      {/* {pageContent} */}
      {/* <Footer viewCart={viewCart} /> */}
    </BrowserRouter>
  );

  return content;
}

export default App;
