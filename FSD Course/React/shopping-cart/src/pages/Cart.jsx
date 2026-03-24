import "./Cart.css";
import { Link } from "react-router";
import { useCart } from "../hooks/useCart.js";

function Cart() {
  const { items, updateQty, remove } = useCart();

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = subtotal > 80 ? 0 : 9.99;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <div className="cart-empty-icon">🌿</div>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added any plants yet.</p>
        <Link to="/shop" className="cart-shop-btn">
          Browse Plants
        </Link>
      </div>
    );
  }

  return (
    <section className="cart">
      <div className="cart-header">
        <h1>Your Cart</h1>
        <span className="cart-count">{items.length} items</span>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {items.map((item, i) => (
            <div
              className="cart-item"
              key={item.id}
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <div className="cart-item-img">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="cart-item-info">
                <span className="cart-item-category">{item.category}</span>
                <h3>{item.name}</h3>
                <p className="cart-item-latin">{item.latin}</p>
              </div>
              <div className="cart-item-controls">
                <div className="qty-control">
                  <button onClick={() => updateQty(item.id, -1)}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQty(item.id, 1)}>+</button>
                </div>
                <span className="cart-item-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
                <button
                  className="cart-item-remove"
                  onClick={() => remove(item.id)}
                  aria-label="Remove item"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-rows">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span className={shipping === 0 ? "free" : ""}>
                {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
              </span>
            </div>
            {shipping > 0 && (
              <p className="free-shipping-hint">
                Add ${(80 - subtotal).toFixed(2)} more for free shipping 🌱
              </p>
            )}
            <div className="summary-divider" />
            <div className="summary-row total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <button className="checkout-btn">Proceed to Checkout →</button>
          <Link to="/shop" className="continue-link">
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Cart;
