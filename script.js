const colorBox = document.querySelector('[data-testid="colorBox"]');
const colorOptions = document.querySelector('.color-options');
const gameStatus = document.querySelector('[data-testid="gameStatus"]');
const scoreDisplay = document.querySelector('[data-testid="score"]');
const newGameButton = document.querySelector('[data-testid="newGameButton"]');

let score = 0;
let targetColor;

// Predefined set of colors
const colors = [
  "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF",
  "#FFA500", "#800080", "#008000", "#800000", "#008080", "#000080"
];

// Function to generate random colors
function getRandomColors() {
  const shuffledColors = colors.sort(() => 0.5 - Math.random());
  return shuffledColors.slice(0, 6);
}

// Function to start a new game
function startNewGame() {
  const colorSet = getRandomColors();
  targetColor = colorSet[Math.floor(Math.random() * colorSet.length)];
  colorBox.style.backgroundColor = "#ffffff"; // Set color box to white initially
  colorOptions.innerHTML = '';
  colorSet.forEach(color => {
    const button = document.createElement('button');
    button.style.backgroundColor = color;
    button.addEventListener('click', () => checkGuess(color));
    colorOptions.appendChild(button);
  });
  gameStatus.textContent = '';
  scoreDisplay.textContent = score;
}

// Function to check the player's guess
function checkGuess(guess) {
  // Temporarily show the target color
  colorBox.style.backgroundColor = targetColor;

  if (guess === targetColor) {
    gameStatus.textContent = 'Correct! 🎉';
    gameStatus.style.color = '#4caf50';
    score++;
    scoreDisplay.textContent = score;
    setTimeout(() => {
      colorBox.style.backgroundColor = "#ffffff"; // Reset to white after delay
      startNewGame(); // Start a new game after 1 second
    }, 1000);
  } else {
    gameStatus.textContent = 'Wrong! Try again. 😢';
    gameStatus.style.color = '#ff3b2f';
    setTimeout(() => {
      colorBox.style.backgroundColor = "#ffffff"; // Reset to white after delay
    }, 1000);
  }
}

// Event listener for the New Game button
newGameButton.addEventListener('click', () => {
  score = 0;
  startNewGame();
});

// Initialize the game
startNewGame();