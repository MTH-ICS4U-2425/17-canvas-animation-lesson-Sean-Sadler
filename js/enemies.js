/**
 * cactus.js
 * Cactus enemy class and generation
 */

'use strict'

import { CANVAS, CTX, MS_PER_FRAME, KEYS, enemy_arr } from "./globals.js";
import { randInt } from "./main.js";

const CACTUS = new Image();
CACTUS.src = "../images/dino_large.png";


export default class Cactus {

    //7 cactus formations
    constructor(formation, x) {
        this.x_pos = x;
        this.formation = formation;
        
    }

    update() {
    
        if (this.x_pos < -500) {
            this.x_pos = randInt(2500, 3000);
        }

        this.x_pos -= 10;
        this.draw();

    
    }

    draw() {
        CTX.drawImage(CACTUS, 751, 0, 51, 101, this.x_pos, 230, 51, 101)
    }
}

enemy_arr.push(new Cactus(randInt(1, 6), 1000))
enemy_arr.push(new Cactus(randInt(1, 6), 2000))
enemy_arr.push(new Cactus(randInt(1, 6), 3000))

