/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-26 13:01:40 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2019-12-26 19:11:04
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

        // {
            
        //     const dLigth = new THREE.DirectionalLight();
        //     dLigth.position.set(0,0,-17.3);
        //     scene.add(dLigth);
            
        //     const target: THREE.Object3D = new Object3D();
        //     target.position.set(0.0,2.35,-18.7);
        //     dLigth.target = target;
        //     scene.add(target);

        //     Debuger.x().debugDirectionalLight(dLigth,"TVDirectionalLight");
        // }

        {
            var sLight = new THREE.SpotLight();
            sLight.color = new THREE.Color().setRGB(70/255,70/255,70/255);
            sLight.position.set(0.6, 5, -4);
            sLight.target = scene.getObjectByName("BigTV");
            sLight.distance = 0;
            sLight.intensity = 0.8;
            sLight.angle = 0.49;
            scene.add(sLight);

            Debuger.x().debugSpotLight(sLight,"TV_SpotLight");
        }
    }

 }