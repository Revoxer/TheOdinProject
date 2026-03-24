import "./Shop.css";
import { plants } from "../data/plants.js";
import PlantCard from "../components/PlantCard.jsx";

function Shop() {
  return (
    <section className="shop">
      <h2 className="shop-title">Our Plants</h2>
      <div className="shop-grid">
        {plants.map((plant) => (
          <PlantCard key={plant.id} plant={plant} />
        ))}
      </div>
    </section>
  );
}

export default Shop;
