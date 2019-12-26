/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-26 13:01:40 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2019-12-26 15:55:19
 */

 
import * as THREE from 'three';
import { Debuger } from './Debuger';

 export class LightManager {

    static spotLightHelper: THREE.SpotLightHelper;

    static addLights(scene: THREE.Scene){

        {
            const light = new THREE.AmbientLight("#606008");
            scene.add(light);

            Debuger.x().debugAmbientLight(light);
        }

        {
            var spotLight = new THREE.SpotLight("#ffffff");
            spotLight.position.set(-3, 7, 8);
            spotLight.target = scene.getObjectByName("LJJ3");
            spotLight.distance = 0;
            spotLight.angle = 0.4;
            scene.add(spotLight);

            Debuger.x().debugSpotLight(spotLight,"SpotLight");
        }
    }

 }