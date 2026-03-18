class Ship {
  constructor(length) {
    this.length = length;
    this.hitsNumber = 0;
  }

  hit() {
    this.hitsNumber++;
  }

  isSunk() {
    return this.hitsNumber >= this.length;
  }
}

class Gameboard {
  constructor() {
    this.board = new Array(10).fill(null).map(() => new Array(10).fill(null));
    this.attackedFields = new Set();
    this.ships = [];
  }

  placeShip(ship, x, y, direction) {
    if (x + ship.length - 1 > 9 && direction === "horizontal") return false;
    if (y + ship.length - 1 > 9 && direction === "vertical") return false;

    for (let i = 0; i < ship.length; i++) {
      const shipX = direction === "horizontal" ? x + i : x;
      const shipY = direction === "vertical" ? y + i : y;

      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          const nx = shipX + dx;
          const ny = shipY + dy;
          if (nx < 0 || nx > 9 || ny < 0 || ny > 9) continue;
          if (this.board[ny][nx] !== null) return false;
        }
      }
    }

    for (let i = 0; i < ship.length; i++) {
      if (direction === "horizontal") {
        this.board[y][x + i] = ship;
      } else if (direction === "vertical") {
        this.board[y + i][x] = ship;
      }
    }

    this.ships.push(ship);
    return true;
  }

  placeShipsRandomly() {
    const ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
    const directions = ["horizontal", "vertical"];

    for (const length of ships) {
      let placed = false;
      while (!placed) {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        const direction = directions[Math.floor(Math.random() * 2)];
        placed = this.placeShip(new Ship(length), x, y, direction);
      }
    }
  }

  receiveAttack(x, y) {
    this.attackedFields.add(`${x},${y}`);

    const target = this.board[y][x];

    if (target !== null) {
      target.hit();
      if (target.isSunk()) {
        this.markSurroundings(target);
      }
    }
  }

  markSurroundings(ship) {
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        if (this.board[y][x] === ship) {
          for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
              const nx = x + dx;
              const ny = y + dy;
              if (nx < 0 || nx > 9 || ny < 0 || ny > 9) continue;
              if (this.board[ny][nx] !== null) continue;
              if (this.attackedFields.has(`${nx},${ny}`)) continue;
              this.attackedFields.add(`${nx},${ny}`);
            }
          }
        }
      }
    }
  }

  allSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
}

class Player {
  constructor(playerType) {
    this.playerType = playerType;
    this.playerBoard = new Gameboard();
  }

  attack(enemyBoard, x, y) {
    enemyBoard.receiveAttack(x, y);
  }

  randomAttack(enemyBoard) {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);

    while (enemyBoard.attackedFields.has(`${x},${y}`)) {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    }

    enemyBoard.receiveAttack(x, y);
  }
}

export { Ship, Gameboard, Player };
