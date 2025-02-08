// ship.js
class Ship {
    constructor(length) {
        console.log("Creating Ship with length:", length);
        this.length = length;
        this.hits = 0;  // Initialize hits counter
    }
    hit() {
        this.hits++
        console.log("Ship hit: current hits =", this.hits);
    }
    isSunk() {
         const sunk = this.hits >= this.length 
         console.log("ship sunk status:", sunk)
         return sunk;
    }
} 
export default Ship;