import Cursor from './cursor';
import Plane from './plane';
import KeyHandler from './key_handler';
import Hexagon from './hexagon';

// export const W = window.innerWidth;
// export const H = window.innerHeight;

export const W = 640;
export const H = 460;

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
  // const hexagon = new Hexagon(ctx);

  plane.drawBackground(ctx);
  plane.drawBase(ctx);
  cursor.drawCursor(ctx);

  document.onkeydown = keyHandler.handleKeyPress;
  document.onkeyup = keyHandler.handleKeyUp;

  const animate = () => {
    ctx.clearRect(0, 0, W, H);
    
    plane.drawBackground(ctx);

    // if (hexagon.size >= 0) {
    //   hexagon.drawHexagon(ctx);
    // }
    
    plane.drawBase(ctx);
    cursor.drawCursor(ctx);

    requestAnimFrame(animate);
  }

  animate();
});