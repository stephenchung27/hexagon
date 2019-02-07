import { color1, mult, Xcenter, Ycenter } from './hexagon';
import KeyHandler from './key_handler';

class Cursor {
  constructor(ctx) {
    this.ctx = ctx;

    // Rot - degree rotation of the base
    this.rot = 0;

    // Vel - velocity and direction at which the arrow is moving
    this.vel = 0;

    // Initialize keyhandler
    new KeyHandler(this);
  }

  drawCursor() {
    // For pulsing - size multiplier
    const size = mult * 40;

    // Rotation increases every frame based on current velocity
    this.rot += this.vel;

    // It is important to draw the cursor at the very end because the cursor
    // has its own relative rotations

    this.ctx.save();
    // Save is required to preserve the rotation of the plane relative
    // to the cursor

    this.ctx.translate(Xcenter, Ycenter);
    this.ctx.rotate(this.rot);

    const side = 12 * mult;
    const height = side * (Math.sqrt(3) / 2);

    this.ctx.beginPath();

    this.ctx.moveTo(0, -height / 2 - size);
    this.ctx.lineTo(-side / 2, height / 2 - size);
    this.ctx.lineTo(side / 2, height / 2 - size);
    this.ctx.lineTo(0, -height / 2 - size);

    this.ctx.fillStyle = "rgb(" + color1.r + "," + color1.g + "," + color1.b + ")";
    this.ctx.fill();
    
    this.ctx.restore();

    this.ctx.closePath();
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
    this.vel = (2 * Math.PI) / 60;
  }

  moveCCW() {
    this.vel = -((2 * Math.PI) / 60);
  }

  stopMoving() {
    this.vel = 0;
  }
}

export default Cursor;