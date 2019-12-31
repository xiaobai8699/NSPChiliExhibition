/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-31 09:26:17 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2019-12-31 11:46:11
 */

//https://threejsfundamentals.org/threejs/lessons/threejs-textures.html
//https://threejsfundamentals.org/threejs/lessons/threejs-canvas-textures.html

import * as THREE from 'three';
import { Utils } from './Utils';
import { World } from './World';
import { Const } from './Const';

let visitorInstance: Visitor = null;

export class Visitor {

    //https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set
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

        const names = new Set(["people01A"]);

        names.forEach(name => {

            const mesh: any = World.x().scene.getObjectByName(name);

            this.visitors.add(mesh);

            mesh.material.transparent = true;

            mesh.material.alphaTest = 0.5;

            mesh.material.side = THREE.DoubleSide;

            mesh.material.needsUpdate = true;

        });

    }


     newVisitor = (name: string) => {

        const loader: THREE.TextureLoader = new THREE.TextureLoader();

        loader.load(

            Const.visitorUrl(name),

            texture => {

                const mesh: any = <THREE.Mesh>World.x().scene.getObjectByName(name);

                if (mesh) {

                    // 如何绘制透明物体: https://threejsfundamentals.org/threejs/lessons/threejs-transparency.html
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

                }

                else {

                    console.error(`not found visitor:${name}`);

                }
            },

            undefined,

            err => {
                console.log(`Visitor: load texture failed! ${err}`)
            });
    }


    update = () => {

        this.visitors.forEach( v => {

                // 实时让观众与摄像机方向保持一直
                v.rotation.y = World.x().camera.rotation.y;

        });
    }

}