import { W, Xcenter, Ycenter, togglePlaying, status } from './hexagon';
import { color1 } from './color_handler';

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

    this.ctx.fillStyle = color1;
    this.ctx.fill();

    this.ctx.closePath();

    this.checkCollision(pos - size);

    if (status === 2) this.converge();
    if (status === 4) this.diverge();
  }

  converge() {
    if (this.position >= -this.size) {
      this.position -= 5.5;
      if (this.position < this.size) {
        this.size -= 5.5;
      }
    }
  }

  diverge() {
    if (this.position >= -this.size) {
      this.position += 20;
    }
  }

  checkCollision(point) {
    if ((this.cursor.getSide() + 4) % 6 === this.vtx && point <= 40 && point > 0 - this.size / 2 + 15 && status == 2) {
      togglePlaying();
    }
  }
}

export default Wall;