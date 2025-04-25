/**
 * player.js
 * 
 * The Player Class
 * 
 * Acts as a sprite or "hero" for the game
 * 
 * Author: 
 */

import { CTX, CANVAS, GRAVITY, FLOOR, enemy_arr } from "./globals.js"
let frame_count = 0;
const dino = new Image();
dino.src = "../images/dino_large.png";

export default class Player {
  constructor(x, y, width, height) {
    this.width = width;
    this.height = height;

    this.position = {
      x: x,
      y: y
    }
    this.velocity = {
      x: 0,
      y: 0
    };
    this.alive = false;
    this.start_screen = true;
    this.ducking = false;
    this.fast_fall = 0;
  }

  get right() {
    return this.position.x + this.width;
  }
  get bottom() {
    return this.position.y + this.height;
  }
  get top() {
    return this.position.y;
  }
  get left() {
    return this.position.x;
  }
  set bottom(location) { this.position.y = location - this.height; }
  set right(location) { this.position.x = location - this.width; }
  set top(location) { this.position.y = location; }
  set left(location) { this.position.x = location; }

  /**
   * Main function to update location, velocity, and image
   */
  update() {

    //hitbox detection
    for (let enemy of enemy_arr) {
      if (enemy.formation == 7 || enemy.formation == 8|| enemy.formation == 9) {
        if (this.right >= enemy.x_pos && this.right <= enemy.x_pos + enemy.sw-10) {
          if (this.top <= enemy.y_pos + enemy.sh && this.top >= enemy.y_pos) {
            this.alive = false;
          } else if (this.bottom >= enemy.y_pos && this.bottom <= enemy.y_pos + enemy.sh) {
            this.alive = false;
          }
        } else if (this.left >= enemy.x_pos && this.left <= enemy.x_pos + enemy.sw-10) {
          if (this.top <= enemy.y_pos + enemy.sh && this.top >= enemy.y_pos) {
            this.alive = false;
          } else if (this.bottom >= enemy.y_pos && this.bottom <= enemy.y_pos + enemy.sh) {
            this.alive = false;
          }
        }
      } else {
        if (this.right >= enemy.x_pos && this.right <= enemy.x_pos + enemy.sw) {
          if (this.top <= enemy.y_pos + enemy.sh && this.top >= enemy.y_pos) {
            this.alive = false;
          } else if (this.bottom >= enemy.y_pos && this.bottom <= enemy.y_pos + enemy.sh) {
            this.alive = false;
          }
        } else if (this.left >= enemy.x_pos && this.left <= enemy.x_pos + enemy.sw) {
          if (this.top <= enemy.y_pos + enemy.sh && this.top >= enemy.y_pos) {
            this.alive = false;
          } else if (this.bottom >= enemy.y_pos && this.bottom <= enemy.y_pos + enemy.sh) {
            this.alive = false;
          }
        }
      }
    }
    
       

    //gravity 
    if (this.bottom + this.velocity.y >= FLOOR) {
      this.velocity.y = 0;
      this.bottom = FLOOR;
      this.fast_fall = 0;
    } else {
      this.velocity.y += GRAVITY + this.fast_fall;
    }

    //measuring frame count for feet animation
    if (frame_count == 16) {
      frame_count = 0;
    } else {
      frame_count++;
    }

    //ducking resizing
    if (this.ducking && this.bottom >= FLOOR) {
      this.width = 117;
      this.height = 59;
      this.bottom = FLOOR;
    } 

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
      
    
    this.draw();
  }

  /**
   * Draw the player on the canvas
   */
  draw() {
    if (this.bottom >= FLOOR && frame_count > 8 && this.ducking) {
      CTX.drawImage(dino, 2206, 36, 117, 59, this.position.x, this.position.y, 117, 59)
    } else if (this.bottom >= FLOOR && frame_count > 8) {
      CTX.drawImage(dino, 1854, 0, 88, 97, this.position.x, this.position.y, 88, 97)
    } else if (this.bottom >= FLOOR && frame_count <= 8 && this.ducking) {
      CTX.drawImage(dino, 2324, 36, 117, 59, this.position.x, this.position.y, 117, 59)
    } else if (this.bottom >= FLOOR && frame_count <= 8) {
      CTX.drawImage(dino, 1942, 0, 88, 97, this.position.x, this.position.y, 88, 97)
    } else {
      CTX.drawImage(dino, 1677, 0, 88, 97, this.position.x, this.position.y, 88, 97)
    }
  }

  jump() {
    if (this.bottom >= FLOOR) {
      this.bottom = FLOOR;
      this.velocity.y = -21;
    }
  }

  start() {
    CTX.drawImage(dino, 76, 0, 88, 97, this.position.x, this.position.y, 88, 97)
  }
}
