/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-26 11:38:36 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2019-12-28 09:51:01
 */

import * as THREE from 'three';
import {World} from './World';
import { Utils } from './Utils';

export class Animation {

    static update() {

        Animation.animateAd();
        Animation.animateChili(World.x().scene);
    }

    static bigTV: THREE.Object3D = null;
    static smallTV: THREE.Object3D = null;
    static speed: number = 0.002;

    static animateAd() {

        Animation.bigTV = Animation.bigTV || World.x().scene.getObjectByName("BIG_AD");
        Animation.smallTV = Animation.smallTV || World.x().scene.getObjectByName("SMALL_AD");
       
        Animation.bigTV.rotation.y -= Animation.speed;
        Animation.smallTV.rotation.y += Animation.speed;

    }

    static bottles: THREE.Object3D[] = null;

    static animateChili(scene: THREE.Scene) {

       this.bottles = this.bottles || Utils.findAnimationChiliBottles();
 
       this.bottles.forEach( (obj: THREE.Object3D) => {
            obj.rotation.z += 0.01;
       });

    }
}