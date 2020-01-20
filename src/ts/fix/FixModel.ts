/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2020-01-15 14:04:14 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2020-01-15 16:33:12
 */

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { World } from '../World';
import { Chili } from '../Chili';
import {Resource} from '../config/Resource';

export class FixModel {

    static do() {

        const loader = new GLTFLoader();

        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('./ts/draco/');
        loader.setDRACOLoader(dracoLoader);

        loader.load(

            Resource.modelUrl("chili_bottles.glb"),

            glft => {
                function fix(name: string) {

                    const old: THREE.Object3D = World.x().scene.getObjectByName(name);
                    if(!old) {
                        console.error(`[FixModel.ts] old: ${name} not found`);
                        return;
                    }

                    const newer: THREE.Object3D = glft.scene.getObjectByName(name);
                    if(!newer){
                        console.error(`[FixModel.ts] newer: ${name} not found`);
                        return;
                    }

                    old.getWorldPosition(newer.position);
                    old.parent.add(newer);
                    old.parent.remove(old);

                    Chili.x().rotatedBottles.push(newer);

                    FixModel.fixBlackBug();
                }

                const nameArr = ["64mmB016", "64mmA016", "64mmC016", "LJJ1", "LJJ2", "LJJ3", "LJJ4", "32mmC032", "32mmA032", "32mmB032"];
                nameArr.forEach(name => {
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

    //修复0.2版中新包装瓶顶部出现黑色块的bug
    static fixBlackBug(){
       ["LJJ3_1_instance_1","LJJ3_1_instance_0","LJJ2_1_instance_0"].forEach(function(name){
        const mesh:THREE.Mesh = <THREE.Mesh>World.x().scene.getObjectByName(name);
        if(mesh){
            (mesh.material as any).metalness = 0.1;
        }
       }); 
     
    }
}