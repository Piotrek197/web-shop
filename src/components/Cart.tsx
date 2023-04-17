import useCart from "../hooks/useCart";
import { useState } from "react";
import CartLineItem from "./CartLineItem";
import "../assets/scss/Cart.scss";
import styled from "styled-components";

const Cart = () => {
  const [confirm, setConfirm] = useState(false);

  const { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart } = useCart();

  const onSubmit = () => {
    dispatch({ type: REDUCER_ACTIONS.SUBMIT });
    setConfirm(true);
  };

  const pageContent = confirm ? (
    <h2>Thank you for your order</h2>
  ) : (
    <section className="cart-container">
      <h2 className="offscreen">Cart</h2>
      <div className="left-side">
        <ul className="cart">
          <div className="class-header">
            <span></span>
            <span>Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Total Price</span>
          </div>
          {totalItems ? (
            cart.map(item => {
              return (
                <CartLineItem
                  key={item.sku}
                  item={item}
                  dispatch={dispatch}
                  REDUCER_ACTIONS={REDUCER_ACTIONS}
                />
              );
            })
          ) : (
            <p style={{ margin: "1rem" }}>No items in cart</p>
          )}
        </ul>
      </div>
      {/* Order Summary */}
      <div className="cart__totals">
        <h2>Order Summary</h2>
        <div className="">
          {totalItems ? (
            <>
              <p>Total Items: {totalItems}</p>
              <p>Total Price: {totalPrice}</p>
              <p>Shipping cost: $15.00</p>
            </>
          ) : (
            <p style={{ marginBlock: "1rem" }}>No items in cart</p>
          )}
        </div>
        <button className="cart__submit" disabled={!totalItems} onClick={onSubmit}>
          Place Order
        </button>
      </div>
    </section>
  );

  return <main className="main main--cart">{pageContent}</main>;
};

export default Cart;
