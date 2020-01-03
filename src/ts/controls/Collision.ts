/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2020-01-03 13:52:44 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2020-01-03 14:08:55
 */

//参考: https://docs.microsoft.com/zh-cn/windows/uwp/get-started/get-started-tutorial-game-js3d

import * as THREE from 'three';
import { Utils } from '../Utils';
import { World } from '../World';
import { Raycaster, Vector3 } from 'three';


export class Collision {


    static detect(): boolean {

        let origin = new THREE.Vector3();
        World.x().camera.getWorldPosition(origin);

        let direction = new THREE.Vector3();
        World.x().camera.getWorldDirection(direction);
        direction = direction.normalize();

        const rayCaster = new Raycaster(origin,direction);

        const intersectedObjects = rayCaster.intersectObjects(World.x().scene.children, true);

        if( intersectedObjects.length > 0 ) {

            for (let i = 0; i < intersectedObjects.length; i++ ){

                if(intersectedObjects[i].distance < 2) {
                    console.log(`[Collision]: ${intersectedObjects[i].object.name}`);
                    return true;
                }

            }

            return false;

        }else {

            console.log("[Collision]: not dectect objects");
            return false;
        }
    }

}
