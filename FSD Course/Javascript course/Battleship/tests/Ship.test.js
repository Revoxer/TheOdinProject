import { Ship } from "../src/components.js";

test("ship get hit", () => {
  const ship = new Ship(3);
  ship.hit();
  expect(ship.hitsNumber).toBe(1);
});

test("ship is not sunk initially", () => {
  const ship = new Ship(3);
  expect(ship.isSunk()).toBe(false);
});

test("ship sinks after enough hits", () => {
  const ship = new Ship(2);
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
