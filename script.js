const message = "Dear SWETA, wishing you a magical birthday full of love, laughter, and cake! 🎂💖 You are truly one of a kind. 🎉✨";
let charIndex = 0;

function typeMessage() {
  const msgElement = document.getElementById("message");
  if (charIndex < message.length) {
    msgElement.textContent += message.charAt(charIndex);
    charIndex++;
    setTimeout(typeMessage, 50);
  }
}
typeMessage();

function startCelebration() {
  document.getElementById("birthdaySong").play();
  launchConfetti();
}

// Simple confetti using canvas
function launchConfetti() {
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = Array.from({ length: 150 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    r: Math.random() * 6 + 4,
    d: Math.random() * 40 + 10,
    color: `hsl(${Math.random() * 360}, 100%, 50%)`,
    tilt: Math.random() * 10 - 10,
    tiltAngleIncremental: Math.random() * 0.1 + 0.05,
    tiltAngle: 0
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      ctx.beginPath();
      ctx.lineWidth = p.r / 2;
      ctx.strokeStyle = p.color;
      ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
      ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.d / 2);
      ctx.stroke();
    });
    update();
  }

  function update() {
    pieces.forEach(p => {
      p.tiltAngle += p.tiltAngleIncremental;
      p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
      p.tilt = Math.sin(p.tiltAngle - p.r) * 15;

      if (p.y > canvas.height) {
        p.y = -20;
        p.x = Math.random() * canvas.width;
      }
    });
  }

  function loop() {
    draw();
    requestAnimationFrame(loop);
  }

  loop();
}

