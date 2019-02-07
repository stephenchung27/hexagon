import { W, color1, color2, color3, mult, rot, Xcenter, Ycenter } from './hexagon';

class Plane {
  constructor(ctx) {
    this.ctx = ctx;

    // this.drawBase = this.drawBase.bind(this);
    this.multRotation = this.multRotation.bind(this);
  }

  drawBase() {
    // Multipler for pulsing effect
    const size = mult * 30;

    this.ctx.beginPath();

    this.ctx.translate(Xcenter, Ycenter);
    this.ctx.rotate(rot);
    this.ctx.translate(-Xcenter, -Ycenter);

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

    this.ctx.strokeStyle = "rgb(" + color1.r + "," + color1.g + "," + color1.b + ")";
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

      this.ctx.fillStyle = (i % 2 === 0) ?
        "rgb(" + color2.r + "," + color2.g + "," + color2.b + ")" :
        "rgb(" + color3.r + "," + color3.g + "," + color3.b + ")";
      this.ctx.fill();

      this.ctx.closePath();
    }
  }
}

export default Plane;