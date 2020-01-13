/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2020-01-03 13:52:44 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2020-01-11 10:15:14
 */

//参考: https://docs.microsoft.com/zh-cn/windows/uwp/get-started/get-started-tutorial-game-js3d

import * as THREE from 'three';
import { World } from '../World';
import { Utils } from '../Utils';

let collisionInstance: Collision;

export class Collision {

    rayCaster: THREE.Raycaster;

    //特检测对象集合
    objects: Array<any> = [];

    constructor() {

        this.rayCaster = new THREE.Raycaster();

        if (Utils.isMobile()) {
            //手机端只检测围墙和门
            ["paint_07A01",
                "metal_gold_04A01",
                "metal_gold_04A02",
                "metal_gold_04A03",
                "metal_gold_04A04",
                "metal_gold_04A05",
                "metal_gold_04A06",
                "metal_gold_04A07",
                "b01Agrass02",
                "b01Agrass03",
                "b01Agrass04",
                "b01Agrass05"
            ].forEach(name => {

                const obj = World.x().scene.getObjectByName(name);
                if (obj) {
                    this.objects.push(obj);
                }
            });

        } else {
            this.objects = World.x().scene.children;
        }
    }

    static x(): Collision {

        collisionInstance = collisionInstance || new Collision();
        return collisionInstance;

    }

    detect = (moveForward = false, moveBackward = false, moveLeft = false, moveRight = false): boolean => {

        //不移动就不检测
        if ((moveForward || moveLeft || moveRight || moveBackward) == false) {
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

        const intersectedObjects = this.rayCaster.intersectObjects(this.objects, true);

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