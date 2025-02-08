// domController.js
import Ship from './ship.js';

const DOMController = (() => {
  // Get DOM elements for the player and computer boards.
  const playerBoardElement = document.getElementById('player-board');
  const computerBoardElement = document.getElementById('computer-board');
  
  // Set the default ship placement direction.
  let currentDirection = 'horizontal';
  
  /**
   * Renders a game board (grid) on the specified board element.
   * @param {Object} gameboard - The game board object containing board state.
   * @param {HTMLElement} boardElement - The DOM element where the board is rendered.
   */
  const renderBoard = (gameboard, boardElement) => {
    console.log(`Rendering board for ${boardElement.id}`);
    boardElement.innerHTML = ''; // Clear previous board content

    // Loop through each row (y-coordinate)
    for (let y = 0; y < gameboard.boardSize; y++) {
      const rowDiv = document.createElement('div');
      rowDiv.classList.add('row');
      
      // Loop through each column (x-coordinate)
      for (let x = 0; x < gameboard.boardSize; x++) {
        const cellDiv = document.createElement('div');
        cellDiv.classList.add('cell');
        const cellValue = gameboard.board[y][x];
        
        // console.log(`Processing cell [${x}, ${y}] with value:`, cellValue);
        
        // Add class for a hit cell.
        if (cellValue === "hit") {
          cellDiv.classList.add('hit');
        }
        // Add class for a miss cell.
        else if (cellValue === "miss") {
          cellDiv.classList.add('miss');
        }
        
        // On the player's board, display ships (if present and not already hit/miss).
        if (boardElement.id === 'player-board' && cellValue instanceof Ship) {
          cellDiv.classList.add('ship');
        }
        
        // Save the cell's coordinates as data attributes.
        cellDiv.dataset.x = x;
        cellDiv.dataset.y = y;
        rowDiv.appendChild(cellDiv);
      }
      boardElement.appendChild(rowDiv);
    }
    console.log(`Finished rendering board for ${boardElement.id}`);
  };


  function showGameResult(message) {
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modal-message');
    const modalButton = document.getElementById('modal-button');
    
    modalMessage.textContent = message;
    modal.style.display = 'flex'; // Show modal as flex container
    
    modalButton.addEventListener('click', () => {
      modal.style.display = 'none'; // or 'block', 'flex', etc.
    });
    
  }


  /**
   * Adds click event listeners to the computer board cells to allow attacks.
   * @param {Object} humanPlayer - The human player object.
   * @param {Object} computerPlayer - The computer player object.
   */
  const addBoardClickListeners = (humanPlayer, computerPlayer) => {
    console.log("Adding click event listener to computer board.");
    computerBoardElement.addEventListener('click', (e) => {
      const target = e.target;
      
      // Ignore clicks if the target is not a cell.
      if (!target.classList.contains('cell')) {
        console.log("Clicked element is not a cell; ignoring.");
        return;
      }

      // *** Guard Clause: Prevent processing if the cell is already attacked ***
      if (target.classList.contains('hit') || target.classList.contains('miss')) {
        console.log(`Cell (${target.dataset.x}, ${target.dataset.y}) has already been attacked.`);
        // alert("This cell has already been attacked. Please select another cell.");
        showGameResult("This cell has already been attacked. Please choose another cell.");
        return; // Exit without processing a move
      }


      
      // Retrieve x and y coordinates from the clicked cell.
      const x = parseInt(target.dataset.x, 10);
      const y = parseInt(target.dataset.y, 10);
      console.log(`Computer board cell clicked at (${x}, ${y}).`);

      const validMove = computerPlayer.gameboard.receiveAttack(x, y);
        // Only proceed if the move was valid.
      if (!validMove) {
         console.log("Invalid move detected; no further processing.");
         return ;
      }

   	// Re-render the computer board after a valid mov

      // // Process the human player's attack on the computer board.
      // computerPlayer.gameboard.receiveAttack(x, y);
      renderBoard(computerPlayer.gameboard, computerBoardElement);

      function playAgain() {
        const playAgainButton = document.getElementById('play-again');
        playAgainButton.style.display = 'inline-block';
        playAgainButton.addEventListener('click', () => {
          location.reload();
        })
      }

      // Check if the human player has sunk all the computer's ships.
      if (computerPlayer.gameboard.areAllShipsSunk()) {
        console.log("All computer ships are sunk. Human wins!");
        showGameResult("You win!");
        // alert("You win!");
        playAgain()
        return;
      }
      

      // Let the computer make a random move against the human player's board.
      console.log("Computer is making a random move on the human board.");
      computerPlayer.makeRandomMove(humanPlayer.gameboard);
      renderBoard(humanPlayer.gameboard, playerBoardElement);
      
      // Check if the computer has sunk all of the human's ships.
      if (humanPlayer.gameboard.areAllShipsSunk()) {
        playAgain()
        console.log("All human ships are sunk. Computer wins!");
        showGameResult("Computer wins!");
        // alert("Computer wins!");

      }



    });
  };
  
  /**
   * Sets up the ship placement interface for the human player.
   * @param {Object} humanPlayer - The human player object.
   * @param {Array} fleet - An array containing the lengths of the ships.
   * @param {Function} onAllShipsPlaced - Callback function when all ships have been placed.
   */
  const setupShipPlacement = (humanPlayer, fleet, onAllShipsPlaced) => {
    console.log("Setting up ship placement.");
    const shipPaletteElement = document.getElementById('ship-palette');
    const toggleDirectionButton = document.getElementById('toggle-direction');
    
    // Initialize the toggle button text with the current direction.
    toggleDirectionButton.textContent = `Toggle Direction (Current: ${capitalize(currentDirection)})`;
    toggleDirectionButton.addEventListener('click', () => {
      // Toggle the direction between horizontal and vertical.
      currentDirection = currentDirection === 'horizontal' ? 'vertical' : 'horizontal';
      console.log("Ship placement direction toggled to:", currentDirection);
      toggleDirectionButton.textContent = `Toggle Direction (Current: ${capitalize(currentDirection)})`;
      // Re-render the ship palette to update the orientation.
      renderShipPalette(remainingFleet);
    });
    
    // Clone the fleet array to keep track of remaining ships to be placed.
    let remainingFleet = [...fleet];
    
    /**
     * Renders the ship palette where players can drag ships to the board.
     * @param {Array} fleetArray - Array of ship lengths still to be placed.
     */
    const renderShipPalette = (fleetArray) => {
      console.log("Rendering ship palette for fleet:", fleetArray);
      shipPaletteElement.innerHTML = ''; // Clear previous palette contents
      
      // Create a draggable ship element for each ship length.
      fleetArray.forEach(length => {
        const shipContainer = document.createElement('div');
        shipContainer.className = 'ship-palette-ship';
        shipContainer.draggable = true;
        shipContainer.dataset.length = length;
        
        // Set the container's flex direction based on the current ship orientation.
        shipContainer.style.flexDirection = currentDirection === 'horizontal' ? 'row' : 'column';
        
        // Create individual circular segments representing parts of the ship.
        for (let i = 0; i < length; i++) {
          const segment = document.createElement('div');
          segment.className = 'ship-segment';
          shipContainer.appendChild(segment);
        }
        console.log(`Created ship palette element for a ship of length ${length}`);
        shipPaletteElement.appendChild(shipContainer);
      });
    };
    
    // Initial render of the ship palette.
    renderShipPalette(remainingFleet);
    
    // Listen for the start of a drag event on ship palette elements.
    shipPaletteElement.addEventListener('dragstart', (e) => {
      if (e.target.classList.contains('ship-palette-ship')) {
        console.log("Drag started on ship palette element:", e.target);
        e.dataTransfer.setData('text/plain', e.target.dataset.length);
      } else if (e.target.parentElement && e.target.parentElement.classList.contains('ship-palette-ship')) {
        console.log("Drag started on ship segment; using parent element's data.");
        e.dataTransfer.setData('text/plain', e.target.parentElement.dataset.length);
      }
    });
    
    // Allow drag over on the player's board by preventing default behavior.
    playerBoardElement.addEventListener('dragover', (e) => {
      e.preventDefault();
    });
    
    // Handle drop events on the player's board for placing ships.
    playerBoardElement.addEventListener('drop', (e) => {
      e.preventDefault();
      const targetCell = e.target.closest('.cell');
      
      if (!targetCell) {
        console.log("Drop target is not a valid cell; drop ignored.");
        return;
      }
      
      // Retrieve ship length from the drag data.
      const length = parseInt(e.dataTransfer.getData('text/plain'), 10);
      const x = parseInt(targetCell.dataset.x, 10);
      const y = parseInt(targetCell.dataset.y, 10);
      console.log(`Attempting to place a ship of length ${length} at (${x}, ${y}) with direction ${currentDirection}.`);
      
      // Create a new ship instance and try to place it on the game board.
      const ship = new Ship(length);
      const placed = humanPlayer.gameboard.placeShip(ship, x, y, currentDirection);
      
      if (placed) {
        console.log(`Ship of length ${length} placed successfully at (${x}, ${y}).`);
        // Remove the placed ship from the remaining fleet.
        const index = remainingFleet.indexOf(length);
        if (index > -1) remainingFleet.splice(index, 1);
        renderShipPalette(remainingFleet);
        renderBoard(humanPlayer.gameboard, playerBoardElement);
        
        // If no ships remain to be placed, finalize placement.
        if (remainingFleet.length === 0) {
          console.log("All ships have been placed. Proceeding to game start.");
          onAllShipsPlaced();
          shipPaletteElement.style.display = 'none';
          toggleDirectionButton.style.display = 'none';
        }
      } else {
        console.log("Ship placement failed. Possible collision or out-of-bounds placement.");
      }
    });
  };
  
  /**
   * Helper function to capitalize the first letter of a string.
   * @param {string} str - The string to capitalize.
   * @returns {string} The capitalized string.
   */
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  
  // Expose the public methods of DOMController.
  return {
    renderBoard,
    addBoardClickListeners,
    setupShipPlacement
  };
})();

export default DOMController;

