import { color1, rot, Xcenter, Ycenter } from './hexagon';

class Timer {
  constructor(ctx, plane) {
    this.ctx = ctx;
    this.plane = plane;
    this.rot = 0;

    this.time = 0;
    this.playing = false;

    this.interval = null;

    this.tickTimer = this.tickTimer.bind(this);
    // this.resetTimer = this.resetTimer.bind(this);
  }

  turnOn() {
    this.resetTimer();
    clearInterval(this.interval);
    this.interval = setInterval(this.tickTimer, 10);
  }

  turnOff() {
    this.playing = false;
  }

  tickTimer() {
    if (this.playing) this.time += 1;
  }

  resetTimer() {
    this.playing = true;
    this.time = 0;
  }

  renderTime() {
    // Rotation must be actively subtracted from so that it remains stationary
    // relative to the background
    this.rot -= rot;
    
    this.ctx.save();

    this.ctx.translate(Xcenter, Ycenter);
    this.ctx.rotate(this.rot); 
    // this.ctx.translate(-Xcenter, -Ycenter);
    
    this.ctx.font = "20px Acknowledge";
    this.ctx.textAlign = "left";
    this.ctx.fillStyle = color1;
    this.ctx.fillText("Time: " + this.parseTime(this.time), -310, 220);

    this.ctx.restore();
  }

  parseTime(time) {
    let milliseconds = parseInt((time % 100)),
      seconds = parseInt((time / 100) % 60),
      minutes = parseInt((time / (100 * 60)) % 60);
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    return (minutes > 0 ? minutes + ":" : "") + seconds + ":" + milliseconds;
  }
}

export default Timer;