/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-25 08:44:37 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2019-12-26 09:15:49
 */


import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { PlayerContol } from './controls/PlayerControl';
import { PickupManager } from './pickup/PickupManager';

import { Utils } from './utils/Utils';
// import * as dat from 'dat.gui';
import * as Stats from 'stats.js';
import { Box3, Vector3 } from 'three';

class App {

    renderer: THREE.WebGLRenderer;

    camera: THREE.PerspectiveCamera;

    scene: THREE.Scene;

    clock: THREE.Clock;

    loader: GLTFLoader;

    pControl: PlayerContol;

    pickupManager: PickupManager;

    // gui: dat.GUI;

    stats: Stats;

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
         this.scene.background = new THREE.Color(0xf20000);

        this.camera = new THREE.PerspectiveCamera();
        this.camera.fov = 65;
        this.camera.aspect = w / h;
        this.camera.lookAt(this.scene.position);
        this.scene.add(this.camera);

        this.pControl = new PlayerContol(this.camera, this.renderer.domElement);

        this.pickupManager = new PickupManager(this.camera, this.scene, canvas);

        this.clock = new THREE.Clock();

        this.stats = new Stats();
        this.stats.showPanel(0);
        document.body.appendChild(this.stats.dom);

        window.addEventListener("resize", this.onWindowResize, false);

    }

    
    run = (gltf: GLTF) => {

        this.scene.add(gltf.scene);
        this.addLights();
        this.repositionCamera();
        this.renderLoop();
        this.playVideo();
     
    }

    renderLoop = () => {
        
        this.stats.begin();
        {
            this.renderer.render(this.scene, this.camera);
            this.animateAd();
            this.pControl.update(this.clock.getDelta());

        //    var obj = this.scene.getObjectByName("plastic_KT_lajiao002");
        //    obj.translateY(20 * this.clock.getDelta());

        }
        this.stats.end();

        requestAnimationFrame(this.renderLoop);

    }

    addLights = () => {

        {
            const skyColor = 0xffffff;
            const groundColor = 0xffffff;
            const intensity = 1;
            const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
            this.scene.add(light);
            var helper = new THREE.HemisphereLightHelper(light, 5);
            this.scene.add(helper);
        }

        {
            const color = 0xffffff;
            const intensity = 2;
            const light = new THREE.DirectionalLight(color, intensity);
            light.position.set(0, 2, 0);
             this.scene.add(light);

            let helper = new THREE.DirectionalLightHelper(light);
            this.scene.add(helper);

           // this.camera.add(light);
        }
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

        const y = 3;
        const pos = center.clone().setY(y).setZ(10);
        

        this.camera.near = 0.1;
        this.camera.far = length * 3;
        this.camera.position.copy(pos);
        this.camera.updateProjectionMatrix();

    }

    bigTV: THREE.Object3D = null;
    bigTVTXT: THREE.Object3D = null;
    smallTV: THREE.Object3D = null;
    smallTVTXT: THREE.Object3D = null;
    speed: number = 0.003;

    animateAd = () => {

        this.bigTV = this.bigTV || this.scene.getObjectByName("BIG_AD");
        this.smallTV = this.smallTV || this.scene.getObjectByName("SMALL_AD");

        this.bigTV.rotation.z += this.speed;
        this.smallTV.rotation.z -= this.speed;

    }


    // 为什么在移动设备上无法自动播放视频:
    // https://www.aerserv.com/blog/why-does-video-autoplay-on-mobile-devices-not-work/
    // https://www.google.com/search?sxsrf=ACYBGNSWYbUUOlnNjrq-USPBftDSpPX1Kw%3A1576825687684&source=hp&ei=V3P8XYydJ5iSr7wP-tWggAE&q=can+video+autoplay+on+mobile&oq=video+can%27t+autoplay&gs_l=psy-ab.1.6.0i13i30j0i13i5i30l2j0i8i13i30l5.2832.15948..24624...4.0..0.195.3646.0j22......0....1..gws-wiz.....10..35i362i39j0j0i10j0i13j0i10i30j0i19j0i12i30i19j0i12i10i30i19j33i160.1-ba9bWx3VU
    playVideo = () => {
        
        const video: HTMLVideoElement = document.querySelector("#video");
        video.volume = 1.0;
        video.muted = false;
        // video.play();
    }
}

(function main(){

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



