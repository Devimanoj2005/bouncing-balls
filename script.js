// Canvas setup
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const ballCountText = document.getElementById("ballCount");

// Resize canvas to match container
function resizeCanvas() {
  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = canvas.parentElement.clientHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Utility functions
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomColor() {
  return `rgb(${random(0,255)}, ${random(0,255)}, ${random(0,255)})`;
}

// Ball constructor
function Ball(x, y, velX, velY, size, color) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.size = size;
  this.color = color;
}

// Draw ball
Ball.prototype.draw = function () {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
  ctx.fillStyle = this.color;
  ctx.fill();
};

// Update movement
Ball.prototype.update = function () {
  if (this.x + this.size >= canvas.width || this.x - this.size <= 0) {
    this.velX = -this.velX;
  }

  if (this.y + this.size >= canvas.height || this.y - this.size <= 0) {
    this.velY = -this.velY;
  }

  this.x += this.velX;
  this.y += this.velY;
};

// Collision detection
Ball.prototype.collisionDetect = function () {
  for (let j = 0; j < balls.length; j++) {
    if (this !== balls[j]) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        this.color = balls[j].color = randomColor();
      }
    }
  }
};

// Balls array
let balls = [];

// Initial balls
function createInitialBalls(count) {
  for (let i = 0; i < count; i++) {
    const size = random(10, 20);
    const ball = new Ball(
      random(size, canvas.width - size),
      random(size, canvas.height - size),
      random(-4, 4),
      random(-4, 4),
      size,
      randomColor()
    );
    balls.push(ball);
  }
}

createInitialBalls(10);

// Add ball on click
canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();

  const size = random(10, 20);
  const ball = new Ball(
    e.clientX - rect.left,
    e.clientY - rect.top,
    random(-5, 5),
    random(-5, 5),
    size,
    randomColor()
  );

  balls.push(ball);
});

// Animation loop
function animate() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
  }

  // Update UI ball count
  ballCountText.textContent = `Balls: ${balls.length}`;

  requestAnimationFrame(animate);
}

animate();
