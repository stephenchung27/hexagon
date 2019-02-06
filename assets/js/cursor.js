import { Xcenter, Ycenter } from './game';


class Cursor {
  constructor() {    
    // Mult - size multiplier for pusling
    this.mult = 1;

    // Rot - degree rotation of the base
    this.rot = 0;

    // Vel - velocity and direction at which the arrow is moving
    this.vel = 0;
  }

  drawCursor(ctx) {
    // For pulsing - size multiplier
    const size = this.mult * 42;

    // Rotation increases every frame based on current velocity
    this.rot += this.vel;

    // It is important to draw the cursor at the very end because the cursor
    // has its own relative rotations

    ctx.save();
    // Save is required to preserve the rotation of the plane relative
    // to the cursor

    ctx.translate(Xcenter, Ycenter);
    ctx.rotate(this.rot);

    const side = 12 * this.mult;
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
    this.vel = (2 * Math.PI) / 180;
  }

  moveCCW() {
    this.vel = -((2 * Math.PI) / 180);
  }

  stopMoving() {
    this.vel = 0;
  }
}

export default Cursor;