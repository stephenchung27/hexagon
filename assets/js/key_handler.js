import { status, togglePlaying } from './hexagon';

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
    if (e.target.id !== "name-input") {
      e.preventDefault();
      switch (status) {
        case 0:
          switch (e.keyCode) {
            case KEYCODE_SPACE:
              
              togglePlaying();
              break;
          }
        break;
        case 1:
        case 2:
          switch (e.keyCode) {
            case KEYCODE_LEFT:
              this.cursor.moveCCW();
              break;
            case KEYCODE_RIGHT:
              this.cursor.moveCW();
              break;
          }
          break;
      }
    };
  }

  handleKeyUp(e) {
    e.preventDefault();
    this.cursor.stopMoving();
  }
}

export default KeyHandler;