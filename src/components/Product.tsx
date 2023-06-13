import { ReactElement, memo } from "react";
import { Link } from "react-router-dom";
import { ProductType } from "../context/ProductsProvider";
import "../assets/scss/Product.scss";

// import AddToCartButton from "./AddToCartButton";
import { StyledAddToCartButton } from "./AddToCartButton";

type PropsType = {
  product: ProductType;
  // dispatch: React.Dispatch<ReducerAction>;
  // REDUCER_ACTIONS: ReducerActionType;
  // inCart: boolean;
};

const Product = ({ product }: PropsType): ReactElement => {
  const img: string = new URL(`../images/${product.sku}.jpg`, import.meta.url).href;
  console.log(img);

  // const itemInCart = inCart ? "Item in Cart" : null;
  
  const content = (
    <article className="product">
      <Link to={`/product/${product.id}`} className="product__link">
        <img src={img} alt={product.name} className="product__img" />
        <h3 >{product.name}</h3>
      </Link>

      {/* {inCart ? <p className="in-cart-notification"> Item in Cart</p> : ""} */}
      <StyledAddToCartButton product={product}/>
    </article>
  );

  return content;
};

function areItemsEqual(
  { product: prevItem }: PropsType,
  { product: nextItem }: PropsType
) {
  return (
    Object.keys(prevItem).every(key => {
      return prevItem[key as keyof ProductType] === nextItem[key as keyof ProductType];
    })
  );
}

const MemoizedProductItem = memo<typeof Product>(Product, areItemsEqual);
export default MemoizedProductItem;
