import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Cart from "./components/Cart";
import ProductList from "./components/ProductList";
import ProductPage from "./components/ProductPage";

function App() {

  const content = (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  );

  return content;
}

export default App;
