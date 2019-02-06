const KEYCODE_LEFT = 37,
  KEYCODE_RIGHT = 39,
  KEYCODE_SPACE = 32;

class KeyHandler {
  constructor(cursor) {
    this.cursor = cursor;

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleKeyPress(e) {
    e.preventDefault();

    switch (e.keyCode) {
      case KEYCODE_LEFT:
        this.cursor.moveCCW();
        break;
      case KEYCODE_RIGHT:
        this.cursor.moveCW();
        break;
    }
  }

  handleKeyUp(e) {
    e.preventDefault();
    this.cursor.stopMoving();
  }
}

export default KeyHandler;