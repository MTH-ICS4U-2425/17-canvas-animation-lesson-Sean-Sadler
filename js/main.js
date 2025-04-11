/**
 * ICS4U - Mr. Brash 🐿️
 * 
 * 17 - Canvas Animation
 * 
 * Author:
 * 
 */

'use strict';

import Player from "./player.js";
import { CANVAS, CTX, MS_PER_FRAME, KEYS } from "./globals.js";

// Globals
const HERO = new Player(120, 150, 89, 97);
let ground = new Image();
ground.src = "../images/dino_large.png";
ground.x_pos1 = 0;
ground.x_pos2 = 1150;

let frame_time = performance.now();

// Event Listeners
document.addEventListener("keydown", keypress);

// Disable the context menu on the entire document
document.addEventListener("contextmenu", (event) => { 
  event.preventDefault();
  return false; 
});

/**
 * The user pressed a key on the keyboard 
 */
function keypress(event) {
  if ([KEYS.W, KEYS.UP_ARROW, KEYS.SPACE].includes(event.keyCode)) {
    HERO.jump();
  }
}


/**
 * The main game loop
 */
function update() {
  // Prepare for the next frame
  requestAnimationFrame(update)
  
  /*** Desired FPS Trap ***/
  const NOW = performance.now()
  const TIME_PASSED = NOW - frame_time
  
  if (TIME_PASSED < MS_PER_FRAME) return
  
  const EXCESS_TIME = TIME_PASSED % MS_PER_FRAME
  frame_time = NOW - EXCESS_TIME
  /*** END FPS Trap ***/
  
  // Clear the canvas
  CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);



  ground.x_pos1 -= 5;
  ground.x_pos2 -= 5;

  // Draw ground
  CTX.drawImage(ground, 0, 102, 1150, 28, ground.x_pos1, 300, 1150, 26);
  CTX.drawImage(ground, 1151, 102, 1150, 28, ground.x_pos2, 300, 1150, 26);

  if (ground.x_pos1 <= -1150) {
    ground.x_pos1 = 1150;
  } 
  if (ground.x_pos2 <= -1150) {
    ground.x_pos2 = 1150;
  }
  
  // Draw our hero
  HERO.update();
  
}

// Start the animation
update()
