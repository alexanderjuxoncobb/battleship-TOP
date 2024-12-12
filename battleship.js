export default class Ship {
  constructor(len, id, hits = 0, sunk = false) {
    this.len = len;
    this.hits = hits;
    this.sunk = sunk;
  }

  hit() {
    this.hits++;
    if (this.hits >= this.len) {
      this.sunk = true;
    }
  }

  isSunk() {
    if (this.hits >= this.len) {
      this.sunk = true;
      return true;
    }
    return false;
  }
}
