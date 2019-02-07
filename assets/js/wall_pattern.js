import Wall from './wall';
import { level1, level2, level3 } from './levels';

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
    }, 2300 + offsetTotal);

    // Checks level and adds necessary patterns
    this.checkLevel();
  }

  checkLevel() {
    if (this.timer.time >= 50 && this.level < 2) {
      this.patterns = this.patterns.concat(level2);
      this.level++;
    } else if (this.timer.time >= 100 && this.level < 3) {
      this.patterns = this.patterns.concat(level3);
      this.level++;
    }
  }
}

export default WallPattern;