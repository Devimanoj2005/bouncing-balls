window.onload = function () {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  const ballCountText = document.getElementById("ballCount");

  /* ---- FORCE REAL CANVAS SIZE ---- */
  canvas.width = canvas.offsetWidth;
  canvas.height = 520;

  console.log("Canvas size:", canvas.width, canvas.height);

  /* ---- UTILITIES ---- */
  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function randomColor() {
    return `rgb(${random(0,255)}, ${random(0,255)}, ${random(0,255)})`;
  }

  /* ---- BALL CLASS ---- */
  class Ball {
    constructor(x, y, vx, vy, size, color) {
      this.x = x;
      this.y = y;
      this.vx = vx;
      this.vy = vy;
      this.size = size;
      this.color = color;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }

    update() {
      if (this.x + this.size > canvas.width || this.x - this.size < 0) {
        this.vx *= -1;
      }
      if (this.y + this.size > canvas.height || this.y - this.size < 0) {
        this.vy *= -1;
      }
      this.x += this.vx;
      this.y += this.vy;
    }
  }

  /* ---- BALL STORAGE ---- */
  const balls = [];

  /* ---- CREATE FIRST BALL (TEST) ---- */
  balls.push(
    new Ball(
      canvas.width / 2,
      canvas.height / 2,
      4,
      3,
      15,
      "red"
    )
  );

  /* ---- CLICK TO ADD BALL ---- */
  canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    balls.push(
      new Ball(
        e.clientX - rect.left,
        e.clientY - rect.top,
        random(2, 5),
        random(2, 5),
        random(10, 20),
        randomColor()
      )
    );
  });

  /* ---- LOOP ---- */
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let ball of balls) {
      ball.draw();
      ball.update();
    }

    ballCountText.textContent = `Balls: ${balls.length}`;
    requestAnimationFrame(animate);
  }

  animate();
};
