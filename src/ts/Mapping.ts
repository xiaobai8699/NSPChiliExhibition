/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2020-01-08 20:54:19 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2020-01-08 21:20:24
 */

import * as THREE from 'three';
import { Utils } from './Utils';
import { World } from './World';
import { Const } from './Const';
import { LightProbe } from 'three';

 export class Mapping {

    static do = () => {

 
        for(let i = 1; i <= 10; i++){

            let name = i < 10 ? `LPH_A_0${i}` : `LPH_A_${i}`;
             Mapping.newStaticVisitor("LPH_A",name);
        }

        ["SNDJ_A_01","SNDJ_A_02"].forEach((modelName)=>{
            
            Mapping.newStaticVisitor("SNDJ_A", modelName);

        });

        for(let i = 1; i <= 16; i++){

            let name = i < 10 ? `DG_A_0${i}` : `DG_A_${i}`;
             Mapping.newStaticVisitor("DG_A",name);
        }

        for(let i = 1; i <= 14; i++){

            let name = i < 10 ? `fu_A_0${i}` : `fu_A_${i}`;
             Mapping.newStaticVisitor("fu_A",name);
        }

        for(let i = 1; i <= 12; i++){

            let name = i < 10 ? `shufu_A_0${i}` : `shufu_A_${i}`;
             Mapping.newStaticVisitor("shufu_A",name);
        }

        for(let i = 1; i <= 7; i++){

            let name = `ZSYXC_A_0${i}`;
             Mapping.newStaticVisitor("ZSYXC_A",name);
        }
    }

    static newStaticVisitor = (mapName:string, modelName: string) => {

        const loader: THREE.TextureLoader = new THREE.TextureLoader();

        loader.load(

            Const.mapUrl(mapName),

            texture => {

                Mapping.newTransparentVisitor(modelName, texture);

            },

            undefined,

            err => {
                console.log(`[Visitor]: load texture failed! ${err}`)
            });
    }
    
   static newTransparentVisitor = (name: string, texture: THREE.Texture) => {

        const mesh: any = World.x().scene.getObjectByName(name);

        if (mesh) {

            const material = new THREE.MeshStandardMaterial({

                 map:  texture,

                transparent: true,

                alphaTest: .5,

                side: THREE.DoubleSide,
            });

            const size = Utils.getSize(mesh);

            const geometry = new THREE.PlaneBufferGeometry(size.x, size.y);

            const visitor: THREE.Mesh = new THREE.Mesh(geometry, material);

            mesh.getWorldPosition(visitor.position);

            visitor.name = mesh.name;

            mesh.parent.remove(mesh);

            World.x().scene.add(visitor);

        }

        else {

            console.error(`not found visitor:${name}`);

        }
    }
    
 }