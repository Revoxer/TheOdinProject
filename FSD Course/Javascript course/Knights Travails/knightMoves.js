function knightMoves(start, end) {
  const moves = [
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
  ];

  function getMoves(position) {
    const legalMoves = [];

    const [xP, yP] = position;

    for (let move of moves) {
      const [x, y] = move;
      const [xC, yC] = [xP + x, yP + y];
      if (xC >= 0 && xC < 8 && yC >= 0 && yC < 8) {
        legalMoves.push([xC, yC]);
      }
    }

    return legalMoves;
  }

  const queue = [[start]];
  const visited = new Set();
  visited.add(start.toString());

  while (queue.length > 0) {
    const path = queue.shift();
    const move = path[path.length - 1];

    if (move.toString() === end.toString()) {
      console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
      path.forEach((pos) => console.log(pos));
      return path;
    }

    const legalMoves = getMoves(move);

    for (let nextMove of legalMoves) {
      if (!visited.has(nextMove.toString())) {
        visited.add(nextMove.toString());
        queue.push([...path, nextMove]);
      }
    }
  }
}
