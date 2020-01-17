/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2020-01-07 12:48:43 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2020-01-10 09:33:41
 */

import * as THREE from 'three';
import { World } from './World';
import { Resource } from './config/Resource';

 export class Skybox {

    static enable() {

        const loader = new THREE.CubeTextureLoader();

        const texture = loader.load(
            [
               Resource.skyboxUrl('px'), 
               Resource.skyboxUrl('nx'), 
               Resource.skyboxUrl('py'),
               Resource.skyboxUrl('ny'),
               Resource.skyboxUrl('pz'),
               Resource.skyboxUrl('nz') 
            ]
        );

        World.x().scene.background = texture;
    }

 }