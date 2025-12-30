const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const ballCountText = document.getElementById("ballCount");

/* ---- FIXED CANVAS SIZE ---- */
canvas.width = 1000;
canvas.height = 520;

/* ---- UTILITIES ---- */
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomColor() {
  return `rgb(${random(0,255)}, ${random(0,255)}, ${random(0,255)})`;
}

/* ---- BALL OBJECT ---- */
function Ball(x, y, velX, velY, size, color) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.size = size;
  this.color = color;
}

Ball.prototype.draw = function () {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
  ctx.fillStyle = this.color;
  ctx.fill();
};

Ball.prototype.update = function () {
  if (this.x + this.size >= canvas.width || this.x - this.size <= 0) {
    this.velX *= -1;
  }

  if (this.y + this.size >= canvas.height || this.y - this.size <= 0) {
    this.velY *= -1;
  }

  this.x += this.velX;
  this.y += this.velY;
};

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

/* ---- BALLS ARRAY ---- */
let balls = [];

/* ---- CREATE INITIAL BALLS ---- */
for (let i = 0; i < 10; i++) {
  const size = random(10, 20);
  balls.push(
    new Ball(
      random(size, canvas.width - size),
      random(size, canvas.height - size),
      random(-4, 4) || 2,
      random(-4, 4) || 2,
      size,
      randomColor()
    )
  );
}

/* ---- CLICK TO ADD BALL ---- */
canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();

  const size = random(10, 20);
  balls.push(
    new Ball(
      e.clientX - rect.left,
      e.clientY - rect.top,
      random(-5, 5) || 3,
      random(-5, 5) || 3,
      size,
      randomColor()
    )
  );
});

/* ---- ANIMATION LOOP ---- */
function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let ball of balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect();
  }

  ballCountText.textContent = `Balls: ${balls.length}`;

  requestAnimationFrame(loop);
}

loop();
