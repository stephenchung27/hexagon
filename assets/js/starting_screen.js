import { totalRotation, rot, Xcenter, Ycenter } from './hexagon';

class StartingScreen {
  constructor(ctx) {
    this.ctx = ctx;

    this.rotation = 0;

    this.correctRotation = true;
  }

  renderStartingScreen(timer) {
    this.rotation -= rot;
    
    // Reset rotation to position correctly
    if (!this.correctRotation) {
      this.rotation = -totalRotation; 
      this.correctRotation = true;
    }

    this.ctx.save();

    this.ctx.translate(Xcenter, Ycenter);
    this.ctx.rotate(this.rotation);

    this.ctx.font = "96px Acknowledge";
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "#C4C4C4";
    this.ctx.fillText("HEXAGON", 0, -100);

    this.ctx.font = "24px Acknowledge";
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "#FF0000";
    this.ctx.fillText("ARROW KEYS TO MOVE, SPACE TO START", 0, -80);

    this.ctx.font = "24px Acknowledge"
    this.ctx.textAlign = "left";
    this.ctx.fillStyle = "#C4C4C4";
    this.ctx.fillText("LAST: ", -190, -50);

    // Timer
    this.ctx.font = "24px Acknowledge"
    this.ctx.textAlign = "left";
    this.ctx.fillStyle = "#FF0000";
    this.ctx.fillText(timer.parseTime(), -125, -50);

    this.ctx.font = "24px Acknowledge"
    this.ctx.textAlign = "left";
    this.ctx.fillStyle = "#C4C4C4";
    this.ctx.fillText("BEST: ", 60, -50);

    // Best time
    this.ctx.font = "24px Acknowledge"
    this.ctx.textAlign = "left";
    this.ctx.fillStyle = "#FF0000";
    this.ctx.fillText("00:00 ", 125, -50);

    this.ctx.restore();
  }

  resetRotation() {
    this.correctRotation = false;
  }
}

export default StartingScreen;