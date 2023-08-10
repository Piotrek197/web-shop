import { ReactElement, useState, useEffect } from "react";

import useCart from "../hooks/useCart";
import useProducts from "../hooks/useProducts";
import { UseProductsContextType } from "../context/ProductsProvider";
import Product from "./Product";
// import ProductPage from "./ProductPage";
// import Cart from "./Cart";
import "../assets/scss/Banner.scss";


const ProductList = () => {
  // const { cart } = useCart();
  const { products } = useProducts();
  const img: string = new URL(`../assets/images/happy-girl.jpg`, import.meta.url).href;

  // let pageContent: ReactElement | ReactElement[] = ;

  useEffect(() => {
    console.log(products);
    
  }, []);


  const content = (
    <>
    <div className="store-banner">
      <div className="left-side">
        <div className="left-side__content">
          <h2>50% OFF</h2>
          <button>Join our club</button>
          <p>reallygreatsite.com</p>
        </div>
      </div>
      <div className="banner-image">
        <img src={img}  className="banner-image__content" />
      </div>
      <div className="right-side">
        {Array.from({length: 3}, () => <span className="outline-sale">SALE</span>)}
        <span className="filled-sale">SALE</span>
      </div>
    </div>
      <main className="main">
        {Object.entries(products).map(([key, values]) => {
          return <div className="">
              <h2 className="category-name">{key}</h2>
              <div className="category-products">
                {values.map( product => <Product key={product.sku} product={product} />)}
              </div>
            </div>
        })}
      </main>
    </>
  );

  return content;
};

export default ProductList;
