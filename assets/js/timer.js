class Timer {
  constructor(ctx) {
    this.ctx = ctx;
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
    this.ctx.font = "30px Arial";
    this.ctx.fillText(this.parseTimer(this.time), 50, 50);
  }

  parseTimer(time) {
    let milliseconds = parseInt((time % 100)),
      seconds = parseInt((time / 100) % 60),
      minutes = parseInt((time / (100 * 60)) % 60);
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return (minutes > 0 ? minutes + ":" : "") + seconds + ":" + milliseconds;
  }
}

export default Timer;