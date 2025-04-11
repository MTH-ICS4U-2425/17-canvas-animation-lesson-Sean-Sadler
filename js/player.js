/**
 * player.js
 * 
 * The Player Class
 * 
 * Acts as a sprite or "hero" for the game
 * 
 * Author: 
 */

import { CTX, CANVAS, GRAVITY, FLOOR } from "./globals.js"
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
    if (this.bottom + this.velocity.y >= FLOOR) {
      this.velocity.y = 0;
      this.bottom = FLOOR;
    } else {
      this.velocity.y += GRAVITY;
    }

    if (frame_count == 16) {
      frame_count = 0;
    } else {
      frame_count++;
    }

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.draw();
  }

  /**
   * Draw the player on the canvas
   */
  draw() {
    if (this.bottom >= FLOOR && frame_count > 8) {
      CTX.drawImage(dino, 1854, 0, 88, 97, this.position.x, this.position.y, 88, 97)
    } else if (this.bottom >= FLOOR && frame_count <= 8) {
      CTX.drawImage(dino, 1942, 0, 88, 97, this.position.x, this.position.y, 88, 97)
    } else {
      CTX.drawImage(dino, 1677, 0, 88, 97, this.position.x, this.position.y, 88, 97)
    }
  }

  jump() {
    if (this.bottom >= FLOOR) {
      this.bottom = FLOOR;
      this.velocity.y = -20;
    }
  }
}
