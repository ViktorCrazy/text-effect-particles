const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];
let offsetX = 100;
let offsetY = 50;

// handle mouse
const mouse = {
  x: null,
  y: null,
  radius: 450,
};

window.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

ctx.fillStyle = "white";
ctx.font = "30px Verdana";
ctx.fillText("Viky :-D", 0, 30);
const textCoordinates = ctx.getImageData(0, 0, 200, 100);

function init() {
  particleArray = [];
  const y2 = textCoordinates.height;
  const x2 = textCoordinates.width;
  const data = textCoordinates.data;
  for (let y = 0; y < y2; y++) {
    for (let x = 0; x < x2; x++) {
      let i = y * 4 * textCoordinates.width + x * 4 + 3;
      if (data[i] > 128) {
        let posX = x * 7 + offsetX;
        let posY = y * 7 + offsetY;
        particleArray.push(new Particle(posX, posY));
      }
    }
  }
}
init();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].draw();
    particleArray[i].update();
  }

  connect();
  requestAnimationFrame(animate);
}
animate();

function connect() {
  for (let a = 0; a < particleArray.length; a++) {
    for (let b = a; b < particleArray.length; b++) {
      let dx = particleArray[a].x - particleArray[b].x;
      let dy = particleArray[a].y - particleArray[b].y;
      let dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 20) {
        const opacity = 1 - dist / 20;
        // const color = 255 * (1 - dist / 20);
        ctx.strokeStyle = `rgba(255,255,255,${opacity})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(particleArray[a].x, particleArray[a].y);
        ctx.lineTo(particleArray[b].x, particleArray[b].y);
        ctx.stroke();
      }
    }
  }
}
