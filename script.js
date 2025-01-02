let score = 0;
let isGameOver = false;

const audio = new Audio("music.mp3");
const gameOverAudio = new Audio("gameover.mp3");

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    audio.play();
  }, 1000);

  document.addEventListener("keydown", handleKeyPress);

  const gameLoop = setInterval(() => {
    if (isGameOver) {
      clearInterval(gameLoop);
      return;
    }
    checkCollision();
  }, 10);
});

function handleKeyPress(e) {
  const dino = document.querySelector(".dino");
  const key = e.keyCode;

  if (key === 38) {
    // Up Arrow Key
    jumpDino(dino);
  } else if (key === 39) {
    // Right Arrow Key
    moveDino(dino, 112);
  } else if (key === 37) {
    // Left Arrow Key
    moveDino(dino, -112);
  }
}

function jumpDino(dino) {
  if (!dino.classList.contains("animateDino")) {
    dino.classList.add("animateDino");
    setTimeout(() => {
      dino.classList.remove("animateDino");
    }, 700);
  }
}

function moveDino(dino, distance) {
  const dinoX = parseInt(window.getComputedStyle(dino).left, 10);
  dino.style.left = `${dinoX + distance}px`;
}

function checkCollision() {
  const dino = document.querySelector(".dino");
  const obstacle = document.querySelector(".obstacle");
  const gameOverText = document.querySelector(".gameOver");

  const dinoRect = dino.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();

  if (
    dinoRect.left < obstacleRect.right &&
    dinoRect.right > obstacleRect.left &&
    dinoRect.top < obstacleRect.bottom &&
    dinoRect.bottom > obstacleRect.top
  ) {
    gameOverText.textContent = "Game Over - Reload to Play Again";
    obstacle.classList.remove("obstacleAni");
    audio.pause();
    gameOverAudio.play();
    isGameOver = true;
  } else {
    updateScore();
  }
}

function updateScore() {
  const scoreCont = document.getElementById("scoreCont");
  score++;
  scoreCont.textContent = `Your Score: ${score}`;
}
