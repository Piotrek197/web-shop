import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductType } from "../context/ProductsProvider";
import { ReducerActionType, ReducerAction } from "../context/CartProvider";

//page elements
import ProductImage from "./ProductPage/ProductImage";
import ProductInfo from "./ProductPage/ProductInfo";
import ProductDescription from "./ProductPage/ProductDescription";
import ProductSimilar from "./ProductPage/ProductSimilar";

import Cart from "./Cart";
import useCart from "../hooks/useCart";

import useProducts from "../hooks/useProducts";
import "../assets/scss/ProductPage.scss";

const ProductPage = () => {
  // const { dispatch, REDUCER_ACTIONS, cart } = useCart();
  const { id } = useParams();
  const { getProduct } = useProducts();
  const initialState = { id: 0, sku: "", name: "", price: 0, category: "" };
  const [product, setProduct] = useState<ProductType>(initialState);

  const {dispatch, REDUCER_ACTIONS, visible} = useCart();

  const handleOverlayClick = () => {
    dispatch({type: REDUCER_ACTIONS.REMOVE_VISIBLE})
  };

  useEffect(() => {
    const product = getProduct(Number(id));
    setProduct(product ?? initialState);
  }, []);

  return (
    <section className="product-page">
      <div className="product-intro">
        <ProductImage sku={product.sku} />
        <ProductInfo product={product} />
      </div>
      <ProductDescription />
      <ProductSimilar product={product} />
      <Cart cartActive={visible}/>
      <div className={`app-overlay ${visible ? "app-overlay--active": ""}`} onClick={handleOverlayClick}></div>
    </section>
  );
};

export default ProductPage;
