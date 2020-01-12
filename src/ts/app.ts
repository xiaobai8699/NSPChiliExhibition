/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-25 08:44:37 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2020-01-11 18:30:48
 */


import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { Controls } from './common/controls/Controls';
import { Pickup } from './common/core/Pickup';
import { LED } from './business/LED';
import { Lights } from './common/Lights';
import { Video } from './common/core/Video';
import { World } from './common/World';
import { Utils } from './common/Utils';
import { Audio } from './common/core/Audio';
import { Visitor } from './business/Visitor';
import { Const } from './business/Const';
import { Debuger } from './common/Debuger';
import { Chili } from './business/Chili';
import { FixMaterial } from './business/fix/FixMaterial';
import { VisitorSpriteLoader } from './business/Visitor';

class App {

    clock: THREE.Clock;

    loader: GLTFLoader;

    constructor() {

        THREE.Cache.enabled = true;

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

        Visitor.x().newAllVisitors();

        Audio.play();

        Video.x();

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

        }
        Debuger.x().stats.end();

    }
}


(function main() {

    const loading: HTMLElement = document.querySelector("#loading");
    // const progress: HTMLElement = document.querySelector("#progres-fill");
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

            // progress.style.left = `${percent}%`;

            const M = 1048576;
            let total = (xhr.total / M).toFixed(2);
            let loaded = (xhr.loaded / M).toFixed(2);

            progressText.innerText = `载入资源 ${percent.toFixed(2)}% (${total}M / ${loaded}M)`;

            if (percent >= 100) {

                progressText.innerText = "解压资源，请稍候☕️..";

                VisitorSpriteLoader.load((e: any) => {
                    if(e){
                        console.error(`创建模特精灵失败 ${e}`);
                    }
                    loading.style.display = "none";

                });
            }
        },

        err => {

            alert(`加载资源失败,请刷新重试!(${err})`);
        }
    );

})();



