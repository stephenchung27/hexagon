import Cursor from './cursor';
import Plane from './plane';
import Timer from './timer';
import WallPattern from './wall_pattern';
import { updateColors, setToStartingColors } from './color_handler';
import StartingScreen from './starting_screen';
import { addHighscore } from './highscore_handler';

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
export let status = 0;

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
let flashCounter = 0;

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

  const highscoreForm = document.getElementById("name-form");
  const nameInput = document.getElementById("name-input");

  nameInput.addEventListener("input", () => {
    if (nameInput.value.match(/\s|\./g)) {
      // alert('Username Cannot Have Spaces or Full Stops');
      nameInput.value = nameInput.value.replace(/\s/g, '');
    }
  })

  highscoreForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (nameInput.value !== "") {
    addHighscore(nameInput.value, timer.time);
    nameInput.value = "";
    nameInput.disabled = true;
    nameInput.placeholder = "Highscore submitted";
    startingScreen.getScores();
    }
  });

  setToStartingColors();
  startingScreen.getScores();
  
  togglePlaying = () => {
    switch (status) {
      case 0:
        // Start Game
        mult = 10.5;
        nameInput.classList.add("hidden");
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
        flashCounter = 0;

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
        nameInput.classList.remove("hidden");
        nameInput.value = "";
        nameInput.disabled = false;
        nameInput.placeholder = "Enter your Name";
        nameInput.focus();

        if (localStorage.getItem('bestScore') < timer.time) {
          localStorage.setItem('bestScore', timer.time);
        }
        
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

          flashCounter += 1;
          if (flashCounter > 4) flash = false;
        }
        break;
      case 4:
        plane.drawBackground();
        wallPattern.drawWalls();
        plane.drawBase();
        cursor.drawCursor();
        startingScreen.getScores();

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