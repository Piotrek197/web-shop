import { Link } from "react-router-dom";
import Nav from "./Nav";


const Header = () => (
  <header className="header">
    <div className="header__title-bar">
      <h1>
        <Link to="/">Acme Co.</Link>
      </h1>
    </div>
    <Nav/>
  </header>
);

export default Header;
