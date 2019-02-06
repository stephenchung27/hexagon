import { Xcenter, Ycenter } from './game';

// Mult - size multiplier for pusling
// Rot - rotation of the entire board

class Cursor {
  constructor() {
    this.mult = 1;
    this.rot = 0;
  }

  drawCursor(ctx) {
    const size = this.mult * 30;

    // It is important to draw the cursor at the very end because the cursor
    // has its own relative rotations based on the total rotation

    ctx.save();
    ctx.translate(Xcenter, Ycenter);
    ctx.rotate(this.rot);

    const side = 10 * this.mult;
    const height = side * (Math.sqrt(3) / 2);

    ctx.beginPath();
    ctx.moveTo(0, -height / 2 - size);
    ctx.lineTo(-side / 2, height / 2 - size);
    ctx.lineTo(side / 2, height / 2 - size);
    ctx.lineTo(0, -height / 2 - size);

    ctx.fillStyle = "#FF0000";
    ctx.fill();

    ctx.translate(-Xcenter, -Ycenter);
    ctx.restore();
  }

  moveCW() {
    this.rot += (2 * Math.PI) / 180;
  }

  moveCCW() {
    this.rot -= (2 * Math.PI) / 180;
  }
}

export default Cursor;