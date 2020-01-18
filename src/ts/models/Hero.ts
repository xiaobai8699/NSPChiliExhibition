/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2020-01-16 18:24:22 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2020-01-17 17:53:27
 */

 import * as THREE from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { World } from '../World';
import { ThreeUtils } from '../utils/ThreeUtils';
import {Utils} from '../utils/Utils';
import {Debuger} from '../config/Debuger';

let heroInstance: Hero = null;

export class Hero {

    static x(): Hero {
        heroInstance = heroInstance || new Hero();
        return heroInstance;
    }

    hero:THREE.Object3D;

    constructor(){
        this.hero = new THREE.Object3D();
        this.hero.position.set(0,0,15);
        World.x().scene.add(this.hero);

        Debuger.x().debugTransform(this.hero);
    }

    load = () => {

        if(Utils.isPc()){
            return;
        }

        const self = this;

        const c = function (gltf: GLTF) {

            const root = gltf.scene;
            root.scale.multiplyScalar(0.008);
            root.position.set(0, 0.2,0);
            root.rotateY(THREE.Math.degToRad(180));

            self.hero.add(root);

        }

        const p = function (progress: ProgressEvent) {
            console.log(`[Hero] progess:${progress.loaded}`);
        }

        const e = function (error: any) {
            console.log(`[Hero] error:${error}`);

        }

        const name = './asset/model/sheep/scene.gltf';
        ThreeUtils.loadModel(name, { c, p, e });

    }
}