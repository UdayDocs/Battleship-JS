// src/main.js
import Player from './player.js';
import DOMController from './domController.js';
import '/src/styles.css';

const humanPlayer = new Player("Human", false);
const computerPlayer = new Player("Computer", true);

// Render the initial empty boards
DOMController.renderBoard(humanPlayer.gameboard, document.getElementById('player-board'));
DOMController.renderBoard(computerPlayer.gameboard, document.getElementById('computer-board'));

// Define the fleet (ship lengths)
const playerFleet = [5, 4, 3, 3, 2];

// Set up ship placement. Once all ships are placed, the computer places its ships
DOMController.setupShipPlacement(humanPlayer, playerFleet, () => {
  computerPlayer.placeRandomShips(playerFleet);
  DOMController.renderBoard(humanPlayer.gameboard, document.getElementById('player-board'));
  DOMController.renderBoard(computerPlayer.gameboard, document.getElementById('computer-board'));
  DOMController.addBoardClickListeners(humanPlayer, computerPlayer);
});

// script.js

document.addEventListener('DOMContentLoaded', () => {
  const rulesBtn = document.getElementById('rules-btn');
  const rulesDialog = document.getElementById('rules-dialog');
  const closeRulesBtn = document.getElementById('close-rules');

  // When the rules button is clicked, show the side dialog.
  rulesBtn.addEventListener('click', () => {
    rulesDialog.classList.add('open');
  });

  // When the close button in the dialog is clicked, hide the dialog.
  closeRulesBtn.addEventListener('click', () => {
    rulesDialog.classList.remove('open');
  });
});


// body {
//   font-family: Arial, sans-serif;
//   text-align: center;
//   /* margin: 0;
//   padding: 0; */
// }

// #boards { 
// display: flex;            /* Flexbox on the container */
// justify-content: center; /* Centers the boards horizontally */
// align-items: flex-start;/* Aligns items to the top of the container */
// gap: 60px;             /* Adds space between the boards */
// margin: 20px;         /* Adds margin around the boards container */

// }

// .board {
//   display: inline-block;
//   border: 2px solid #333; /* makes the boards more visible */
// }

// .row {
//   display: flex;
// }

// .cell {
//   width: 30px;
//   height: 30px;
//   border: 1px solid #333;
//   box-sizing: border-box;
// }

// .cell.ship {
//   background-color: #15c321e7;
// }

// .cell.hit {
//   background-color: red;
// }

// .cell.miss {
//   background-color: blue;
// }



// /* Ship Palette Styles */
// #ship-palette {
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: center;
//   gap: 10px;
//   margin: 20px;
// }

// .ship-palette-ship {
//   display: flex;
//   cursor: move;
//   gap: 2px;
// }

// .ship-segment {
//   width: 30px;
//   height: 30px;
//   background-color: #666;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   /* border-radius: 50%; */
//   /* color: white; */
//   /* font-size: 14px; */
// }

// #toggle-direction {
//   margin: 10px;
//   padding: 5px 10px;
// }

// #play-again {
//   display: none;
//   color: black;
//   align-items: center;
//   justify-content: center;
//   margin-top: 200px;
// }


