'use strict'
import { SUN, randInt } from "./main.js"
import { CANVAS, CTX } from "./globals.js"

export let cloud_arr = [];
export let star_arr = [];

const BACKDROP = new Image();
BACKDROP.src = "../images/dino_large.png";

export class Cloud {
    constructor(x) {
        this.x_pos = x;
        this.y_pos = randInt(50, 120)
    }

    update() {
        this.x_pos -= 2;
        if (this.x_pos <= -100) {
            this.x_pos = randInt(1100, 2000);
            this.y_pos = randInt(50, 120);
        }
        this.draw()
    }

    draw() {
        CTX.drawImage(BACKDROP, 166, 0, 91, 28, this.x_pos, this.y_pos, 91, 28);
    }
}

export class Star {
    constructor(x) {
        this.x_pos = x;
        this.y_pos = randInt(50, 120)
    }

    update() {
        this.x_pos -= 0.5;
        if (this.x_pos <= -50) {
            this.x_pos = randInt(1100, 2000);
            this.y_pos = randInt(50, 120);
        }
        this.draw();
    }

    draw() {
        if (SUN.sun_type == "moon") {
            CTX.drawImage(BACKDROP, 1274, 2, 17, 17, this.x_pos, this.y_pos, 17, 17);
        }
    }
}


star_arr.push(new Star(1100));
star_arr.push(new Star(1300));
star_arr.push(new Star(1700));
star_arr.push(new Star(2000));
cloud_arr.push(new Cloud(1150));
cloud_arr.push(new Cloud(1500));
cloud_arr.push(new Cloud(1600));
cloud_arr.push(new Cloud(2200));


export default { Cloud, Star, cloud_arr, star_arr }