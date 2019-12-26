/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-26 13:01:40 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2019-12-26 13:03:40
 */

import * as THREE from 'three';

 export class LightManager {

    static addLights(scene: THREE.Scene){
        {
            const skyColor = 0xffffff;
            const groundColor = 0xffffff;
            const intensity = 1;
            const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
            scene.add(light);
            var helper = new THREE.HemisphereLightHelper(light, 5);
            scene.add(helper);
        }
    
        {
            const color = 0xffffff;
            const intensity = 2;
            const light = new THREE.DirectionalLight(color, intensity);
            light.position.set(0, 2, 0);
             scene.add(light);
    
            let helper = new THREE.DirectionalLightHelper(light);
            scene.add(helper);
    
        }
    }
 }