import { W, H, Xcenter, Ycenter } from './game';

class Plane {
  constructor() {
    // Speed of rotation
    this.rot = (2 * Math.PI) / 1440;

    this.drawBase = this.drawBase.bind(this);
  }

  drawBase(ctx, mult = 1) {
    // Multipler for pulsing effect
    const size = mult * 30;

    ctx.translate(Xcenter, Ycenter);
    ctx.rotate(this.rot);
    ctx.translate(-Xcenter, -Ycenter);

    ctx.beginPath();
    ctx.moveTo(Xcenter + size * Math.cos(0), Ycenter + size * Math.sin(0));

    // Logic to create the base hexagon
    // The loop goes onto 7 so that the last vertex rendered is not broken
    for (let i = 1; i <= 7; i++) {
      ctx.lineTo(Xcenter + size * Math.cos(i * 2 * Math.PI / 6),
        Ycenter + size * Math.sin(i * 2 * Math.PI / 6));
    }

    // ctx.lineJoin = "bevel";
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 5;
    ctx.stroke();
  }

  drawBackground(ctx) {
    for (let i = 1; i <= 6; i++) {
      ctx.beginPath();

      ctx.moveTo(Xcenter, Ycenter);
      ctx.lineTo(Xcenter + W * Math.cos((i + 1) * 2 * Math.PI / 6),
        Ycenter + W * Math.sin((i + 1) * 2 * Math.PI / 6));
      ctx.lineTo(Xcenter + W * Math.cos(i * 2 * Math.PI / 6),
        Ycenter + W * Math.sin(i * 2 * Math.PI / 6));
      ctx.lineTo(Xcenter, Ycenter);

      ctx.fillStyle = (i % 2 === 0) ? "#999999" : "#666666";
      ctx.fill();

      ctx.closePath();
    }
  }
}

export default Plane;