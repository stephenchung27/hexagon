import { H, Xcenter, Ycenter } from './game';

class Hexagon {
  constructor() {
    this.size = H;

    this.drawHexagon = this.drawHexagon.bind(this);
  }

  drawHexagon(ctx) {
    this.size -= 1;

    ctx.beginPath();
    ctx.moveTo(Xcenter + this.size * Math.cos(0), Ycenter + this.size * Math.sin(0));

    for (let i = 0; i <= 6; i++) {
      ctx.lineTo(Xcenter + this.size * Math.cos(i * 2 * Math.PI / 6),
        Ycenter + this.size * Math.sin(i * 2 * Math.PI / 6));
    }

    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 20;
    ctx.stroke();
  }
}

export default Hexagon;