import { playing, togglePlaying } from './hexagon';

const KEYCODE_LEFT = 37,
  KEYCODE_RIGHT = 39,
  KEYCODE_SPACE = 32;

class KeyHandler {
  constructor(cursor) {
    this.cursor = cursor;

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);

    document.onkeydown = this.handleKeyPress;
    document.onkeyup = this.handleKeyUp;
  }

  handleKeyPress(e) {
    e.preventDefault();
    if (playing) {
      switch (e.keyCode) {
        case KEYCODE_LEFT:
          this.cursor.moveCCW();
          break;
        case KEYCODE_RIGHT:
          this.cursor.moveCW();
          break;
      }
    } else {
      switch(e.keyCode) {
        case KEYCODE_SPACE:
          togglePlaying();
          break;
      }
    }
  }

  handleKeyUp(e) {
    e.preventDefault();
    this.cursor.stopMoving();
  }
}

export default KeyHandler;