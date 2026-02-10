const Gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  const setMark = (index, mark) => {
    if (board[index] === "") {
      board[index] = mark;
      return true;
    }
    return false;
  };

  const reset = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };

  return { getBoard, setMark, reset };
})();

const Player = (name, mark) => {
  return { name, mark };
};

const GameController = (() => {
  const playerOne = Player("Player 1", "X");
  const playerTwo = Player("Player 2", "O");
  let currentPlayer = playerOne;
  let gameOver = false;

  const switchPlayer = () => {
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  };

  const getCurrentPlayer = () => currentPlayer;

  const checkWin = () => {
    const board = Gameboard.getBoard();
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winPatterns.some((pattern) => {
      const [a, b, c] = pattern;
      return board[a] !== "" && board[a] === board[b] && board[a] === board[c];
    });
  };

  const checkDraw = () => {
    return Gameboard.getBoard().every((cell) => cell !== "");
  };

  const playRound = (index) => {
    if (gameOver) return;

    if (Gameboard.setMark(index, currentPlayer.mark)) {
      if (checkWin()) {
        gameOver = true;
        return `${currentPlayer.name} wins!`;
      }

      if (checkDraw()) {
        gameOver = true;
        return "It's a draw!";
      }

      switchPlayer();
      return null;
    }
  };

  const resetGame = () => {
    Gameboard.reset();
    currentPlayer = playerOne;
    gameOver = false;
  };

  const setPlayerNames = (name1, name2) => {
    playerOne.name = name1 || "Player 1";
    playerTwo.name = name2 || "Player 2";
  };

  return { playRound, getCurrentPlayer, resetGame, setPlayerNames };
})();

const DisplayController = (() => {
  const boardElement = document.getElementById("board");
  const cells = document.querySelectorAll(".cell");
  const messageElement = document.getElementById("message");
  const restartButton = document.getElementById("restart");
  const currentPlayerElement = document.getElementById("current-player");
  const nameInputDiv = document.getElementById("name-input");
  const gameSection = document.getElementById("game-section");
  const startButton = document.getElementById("start-game");
  const newPlayersButton = document.getElementById("new-players");

  const updateBoard = () => {
    const board = Gameboard.getBoard();
    cells.forEach((cell, index) => {
      cell.textContent = board[index];
      if (board[index] !== "") {
        cell.classList.add("taken");
      } else {
        cell.classList.remove("taken");
      }
    });
  };

  const updateCurrentPlayer = () => {
    const player = GameController.getCurrentPlayer();
    currentPlayerElement.textContent = `${player.name} (${player.mark})`;
  };

  const displayMessage = (message) => {
    messageElement.textContent = message || "";
    if (message && message.includes("draw")) {
      messageElement.classList.add("draw");
    } else {
      messageElement.classList.remove("draw");
    }
  };

  const handleCellClick = (e) => {
    const index = e.target.dataset.index;
    if (index === undefined) return;

    const result = GameController.playRound(parseInt(index));
    updateBoard();

    if (result) {
      displayMessage(result);
    } else {
      updateCurrentPlayer();
    }
  };

  const handleRestart = () => {
    GameController.resetGame();
    updateBoard();
    updateCurrentPlayer();
    displayMessage("");
  };

  const handleStart = () => {
    const name1 = document.getElementById("player1-name").value;
    const name2 = document.getElementById("player2-name").value;

    GameController.setPlayerNames(name1, name2);

    nameInputDiv.style.display = "none";
    gameSection.classList.add("active");

    updateCurrentPlayer();
  };

  const handleNewPlayers = () => {
    GameController.resetGame();
    updateBoard();
    displayMessage("");

    document.getElementById("player1-name").value = "";
    document.getElementById("player2-name").value = "";

    nameInputDiv.style.display = "flex";
    gameSection.classList.remove("active");
  };

  startButton.addEventListener("click", handleStart);
  boardElement.addEventListener("click", handleCellClick);
  restartButton.addEventListener("click", handleRestart);
  newPlayersButton.addEventListener("click", handleNewPlayers);

  updateBoard();
})();
