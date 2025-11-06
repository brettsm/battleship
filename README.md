# battleship
A browser-based implementation of the classic game: Battlship. The game logic and UI logic are separate, and the domain logic is testable.
This project was completed as part of The Odin Project curriculum.

## Features
- PvE
- Ship placement based on coordinates and directions
- Clickable grid elements for attacking

## How to Play
1. Enter your name to start the game.
2. Begin to deploy your fleet:
    - coordinates should be typed like this: {rowLetter}{colNumber}{H|V}, for example A1H
    - H for horizontal, V for vertical placement
3. Click 'Play' after all ships are placed.
4. click cells on the top board to fire shots.
    - if a cell turns white = miss, red = hit
5. Once all of one player's ships are sunk, the game is over
6. Click 'Try Again' to play again.

## Architecture
- gameController.js handles the game flow and linking UI with game objects and logic.
- UI layer creates objects for the gameController to display with shell object.
- Promises are used to wait for user input

## Getting Started
1. git clone https://github.com/YOUR_USERNAME/battleship.git
2. Open index.html in a browser.
3. Play!

## Future Improvements
1. Initialize Webpack
2. Drag-and-drop ship placement
3. Smarter computer AI that targets adjacent cells after a hit.
4. Two-player pass and play mode