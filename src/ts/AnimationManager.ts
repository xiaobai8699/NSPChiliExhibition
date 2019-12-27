/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-26 11:38:36 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2019-12-26 13:00:18
 */

import * as THREE from 'three';

export class AnimationManager {

    static start(scene: THREE.Scene) {

        AnimationManager.animateAd(scene);
        AnimationManager.animateChili(scene);
    }

    static bigTV: THREE.Object3D = null;
    static smallTV: THREE.Object3D = null;
    static speed: number = 0.003;

    static animateAd(scene: THREE.Scene) {

        AnimationManager.bigTV = AnimationManager.bigTV || scene.getObjectByName("BIG_AD");
        AnimationManager.smallTV = AnimationManager.smallTV || scene.getObjectByName("SMALL_AD");
       
        AnimationManager.bigTV.rotation.y += AnimationManager.speed;
        AnimationManager.smallTV.rotation.y -= AnimationManager.speed;

    }

    static ljj1: THREE.Object3D = null;
    static ljj2: THREE.Object3D = null;
    static ljj3: THREE.Object3D = null;
    static ljj4: THREE.Object3D = null;
    static ljj5: THREE.Object3D = null;
    static ljjRotateSpeed: number = 0.02;

    static animateChili(scene: THREE.Scene) {

        AnimationManager.ljj1 = AnimationManager.ljj1 || scene.getObjectByName("LJJ1");
        AnimationManager.ljj2 = AnimationManager.ljj2 || scene.getObjectByName("LJJ2");
        AnimationManager.ljj3 = AnimationManager.ljj3 || scene.getObjectByName("LJJ3");
        AnimationManager.ljj4 = AnimationManager.ljj4 || scene.getObjectByName("LJJ4");
        AnimationManager.ljj5 = AnimationManager.ljj5 || scene.getObjectByName("64mmB016");

        AnimationManager.ljj1.rotation.z += AnimationManager.ljjRotateSpeed; 
        AnimationManager.ljj2.rotation.z += AnimationManager.ljjRotateSpeed;
        AnimationManager.ljj3.rotation.z += AnimationManager.ljjRotateSpeed;
        AnimationManager.ljj4.rotation.z += AnimationManager.ljjRotateSpeed;
        AnimationManager.ljj5.rotation.z += AnimationManager.ljjRotateSpeed;

    }
}