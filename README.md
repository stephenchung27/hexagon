# Hexagon

[Live Link](http://stephenchung.io/hexagon/)

## Background
https://terrycavanaghgames.com/hexagon/

Hexagon was an original game creatd by Terry Cavanagh in the span of a day. He is the creator of other popular games such as VVVVVV and State Machine. It is a simple arcade game where you move a small cursor around a singular middle hexagon and larger hexagons with sides missing collapse/shrink onto the smaller hexagon and the player must move the cursor around to dodge the walls of the hexagons. 

## Functionality

With this game, players will be able to use only two keyboard keys: left or right arrows. As the score increases, the speed at which the hexagons converge and the frequency in which they appear will increase relative to the score. 

Along with that the users will be able to:

- [ ] Start and reset the game
- [ ] Access the highscores stored on a database

In addtion, the project will include:
- [ ] Github and LinkedIn urls placed within the game space
- [ ] A production README

## Wireframes

The game will consist of the entire screen to ensure that the user has the maximum advantage as the game's difficulty will ramp up considerably. Miscellaneous game information including the buttons but excluding the score and pause button will fade away once the game begins. Game controls will include clickable Start, Pause, and Reset buttons and corresponding keyboard shortcuts.

![Wireframe](https://github.com/stephenchung27/hexagon/blob/master/Wireframe_1.png)

## Architecture and Technologies

This project will be implemeneted with the following technologies:
- `JavaScript` for game logic,
- `Canvas` for game rendering
- `Webpack` to bundle js files

In addition to the entry file, there will be three scripts involved in this project:

`cursor.js`: this will handle the parsing of user input necessary to move the cursor around the center hexagon

Canvas provides a way to rotate shapes that involves rotating the entire element, drawing the shape, then rotating it back the amount it was initially rotated. To do this effectively and preserve the location of static elements, you must keep track of the degree of rotation and rotate every other element the opposite amount. With user-controlled entities, in my case the cursor that rotates in relation to the center hexagon, you must not preemptively rotate back to the normal state but rotate another time and render the entity before rotating the entire canvas back by the initial rotation and the offset caused by rotating the entity.

Another thing to keep in mind when rotating is the fact that the rotation point occurs not at the center of the canvas but instead to the top-left edge. Thus an additional movement of the rotated canvas is required to recenter the canvas.

A typical rotation includes the following lines:
```
this.ctx.translate(Xcenter, Ycenter);
this.ctx.rotate(rot);

// Draw your shape

this.ctx.translate(-Xcenter, -Ycenter);
 ```
 
However, often what happens is that once you rotate and draw your shape, rotating back is required to preserve the entire height and width of the canvas within in the viewport. When you don't account for that, you will often see the edges of the canvas leak into the viewport and leave traces of the shapes drawn on top of the previous frame. A pair of helpful functions exist called `ctx.save()` and `ctx.restore()` that helps to restore the rotation while maintaining the viewport. Before you execute the lines mentioned above, you must run `ctx.save()` and then after the rendering is finished, `ctx.restore()` will restore the canvas bounds.

`walls.js`: this will handle the generating and converging of the hexagon walls as well as the placements of the missing walls where the cursor can dodge the hexagon from.

A single wall for a level is stored in a local JSON file and depending on the level, will add the list of different wall "levels" to the random level utility.

```
export const level1 = [
  {
    "walls": [
      {
        "size": 40,
        "side": 0,
        "offset": 0
      },
      {
        "size": 40,
        "side": 1,
        "offset": 0
      },
      {
        "size": 40,
        "side": 2,
        "offset": 0
      },
      {
        "size": 40,
        "side": 3,
        "offset": 0
      },
      {
        "size": 40,
        "side": 4,
        "offset": 0
      }
    ]
  }
]
```

The size refers to the width of the wall. The side is the angle relative to the starting point of the hexagon and the offset is the amount of time that should pass before the wall starts converging allowing for multiple-tiered levels. 

`plane.js`: this will handle the pulsing of the playing field to the music of the beat as well as the center hexagon where the cursor will rotate

`hexagon.js`: this will handle the score and level progression

`highscore_handler.js`: this handles the adding/pulling of highscores from the Firestore database

`starting_screen.js`: this will handle the before-start and after-end phases of the game

To simulate the "zooming in/out" effect when entering the starting screen, I implemented a multiplier to almost every entity in the game. Once the game state changes to "ending", the multiplier will increase smoothly before stopping at a certain endpoint. The "zoom out" works in a similar way. This allows for a pseudo-3D effect without sacrificing memory on rendering a 3D plane.

`color_handler.js`: this will handle the smooth color transition that allows for a more dynamic feel to the game

```
let balance = 0;

const blendColors = (r1, g1, b1, r2, g2, b2, balance) => {
  const bal = Math.min(Math.max(balance, 0), 1);
  const nbal = 1 - bal;

  const red = Math.floor(r1 * nbal + r2 * bal);
  const green = Math.floor(g1 * nbal + g2 * bal);
  const blue = Math.floor(b1 * nbal + b2 * bal);

  return "rgb(" + red + "," + green + "," + blue + ")";
}

export const updateColors = () => {
  color1 = blendColors(255, 255, 0, 255, 0, 0, balance);
  color2 = blendColors(106, 106, 0, 106, 0, 0, balance);
  color3 = blendColors(81, 81, 0, 81, 0, 0, balance);

  if (balance < 1) {
    balance += 0.015;
  } else {
    balance = 0;
  }
};
```

`updateColors` is run with every frame so the color changing appear smooth.

## Implementation Timeline

**Day 1**: Setup all necessary Node modules and get Webpack up and running. Write a basic entry file and the bare bones versions of the scripts outlined above. Review the basic of canvas rendering. Goals for the day:
- Get a green bundle with Webpack
- Create a basic hexagon playing field

**Day 2**: Create the logic behind the cursor rotating around the hexagon and the entire playing field rotating around the entire screen. Goals for the day:
- Complete the `cursor.js` module
- Successfully render a hexagon at the center of the view
- Make the field rotate along with the cursor maintaining its position relative to the center hexagon

**Day 3**: Create the larger hexagon converging logic and figure out the collision detection of the cursor and the larger hexagons. Add a score mechanism that counts the amount of hexagons the player is able to dodge. A play button and pause button should be implemented.
- Finish the larger hexagon converging logic
- Implement collision detection between the cursor and the larger hexagons
- Create a scoring mechanism so the user can track the high score
- Play and pause buttons should be implemented now that the game is functional

**Day 4**: Add levels to the game where with every level the speed of the hexagons increase. Style the loading screen and include music with correct BPMs to go along with the level speed. Create the "pulsing" animation and the slow color changes. Goals for the day:
- Create controls to increase the speed of the levels
- Style the loading screen and the animation that plays in the background
- Create the pulsing animation

**Bonus Features**
- [ ] Add a database to store all the highest scores
- [ ] Add styled transitions from entering the game and losing and returning the the main screen
