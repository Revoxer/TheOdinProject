import "./index.css";

import { Player, Ship } from "./components.js";
import { renderBoard } from "./renderBoard.js";

const GameController = (() => {
  let player;
  let computer;

  let gameOver = false;

  let isSetup = true;
  let shipsToPlace = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
  let currentDirection = "horizontal";

  const playerCells = document.getElementById("player-board");
  const computerCells = document.getElementById("computer-board");

  function initGame() {
    player = new Player("human");
    computer = new Player("computer");

    renderBoard(player.playerBoard, playerCells);
    renderBoard(computer.playerBoard, computerCells, true);

    document.getElementById("setup-info").innerText =
      `Place your ship (length: ${shipsToPlace[0]})`;
  }

  document.getElementById("rotate-btn").addEventListener("click", () => {
    currentDirection =
      currentDirection === "horizontal" ? "vertical" : "horizontal";
  });

  playerCells.addEventListener("click", (e) => {
    if (!isSetup) return;
    const x = parseInt(e.target.dataset.x);
    const y = parseInt(e.target.dataset.y);

    if (isNaN(x) || isNaN(y)) return;

    const ship = new Ship(shipsToPlace[0]);
    const placed = player.playerBoard.placeShip(ship, x, y, currentDirection);

    if (!placed) return;

    shipsToPlace.shift();
    renderBoard(player.playerBoard, playerCells);

    if (shipsToPlace.length === 0) {
      isSetup = false;
      document.getElementById("setup-controls").style.display = "none";
      computer.playerBoard.placeShipsRandomly();
    } else {
      document.getElementById("setup-info").innerText =
        `Place your ship (length: ${shipsToPlace[0]})`;
    }
  });

  playerCells.addEventListener("mouseover", (e) => {
    if (!isSetup) return;
    const x = parseInt(e.target.dataset.x);
    const y = parseInt(e.target.dataset.y);
    if (isNaN(x) || isNaN(y)) return;

    playerCells
      .querySelectorAll(".preview, .preview-invalid")
      .forEach((cell) => {
        cell.classList.remove("preview", "preview-invalid");
      });

    const length = shipsToPlace[0];

    const previewFields = [];
    for (let i = 0; i < length; i++) {
      previewFields.push({
        x: currentDirection === "horizontal" ? x + i : x,
        y: currentDirection === "vertical" ? y + i : y,
      });
    }

    const isInvalid = (px, py) => {
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          const nx = px + dx;
          const ny = py + dy;
          if (nx < 0 || nx > 9 || ny < 0 || ny > 9) continue;
          if (previewFields.some((f) => f.x === nx && f.y === ny)) continue;
          if (player.playerBoard.board[ny][nx] !== null) return true;
        }
      }
      return false;
    };

    const anyInvalid = previewFields.some((f) => isInvalid(f.x, f.y));

    for (const field of previewFields) {
      if (field.x > 9 || field.y > 9) continue;
      const cell = playerCells.querySelector(
        `[data-x="${field.x}"][data-y="${field.y}"]`,
      );
      if (!cell) continue;
      cell.classList.add(anyInvalid ? "preview-invalid" : "preview");
    }
  });

  playerCells.addEventListener("mouseout", () => {
    if (!isSetup) return;
    playerCells
      .querySelectorAll(".preview, .preview-invalid")
      .forEach((cell) => {
        cell.classList.remove("preview", "preview-invalid");
      });
  });

  computerCells.addEventListener("click", (e) => {
    if (isSetup) return;
    const x = parseInt(e.target.dataset.x);
    const y = parseInt(e.target.dataset.y);
    if (isNaN(x) || isNaN(y)) return;
    handleAttack(x, y);
  });

  document.getElementById("restart-btn").addEventListener("click", () => {
    gameOver = false;
    isSetup = true;
    shipsToPlace = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
    currentDirection = "horizontal";
    document.getElementById("setup-controls").style.display = "flex";
    document.getElementById("game-over").classList.remove("visible");
    initGame();
  });

  function handleAttack(x, y) {
    if (gameOver) return;
    if (computer.playerBoard.attackedFields.has(`${x},${y}`)) return;

    player.attack(computer.playerBoard, x, y);

    const playerHit = computer.playerBoard.board[y][x] !== null;

    if (!playerHit) {
      let computerHit = true;
      while (computerHit) {
        const before = player.playerBoard.attackedFields.size;
        computer.randomAttack(player.playerBoard);
        const lastAttack = [...player.playerBoard.attackedFields].pop();
        const [cx, cy] = lastAttack.split(",").map(Number);
        computerHit = player.playerBoard.board[cy][cx] !== null;
      }
    }

    renderBoard(player.playerBoard, playerCells);
    renderBoard(computer.playerBoard, computerCells, true);

    checkWinner();
  }

  function checkWinner() {
    const gameOverElement = document.getElementById("game-over");
    const gameOverText = document.getElementById("game-over-text");
    if (computer.playerBoard.allSunk()) {
      gameOverText.innerText = "Player win!";
      gameOverElement.classList.add("visible");
      gameOver = true;
    } else if (player.playerBoard.allSunk()) {
      gameOverText.innerText = "Computer win!";
      gameOverElement.classList.add("visible");
      gameOver = true;
    }
  }

  initGame();
})();
