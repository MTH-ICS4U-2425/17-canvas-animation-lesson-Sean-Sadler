/**
 * cactus.js
 * Cactus enemy class and generation
 */

'use strict'

import { CANVAS, CTX, MS_PER_FRAME, KEYS, enemy_arr } from "./globals.js";
import randInt from "./main.js";

const ENEMY = new Image();
ENEMY.src = "../images/dino_large.png";

let animation_frame = 0;

export default class Enemy {

    

    //7 cactus formation

    constructor(formation, x) {
        
        this.formation = formation;
        this.x_pos = x;
        this.is_active = true;

        this.new_formation();
        
        
    }

    new_formation() {
        if (this.formation == 1) {
            this.sx = 751
            this.sy = 0
            this.sw = 51
            this.sh = 101
            this.y_pos = 230
        } else if (this.formation == 2) {
            this.sx = 480
            this.sy = 0
            this.sw = 68
            this.sh = 101
            this.y_pos = 250;
        } else if (this.formation == 3) {
            this.sx = 548
            this.sy = 0
            this.sw = 101
            this.sh = 101
            this.y_pos = 250;
        } else if (this.formation == 4) {
            this.sx = 702
            this.sy = 0
            this.sw = 99
            this.sh = 101
            this.y_pos = 230;
        } else if (this.formation == 5) {
            this.sx = 480
            this.sy = 0
            this.sw = 33
            this.sh = 101
            this.y_pos = 250;
        } else if (this.formation == 6) {
            this.sx = 802
            this.sy = 0
            this.sw = 149
            this.sh = 101
            this.y_pos = 230;
        } else if (this.formation == 7) {
            this.y_pos = 220;
            this.sw = 91;
            this.sh = 69;
        } else if (this.formation == 8) {
            this.y_pos = 185;
            this.sw = 91;
            this.sh = 69;
        } else if (this.formation == 9) {
            this.y_pos = 130;
            this.sw = 91;
            this.sh = 69;
        }
    }

    update() {
    
        if (this.x_pos < -100) {
            this.is_active = false;
        }

        if (this.is_active && (this.formation == 7 || this.formation == 8 || this.formation == 9)) {
            this.x_pos -= 9;
            this.draw();
        } else if (this.is_active) {
            this.x_pos -= 10;
            this.draw();
        }
        

    
    }

    draw() {

        if (animation_frame == 40) {
            animation_frame = 0;
        } else {
            animation_frame++;
        }

        if (this.formation == 7 || this.formation == 8 || this.formation == 9) {
            if (animation_frame > 20) {
                CTX.drawImage(ENEMY, 352, 2, this.sw, this.sh, this.x_pos, this.y_pos, this.sw, this.sh);

            } else {
                CTX.drawImage(ENEMY, 260, 14, this.sw, this.sh, this.x_pos, this.y_pos, this.sw, this.sh);
            }

        } else {
            CTX.drawImage(ENEMY, this.sx, this.sy, this.sw, this.sh, this.x_pos, this.y_pos, this.sw, this.sh);
        }

    }
}

enemy_arr[0] = new Enemy(1, 1150);
enemy_arr[1] = new Enemy(1, -100);
enemy_arr[2] = new Enemy(1, -100);

