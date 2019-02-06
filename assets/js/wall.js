import { W, Xcenter, Ycenter } from './game';

class Wall {
  constructor(size, vtx) {
    this.position = W;
    this.size = size;
    this.vtx = vtx;

    this.drawWall = this.drawWall.bind(this);
  }

  drawWall(ctx) {
    const pos = this.position;
    const size = this.size;
    const vtx = this.vtx;
    

    ctx.beginPath();

    ctx.moveTo(Xcenter + size * Math.cos((vtx + 1) * 2 * Math.PI / 6),
      Ycenter + size * Math.sin((vtx + 1) * 2 * Math.PI / 6));
    ctx.lineTo(Xcenter + size * Math.cos(vtx * 2 * Math.PI / 6),
      Ycenter + (size + pos) * Math.sin(vtx * 2 * Math.PI / 6));
    ctx.lineTo(Xcenter + size * Math.cos(vtx * 2 * Math.PI / 6),
      Ycenter + (size + pos) * Math.sin(vtx * 2 * Math.PI / 6));
    ctx.lineTo(Xcenter + size * Math.cos((vtx + 1) * 2 * Math.PI / 6),
      Ycenter + size * Math.sin((vtx + 1) * 2 * Math.PI / 6));
    ctx.closePath();

    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
  }
}

export default Wall;