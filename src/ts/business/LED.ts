/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-26 11:38:36 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2020-01-10 10:04:44
 */

import * as THREE from 'three';
import {World} from '../common/World';

export class LED {

    static speed: number = 0.002;
    static bigLED: THREE.Object3D = null;
    static smallLED: THREE.Object3D = null;

    static update() {

        LED.bigLED   = LED.bigLED     || World.x().scene.getObjectByName("BIG_AD");
        LED.smallLED = LED.smallLED   || World.x().scene.getObjectByName("SMALL_AD");
       
        LED.bigLED.rotation.y   -= LED.speed;
        LED.smallLED.rotation.y += LED.speed;
    }
}