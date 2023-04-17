import { ChangeEvent, ReactElement, memo, useState, useEffect } from "react";
import { CartItemType, ReducerAction, ReducerActionType } from "../context/CartProvider";
import { BsTrash } from "react-icons/bs";
import ProductQuantity from "./ProductQuantity";

type PropsType = {
  item: CartItemType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS: ReducerActionType;
};

const CartLineItem = ({ item, dispatch, REDUCER_ACTIONS }: PropsType) => {
  const [quantity, setQuantity] = useState(item.qty);

  const img: string = new URL(`../images/${item.sku}.jpg`, import.meta.url).href;

  const total = item.qty * item.price;

  useEffect(() => {
    dispatch({
      type: REDUCER_ACTIONS.QUANTITY,
      payload: { ...item, qty: quantity }
    });
  }, [quantity]);

  const onRemoveFromCart = () => dispatch({ type: REDUCER_ACTIONS.REMOVE, payload: item });

  const content = (
    <li className="cart__item">
      <img src={img} alt={item.name} />
      <div aria-label="Item Name">{item.name}</div>
      <div aria-label="Price Per Item">
        {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(item.price)}
      </div>
      {/* <label htmlFor="itemQty" className="offscreen">
        Item Quantity
      </label> */}
      {/* <input
        name="itemQty"
        id="itemQty"
        type="number"
        min="0"
        max="20"
        className="cart__select"
        value={item.qty}
        aria-label="Item Quantity"
        onChange={onChangeQty}
      ></input> */}
      <ProductQuantity quantity={quantity} setQuantity={setQuantity} />
      <div className="cart__item-subtotal" aria-label="Line Item Subtotal">
        {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(total)}
      </div>

      <BsTrash
        className="cart-button"
        aria-label="Remove Item From Cart"
        title="Remove Item From Cart"
        onClick={onRemoveFromCart}
        role="button"
      />
    </li>
  );

  return content;
};

function areItemsEqual({ item: prevItem }: PropsType, { item: nextItem }: PropsType) {
  return Object.keys(prevItem).every(key => {
    return prevItem[key as keyof CartItemType] === nextItem[key as keyof CartItemType];
  });
}

const MemoizedCartLineItem = memo<typeof CartLineItem>(CartLineItem, areItemsEqual);
export default MemoizedCartLineItem;
