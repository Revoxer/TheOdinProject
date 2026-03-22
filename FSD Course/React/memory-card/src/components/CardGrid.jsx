import Card from "./Card";
import "./CardGrid.css";

export default function CardGrid({ cards, onCardClick }) {
  return (
    <div className="card-grid">
      {cards.map((pokemon) => (
        <Card
          key={pokemon.id}
          pokemon={pokemon}
          onClick={onCardClick}
        />
      ))}
    </div>
  );
}
