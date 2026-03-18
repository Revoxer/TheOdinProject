import { Gameboard, Player } from "../src/components.js";

test("Player has own gameboard", () => {
  const player = new Player("computer");
  expect(player.playerBoard).toBeInstanceOf(Gameboard);
});

test("Player has correct playerType", () => {
  const player = new Player("computer");
  const player2 = new Player("human");
  expect(player.playerType).toBe("computer");
  expect(player2.playerType).toBe("human");
});

test("attack records attacked field in enemyBoard attackedFields", () => {
  const player = new Player("human");
  const player2 = new Player("computer");
  player.attack(player2.playerBoard, 2, 2);
  expect(player2.playerBoard.attackedFields.has("2,2")).toBe(true);
});

test("randomAttack adds field to enemyBoard attackedFields", () => {
  const player = new Player("human");
  const player2 = new Player("computer");
  player2.randomAttack(player.playerBoard);
  expect(player.playerBoard.attackedFields.size).toBe(1);
});

test("randomAttack does not attack the same field twice", () => {
  const player = new Player("human");
  const player2 = new Player("computer");
  for (let i = 0; i < 10; i++) {
    player2.randomAttack(player.playerBoard);
  }
  expect(player.playerBoard.attackedFields.size).toBe(10);
});
