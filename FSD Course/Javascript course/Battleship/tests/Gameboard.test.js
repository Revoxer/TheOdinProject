import { Gameboard, Ship } from "../src/components.js";

test("placeShip places ship on correct horizontal cells", () => {
  const ship = new Ship(3);
  const board = new Gameboard();
  board.placeShip(ship, 5, 5, "horizontal");
  expect(board.board[5][5]).toBe(ship);
  expect(board.board[5][6]).toBe(ship);
  expect(board.board[5][7]).toBe(ship);
});

test("placeShip places ship on correct vertical cells", () => {
  const ship = new Ship(3);
  const board = new Gameboard();
  board.placeShip(ship, 5, 5, "vertical");
  expect(board.board[5][5]).toBe(ship);
  expect(board.board[6][5]).toBe(ship);
  expect(board.board[7][5]).toBe(ship);
});

test("receiveAttack hits ship and increments hitsNumber", () => {
  const ship = new Ship(3);
  const board = new Gameboard();
  board.placeShip(ship, 5, 5, "horizontal");
  board.receiveAttack(5, 5);
  expect(ship.hitsNumber).toBe(1);
});

test("isSunk show true when ship is sunk", () => {
  const ship = new Ship(3);
  const board = new Gameboard();
  board.placeShip(ship, 5, 5, "horizontal");
  board.receiveAttack(5, 5);
  board.receiveAttack(6, 5);
  board.receiveAttack(7, 5);
  expect(ship.isSunk()).toBe(true);
});

test("allSunk returns true when all ships are sunk", () => {
  const ship = new Ship(3);
  const ship2 = new Ship(2);
  const board = new Gameboard();
  board.placeShip(ship, 5, 5, "horizontal");
  board.placeShip(ship2, 0, 0, "vertical");
  board.receiveAttack(5, 5);
  board.receiveAttack(6, 5);
  board.receiveAttack(7, 5);
  board.receiveAttack(0, 0);
  board.receiveAttack(0, 1);
  expect(board.allSunk()).toBe(true);
});

test("allSunk returns false when not all ships are sunk", () => {
  const ship = new Ship(3);
  const ship2 = new Ship(2);
  const board = new Gameboard();
  board.placeShip(ship, 5, 5, "horizontal");
  board.placeShip(ship2, 0, 0, "vertical");
  board.receiveAttack(5, 5);
  board.receiveAttack(6, 5);
  board.receiveAttack(7, 5);
  expect(board.allSunk()).toBe(false);
});

test("receiveAttack records missed shot in attackedFields", () => {
  const board = new Gameboard();
  board.receiveAttack(1, 1);
  expect(board.attackedFields.has("1,1")).toBe(true);
});

test("placeShip don't places ship on horizontal cells when out of board", () => {
  const ship = new Ship(3);
  const board = new Gameboard();
  board.placeShip(ship, 9, 9, "horizontal");
  expect(board.ships).toEqual([]);
});

test("placeShip don't places ship on vertical cells when out of board", () => {
  const ship = new Ship(3);
  const board = new Gameboard();
  board.placeShip(ship, 9, 9, "vertical");
  expect(board.ships).toEqual([]);
});
