import { Link } from "react-router-dom";
import {BsFillBasketFill} from "react-icons/bs";
import useCart from "../hooks/useCart";

const Nav = () => {
  const { totalItems, totalPrice } = useCart();
  return <nav className="nav">
      <Link to="/cart" className="cart-link">
        <BsFillBasketFill className="basket-icon"/>
        <span>{totalItems}</span>
      </Link>
        <p className="price">{totalPrice}</p>
    </nav>
};

export default Nav;
