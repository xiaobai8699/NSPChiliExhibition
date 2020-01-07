/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2020-01-07 12:48:43 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2020-01-07 13:22:46
 */

import * as THREE from 'three';
import { World } from './World';

 export class Skybox {

    static enable() {

        const loader = new THREE.CubeTextureLoader();

        const texture = loader.load(
            [
               './asset/image/skybox/px.png', 
               './asset/image/skybox/nx.png', 

               './asset/image/skybox/py.png', 
               './asset/image/skybox/ny.png', 

               './asset/image/skybox/pz.png', 
               './asset/image/skybox/nz.png', 

            ]
        );

        World.x().scene.background = texture;
    }

 }