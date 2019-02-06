import Cursor from './cursor';
import Plane from './plane';
import KeyHandler from './key_handler';
import Hexagon from './hexagon';

export const W = window.innerWidth;
export const H = window.innerHeight;

export const Xcenter = W / 2;
export const Ycenter = H / 2;

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

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = W;
  canvas.height = H;

  const cursor = new Cursor();
  const plane = new Plane();
  const keyHandler = new KeyHandler(cursor);
  const hexagon = new Hexagon();

  plane.drawBase(ctx);
  cursor.drawCursor(ctx);

  document.onkeydown = keyHandler.handleKeyPress;

  const animate = () => {
    plane.drawBase(ctx);
    if (hexagon.size > 20) {
      hexagon.drawHexagon(ctx);
    }
    cursor.drawCursor(ctx);
    requestAnimFrame(animate);
  }

  animate();
});