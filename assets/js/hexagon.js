import Cursor from './cursor';
import Plane from './plane';
import Timer from './timer';
import WallPattern from './wall_pattern';
import { blendColors } from './color_handler';

export const W = 640;
export const H = 460;

export const Xcenter = W / 2;
export const Ycenter = H / 2;

export let color1, color2, color3;
export let mult = 1;
export let rot = (2 * Math.PI) / 500;

export const changeRotation = (multiplier) => {
  rot = rot * multiplier;
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
  color1 = blendColors(255, 255, 0, 255, 0, 0, balance);
  color2 = blendColors(106, 106, 0, 106, 0, 0, balance);
  color3 = blendColors(81, 81, 0, 81, 0, 0, balance);

  if (balance < 1) {
    balance += 0.015;
  } else {
    balance = 0;
  }

  if (mult < 1.1) {
    mult += 0.005;
  } else {
    mult = 1;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d" );

  ctx.imageSmoothingEnabled = false;

  // Canvas parameters
  canvas.width = W;
  canvas.height = H;
  canvas.style.width = W;
  canvas.style.height = H;

  const cursor = new Cursor(ctx);
  const plane = new Plane(ctx);  
  const timer = new Timer(ctx, plane);
  const wallPattern = new WallPattern(ctx, cursor, timer);
  
  timer.turnOn();
  
  wallPattern.pickPattern();

  // Animating
  const animate = () => {
    update();

    plane.drawBackground();
    wallPattern.drawWalls();
    plane.drawBase();
    timer.renderTime();
    cursor.drawCursor();

    requestAnimFrame(animate);
  }

  animate();
});