// player.js
import GameBoard from './gameboard.js';
import Ship from './ship.js';

export default class Player {
  constructor(name, isComputer = false) {
    this.name = name; // Store player name
    this.isComputer = isComputer; // Set computer flag
    this.gameboard = new GameBoard(); // Create gameboard instance
    
    if(isComputer) {
    this.targetQueue = []  // When the computer hits a ship, you'll add the neighboring cells
    console.log('Updated adjacent targetQueue:', this.targetQueue);
    }
    console.log(`Player "${name}" initialized (Computer: ${isComputer})`);
  }
  
  makeRandomMove(opponentBoard) {

    // If there are cells in the target queue, use the first one.
    if( this.targetQueue && this.targetQueue.length > 0 ) {
    const {x,y} = this.targetQueue.shift();
     // Ensure this cell hasn't been attacked already
     const cell = opponentBoard.board[y][x];                // Access board cell
     if (cell == "hit" || cell == "miss") {
       // If already attacked, recursively try the next target
       console.log(`${this.name} found target (${x}, ${y}) already attacked; trying next target.`);
      return this.makeRandomMove(opponentBoard)
     } 
     console.log(`${this.name} attacking adjacent target from queue at (${x}, ${y}).`);
     opponentBoard.receiveAttack(x, y);
     if (opponentBoard.board[y][x] === "hit") {
       this.addAdjacentCellsToQueue(x, y, opponentBoard);
     }
       
      return { x, y }; // Return attack coordinates
    } else {
     // Fallback: choose a random cell
    let x, y, valid = false;
    console.log(`${this.name} attempting  move...`);
    
    // Generate random coordinates until valid move found
    while (!valid) {
      x = Math.floor(Math.random() * opponentBoard.boardSize);  // Random X (0-9)
      y = Math.floor(Math.random() * opponentBoard.boardSize); // Random Y (0-9)
      console.log(`${this.name} Trying coordinates (${x}, ${y})...`);

      const cell = opponentBoard.board[y][x];                // Access board cell
      if (cell !== "hit" && cell !== "miss") valid = true;  // Check if cell hasn't been attacked before
    }
      console.log(`${this.name}  move found at (${x}, ${y}) - attacking...`);
      opponentBoard.receiveAttack(x, y);
      if (opponentBoard.board[y][x] === "hit") {
        this.addAdjacentCellsToQueue(x, y, opponentBoard);
      }
      
      
       return { x, y }; // Return attack coordinates
      }
  }


  addAdjacentCellsToQueue(x, y, opponentBoard) { 
    const adjacentMoves = [
      { x: x+1, y: y },
      { x: x-1, y: y },
      { x: x, y: y+1 },
      { x: x, y: y-1 },
    ]
    
    // Check if the move is within bounds and hasn't been attacked
    adjacentMoves.forEach(move => {

      if ( 
      move.x >= 0 && move.x < opponentBoard.boardSize && move.y >= 0 && move.y < opponentBoard.boardSize&&
      opponentBoard.board[move.y][move.x] !== "hit" &&
      opponentBoard.board[move.y][move.x] !== "miss"
      ){
        if( !this.targetQueue.some(chord => chord.x === move.x && chord.y === move.y) ) {
          console.log(`Adding adjacent cell (${move.x}, ${move.y}) to target queue.`);
          this.targetQueue.push(move);
        }
      }
    });
    console.log('Adjacent moves generated:', adjacentMoves);
  }


    

  
  placeRandomShips(fleet) {
    console.log(`${this.name} placing ships randomly...`);
    
    // Place each ship from the fleet configuration
    fleet.forEach(length => {
      let placed = false;
      console.log(`${this.name} Attempting to place ship of length ${length}`);
      
      while (!placed) {
        // Generate random placement parameters
        const x = Math.floor(Math.random() * this.gameboard.boardSize);
        const y = Math.floor(Math.random() * this.gameboard.boardSize);
        const direction = Math.random() < 0.5 ? 'horizontal' : 'vertical'; // Random orientation
        console.log(`${this.name} Trying position (${x}, ${y}) ${direction}`);
        
        const ship = new Ship(length); // Create new ship instance
        // Attempt placement and update placed status
        placed = this.gameboard.placeShip(ship, x, y, direction);
        
        if (placed) {
          console.log(`${this.name} Successfully placed ${length}-unit ship at (${x}, ${y}) ${direction}`);
        } else {
          console.log(`${this.name} Collision detected, retrying placement...`);
        }
      }
    });
  }
}