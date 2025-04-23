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
import { CANVAS, CTX, MS_PER_FRAME, KEYS, enemy_arr, FLOOR } from "./globals.js";
import { Star, Cloud, cloud_arr, star_arr } from "./parallax.js";

// Global
export const HERO = new Player(120, 150, 88, 97);
export const SUN = new Sun();

const ground = new Image();
ground.src = "../images/dino_large.png";
ground.x_pos1 = 0;
ground.x_pos2 = 1150;

let enemy_frame_count = 1;
let next_enemy_frame = 120;


const splash_screen = new Image();
splash_screen.src = "../images/splash_screen_text.png";

const death_screen = new Image();
death_screen.src = "../images/death_text.png";


let frame_time = performance.now();

//Helper Functions
export function randInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

// Event Listeners
document.addEventListener("keydown", keypress);
document.addEventListener("keyup", keyrelease);


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
      game_reset();
    }
  } else if (event.keyCode == KEYS.S && HERO.alive && HERO.bottom == FLOOR) {
    HERO.ducking = true;
  }
}

function keyrelease(event) {
  if ((event.keyCode == KEYS.S || event.keyCode == KEYS.DOWN_ARROW) && HERO.alive && (HERO.bottom == FLOOR)) {
    HERO.ducking = false;
    HERO.width = 88;
    HERO.height = 97;
    HERO.bottom = FLOOR;
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
    CTX.drawImage(splash_screen, 350, 150);
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

    //Update locations of all items
    for (let star of star_arr) {
      star.update();
    }
    SUN.update();
    for (let cloud of cloud_arr) {
      cloud.update();
    }
    HERO.update();
    for (let enemy of enemy_arr) {
      enemy.update();
    }
  } else {
    requestAnimationFrame(update);
    CTX.drawImage(death_screen, 290, 65);
    CTX.drawImage(ground, 1294, 29, 380, 20, 350, 40, 380, 20);
  }
}


function game_reset() {
  HERO.alive = true;
  HERO.position.x = 120;
  HERO.position.y = 150;
  enemy_arr[0] = new Enemy(1, 1100);
  enemy_arr[1] = new Enemy(1, -100);
  enemy_arr[2] = new Enemy(1, -100);
  ground.x_pos1 = 0;
  ground.x_pos2 = 1150;
}


export default { HERO, SUN, randInt }

// Start the animation
update();

