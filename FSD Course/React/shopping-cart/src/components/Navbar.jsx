import "./Navbar.css";
import cart from "../assets/cart.svg";
import { Link } from "react-router";
import { useCart } from "../hooks/useCart.js";

function Navbar() {
  const { items } = useCart();
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <nav className="navbar">
      <Link className="logo" to="/">
        <h1>Shopping</h1>
      </Link>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/cart" className="cart-link">
          <img src={cart} alt="Shopping Cart" />
          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
