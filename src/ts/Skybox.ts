/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2020-01-07 12:48:43 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2020-01-10 09:33:41
 */

import * as THREE from 'three';
import { World } from './World';
import { Const } from './Const';

 export class Skybox {

    static enable() {

        const loader = new THREE.CubeTextureLoader();

        const texture = loader.load(
            [
               Const.skyboxUrl('px'), 
               Const.skyboxUrl('nx'), 
               Const.skyboxUrl('py'),
               Const.skyboxUrl('ny'),
               Const.skyboxUrl('pz'),
               Const.skyboxUrl('nz') 
            ]
        );

        World.x().scene.background = texture;
    }

 }