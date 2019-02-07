import { Xcenter, Ycenter } from './hexagon';

class Cursor {
  constructor(ctx) {
    this.ctx = ctx;

    // Mult - size multiplier for pusling
    this.mult = 1;

    // Rot - degree rotation of the base
    this.rot = 0;

    // Vel - velocity and direction at which the arrow is moving
    this.vel = 0;
  }

  drawCursor() {
    // For pulsing - size multiplier
    const size = this.mult * 40;

    // Rotation increases every frame based on current velocity
    this.rot += this.vel;

    // It is important to draw the cursor at the very end because the cursor
    // has its own relative rotations

    this.ctx.save();
    // Save is required to preserve the rotation of the plane relative
    // to the cursor

    this.ctx.translate(Xcenter, Ycenter);
    this.ctx.rotate(this.rot);

    const side = 12 * this.mult;
    const height = side * (Math.sqrt(3) / 2);

    this.ctx.beginPath();
    this.ctx.moveTo(0, -height / 2 - size);
    this.ctx.lineTo(-side / 2, height / 2 - size);
    this.ctx.lineTo(side / 2, height / 2 - size);
    this.ctx.lineTo(0, -height / 2 - size);

    this.ctx.fillStyle = "#FF0000";
    this.ctx.fill();

    // this.ctx.translate(-Xcenter, -Ycenter);

    this.ctx.restore();
  }

  getSide() {
    // this.ctx.fillText(Math.floor((this.rot % 6 + 6) % 6), 50, 100);
    this.ctx.fillText(this.rot, 50, 100);
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