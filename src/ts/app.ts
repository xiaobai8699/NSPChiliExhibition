/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-25 08:44:37 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2019-12-26 18:17:44
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

        let w = Utils.isMobile() ? window.innerHeight : window.innerWidth;
        let h = Utils.isMobile() ? window.innerWidth : window.innerHeight;

        let opt = null;
        if (Utils.isMobile()) {

            opt = { canvas, antialias: false, logarithmicDepthBuffer: true };

        } else {

            opt = { canvas, antialias: true, logarithmicDepthBuffer: true }

        }

        this.renderer = new THREE.WebGLRenderer(opt);
        this.renderer.setSize(w, h);
        this.renderer.setPixelRatio(Utils.devicePixelRatio());

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);

        this.camera = new THREE.PerspectiveCamera();
        this.camera.fov = 65;
        this.camera.aspect = w / h;
        this.scene.add(this.camera);

        this.pControl = new PlayerContol(this.camera, this.renderer.domElement);

        this.pickupManager = new PickupManager(this.camera, this.scene, canvas);

        this.clock = new THREE.Clock();

        window.addEventListener("resize", this.onWindowResize, false);

        Debuger.start(this.scene);
    }


    run = (gltf: GLTF) => {

        this.scene.add(gltf.scene);
        LightManager.addLights(this.scene);
        this.repositionCamera();
        this.renderer.setAnimationLoop(this.render);

        MediaManager.playVideo(this.scene);
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

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

    }

    repositionCamera = () => {

        const box = new THREE.Box3().setFromObject(this.scene);
        const length = box.getSize(new THREE.Vector3()).length();
        const center = box.getCenter(new THREE.Vector3());

        const pos = center.clone().setY(3).setZ(10);

        this.camera.near = 0.3;
        this.camera.far = length;
        this.camera.position.copy(pos);
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
        './asset/model/NSP.glb',

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



