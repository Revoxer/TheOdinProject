import "./PlantCard.css";
import { useState } from "react";
import { useCart } from "../hooks/useCart.js";

function PlantCard({ plant }) {
  const { addToCart, items } = useCart();
  const [qty, setQty] = useState(1);
  const inCart = items.find((i) => i.id === plant.id);

  const handleQtyChange = (e) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val) && val >= 1) setQty(val);
  };

  const handleDecrement = () => setQty((q) => Math.max(1, q - 1));
  const handleIncrement = () => setQty((q) => q + 1);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addToCart(plant);
    }
    setQty(1);
  };

  return (
    <div className="card">
      <img src={plant.image} alt={plant.name} />
      <div className="card-body">
        <span className="card-category">{plant.category}</span>
        <h3>{plant.name}</h3>
        <p className="card-latin">{plant.latin}</p>
        <p className="card-desc">{plant.description}</p>
        <div className="card-footer">
          <span className="card-price">${plant.price}</span>
          <div className="card-qty">
            <button
              className="card-qty-btn"
              onClick={handleDecrement}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <input
              className="card-qty-input"
              type="number"
              min="1"
              value={qty}
              onChange={handleQtyChange}
              aria-label="Quantity"
            />
            <button
              className="card-qty-btn"
              onClick={handleIncrement}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>
        <button
          className={`card-btn ${inCart ? "card-btn--in-cart" : ""}`}
          onClick={handleAddToCart}
        >
          {inCart ? `In Cart (${inCart.quantity}) — Add More` : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

export default PlantCard;
