import { useState, useEffect } from "react";
import Scoreboard from "./components/Scoreboard";
import CardGrid from "./components/CardGrid";
import GameOver from "./components/GameOver";
import "./App.css";

const POKEMON_IDS = [1, 4, 7, 25, 39, 52, 54, 63, 74, 92, 104, 113];

function shuffleArray(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function App() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clickedIds, setClickedIds] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      try {
        const responses = await Promise.all(
          POKEMON_IDS.map((id) => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`))
        );
        const data = await Promise.all(responses.map((r) => r.json()));
        const parsed = data.map((p) => ({
          id: p.id,
          name: p.name,
          image: p.sprites.other["official-artwork"].front_default || p.sprites.front_default,
          type: p.types[0].type.name,
        }));
        setCards(shuffleArray(parsed));
      } catch (err) {
        console.error("Failed to fetch Pokemons:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  const handleCardClick = (id) => {
    if (clickedIds.includes(id)) {
      if (score > bestScore) setBestScore(score);
      setGameOver(true);
      setWon(false);
      return;
    }

    const newClicked = [...clickedIds, id];
    const newScore = score + 1;
    setClickedIds(newClicked);
    setScore(newScore);

    if (newScore > bestScore) setBestScore(newScore);

    if (newClicked.length === POKEMON_IDS.length) {
      setGameOver(true);
      setWon(true);
      return;
    }

    setCards(shuffleArray(cards));
  };

  const resetGame = () => {
    setClickedIds([]);
    setScore(0);
    setGameOver(false);
    setWon(false);
    setCards(shuffleArray(cards));
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-title">
          <span className="pixel-dot" />
          <h1>MEMORY<span className="accent">MON</span></h1>
          <span className="pixel-dot" />
        </div>
        <p className="subtitle">Click each Pokémon only once!</p>
        <Scoreboard score={score} bestScore={bestScore} total={POKEMON_IDS.length} />
      </header>

      <main className="main">
        {loading ? (
          <div className="loading">
            <div className="pokeball-loader" />
            <p>Catching Pokémons…</p>
          </div>
        ) : (
          <CardGrid cards={cards} onCardClick={handleCardClick} />
        )}
      </main>

      {gameOver && (
        <GameOver won={won} score={score} bestScore={bestScore} onReset={resetGame} />
      )}
    </div>
  );
}
