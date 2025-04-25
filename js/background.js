'use strict';

import { CANVAS, CTX, MS_PER_FRAME, KEYS, enemy_arr } from "./globals.js";


const BACKDROP = new Image();
BACKDROP.src = "../images/dino_large.png";
CTX.drawImage(BACKDROP, 76, 0, 87, 97, 120, 150, 87, 97);





export default class Sun {

    constructor() {
        this.x_pos = 1100;
        this.sun_type = "sun";
    }
    

    update() {

        //day-night setting
        if (this.x_pos <= -80) {
            this.x_pos = 1100;
            if (this.sun_type == "sun") {
                this.sun_type = "moon";
            } else {
                this.sun_type = "sun";
            }
        } else {
            this.x_pos -= 1;
        }

        //day to night conversion animation
        if (this.x_pos <= -79) {
            if (this.sun_type == "sun") {
                CANVAS.style.filter = "invert(100%)";
            } else {
                CANVAS.style.filter = "invert(0%)";
            }
        } else if (this.x_pos <= -74) {
            if (this.sun_type == "sun") {
                CANVAS.style.filter = "invert(95%)";
            } else {
                CANVAS.style.filter = "invert(5%)";
            }
        } else if (this.x_pos <= -69) {
            if (this.sun_type == "sun") {
                CANVAS.style.filter = "invert(90%)";
            } else {
                CANVAS.style.filter = "invert(10%)";
            }
        } else if (this.x_pos <= -64) {
            if (this.sun_type == "sun") {
                CANVAS.style.filter = "invert(85%)";
            } else {
                CANVAS.style.filter = "invert(15%)";
            }
        } else if (this.x_pos <= -59) {
            if (this.sun_type == "sun") {
                CANVAS.style.filter = "invert(80%)";
            } else {
                CANVAS.style.filter = "invert(20%)";
            }
        } else if (this.x_pos <= -54) {
            if (this.sun_type == "sun") {
                CANVAS.style.filter = "invert(75%)";
            } else {
                CANVAS.style.filter = "invert(25%)";
            }
        } else if (this.x_pos <= -49) {
            if (this.sun_type == "sun") {
                CANVAS.style.filter = "invert(70%)";
            } else {
                CANVAS.style.filter = "invert(30%)";
            }
        } else if (this.x_pos <= -44) {
            if (this.sun_type == "sun") {
                CANVAS.style.filter = "invert(65%)";
            } else {
                CANVAS.style.filter = "invert(35%)";
            }
        } else if (this.x_pos <= -39) {
            if (this.sun_type == "sun") {
                CANVAS.style.filter = "invert(60%)";
            } else {
                CANVAS.style.filter = "invert(40%)";
            }
        } else if (this.x_pos <= -34) {
            if (this.sun_type == "sun") {
                CANVAS.style.filter = "invert(55%)";
            } else {
                CANVAS.style.filter = "invert(45%)";
            }
        } else if (this.x_pos <= -29) {
            if (this.sun_type == "sun") {
                CANVAS.style.filter = "invert(45%)";
            } else {
                CANVAS.style.filter = "invert(55%)";
            }
        } else if (this.x_pos <= -24) {
            if (this.sun_type == "sun") {
                CANVAS.style.filter = "invert(40%)";
            } else {
                CANVAS.style.filter = "invert(60%)";
            }
        } else if (this.x_pos <= -19) {
            if (this.sun_type == "sun") {
                CANVAS.style.filter = "invert(35%)";
            } else {
                CANVAS.style.filter = "invert(65%)";
            }
        } else if (this.x_pos <= -14) {
            if (this.sun_type == "sun") {
                CANVAS.style.filter = "invert(30%)";
            } else {
                CANVAS.style.filter = "invert(70%)";
            }
        } else if (this.x_pos <= -9) {
            if (this.sun_type == "sun") {
                CANVAS.style.filter = "invert(25%)";
            } else {
                CANVAS.style.filter = "invert(75%)";
            }
        } else if (this.x_pos <= -4) {
            if (this.sun_type == "sun") {
                CANVAS.style.filter = "invert(20%)";
            } else {
                CANVAS.style.filter = "invert(80%)";
            }
        } else if (this.x_pos <= 1) {
            if (this.sun_type == "sun") {
                CANVAS.style.filter = "invert(15%)";
            } else {
                CANVAS.style.filter = "invert(85%)";
            }
        }  else if (this.x_pos <= 6) {
            if (this.sun_type == "sun") {
                CANVAS.style.filter = "invert(10%)";
            } else {
                CANVAS.style.filter = "invert(90%)";
            }
        } else if (this.x_pos <= 11) {
            if (this.sun_type == "sun") {
                CANVAS.style.filter = "invert(5%)";
            } else {
                CANVAS.style.filter = "invert(95%)";
            }
        }else if (this.x_pos <= 16) {
            if (this.sun_type == "sun") {
                CANVAS.style.filter = "invert(0%)";
            } else {
                CANVAS.style.filter = "invert(100%)";
            }
        }

        this.draw();
    }

    draw() {
        if (this.sun_type == "sun") {
            CTX.drawImage(BACKDROP, 1074, 0, 79, 79, this.x_pos, 50, 79, 79)
        } else {
            CTX.drawImage(BACKDROP, 1194, 0, 39, 79, this.x_pos, 50, 39, 79)
        }
        
    }
}





