/**
 * ICS4U - Mr. Brash 🐿️
 * 
 * 17 - Canvas Animation
 * 
 * Author:
 * 
 */

'use strict';

import Enemy from "./enemies.js";
import Player from "./player.js";
import Sun from "./background.js"
import { CANVAS, CTX, MS_PER_FRAME, KEYS, enemy_arr } from "./globals.js";

// Global
export const HERO = new Player(120, 150, 87, 95);
const SUN = new Sun();

const ground = new Image();
ground.src = "../images/dino_large.png";
ground.x_pos1 = 0;
ground.x_pos2 = 1150;

let enemy_frame_count = 1;
let next_enemy_frame = 120;



let frame_time = performance.now();

//Helper Functions
export default function randInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

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
    if (!HERO.alive && HERO.start_screen == true) {
      HERO.alive = true;
      HERO.start_screen = false;
    } else if (!HERO.alive && !HERO.start_screen) {
      console.log(true);
      game_reset();
    }
  } 
}



/**
 * The main game loop
 */
function update() {
  
  if (!HERO.alive && HERO.start_screen == true ) {
    requestAnimationFrame(update);
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
    CTX.drawImage(ground, 76, 0, 88, 97, HERO.position.x, HERO.position.y, 88, 97)
  } else if (HERO.alive) {
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



    ground.x_pos1 -= 10;
    ground.x_pos2 -= 10;

    // Draw ground
    CTX.drawImage(ground, 0, 102, 1150, 28, ground.x_pos1, 300, 1150, 26);
    CTX.drawImage(ground, 1151, 102, 1150, 28, ground.x_pos2, 300, 1150, 26);

    if (ground.x_pos1 <= -1150) {
      ground.x_pos1 = 1150;
    } 
    if (ground.x_pos2 <= -1150) {
      ground.x_pos2 = 1150;
    }

    if (enemy_frame_count == next_enemy_frame) {
      enemy_frame_count = 0;
      for (let enemy of enemy_arr) {
        if (!enemy.is_active) {
          enemy.is_active = true;
          enemy.x_pos = 1150;
          enemy.formation = randInt(1, 9);
          enemy.new_formation();
          break;
        }
      }

      next_enemy_frame = randInt(50, 100);
    }
    
    enemy_frame_count++;


    SUN.update();
    // Draw our hero
    HERO.update();
    for (let enemy of enemy_arr) {
      enemy.update();
    }
  } else {
    requestAnimationFrame(update);
  }
}


function game_reset() {
  HERO.alive = true;
  HERO.position.x = 120;
  HERO.position.y = 150;
  enemy_arr[0] = new Enemy(1, 1150);
  enemy_arr[1] = new Enemy(1, -100);
  enemy_arr[2] = new Enemy(1, -100);
  ground.x_pos1 = 0;
  ground.x_pos2 = 1150;
}

// Start the animation
update();