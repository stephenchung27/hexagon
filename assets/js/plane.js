import { W, H, Xcenter, Ycenter } from './game';

class Plane {
  constructor() {
    this.rot = (2 * Math.PI) / 1440;

    this.drawBase = this.drawBase.bind(this);
  }

  drawBase(ctx, mult = 1) {
    const size = mult * 20;

    ctx.clearRect(0, 0, W, H);

    ctx.translate(Xcenter, Ycenter);
    ctx.rotate(this.rot);
    ctx.translate(-Xcenter, -Ycenter);

    ctx.beginPath();
    ctx.moveTo(Xcenter + size * Math.cos(0), Ycenter + size * Math.sin(0));

    // Logic to create the base hexagon

    for (let i = 0; i <= 6; i++) {
      ctx.lineTo(Xcenter + size * Math.cos(i * 2 * Math.PI / 6),
        Ycenter + size * Math.sin(i * 2 * Math.PI / 6));
    }

    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

export default Plane;