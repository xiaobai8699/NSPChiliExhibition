/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2020-01-10 09:24:19 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2020-01-10 21:13:26
 */

import * as THREE from 'three';
import { World } from '../common/World';

let chili: Chili;

export class Chili {

    rotatedBottles: THREE.Object3D[] = [];

    nameArr: Array<string> = ["LJJ1", "LJJ2", "LJJ3", "LJJ4", "64mmA016", "64mmB016", "64mmC016"];

    constructor() {

        this.getRotatedBottles();
        this.setMaterialTransparent();

    }

    static x(): Chili {

        chili = chili || new Chili();
        return chili;
    }

    //获取需要旋转的辣椒瓶
    getRotatedBottles = () => {


        this.nameArr.forEach((name) => {

            const object: any = World.x().scene.getObjectByName(name);
            if(object){
                 this.rotatedBottles.push(object);
            }

        });
    }

    // 设置需要旋转的辣椒瓶的透明度
    setMaterialTransparent = () => {

        this.rotatedBottles.forEach((bottle) => {

            bottle.children.forEach((o: any) => {

                if (o.material.name == "pingshenA") {

                    o.material.transparent = true;
                    o.material.opacity = 0.6;
                    o.material.side = THREE.DoubleSide;
                }
            });
        });
    }

    
    // 旋转辣椒瓶
    update = (delta: number) => {

        this.rotatedBottles.forEach( (obj: THREE.Object3D) => {

            obj.rotation.z += (delta*0.5)
       });

    }
}