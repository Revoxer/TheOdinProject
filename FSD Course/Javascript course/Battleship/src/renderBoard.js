function renderBoard(board, element, hideShips = false) {
  element.innerHTML = "";
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      const cell = document.createElement("div");
      cell.dataset.x = x;
      cell.dataset.y = y;

      const isAttacked = board.attackedFields.has(`${x},${y}`);

      if (isAttacked && board.board[y][x] !== null) {
        cell.className = "hit";
      } else if (isAttacked && board.board[y][x] === null) {
        cell.className = "miss";
      } else if (board.board[y][x] !== null && !hideShips) {
        cell.className = "ship";
      }

      element.appendChild(cell);
    }
  }
}

export { renderBoard };
