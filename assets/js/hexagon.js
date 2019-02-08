import Cursor from './cursor';
import Plane from './plane';
import Timer from './timer';
import WallPattern from './wall_pattern';
import { updateColors, setToStartingColors } from './color_handler';
import StartingScreen from './starting_screen';

export const W = 640;
export const H = 460;
export const Xcenter = W / 2;
export const Ycenter = H / 2;

// Exported "live-updating" values (global state)
export let mult = 10.5;
export let rot = (2 * Math.PI) / 600;
export let totalRotation = 0;
export let togglePlaying; // Initializing to define it later in animate function

// Boolean to start the game
export let playing = false;
export let status = 0;

// 0: default
// 1: starting
// 2: playing
// 3: collision
// 4: ending

export const changeRotation = (multiplier) => {
  if (rot <= (2 * Math.PI) / 200) {
    rot = rot * multiplier;
  }
}

export const addToTotalRotation = (rot) => {
  totalRotation += rot;
  totalRotation %= 2 * Math.PI;
}

// Console based animation function thats smoothes frames
window.requestAnimFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

let balance = 0;
let flash = false;

const update = () => {
  updateColors(balance);

  if (mult < 1.1) {
    mult += 0.005;
  } else {
    mult = 1;
  }
}

document.addEventListener('DOMContentLoaded', () => {

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  // ctx.imageSmoothingEnabled = false;

  // Canvas parameters
  canvas.width = W;
  canvas.height = H;
  canvas.style.width = W;
  canvas.style.height = H;

  const cursor = new Cursor(ctx);
  const plane = new Plane(ctx);
  const timer = new Timer(ctx, plane);
  const wallPattern = new WallPattern(ctx, cursor, timer);
  const startingScreen = new StartingScreen(ctx);

  setToStartingColors();

  togglePlaying = () => {
    switch (status) {
      case 0:
        // Start Game
        mult = 10.5;
        wallPattern.resetWalls();
        timer.resetRotation();
        timer.resetTimer();
        status = 1;
        break;
      case 1:
        wallPattern.pickPattern();
        timer.turnOn();
        status = 2;
        break;
      case 2: // Collision
        wallPattern.clearTimeouts();
        flash = true;

        cursor.vel = 0; // Stop cursor from moving

        timer.turnOff();
        status = 3;
        break;
      case 3:
        setTimeout(() => {
          status = 4;
        }, 1000);
        break;
      case 4:
        startingScreen.resetRotation();
        status = 0;
        break;
    }
  };

  // Animating
  const animate = () => {
    switch (status) {
      case 0:
        plane.drawBackground();
        plane.drawBase();
        startingScreen.renderStartingScreen(timer);
        cursor.drawCursor();
        break;
      case 1:
        plane.drawBackground();
        plane.drawBase();
        cursor.drawCursor();

        mult -= 0.25;
        if (mult <= 1) {
          togglePlaying();
        }
        break;
      case 2:
        update();

        plane.drawBackground();
        wallPattern.drawWalls();
        plane.drawBase();
        cursor.drawCursor();

        timer.renderTime();
        break;
      case 3:
        setToStartingColors();
        plane.drawBackground();
        wallPattern.drawWalls();
        plane.drawBase();
        cursor.drawCursor();
        timer.renderTime();

        // Flash yellow at collision
        if (flash) {
          togglePlaying();
          ctx.save();
          ctx.translate(Xcenter, Ycenter);
          ctx.rotate(-totalRotation);
          ctx.translate(-Xcenter, -Ycenter);
          ctx.fillStyle = "#FFFF00";
          ctx.fillRect(0, 0, W, H);
          ctx.restore();

          flash = false;
        }
        break;
      case 4:
        plane.drawBackground();
        wallPattern.drawWalls();
        plane.drawBase();
        cursor.drawCursor();

        if (mult >= 10.5) {
          togglePlaying();
        } else {
          mult += 0.25;
        }
        break;
    }

    requestAnimFrame(animate);
  }

  animate();
});