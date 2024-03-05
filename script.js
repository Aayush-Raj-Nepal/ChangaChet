// Get canvas context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Define game variables
let birdX, birdY, birdVelocity, gravity;
let pipeX, pipeGap, pipeWidth;
let pipeLengths;
let score;
let currentUpperPipeLength;
let paused = true;
let gameFinished = true;
// Initialize game variables
function init() {
  // Initialize variables here
  birdX = canvas.width / 4;
  birdY = canvas.height / 2;
  birdVelocity = 0;
  gravity = 0.9;
  pipeX = canvas.width;
  pipeGap = 200;
  pipeLengths = [0.3, 0.4, 0.5, 0.6, 0.7];
  pipeWidth = canvas.width / 2;
  score = 0;
  currentUpperPipeLength = 0.5 * canvas.height;
}

// Create game elements
function createBird() {
  const birdImg = document.getElementById("kiteImg");
  ctx.drawImage(birdImg, birdX, birdY, 50, 50); // Draw bird image
  // Create bird here
}

function createPipes() {
  // Create pipes here
  if (pipeX + pipeWidth == 0) {
    pipeX = canvas.width;
    currentUpperPipeLength =
      //   canvas.height * 0.5;
      canvas.height *
      pipeLengths[Math.floor(Math.random() * pipeLengths.length)];
  }
  ctx.fillStyle = "green";

  const topObstacleImg = document.getElementById("topObstacleImg");
  const bottomObstacleImg = document.getElementById("bottomObstacleImg");

  // Upper pipe
  ctx.drawImage(topObstacleImg, pipeX, 0, pipeWidth, currentUpperPipeLength);

  // Lower pipe
  ctx.drawImage(
    bottomObstacleImg,
    pipeX,
    currentUpperPipeLength + pipeGap,
    pipeWidth,
    canvas.height - (currentUpperPipeLength + pipeGap)
  );
}

// Handle user input
document.addEventListener("keydown", function (event) {
  if (event.key === " ") {
    // Spacebar
    birdVelocity = -10; // Bird jumps
  }
  // Handle user input here (e.g., spacebar to make the bird jump)
});

// Update game state
function update() {
  birdY += birdVelocity;
  birdVelocity += gravity;

  pipeX -= 5; // Pipes move from right to left

  // Check for collision with pipes
  if (birdX > pipeX && birdX < pipeX + pipeWidth) {
    if (
      birdY < 0 ||
      birdY + 50 > canvas.height ||
      birdY - 20 > currentUpperPipeLength + pipeGap ||
      birdY + 20 < currentUpperPipeLength
    ) {
      gameOver();
    }
  }

  // Update score when bird passes a pipe
  if (birdX > pipeX && birdX - 10 < pipeX) {
    score++;
  }
  // Update game state here
}

// Render game elements
function render() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Render background
  ctx.fillStyle = "skyblue";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Render game elements
  createBird();
  createPipes();

  // Render score
  ctx.fillStyle = "black";
  ctx.font = "24px Arial";
  ctx.fillText("Score: " + score, 20, 40);
  // Render game elements here
}

// Game loop
function gameLoop() {
  update();
  render();

  requestAnimationFrame(gameLoop);
}

// Start the game
function startGame() {
  init();
  gameLoop();
}

// Game over function
function gameOver() {
  // Display game over message and stop the game loop
  alert("Game Over! Your score: " + score);
  init();
  gameFinished = true;
  window.location.reload(); // Reload the page to restart the game
}

// Start the game when the page loads
window.onload = startGame;
