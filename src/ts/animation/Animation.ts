/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-26 11:38:36 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2019-12-26 12:04:04
 */

import * as THREE from 'three';

export class Animation {

    static start(scene: THREE.Scene) {

        Animation.animateAd(scene);
        Animation.animateChili(scene);
    }

    static bigTV: THREE.Object3D = null;
    static smallTV: THREE.Object3D = null;
    static speed: number = 0.003;

    static animateAd(scene: THREE.Scene) {

        Animation.bigTV = Animation.bigTV || scene.getObjectByName("BIG_AD");
        Animation.smallTV = Animation.smallTV || scene.getObjectByName("SMALL_AD");
       
        Animation.bigTV.rotation.y += Animation.speed;
        Animation.smallTV.rotation.y -= Animation.speed;

    }

    static ljj1: THREE.Object3D = null;
    static ljj2: THREE.Object3D = null;
    static ljj3: THREE.Object3D = null;
    static ljj4: THREE.Object3D = null;
    static ljj5: THREE.Object3D = null;
    static ljjRotateSpeed: number = 0.02;

    static animateChili(scene: THREE.Scene) {

        Animation.ljj1 = Animation.ljj1 || scene.getObjectByName("LJJ1");
        Animation.ljj2 = Animation.ljj2 || scene.getObjectByName("LJJ2");
        Animation.ljj3 = Animation.ljj3 || scene.getObjectByName("LJJ3");
        Animation.ljj4 = Animation.ljj4 || scene.getObjectByName("LJJ4");
        Animation.ljj5 = Animation.ljj5 || scene.getObjectByName("64mmB016");

        Animation.ljj1.rotation.z += Animation.ljjRotateSpeed; 
        Animation.ljj2.rotation.z += Animation.ljjRotateSpeed;
        Animation.ljj3.rotation.z += Animation.ljjRotateSpeed;
        Animation.ljj4.rotation.z += Animation.ljjRotateSpeed;
        Animation.ljj5.rotation.z += Animation.ljjRotateSpeed;

    }
}