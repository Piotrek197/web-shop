import { Link } from "react-router-dom";

type PropsType = {
  viewCart: boolean;
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};

const Nav = ({ viewCart, setViewCart }: PropsType) => {
  const viewCart1 = false;
  const button = viewCart1 ? (
    <button onClick={() => setViewCart(false)}>View Products</button>
  ) : (
    <Link to="/cart">View Cart</Link>
  );

  const content = <nav className="nav">{button}</nav>;
  return content;
};

export default Nav;
