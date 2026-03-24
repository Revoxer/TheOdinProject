import "./Home.css";
import heroBg from "../assets/hero.jpg";
import { Link } from "react-router";

function App() {
  return (
    <header className="hero">
      <div
        className="hero-container"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="hero-overlay" />
        <div className="hero-content">
          <span className="hero-tag">🌿 Natural & Handpicked</span>
          <h2>Bring Nature Into Your Home</h2>
          <p>
            Discover a curated collection of flowers, plants, and seeds
            carefully selected to transform your living space into a peaceful
            green sanctuary. Whether you're a seasoned gardener or just starting
            out — there's something here for everyone.
          </p>
          <Link to="/shop" className="hero-btn">
            Explore the Shop →
          </Link>
        </div>
      </div>
    </header>
  );
}

export default App;
