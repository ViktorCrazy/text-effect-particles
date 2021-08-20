class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 3;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = Math.random() * 40 + 5;
  }
  draw() {
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
  update() {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let dist = Math.sqrt(dx * dx + dy * dy);
    let forceDirX = dx / dist;
    let forceDirY = dy / dist;
    let maxDist = mouse.radius;
    let force = (maxDist - dist) / maxDist;
    let dirX = forceDirX * force * this.density;
    let dirY = forceDirY * force * this.density;
    if (dist < 200) {
      this.x -= dirX;
      this.y -= dirY;
    } else {
      if (this.x !== this.baseX) {
        let dx = this.x - this.baseX;
        this.x -= dx / 100;
      }
      if (this.y !== this.baseY) {
        let dy = this.y - this.baseY;
        this.y -= dy / 100;
      }
    }
  }
}
