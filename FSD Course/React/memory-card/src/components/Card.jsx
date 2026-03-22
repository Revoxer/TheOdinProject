import "./Card.css";

const TYPE_COLORS = {
  fire: "#FF6B35",
  water: "#4FC3F7",
  grass: "#81C784",
  electric: "#FFD54F",
  psychic: "#F48FB1",
  normal: "#A5D6A7",
  poison: "#CE93D8",
  rock: "#BCAAA4",
  ground: "#FFCC80",
  ice: "#80DEEA",
  fighting: "#EF9A9A",
  ghost: "#9575CD",
  fairy: "#F8BBD9",
  default: "#90CAF9",
};

export default function Card({ pokemon, onClick }) {
  const typeColor = TYPE_COLORS[pokemon.type] || TYPE_COLORS.default;

  return (
    <div
      className="card"
      onClick={() => onClick(pokemon.id)}
      style={{ "--type-color": typeColor }}
    >
      <div className="card-inner">
        <div className="card-type-badge">{pokemon.type.toUpperCase()}</div>
        <div className="card-image-wrap">
          <img src={pokemon.image} alt={pokemon.name} draggable={false} />
        </div>
        <div className="card-name">{pokemon.name.toUpperCase()}</div>
        <div className="card-id">#{String(pokemon.id).padStart(3, "0")}</div>
      </div>
    </div>
  );
}
