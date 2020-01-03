/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-25 08:44:37 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2020-01-02 17:48:34
 */


import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { Controls } from './controls/Controls';
import { Pickup } from './Pickup';
import { Animation } from './Animation';
import { Lights } from './Lights';
import { Video } from './Video';
import {Labels} from './Labels';
import {World} from './World';
import { Utils } from './Utils';
import {Audio} from './Audio';
import {Visitor} from  './Visitor';
import { Debuger } from './Debuger';

class App {

    clock: THREE.Clock;

    loader: GLTFLoader;

    constructor() {

        World.x();

        Controls.x();

        Pickup.x();

        Video.x();

        Labels.x();

        Debuger.x();

        this.clock = new THREE.Clock();

    }

    run = (gltf: GLTF) => {

        World.x().scene.add(gltf.scene);
        
        Lights.addLights();

        //Labels.setVisible(true);

        Audio.playNoise();
        
        Visitor.x().newAllVisitors();
        
        Utils.replaceNspLog();

        World.x().renderer.setAnimationLoop(this.animationLoop);

    }

    animationLoop = () => {

        Debuger.x().stats.begin();
        {
            World.x().render();

            let delta = this.clock.getDelta();

            Animation.update();

            Controls.x().update(delta);

            Debuger.x().update(delta);
            
            //Labels.x().update(delta);

            Visitor.x().update(delta);

        }
        Debuger.x().stats.end();

    }
}


(function main() {

    const ui: HTMLElement = document.querySelector("#ui");
    const progress: HTMLElement = document.querySelector("#progres-fill");
    const progressText: HTMLElement = document.querySelector("#progress-text");
    const steeringWheel: HTMLElement = document.querySelector("#steering-wheel");

    const loader = new GLTFLoader();

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('./ts/draco/');
    loader.setDRACOLoader(dracoLoader);

    loader.load(
        './asset/model/nsp.glb',

        glft => {
            try {
                const app = new App();
                app.run(glft);

                ui.style.display = "none";
                if (Utils.isMobile()) {
                    steeringWheel.style.visibility = "visible";
                }
            }
            catch (e) {
                console.warn(e);
                alert(`应用异常(${e})`);
            }
        },

        xhr => {
            let p = (xhr.loaded / xhr.total) * 100;
            progress.style.width = `${p}%`;
            progressText.innerText = `${p.toFixed(2)}%`;
            if (p >= 100) {
                progressText.innerText = "正在进入展馆，请稍候..";
            }
        },

        err => {
            alert(`加载资源失败(${err})`);
        }
    );

})();



