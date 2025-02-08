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

