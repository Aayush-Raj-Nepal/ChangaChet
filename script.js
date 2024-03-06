// Get canvas context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Define game variables
let manX, manY, manVelocity, gravity;
let pipeX, pipeGap, pipeWidth;
let pipeLengths;
let score;
let currentUpperPipeLength;
let paused = true;
let gameFinished = true;

// Initializing game variables
function init() {
  manX = canvas.width / 5;
  manY = canvas.height / 2;
  manVelocity = 0;
  gravity = 0.9;
  pipeX = canvas.width;
  pipeGap = 200;
  pipeGaps = [120, 150, 200];
  pipeLengths = [0.3, 0.4, 0.5, 0.6, 0.7];
  pipeWidth = canvas.width / 4;
  score = 0;
  currentUpperPipeLength = 0.5 * canvas.height;
}

// Create game elements
function createMan() {
  const manImg = document.getElementById("kiteImg");
  ctx.drawImage(manImg, manX, manY, 50, 50);
}

function createPipes() {
  if (pipeX + pipeWidth == 0) {
    pipeX = canvas.width;
    pipeGap = pipeGaps[Math.floor(Math.random() * pipeGaps.length)];
    currentUpperPipeLength =
      //   canvas.height * 0.5;
      canvas.height *
      pipeLengths[Math.floor(Math.random() * pipeLengths.length)];
  }
  ctx.fillStyle = "black";

  // Upper pipe
  ctx.fillRect(pipeX, 0, pipeWidth, currentUpperPipeLength);
  // Lower pipe
  ctx.fillRect(
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
    manVelocity = -10; // Man jumps
  }
});

// Update game state
function update() {
  manY += manVelocity;
  manVelocity += gravity;

  pipeX -= 5; // Pipes move from right to left

  // Check for collision with pipes
  if (manX > pipeX && manX < pipeX + pipeWidth) {
    if (
      manY < 0 ||
      manY + 50 > canvas.height ||
      manY - 50 > currentUpperPipeLength + pipeGap ||
      manY + 50 < currentUpperPipeLength
    ) {
      gameOver();
    }
  }

  // Update score when man passes a pipe
  if (manX > pipeX && manX - 10 < pipeX) {
    score++;
  }
  // Update game state here
}

// Render game elements
function render() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Render background
  ctx.fillStyle = "cyan";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Render game elements
  createMan();
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
