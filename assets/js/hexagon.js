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
export let mult = 1;
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
    window.setTimeout(callback, 1000/60);
  };
})();

let balance = 0;

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
  const ctx = canvas.getContext("2d" );
  
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
  
  
  togglePlaying = () => {
    if (playing) {
      // Happens when you lose
      
      // Resets rotation of ctx so that they render at the same place every
      // time
      startingScreen.resetRotation();
      wallPattern.resetWalls();
      cursor.vel = 0;
      
      timer.turnOff();
      playing = false;
    } else {
      // Start Game
      timer.resetRotation();
      wallPattern.pickPattern();
      timer.resetTimer();
      timer.turnOn();
      playing = true;
    }
  };

  // Animating
  const animate = () => {
    if (playing) {
      update();
      
      plane.drawBackground();
      wallPattern.drawWalls();
      plane.drawBase();
      cursor.drawCursor();

      timer.renderTime();
    } else {
      mult = 10.5;

      setToStartingColors();
      plane.drawBackground();
      plane.drawBase();
      startingScreen.renderStartingScreen(timer);
      cursor.drawCursor();
    }
    
    requestAnimFrame(animate);
  }
  
  animate();
});