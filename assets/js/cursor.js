import { status, mult, Xcenter, Ycenter } from './hexagon';
import { color1 } from './color_handler';
import KeyHandler from './key_handler';

class Cursor {
  constructor(ctx) {
    this.ctx = ctx;

    // Rot - degree rotation of the base
    this.rot = 0;

    // Vel - velocity and direction at which the arrow is moving
    this.vel = 0;
    this.pulseVal = 1;
    // Initialize keyhandler
    new KeyHandler(this);

    this.pulse = this.pulse.bind(this);
  }

  drawCursor() {
    // For pulsing - dist multiplier
    // const dist = mult * 40 ;
    const dist = mult * 30 + 9 + mult;

    // Rotation increases every frame based on current velocity
    this.rot += this.vel;

    // It is important to draw the cursor at the very end because the cursor
    // has its own relative rotations

    this.ctx.save();
    // Save is required to preserve the rotation of the plane relative
    // to the cursor

    this.ctx.translate(Xcenter, Ycenter);
    this.ctx.rotate(this.rot);

    const side = 12;
    const height = side * (Math.sqrt(3) / 2);

    this.ctx.beginPath();

    this.ctx.moveTo(0, -height / 2 - dist);
    this.ctx.lineTo(-side / 2, height / 2 - dist);
    this.ctx.lineTo(side / 2, height / 2 - dist);
    this.ctx.lineTo(0, -height / 2 - dist);

    this.ctx.fillStyle = color1;
    this.ctx.fill();

    this.pulse(side, dist);

    this.ctx.restore();

    this.ctx.closePath();
  }

  pulse(side, dist) {
    if (status === 0 || status === 3 || status === 4) {
      const pulseSide = side + this.pulseVal;
      const pulseHeight = pulseSide * (Math.sqrt(3) / 2);
      const pulseDist = dist + Math.PI * 2 * this.pulseVal / 40;

      this.ctx.moveTo(0, -pulseHeight / 2 - pulseDist);
      this.ctx.lineTo(-pulseSide / 2, pulseHeight / 2 - pulseDist);
      this.ctx.lineTo(pulseSide / 2, pulseHeight / 2 - pulseDist);
      this.ctx.lineTo(0, -pulseHeight / 2 - pulseDist);

      this.ctx.strokeFill = color1;
      this.ctx.lineWidth = 2;
      this.ctx.stroke();

      this.pulseVal += 3;
      if (this.pulseVal > 40) this.pulseVal = 1;
    }
  }

  getSide() {
    const result = Math.floor((this.rot + Math.PI / 6) / (2 * Math.PI / 6));
    if (result < 0) {
      return 6 - (Math.abs(result) % 6);
    } else {
      return result % 6;
    }
  }

  moveCW() {
    this.vel = (2 * Math.PI) / 50;
  }

  moveCCW() {
    this.vel = -((2 * Math.PI) / 50);
  }

  stopMoving() {
    this.vel = 0;
  }
}

export default Cursor;