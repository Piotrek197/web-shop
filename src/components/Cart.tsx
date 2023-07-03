import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";
import { CartItemType } from "../context/CartProvider";
import "../assets/scss/Cart.scss";


const Cart = ({cartActive} : {cartActive: boolean}) => {
    const { cart, dispatch, REDUCER_ACTIONS } = useCart();
    const [item, setItem] = useState<CartItemType | null>(null);
    const img: string = new URL(`../images/${item?.sku}.jpg`, import.meta.url).href;
    const navigate = useNavigate();

    const closeNotification = () => dispatch({type: REDUCER_ACTIONS.REMOVE_VISIBLE});
    
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && closeNotification();

    const handleOnClick = () => {
        closeNotification();
        navigate("/checkout");
    };


    useEffect(() => {
        setItem(cart.at(-1) ?? null);
        document.addEventListener("keydown", onKeyDown);

        return () => {
            document.removeEventListener("keydown", onKeyDown);
        }
    }, [cart])

    return ( 
        <div className={`cart-1 ${(cartActive ? "cart-1--active" : "")}`}>
            <h2>Product added to a cart</h2>
            <div className="item-preview">
                <div>
                    <img src={img} className="preview-cart-image" />
                </div>
                <div className="item-preview__content">
                    <h3>{item?.name}</h3>
                    <p>Price: {item?.price}</p>
                    <p>Quantity: {item?.qty} </p>
                </div>
             </div>

             <button onClick={handleOnClick}>Go to cart</button>
            
        </div> );
}
 
export default Cart;