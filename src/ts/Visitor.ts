/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-31 09:26:17 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2019-12-31 17:48:11
 */

//https://threejsfundamentals.org/threejs/lessons/threejs-textures.html
//https://threejsfundamentals.org/threejs/lessons/threejs-canvas-textures.html

import * as THREE from 'three';
import { Utils } from './Utils';
import { World } from './World';
import { Const } from './Const';

let visitorInstance: Visitor = null;

export class Visitor {

    visitors: Set<THREE.Mesh>;

    constructor() {

        this.visitors = new Set();
    }

    static x(): Visitor {

        visitorInstance = visitorInstance || new Visitor();
        return visitorInstance;

    }

    newAllVisitor = () => {

        this.visitors.clear();

        const names = new Set();

        for (let i = 1; i <= 21; i++){

            names.add(`people0${i}A`)

        }

        names.forEach((name: string) => {

            this.newVisitor(name);
            
        });

    }


     newVisitor = (name: string) => {

        const loader: THREE.TextureLoader = new THREE.TextureLoader();

        loader.load(

            Const.visitorUrl(name),

            texture => {

                const mesh: any = World.x().scene.getObjectByName(name);

                if (mesh) {

                    const material = new THREE.MeshStandardMaterial({

                        map: texture,

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

                    this.visitors.add(visitor);
                }

                else {

                    console.error(`not found visitor:${name}`);

                }
            },

            undefined,

            err => {
                console.log(`[Visitor]: load texture failed! ${err}`)
            });
    }


    update = () => {

        this.visitors.forEach( v => {

                // 实时让观众与摄像机方向保持一直, 否则从观众侧面看，观众会是一条线
                v.rotation.y = World.x().camera.rotation.y;

        });
    }

}