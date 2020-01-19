/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2020-01-10 20:07:06 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2020-01-17 13:56:43
 */


import * as THREE from 'three';
import { World } from '../World';

export class FixMaterial {

    static do() {

        const str = `
ZSYXC_A
DG_A
fu_A
wutai_A
lipindui_A
qiqiu_A
yanhuoyanhua_A
yanhuoyanhua_B
yanhuoyanhua_C
huadeng_A
jinbi_A
SNDJ_A
baozhu_A
lipinhe_A
bianpao_A
logo_D
simple_metal_0_15A
shufu_A
people01A
people02A
people03A
people04A
people05A
people06A
people07A
people08A
people09A
people010A
people011A
people012A
people013A
people014A
people015A
people016A
people017A
people018A
people019A
people020A
people021A
people022A
people023A01
people024A01
people025A01
people026A01`;

        //把非people开头的字符串都加_01
        const arr = str.split('\n');
        const nameArr: Array<string> = [];
        arr.forEach((v: string) => {
            if (v != "" && !v.startsWith("people")) {
                nameArr.push(`${v}_01`);
            } else {
                if (v.startsWith("people")) {
                    nameArr.push(v);
                }
            }
        });

        nameArr.forEach(name => {
            const mesh = World.x().scene.getObjectByName(name);
            FixMaterial.setTransparency(mesh);
        });
    }

    static setTransparency(obj: THREE.Object3D) {
        if (!obj) return;

        if (obj.type == "Mesh") {
            const mesh: THREE.Mesh = <THREE.Mesh>obj;
            const mat: any = mesh.material;
            mat.alphaTest = 0.5;
            mat.metalness = 0.02;
        }

        obj.children.forEach(child => {
            FixMaterial.setTransparency(child);
        });
    }
}