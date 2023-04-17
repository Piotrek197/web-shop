import { ReactElement } from "react";

import useCart from "../hooks/useCart";
import useProducts from "../hooks/useProducts";
import { UseProductsContextType } from "../context/ProductsProvider";
import Product from "./Product";
import ProductPage from "./ProductPage";

const ProductList = () => {
  const { cart } = useCart();
  const { products } = useProducts();

  let pageContent: ReactElement | ReactElement[] = <p>Loading...</p>;

  if (products?.length) {
    pageContent = products.map(product => {
      const inCart: boolean = cart.some(item => item.sku === product.sku);
      return <Product key={product.sku} product={product} inCart={inCart} />;
    });
  }

  const content = (
    <>
      <main className="main main--products">{pageContent}</main>
    </>
  );

  return content;
};

export default ProductList;
