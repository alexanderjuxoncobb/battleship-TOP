// const playerBoard = document.querySelector("#player-board");

function renderPlayerGameBoard(gameboard) {
  const playerBoard = document.querySelector("#player-board");
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (gameboard.board[i][j]) {
        const square = playerBoard.querySelector(
          `[data-row="${i}"][data-col="${j}"]`
        );

        square.style.backgroundColor = "red";
      }
    }
  }
}

function renderEnemyGameBoard(gameboard) {
  const enemyBoard = document.querySelector("#enemy-board");

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (gameboard.board[i][j]) {
        const square = enemyBoard.querySelector(
          `[data-row="${i}"][data-col="${j}"]`
        );

        square.style.backgroundColor = "red";
      }
    }
  }
}

export { renderPlayerGameBoard, renderEnemyGameBoard };
