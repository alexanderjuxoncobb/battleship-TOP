import Ship from "./battleship";
import Gameboard from "./gameboard";
import Player from "./player";
import { renderPlayerGameBoard } from "./renderGameBoard";
import "@testing-library/jest-dom";

let ship;
let gameboard;
beforeEach(() => {
  ship = new Ship(3);
  gameboard = new Gameboard();
});

test("hit function increases number of hits", () => {
  ship.hit();
  expect(ship.hits).toBe(1);
});

test("the ship gets sunk", function () {
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});

test("the ship doesn't get sunk", function () {
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(false);
});

test("placed horizontal ship of length 3 at [4, 5]", function () {
  gameboard.placeShip(3, [4, 5], true);
  expect(gameboard.board[4][5]).toBeTruthy();
  expect(gameboard.board[4][6]).toBeTruthy();
  expect(gameboard.board[4][7]).toBeTruthy();
  expect(gameboard.board[5][4]).not.toBeTruthy();
});

test("placed vertical ship of length 4 at [6, 2]", function () {
  gameboard.placeShip(4, [6, 2], false);
  expect(gameboard.board[6][2]).toBeTruthy();
  expect(gameboard.board[8][2]).toBeTruthy();
  expect(gameboard.board[9][2]).toBeTruthy();
  expect(gameboard.board[5][4]).not.toBeTruthy();
});

test("receives attack and hits correct ship", function () {
  gameboard.placeShip(3, [4, 5], true);
  gameboard.receiveAttack([4, 6]);
  expect(gameboard.board[4][5].hits).toBe(1);
  expect(gameboard.board[4][6].hits).toBe(1);
  expect(gameboard.board[4][7].hits).toBe(1);
});

test("receives attack and doesn't hit correct ship", function () {
  gameboard.placeShip(3, [4, 5], true);
  gameboard.receiveAttack([4, 9]);
  expect(gameboard.board[4][9]).toBe(0);
});

test("receives attack on square already missed", function () {
  gameboard.receiveAttack([4, 9]);
  expect(() => gameboard.receiveAttack([4, 9])).toThrow(
    /This square has already been selected. Please pick another./
  );
});

test("all sunk?", function () {
  gameboard.placeShip(1, [4, 5], true);
  gameboard.placeShip(2, [7, 5], true);
  gameboard.receiveAttack([4, 5]);
  gameboard.receiveAttack([7, 5]);
  gameboard.receiveAttack([7, 6]);
  expect(gameboard.allSunk).toBeTruthy();
});

test("added to DOM?", () => {
  // Create grid structure
  document.body.innerHTML = "";
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const div = document.createElement("div");
      div.setAttribute("data-row", i);
      div.setAttribute("data-col", j);
      document.body.appendChild(div);
    }
  }

  let player1 = new Player();
  player1.gameboard.placeShip(1, [7, 9]);
  renderPlayerGameBoard(player1.gameboard);

  expect(document.querySelector(`[data-row="7"][data-col="9"]`)).toHaveStyle({
    backgroundColor: "red",
  });
});
