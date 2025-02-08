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

// /* Global Reset */
// * {
//     margin: 0;
//     padding: 0;
//     box-sizing: border-box;
//   }
  
//   /* Body Styling */
//   body {
//     font-family: 'Roboto', sans-serif;  /* You can import Roboto from Google Fonts */
//     background: linear-gradient(135deg, #283048, #859398);
//     color: #f4f4f4;
//     text-align: center;
//     padding: 20px;
//   }
  
//   /* Boards Container */
//   #boards {
//     display: flex;
//     justify-content: center;
//     align-items: flex-start;
//     gap: 40px;
//     margin: 20px auto;
//     max-width: 1200px;
//   }
  
//   /* Board Styles */
//   .board {
//     background-color: rgba(255, 255, 255, 0.1);
//     padding: 10px;
//     border: 3px solid rgba(255, 255, 255, 0.3);
//     border-radius: 8px;
//     box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
//   }
  
//   /* Row Styling */
//   .row {
//     display: flex;
//   }
  
//   /* Cell Styling */
//   .cell {
//     width: 35px;
//     height: 35px;
//     margin: 1px;
//     border: 1px solid rgba(255, 255, 255, 0.3);
//     background-color: rgba(0, 0, 0, 0.2);
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     transition: background-color 0.3s, transform 0.2s;
//   }
  
//   .cell:hover {
//     transform: scale(1.1);
//   }
  
//   /* Ship Cells (for player's board) */
//   .cell.ship {
//     background-color: #15c321e7;
//   }
  
//   /* Hit Cells */
//   .cell.hit {
//     background-color: #ff4e50;
//   }
  
//   /* Miss Cells */
//   .cell.miss {
//     background-color: #4a90e2;
//   }
  
//   /* Ship Palette Styles */
//   #ship-palette {
//     display: flex;
//     flex-direction: row;
//     align-items: center;
//     justify-content: center;
//     gap: 15px;
//     margin: 20px auto;
//     max-width: 800px;
//   }
  
//   .ship-palette-ship {
//     display: flex;
//     cursor: move;
//     gap: 2px;
//   }
  
//   .ship-segment {
//     width: 35px;
//     height: 35px;
//     background: linear-gradient(135deg, #333, #555);
//     border-radius: 50%;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
//   }
  
//   /* Button Styles */
//   #toggle-direction,
//   #play-again {
//     margin: 10px;
//     padding: 10px 20px;
//     font-size: 1rem;
//     background: linear-gradient(135deg, #4a90e2, #50e3c2);
//     color: #fff;
//     border: none;
//     border-radius: 5px;
//     cursor: pointer;
//     transition: transform 0.2s, background 0.3s;
//   }
  
//   #toggle-direction:hover,
//   #play-again:hover {
//     transform: scale(1.05);
//     background: linear-gradient(135deg, #50e3c2, #4a90e2);
//   }
  
//   /* Initially hide the Play Again button */
//   #play-again {
//     display: none;
//   }
  
//   /* Game Result Display (optional) */
//   #game-result {
//     margin-top: 20px;
//     font-size: 1.5rem;
//     font-weight: bold;
//   }
  