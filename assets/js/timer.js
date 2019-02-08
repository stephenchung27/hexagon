import { rot, totalRotation, Xcenter, Ycenter } from './hexagon';
import { color1 } from './color_handler';

class Timer {
  constructor(ctx, plane) {
    this.ctx = ctx;
    this.plane = plane;
    this.rotation = 0;

    this.time = 0;
    this.isTimerOn = false;

    this.interval = null;

    this.tickTimer = this.tickTimer.bind(this);

    this.correctRotation = true;
  }

  turnOn() {
    this.resetTimer();
    clearInterval(this.interval);
    this.interval = setInterval(this.tickTimer, 10);
  }

  turnOff() {
    this.isTimerOn = false;
  }

  tickTimer() {
    if (this.isTimerOn) this.time += 1;
  }

  resetTimer() {
    // this.isTimerOn = true;
    this.time = 0;
  }

  renderTime() {
    // Rotation must be actively subtracted from so that it remains stationary
    // relative to the background
    this.rotation -= rot;

    // Reset rotation to position correctly
    if (!this.correctRotation) {
      this.rotation = -totalRotation;
      this.correctRotation = true;
    }
    
    this.ctx.save();

    this.ctx.translate(Xcenter, Ycenter);
    this.ctx.rotate(this.rotation); 
    // this.ctx.translate(-Xcenter, -Ycenter);
    
    this.ctx.font = "20px Acknowledge";
    this.ctx.textAlign = "left";
    this.ctx.fillStyle = color1;
    this.ctx.fillText("Time: " + this.parseTime(), -310, 220);

    this.ctx.restore();
  }

  parseTime() {
    let milliseconds = parseInt(this.time % 100),
      seconds = parseInt((this.time / 100) % 60),
      minutes = parseInt((this.time / (100 * 60)) % 60);
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    return (minutes > 0 ? minutes + ":" : "") + seconds + ":" + milliseconds;
  }

  resetRotation() {
    this.correctRotation = false;
  }
}

export default Timer;