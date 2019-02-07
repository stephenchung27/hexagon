import { W, Xcenter, Ycenter } from './hexagon';

class Wall {
  constructor(ctx, cursor, size, vtx) {
    this.ctx = ctx;
    this.cursor = cursor;
    this.position = W;
    this.size = size;
    this.vtx = vtx;

    this.drawWall = this.drawWall.bind(this);
  }

  drawWall() {
    const pos = this.position;
    const size = this.size;
    const vtx = this.vtx;
    
    this.ctx.beginPath();
    
    this.ctx.moveTo(Xcenter + pos * Math.cos((vtx) * 2 * Math.PI / 6),
    Ycenter + pos * Math.sin((vtx) * 2 * Math.PI / 6));
    this.ctx.lineTo(Xcenter + pos * Math.cos((vtx + 1) * 2 * Math.PI / 6),
    Ycenter + pos * Math.sin((vtx + 1) * 2 * Math.PI / 6));
    this.ctx.lineTo(Xcenter + (pos - size) * Math.cos((vtx + 1) * 2 * Math.PI / 6),
    Ycenter + (pos - size) * Math.sin((vtx + 1) * 2 * Math.PI / 6));
    this.ctx.lineTo(Xcenter + (pos - size) * Math.cos((vtx) * 2 * Math.PI / 6),
    Ycenter + (pos - size) * Math.sin((vtx) * 2 * Math.PI / 6));
    this.ctx.lineTo(Xcenter + pos * Math.cos((vtx) * 2 * Math.PI / 6),
    Ycenter + pos * Math.sin((vtx) * 2 * Math.PI / 6));
    
    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.fill();

    this.converge(pos, size);
    this.checkCollision(pos - size);
  }

  converge(pos, size) {
    if (pos >= -size) {
      this.position -= 6;
      if (pos < size) {
        this.size -= 6;
      }
    }
  }

  checkCollision(point) {
    if ((Math.floor(this.cursor.rot) + 5) % 6 === this.vtx &&
      point <= 30) {
        alert(this.vtx);
    }
  }
}

export default Wall;