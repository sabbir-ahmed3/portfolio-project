const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const box = 20;

let snake = [
  { x: 9 * box, y: 10 * box }
];

let food = {
  x: Math.floor(Math.random() * 19 + 1) * box,
  y: Math.floor(Math.random() * 19 + 1) * box
};

let score = 0;
let direction;

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "#76ff03" : "#64dd17";
    ctx.beginPath();
    ctx.arc(snake[i].x + box / 2, snake[i].y + box / 2, box / 2.2, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = "#ff1744";
  ctx.beginPath();
  ctx.arc(food.x + box / 2, food.y + box / 2, box / 2.5, 0, Math.PI * 2);
  ctx.fill();

  let headX = snake[0].x;
  let headY = snake[0].y;

  if (direction === "LEFT") headX -= box;
  if (direction === "UP") headY -= box;
  if (direction === "RIGHT") headX += box;
  if (direction === "DOWN") headY += box;

  if (headX === food.x && headY === food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * 19 + 1) * box,
      y: Math.floor(Math.random() * 19 + 1) * box
    };
  } else {
    snake.pop();
  }

  const newHead = { x: headX, y: headY };

  if (
    headX < 0 || headX >= canvas.width ||
    headY < 0 || headY >= canvas.height ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
    alert("Game Over! Final Score: " + score);
  }

  snake.unshift(newHead);
  document.getElementById("score").innerText = score.toString().padStart(3, '0');
}

function collision(head, array) {
  return array.some(segment => segment.x === head.x && segment.y === head.y);
}

const game = setInterval(draw, 100);
