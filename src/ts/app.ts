/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-25 08:44:37 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2019-12-27 18:43:30
 */


import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { PlayerContol } from './controls/PlayerControl';
import { PickupManager } from './PickupManager';
import { AnimationManager } from './AnimationManager';
import { LightManager } from './LightManager';
import { MediaManager } from './MediaManager';
import { Utils } from './utils/Utils';
import { Debuger } from './Debuger';

class App {

    renderer: THREE.WebGLRenderer;

    camera: THREE.PerspectiveCamera;

    scene: THREE.Scene;

    clock: THREE.Clock;

    loader: GLTFLoader;

    pControl: PlayerContol;

    pickupManager: PickupManager;


    public constructor() {

        let canvas: HTMLCanvasElement = document.querySelector("#canvas");

        this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, logarithmicDepthBuffer: false });
        Utils.setRendererSize(this.renderer);
        this.renderer.setPixelRatio(Utils.devicePixelRatio());

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);

        this.camera = new THREE.PerspectiveCamera();
        this.camera.near = 0.1;
        this.camera.far = 100;
        Utils.setCameraFOV(this.camera);
        Utils.setCameraAspect(this.camera);
        this.camera.position.set(0,3,18);
        this.scene.add(this.camera);

        this.pControl = new PlayerContol(this.camera, this.renderer.domElement);

        this.pickupManager = new PickupManager(this.camera, this.scene, canvas);

        this.clock = new THREE.Clock();

        window.addEventListener("resize", this.onWindowResize, false);

        Debuger.start(this.scene, this.camera);

        MediaManager.init(this.scene);

    }


    run = (gltf: GLTF) => {

        this.scene.add(gltf.scene);
        
        this.renderer.setAnimationLoop(this.render);

        //需要最后添加灯光
        LightManager.addLights(this.scene);

        this.onWindowResize();
    }

    render = () => {

        Debuger.x().stats.begin();
        {
            this.renderer.render(this.scene, this.camera);
            AnimationManager.start(this.scene);
            this.pControl.update(this.clock.getDelta());
            Debuger.x().update(this.clock.getDelta());
            //    var obj = this.scene.getObjectByName("plastic_KT_lajiao002");
            //    obj.translateY(20 * this.clock.getDelta());

        }
        Debuger.x().stats.end();

    }

    onWindowResize = () => {

        Utils.setRendererSize(this.renderer);
        Utils.setCameraAspect(this.camera);
        this.camera.updateProjectionMatrix();

    }
}

(function main() {

    const ui: HTMLElement = document.querySelector("#ui");
    const progress: HTMLElement = document.querySelector("#progres-fill");
    const progressText: HTMLElement = document.querySelector("#progress-text");
    const steeringWheel: HTMLElement = document.querySelector("#steering-wheel");

    const loader = new GLTFLoader();

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('./draco/');
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



