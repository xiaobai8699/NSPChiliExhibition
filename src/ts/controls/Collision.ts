/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2020-01-03 13:52:44 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2020-01-03 15:54:13
 */

//参考: https://docs.microsoft.com/zh-cn/windows/uwp/get-started/get-started-tutorial-game-js3d

import * as THREE from 'three';
import { World } from '../World';

let collisionInstance: Collision;

export class Collision {

    rayCaster: THREE.Raycaster;

    constructor() {

        this.rayCaster = new THREE.Raycaster();

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
        origin.y = 0.3;

        this.rayCaster.set(origin, direction);
        const intersectedObjects = this.rayCaster.intersectObjects(World.x().scene.children, true);
        
        if (intersectedObjects.length > 0) {

            for (let i = 0; i < intersectedObjects.length; i++) {

                if (intersectedObjects[i].distance < 2) {

                    return true;
                }

            }

            return false;

        } else {

            return false;
        }
    }

}
