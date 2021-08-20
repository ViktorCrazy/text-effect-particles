const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];

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
ctx.fillText("A", 0, 30);
const textCoordinates = ctx.getImageData(0, 0, 100, 100);

function init() {
  particleArray = [];
  for (let i = 0; i < 2000; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;

    particleArray.push(new Particle(x, y));
  }
}
init();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].draw();
    particleArray[i].update();
  }

  requestAnimationFrame(animate);
}
animate();
