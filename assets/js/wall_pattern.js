import Wall from './wall';
import { level1, level2, level3 } from './levels';
import { changeRotation } from './hexagon';

class WallPattern {
  constructor(ctx, cursor, timer) {
    this.ctx = ctx;
    this.cursor = cursor;
    this.timer = timer;

    this.difficulty = 1;
    this.level = 1;
    this.patterns = level1.concat(level1).concat(level1);
    this.walls = [];

    this.pickPattern = this.pickPattern.bind(this);
  }

  drawWalls() {
    this.walls.forEach((wall) => {
      wall.drawWall();
    });
  }

  pickPattern() {
    const wallSet = this.patterns[Math.floor(Math.random() * this.patterns.length)];


    // Need offset to get next pattern after previous pattern finishes
    let offsetTotal = 0;
  
    // Start first walls from random vertex
    const vtxOffset = Math.floor(Math.random() * 6);

    wallSet.walls.forEach(wall => {
      if (offsetTotal < wall.offset) {
        offsetTotal = wall.offset;
      }

      setTimeout(() => {
        this.walls.push(new Wall(this.ctx, this.cursor, wall.size, 
          (wall.side + vtxOffset) % 6));
      }, wall.offset);
    });

    // Pick next pattern
    setTimeout(() => {
      this.pickPattern();
    }, 900 + offsetTotal);

    // Delete walls after they reach the center
    setTimeout(() => {
      this.walls = this.walls.slice(wallSet.walls.length);
      this.newRotation();
    }, 2300 + offsetTotal);

    // Checks level and adds necessary patterns
    this.checkLevel();
  }

  checkLevel() {
    if (this.timer.time >= 100 && this.level < 2) {
      this.patterns = this.patterns.concat(level2);
      this.level++;
    } else if (this.timer.time >= 200 && this.level < 3) {
      this.patterns = this.patterns.concat(level3);
      this.level++;
    }
  }

  newRotation() {
    const random = Math.floor(Math.random() * 6);
    switch(random) {
      case 0:
        changeRotation(-1);
        break;
      case 1:
        changeRotation(1.1);
        break;
      case 2:
        changeRotation(0.9);
        break;
    }
  }
}

export default WallPattern;