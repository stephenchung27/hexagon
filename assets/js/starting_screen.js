import { fb, totalRotation, rot, Xcenter, Ycenter } from './hexagon';
import { getHighscores } from './highscore_handler';

// debugger
// const highscores = fire.firestore().collection('highscores');

class StartingScreen {
  constructor(ctx) {
    this.ctx = ctx;

    this.rotation = 0;
    this.highscores = [];
    this.loaded = false;

    this.correctRotation = true;
  }

  getScores() {
    this.highscores = [];
    getHighscores().then(snapshot => {
      snapshot.forEach(doc => {
        this.highscores[doc.id] = doc.data();
      });
    });
    this.loaded = true;
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

    this.ctx.font = "20px Acknowledge";
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "#FFFF00";
    this.ctx.fillText("CREATED BY STEPHEN CHUNG", 0, -150);

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
    this.ctx.fillText(timer.parseTime(localStorage.getItem('bestScore')) || "00:00", 125, -50);

    // Highscores
    this.ctx.font = "24px Acknowledge"
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "#FF0000";
    this.ctx.fillText("HIGHSCORES", 0, 10);

    if (!this.loaded) {
      this.ctx.font = "24px Acknowledge"
      this.ctx.textAlign = "center";
      this.ctx.fillStyle = "#FFFF00";
      this.ctx.fillText("LOADING...", 0, 35);
    } else if (this.loaded && !Object.keys(this.highscores).length) {
      this.ctx.font = "24px Acknowledge"
      this.ctx.textAlign = "center";
      this.ctx.fillStyle = "#FFFF00";
      this.ctx.fillText("NO HIGHSCORES YET", 0, 35);
    }

    Object.values(this.highscores).forEach((entry, index) => {
      this.ctx.font = "24px Acknowledge"
      this.ctx.textAlign = "left";
      this.ctx.fillStyle = "rgba(255, 255, 0, " +
        (index <= 5 ? 1 : 0.20 * (10 - index)) + ")";
      this.ctx.fillText(entry.name, -100, 30 + index * 17);

      this.ctx.font = "24px Acknowledge"
      this.ctx.textAlign = "right";
      this.ctx.fillStyle = "rgba(196, 196, 196, " + 
        (index <= 5 ? 1 : 0.20 * (10 - index)) + ")";
      this.ctx.fillText(timer.parseTime(entry.time), 100, 30 + index * 17);
    })

    // this.ctx.font = "24px Acknowledge"
    // this.ctx.textAlign = "center";
    // this.ctx.fillStyle = "#C4C4C4";
    // this.ctx.fillText("Highscores", 0, 50);

    this.ctx.restore();
  }

  resetRotation() {
    this.correctRotation = false;
  }
}

export default StartingScreen;