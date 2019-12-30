/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-26 13:01:40 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2019-12-28 09:48:41
 */


import * as THREE from 'three';
import { Debuger } from './Debuger';
import { Object3D } from 'three';
import { World } from './World';

export class LightManager {

    static spotLightHelper: THREE.SpotLightHelper;

    static addLights() {

        {
            const aLight = new THREE.AmbientLight("#FFFFFF");

            aLight.intensity = 1.5;
            
            World.x().scene.add(aLight);

            Debuger.x().debugAmbientLight(aLight);
        }

        {
            const dLigth = new THREE.DirectionalLight();
            dLigth.position.set(0, 6, 0);
            World.x().scene.add(dLigth);

            const target: THREE.Object3D = new Object3D();
            target.position.set(0, 0, 0);
            dLigth.target = target;

            World.x().scene.add(target);

            Debuger.x().debugDirectionalLight(dLigth, "DirectionalLight");
        }


        //电视灯光
        {
            var sLight = new THREE.SpotLight();
            sLight.color = new THREE.Color().setRGB(70 / 255, 70 / 255, 70 / 255);
            sLight.position.set(0.6, 5, -4);
            sLight.target = World.x().scene.getObjectByName("TV");
            sLight.distance = 0;
            sLight.intensity = 0.8;
            sLight.angle = 0.49;

            World.x().scene.add(sLight);

            Debuger.x().debugSpotLight(sLight, "TV SpotLight");
        }

        //南山婆灯光
        {
            /*
            var light = new THREE.PointLight(0xff0000, 1, 100);
            light.position.set(50, 50, 50);

            const log = World.x().scene.getObjectByName("NSP_Log");
            log.getWorldPosition(light.position);


            World.x().scene.add(light);

            Debuger.x().debugPointLight(light,"Log Light");
            */
        }
    }

}