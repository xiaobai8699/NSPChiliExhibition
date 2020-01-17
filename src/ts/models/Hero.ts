/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2020-01-16 18:24:22 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2020-01-17 11:37:46
 */

import {GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { World } from '../World';
import { ThreeUtils } from '../utils/ThreeUtils';

let heroInstance: Hero = null;

export class Hero {

    static x(): Hero {
        heroInstance = heroInstance || new Hero();
        return heroInstance;
    }
    load = () => {

        const c = function (gltf: GLTF) {

            // console.log(`hero:${JSON.stringify(Utils.getSize(gltf.scene))}`);
            // console.log(Utils.dumpObject(gltf.scene).join('\n'));
            gltf.scene.scale.set(0.01, 0.01, 0.01);
            gltf.scene.position.set(0, 2, 0);
            World.x().scene.add(gltf.scene);
            ThreeUtils.cameraPositionToFit(World.x().camera, gltf.scene);

        }

        const p = function (progress: any) {

        }

        const e = function (error: any) {

        }

        const name = './asset/model/samllcity/scene.gltf';

        ThreeUtils.loadModel(name, { c, p, e }, false);
        
    }
}