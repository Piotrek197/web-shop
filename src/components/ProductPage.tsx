import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductType } from "../context/ProductsProvider";
import { ReducerActionType, ReducerAction } from "../context/CartProvider";

//page elements
import ProductImage from "./ProductPage/ProductImage";
import ProductInfo from "./ProductPage/ProductInfo";
import ProductDescription from "./ProductPage/ProductDescription";
import ProductSimilar from "./ProductPage/ProductSimilar";

//custom hooks
// import useCart from "../hooks/useCart";
import useProducts from "../hooks/useProducts";
import "../assets/scss/ProductPage.scss";

const ProductPage = () => {
  // const { dispatch, REDUCER_ACTIONS, cart } = useCart();
  const { id } = useParams();
  const { getProduct } = useProducts();
  const initialState = { id: 0, sku: "", name: "", price: 0, category: "" };
  const [product, setProduct] = useState<ProductType>(initialState);

  useEffect(() => {
    const product = getProduct(Number(id));
    setProduct(product ?? initialState);
    console.log(product);
  }, []);

  return (
    <section className="product-page">
      <div className="product-intro">
        <ProductImage sku={product.sku} />
        <ProductInfo product={product} />
      </div>
      <ProductDescription />
      <ProductSimilar product={product} />
    </section>
  );
};

export default ProductPage;
