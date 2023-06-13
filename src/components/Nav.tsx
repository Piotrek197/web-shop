import { Link } from "react-router-dom";
import {BiShoppingBag} from "react-icons/bi";
import useCart from "../hooks/useCart";

const Nav = () => {
  const { totalItems, totalPrice } = useCart();
  return (
      <nav className="nav">
        <Link to="/checkout" className="cart-link">
          <BiShoppingBag className="basket-icon"/>
          <span style={{fontSize: "1rem"}}>{totalPrice}</span>
        </Link>
        {/* <p className="price"></p> */}
      </nav>
  );
};

export default Nav;
