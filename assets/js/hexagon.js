import Cursor from './cursor';
import Plane from './plane';
import KeyHandler from './key_handler';
import Wall from './wall';
import Timer from './timer';

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

  const cursor = new Cursor(ctx);
  const plane = new Plane(ctx);
  const keyHandler = new KeyHandler(cursor);
  const timer = new Timer(ctx);
  const wall1 = new Wall(ctx, cursor, 80, 1);
  const wall2 = new Wall(ctx, cursor, 40, 4);
  const wall3 = new Wall(ctx, cursor, 80, 2);

  document.onkeydown = keyHandler.handleKeyPress;
  document.onkeyup = keyHandler.handleKeyUp;

  timer.turnOn();

  const animate = () => {
    ctx.clearRect(0, 0, W, H);
    
    ctx.save();
    plane.drawBackground();
    
    wall1.drawWall(ctx);
    wall2.drawWall(ctx);
    wall3.drawWall(ctx);
    
    plane.drawBase();
    cursor.drawCursor();
    ctx.restore();
    cursor.getSide();
    timer.renderTime();


    requestAnimFrame(animate);
  }

  animate();
});