import { W, H, Xcenter, Ycenter } from './hexagon';

class Plane {
  constructor(ctx) {
    this.ctx = ctx;

    // Speed of rotation
    this.rot = (2 * Math.PI) / 1440;

    // this.drawBase = this.drawBase.bind(this);
    this.changeRotation = this.changeRotation.bind(this);
  }

  drawBase(mult = 1) {
    // Multipler for pulsing effect
    const size = mult * 30;

    this.ctx.translate(Xcenter, Ycenter);
    this.ctx.rotate(this.rot);
    this.ctx.translate(-Xcenter, -Ycenter);

    this.ctx.beginPath();
    this.ctx.moveTo(Xcenter + size * Math.cos(0), Ycenter + size * Math.sin(0));

    // Logic to create the base hexagon
    // The loop goes onto 7 so that the last vertex rendered is not broken
    for (let i = 1; i <= 7; i++) {
      this.ctx.lineTo(Xcenter + size * Math.cos(i * 2 * Math.PI / 6),
        Ycenter + size * Math.sin(i * 2 * Math.PI / 6));
    }

    // this.ctx.lineJoin = "bevel";
    this.ctx.fillStyle = "#000000";
    this.ctx.fill();
    
    this.ctx.strokeStyle = "#FFFFFF";
    this.ctx.lineWidth = 5;
    this.ctx.stroke();

    this.ctx.closePath();
  }

  drawBackground() {
    for (let i = 1; i <= 6; i++) {
      this.ctx.beginPath();

      this.ctx.moveTo(Xcenter, Ycenter);
      this.ctx.lineTo(Xcenter + W * Math.cos(i * 2 * Math.PI / 6),
      Ycenter + W * Math.sin(i * 2 * Math.PI / 6));
      this.ctx.lineTo(Xcenter + W * Math.cos((i + 1) * 2 * Math.PI / 6),
        Ycenter + W * Math.sin((i + 1) * 2 * Math.PI / 6));
      this.ctx.lineTo(Xcenter, Ycenter);

      this.ctx.fillStyle = (i % 2 === 0) ? "#999999" : "#666666";
      this.ctx.fill();

      this.ctx.closePath();
    }
  }

  changeRotation(rot) {
    this.rot = rot;
  }
}

export default Plane;