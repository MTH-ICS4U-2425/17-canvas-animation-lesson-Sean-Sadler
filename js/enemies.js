/**
 * cactus.js
 * Cactus enemy class and generation
 */

'use strict'

import { CANVAS, CTX, MS_PER_FRAME, KEYS, enemy_arr } from "./globals.js";
//import { randInt } from "./globals.js";

const CACTUS = new Image();
CACTUS.src = "../images/dino_large.png";


export default class Cactus {

    

    //7 cactus formation

    constructor(formation, x) {
        
        this.formation = formation;
        this.x_pos = x;
        this.is_active = true;

        if (this.formation == 1) {
            this.sx = 751
            this.sy = 0
            this.sw = 51
            this.sh = 101

        } 
        
    }

    update() {
    
        if (this.x_pos < -100) {
            this.is_active = false;
        }

        if (this.is_active) {
            this.x_pos -= 10;
            this.draw();
        }
        

    
    }

    draw() {
        CTX.drawImage(CACTUS, this.sx, this.sy, this.sw, this.sh, this.x_pos, 230, 51, 101)
    }
}

enemy_arr.push(new Cactus(1, 1150))
enemy_arr.push(new Cactus(1, -100))
enemy_arr.push(new Cactus(1, -100))

