/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-25 08:44:37 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2020-01-10 21:09:57
 */


import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { Controls } from './common/controls/Controls';
import { Pickup } from './common/core/Pickup';
import { LED } from './business/LED';
import { Lights } from './common/Lights';
import { Video } from './common/core/Video';
import { Labels } from './common/core/Labels';
import { World } from './common/World';
import { Utils } from './common/Utils';
import { Audio } from './common/core/Audio';
import { Visitor } from './business/Visitor';
import { Skybox } from './common/core/Skybox';
import { Const } from './business/Const';
import { Debuger } from './common/Debuger';
import { Chili } from './business/Chili';
import {FixMaterial} from './business/fix/FixMaterial';

class App {

    clock: THREE.Clock;

    loader: GLTFLoader;

    constructor() {

        World.x();

        Controls.x();

        Pickup.x();

        Debuger.x();

        this.clock = new THREE.Clock();

    }

    run = (gltf: GLTF) => {

        World.x().scene.add(gltf.scene);

        FixMaterial.do();

        Lights.addLights();

        if (Utils.isPc()) {

            Audio.play();
        }

        Visitor.x().newAllVisitors();

        Skybox.enable();

        World.x().renderer.setAnimationLoop(this.animationLoop);

    }

    lowestFps: number = 1 / 12;
    hasTips: boolean = false;

    animationLoop = () => {

        Debuger.x().stats.begin();
        {
            World.x().render();

            let delta = this.clock.getDelta();

            LED.update();

            Chili.x().update(delta);

            Controls.x().update(delta);

            Debuger.x().update(delta);

            Visitor.x().update(delta);

            Video.x().update(delta);

            // if(Utils.isMobile() &&
            //    this.clock.running &&
            //    this.clock.elapsedTime >= 5 && 
            //    delta >= this.lowestFps && 
            //    !this.hasTips) {

            //     this.hasTips = true;
            //     alert('检测到你的手机卡顿,估计会影响使用此APP😭!');
            // }
        }
        Debuger.x().stats.end();

    }
}


(function main() {

    const loading: HTMLElement = document.querySelector("#loading");
    const progress: HTMLElement = document.querySelector("#progres-fill");
    const progressText: HTMLElement = document.querySelector("#progress-text");

    const loader = new GLTFLoader();

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('./ts/draco/');
    loader.setDRACOLoader(dracoLoader);

    loader.load(

        Const.modelUrl,

        glft => {

            try {
                const app = new App();
                app.run(glft);

                loading.style.display = "none";
            }
            catch (e) {
                console.error(e);
                alert(`应用异常, 请联系管理员!(${e})`);
            }
        },

        xhr => {

            let percent = (xhr.loaded / xhr.total) * 100;

            progress.style.left = `${percent}%`;

            const M = 1048576;
            let total = (xhr.total / M).toFixed(2);
            let loaded = (xhr.loaded / M).toFixed(2);

            progressText.innerText = `载入资源 ${percent.toFixed(2)}% (${total}M / ${loaded}M)`;

            if (percent >= 100) {

                progressText.innerText = "解压资源，请稍候☕️..";

            }
        },

        err => {

            alert(`加载资源失败,请刷新重试!(${err})`);
        }
    );

})();



