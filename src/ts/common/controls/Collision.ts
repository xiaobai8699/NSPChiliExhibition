/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2020-01-03 13:52:44 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2020-01-08 21:47:39
 */

//参考: https://docs.microsoft.com/zh-cn/windows/uwp/get-started/get-started-tutorial-game-js3d

import * as THREE from 'three';
import { World } from '../World';
import { Utils } from '../Utils';

let collisionInstance: Collision;

export class Collision {

    rayCaster: THREE.Raycaster;

    // 模特小姐
    models: Set<string>;

    constructor() {

        this.rayCaster = new THREE.Raycaster();

        this.models = new Set(["people024A","people025A", "people026A"]);
    }

    static x(): Collision {

        collisionInstance = collisionInstance || new Collision();
        return collisionInstance;

    }

     detect= (moveForward = false, moveBackward = false, moveLeft = false, moveRight = false): boolean => {

        //不移动就不检测
        if ((moveForward || moveBackward || moveLeft || moveRight) == false) {
            return;
        }

        let rotationMatrix: THREE.Matrix4;

        if (moveBackward) {

            rotationMatrix = new THREE.Matrix4();
            rotationMatrix.makeRotationY(THREE.Math.degToRad(180));
        }

        else if (moveLeft) {

            rotationMatrix = new THREE.Matrix4();
            rotationMatrix.makeRotationY(THREE.Math.degToRad(90));
        }

        else if (moveRight) {

            rotationMatrix = new THREE.Matrix4();
            rotationMatrix.makeRotationY(THREE.Math.degToRad(270));
        }

        let direction = new THREE.Vector3();
        World.x().camera.getWorldDirection(direction);

        if (rotationMatrix != undefined) {
            //将光线投射方向与移动方向保持一直
            direction.applyMatrix4(rotationMatrix);
        }
        direction = direction.normalize();

        let origin = new THREE.Vector3();
        World.x().camera.getWorldPosition(origin);
        origin.y = 0.4;

        this.rayCaster.set(origin, direction);

        let objects:any = null;
        if(Utils.isMobile()){
            //手机端之检测围墙
            objects = [World.x().scene.getObjectByName("paint_07A01")];

        }else {

            objects = World.x().scene.children;
        }

        const intersectedObjects = this.rayCaster.intersectObjects(objects, true);
        
        if (intersectedObjects.length > 0) {

            for (let i = 0; i < intersectedObjects.length; i++) {

                if (intersectedObjects[i].distance < 2) {
                    return true;
                }
            }

            return false;

        } 

        return false;
    }

}
