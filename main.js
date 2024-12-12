import Ship from "./battleship.js";
import Gameboard from "./gameboard.js";
import Player from "./player.js";
import {
  renderPlayerGameBoard,
  renderEnemyGameBoard,
} from "./renderGameBoard.js";

let player1 = new Player();
let player2 = new Player();

player1.gameboard.placeShip(3, [4, 5]);
player2.gameboard.placeShip(2, [2, 7]);

renderPlayerGameBoard(player1.gameboard);
renderEnemyGameBoard(player2.gameboard);
