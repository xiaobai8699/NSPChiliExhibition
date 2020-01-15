/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2020-01-15 14:04:14 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2020-01-15 14:52:51
 */

import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { World } from './World';
import { Utils } from './Utils';
import { Vector3 } from 'three';
import { Chili } from './Chili';

export class FixModel {

    static do() {

        const loader = new GLTFLoader();

        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('./ts/draco/');
        loader.setDRACOLoader(dracoLoader);

        loader.load(

            "./asset/model/64mmB016.glb",

            glft => {
                function fix(name: string) {
                    
                    const old: THREE.Object3D = World.x().scene.getObjectByName(name);
                    const newer: THREE.Object3D = glft.scene.getObjectByName(name);
                    newer.scale.set(0.01, 0.01, 0.01);

                    old.getWorldPosition(newer.position);
                    old.parent.add(newer);
                    old.parent.remove(old);

                    Chili.x().rotatedBottles.push(newer);
                }

                ["64mmB016"].forEach(name => {
                    fix(name);
                });
 
                Chili.x().setMaterialTransparent();
            },

            xhr => {
            },

            err => {
                console.error(`[FixModel.ts] ${err}`);
            }
        );

    }

}