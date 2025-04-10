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
    if (this.bottom < FLOOR) {
      this.velocity.y += GRAVITY;
    }

    if (this.bottom > FLOOR) {
      this.velocity.y = 0;
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
    CTX.fillStyle = "yellow";
    CTX.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  jump() {
    if (this.bottom >= FLOOR) {
      this.bottom = FLOOR;
      this.velocity.y = -20;
    }
  }
}
