import { useState } from "react";
import useCart from "../../hooks/useCart";
import { ProductType } from "../../context/ProductsProvider";

import ProductQuantity from "../ProductQuantity";

const ProductInfo = ({ product }: { product: ProductType }) => {
  const { dispatch, REDUCER_ACTIONS } = useCart();
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="product-info">
      <h1>{product.name}</h1>
      <p className="product-price">
        {Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN" }).format(product.price)}
      </p>
      <p className="product-short-description">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto impedit ex, corrupti id
        optio modi quisquam sit. Quaerat quo, vero exercitationem voluptas eaque sint dolorum ipsum
        debitis ipsam eveniet rem?
      </p>
      <div className="product-actions">
        <ProductQuantity quantity={quantity} setQuantity={setQuantity} />
        <button
          id="add-to-cart-btn"
          className="add-to-cart-button"
          onClick={() =>
            dispatch({ type: REDUCER_ACTIONS.ADD, payload: { ...product, qty: quantity } })
          }
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
