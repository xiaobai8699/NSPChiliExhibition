/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-26 13:01:40 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2019-12-26 17:10:57
 */

 
import * as THREE from 'three';
import { Debuger } from './Debuger';
import { Object3D } from 'three';

 export class LightManager {

    static spotLightHelper: THREE.SpotLightHelper;

    static addLights(scene: THREE.Scene){

        {
            const aLight = new THREE.AmbientLight("#FFFFFF");
            aLight.intensity = 1.5;
            scene.add(aLight);

            Debuger.x().debugAmbientLight(aLight);
        }

        {
            const dLigth = new THREE.DirectionalLight();
            dLigth.position.set(0,6,0);
            scene.add(dLigth);
            
            const target: THREE.Object3D = new Object3D();
            target.position.set(0,0,0);
            dLigth.target = target;
            scene.add(target);

            Debuger.x().debugDirectionalLight(dLigth,"DirectionalLight");
        }

        {
            

        }
        
        {
            var sLight = new THREE.SpotLight("#ffffff");
            sLight.position.set(-3, 7, 8);
            sLight.target = scene.getObjectByName("LJJ3");
            sLight.distance = 0;
            sLight.angle = 0.4;
            scene.add(sLight);

            Debuger.x().debugSpotLight(sLight,"SpotLight");
        }
    }

 }