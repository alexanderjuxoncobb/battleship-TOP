import Ship from "./battleship.js";

// make all null, hits = ship and misses 0
export default class Gameboard {
  constructor() {
    this.size = 10;
    this.board = Array(this.size)
      .fill()
      .map(() => Array(this.size).fill(null));
    this.ships = [];
    this.allSunk = false;
  }

  placeShip(len, coordinates, horizontal = true) {
    const ship = new Ship(len);
    let counter = 0;

    while (counter < len) {
      if (horizontal) {
        this.board[coordinates[0]][coordinates[1] + counter] = ship;
      } else {
        this.board[coordinates[0] + counter][coordinates[1]] = ship;
      }
      counter++;
    }
    this.ships.push(ship);
  }

  receiveAttack(coordinates) {
    const square = this.board[coordinates[0]][coordinates[1]];
    if (square) {
      square.hit();
    } else if (square === null) {
      this.board[coordinates[0]][coordinates[1]] = 0;
    } else {
      throw new Error(
        "This square has already been selected. Please pick another."
      );
    }
    if (this.ships.every((item) => item.sunk === true)) {
      this.allSunk = true;
    }
  }
}
