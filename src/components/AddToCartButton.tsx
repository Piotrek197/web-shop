import { ProductType } from "../context/ProductsProvider";
import useCart from "../hooks/useCart";
import { AiOutlineShoppingCart } from "react-icons/ai";
import styled from "styled-components";

const AddToCartButton = ({ product, className }: { product: ProductType; className?: string }) => {
  const { dispatch, REDUCER_ACTIONS } = useCart();

  const onAddToCart = () =>
    dispatch({ type: REDUCER_ACTIONS.ADD, payload: { ...product, qty: 1 } });
  return (
    <button className={className} onClick={onAddToCart}>
      {/* Add to Cart */}
      <AiOutlineShoppingCart className="cart-icon" />
      {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(product.price)}
    </button>
  );
};

export const StyledAddToCartButton = styled(AddToCartButton)`
  width: 100%;
  cursor: pointer;
  background-color: #0018a8;
  color: white;
  transition: background-color 200ms ease-in-out;
  padding: 1rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;

  .cart-icon {
    font-size: 1.5rem;
    width: 50px;
  }

  &:hover {
    background-color: #0023f5;
  }
`;

export default AddToCartButton;
