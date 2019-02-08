import Wall from './wall';
import { level1, level2, level3 } from './levels';
import { changeRotation, playing } from './hexagon';

class WallPattern {
  constructor(ctx, cursor, timer) {
    this.ctx = ctx;
    this.cursor = cursor;
    this.timer = timer;

    this.level = 1;
    this.patterns = level1.concat(level1).concat(level1);
    this.walls = [];

    this.pickPattern = this.pickPattern.bind(this);
    this.timeouts = [];
  }

  drawWalls() {
    this.walls.forEach((wall) => {
      wall.drawWall();
    });
  }

  resetWalls() {
    this.timeouts.forEach(timeout => {
      clearTimeout(timeout);
    });
    this.level = 1;
    this.walls = [];
    this.patterns = level1.concat(level1).concat(level1);
  }

  pickPattern() {
    const wallSet = this.patterns[Math.floor(Math.random() * this.patterns.length)];

    // Need offset to get next pattern after previous pattern finishes
    let offsetTotal = 0;

    // Start first walls from random vertex
    const vtxOffset = Math.floor(Math.random() * 6);

    console.log(this.patterns);

    wallSet.walls.forEach(wall => {
      if (offsetTotal < wall.offset) {
        offsetTotal = wall.offset;
      }

      this.timeouts.push(setTimeout(() => {
        this.walls.push(new Wall(this.ctx, this.cursor, wall.size,
          (wall.side + vtxOffset) % 6));
      }, wall.offset));
    });

    // Pick next pattern
    this.timeouts.push(setTimeout(() => {
      this.pickPattern()
    }, 900 + offsetTotal));

    // Delete walls after they reach the center
    this.timeouts.push(setTimeout(() => {
      this.walls = this.walls.slice(wallSet.walls.length);
      this.newRotation();
    }, 2000 + offsetTotal));

    // Checks level and adds necessary patterns
    this.checkLevel();
  }

  checkLevel() {
    if (this.timer.time >= 700 && this.level < 2) {
      this.patterns = this.patterns.concat(level2);
      this.level++;
    } else if (this.timer.time >= 1400 && this.level < 3) {
      this.patterns = this.patterns.concat(level3);
      this.level++;
    }
  }

  newRotation() {
    const random = Math.floor(Math.random() * 12);
    switch (random) {
      case 0:
        changeRotation(-1);
        break;
      case 1:
        changeRotation(1.1);
        break;
      case 2:
        changeRotation(0.9);
        break;
      case 3:
        changeRotation(1.2);
        break;
      case 4:
        changeRotation(0.80);
        break;
    }
  }
}

export default WallPattern;