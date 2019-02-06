# Hexagon

## Background
https://terrycavanaghgames.com/hexagon/

Hexagon was an original game creatd by Terry Cavanagh in the span of a day. He is the creator of other popular games such as VVVVVV and State Machine. It is a simple arcade game where you move a small cursor around a singular middle hexagon and larger hexagons with sides missing collapse/shrink onto the smaller hexagon and the player must move the cursor around to dodge the walls of the hexagons. 

## Functionality

With this game, players will be able to use only two keyboard keys: left or right arrows. As the score increases, the speed at which the hexagons converge and the frequency in which they appear will increase relative to the score. 

Along with that the users will be able to:

- [ ] Start, pause, and reset the game
- [ ] Access the highscores stored on a database
- [ ] Choose from different songs where the game will "pulse" with the corresponding bpm

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
`hexagon.js`: this will handle the generating and converging of the hexagons as well as the placements of the missing walls where the cursor can dodge the hexagon from
`plane.js`: this will handle the pulsing of the playing field to the music of the beat as well as the center hexagon where the cursor will rotate
`game.js`: this will handle the score and level progression

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
