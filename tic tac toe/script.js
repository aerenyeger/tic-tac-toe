// DOM elements
const cells = document.querySelectorAll('[data-position]');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const playAgainButton = document.getElementById('playAgainButton');
const resultMessage = document.getElementById('resultMessage');
const resultText = document.getElementById('resultText');
const turnIndicator = document.getElementById('turnIndicator');

let currentTurn = null; // Tracks turn ('X' or 'O')

// Winning combinations for 3x3 Tic Tac Toe
const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Start the game
startButton.addEventListener('click', () => {
  currentTurn = 'X'; // Game starts with 'X'
  turnIndicator.textContent = `Turn: ${currentTurn}`;
  resultMessage.classList.remove('show');
  resetBoard();
  addClickListeners();
});

// Reset the game
resetButton.addEventListener('click', () => {
  currentTurn = null; // Disable interaction
  turnIndicator.textContent = 'Press "Start" to begin';
  resultMessage.classList.remove('show');
  resetBoard();
});

// Play again after a game ends
playAgainButton.addEventListener('click', () => {
  currentTurn = 'X'; // Game starts with 'X'
  turnIndicator.textContent = `Turn: ${currentTurn}`;
  resultMessage.classList.remove('show');
  resetBoard();
  addClickListeners();
});

// Add click listeners to cells
function addClickListeners() {
  cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(cell, index), { once: true });
  });
}

// Handle cell click
function handleCellClick(cell, index) {
  if (!currentTurn) return; // Game not started
  cell.textContent = currentTurn;
  cell.classList.add('marked', currentTurn.toLowerCase());
  if (checkWin(currentTurn)) {
    displayResult(`${currentTurn} Wins!`);
  } else if (checkDraw()) {
    displayResult("It's a Draw!");
  } else {
    switchTurn();
  }
}

// Switch turn between 'X' and 'O'
function switchTurn() {
  currentTurn = currentTurn === 'X' ? 'O' : 'X';
  turnIndicator.textContent = `Turn: ${currentTurn}`;
}

// Check if the current player wins
function checkWin(player) {
  return winPatterns.some(pattern => {
    return pattern.every(index => cells[index].textContent === player);
  });
}

// Check if the game is a draw
function checkDraw() {
  return [...cells].every(cell => cell.textContent !== '');
}

// Display the game result
function displayResult(message) {
  resultText.textContent = message;
  resultMessage.classList.add('show');
  turnIndicator.textContent = ''; // Clear turn indicator
  currentTurn = null; // Disable further play
}

// Reset the board
function resetBoard() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.className = 'cell'; // Reset all classes
  });
}