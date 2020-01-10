/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2020-01-10 10:08:16 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2020-01-10 10:13:21
 */


import * as THREE from 'three';
import { World } from '../../common/World';
import { Const } from '../Const';
import { Utils } from '../../common/Utils';

export class Logo {

    static do = () => {

        const oldLog: any = World.x().scene.getObjectByName(Const.nspLogName);

        const size: THREE.Vector3 = Utils.getSize(oldLog);

        const geometry = new THREE.PlaneBufferGeometry(size.x, size.y);

        const texture = new THREE.TextureLoader().load(Const.logoUrl);

        const material = new THREE.MeshPhongMaterial({

            map: texture,

            transparent: true,

            alphaTest: .5,

            side: THREE.DoubleSide,
        });

        const newLog = new THREE.Mesh(geometry, material);

        newLog.name = Const.nspLogName;

        oldLog.getWorldPosition(newLog.position);

        newLog.rotation.x += THREE.Math.degToRad(14.6);

        oldLog.parent.remove(oldLog);

        World.x().scene.add(newLog);

    }
}
