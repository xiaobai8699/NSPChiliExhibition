/*
author:Li Hong
email:lh.work@qq.com 
*/

import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { PlayerContol } from './controls/PlayerControl';
import { Utils } from './utils/Utils';
// import * as dat from 'dat.gui';
import * as Stats from 'stats.js';

class App {

    renderer: THREE.WebGLRenderer;

    camera: THREE.PerspectiveCamera;

    scene: THREE.Scene;

    clock: THREE.Clock;

    loader: GLTFLoader;

    pControl: PlayerContol;

    // gui: dat.GUI;

    stats: Stats;

    public constructor() {

        let canvas: HTMLCanvasElement = document.querySelector("#canvas");
        let w = Utils.isMobile() ? window.innerHeight : window.innerWidth;
        let h = Utils.isMobile() ? window.innerWidth  : window.innerHeight; 

        let opt = null;
        if(Utils.isMobile()){
            opt = { canvas, antialias: false,logarithmicDepthBuffer:true };
        }else {
           opt = { canvas, antialias: true,logarithmicDepthBuffer:true }
        }

        this.renderer = new THREE.WebGLRenderer(opt);
        this.renderer.setSize(w,h);
        this.renderer.setPixelRatio(Utils.devicePixelRatio());

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);

        this.camera = new THREE.PerspectiveCamera();
        this.camera.fov = 65;
        this.camera.aspect = w / h;
        this.scene.add(this.camera);

        //this.scene.add(new AxesHelper(10000));

        this.pControl = new PlayerContol(this.camera, this.renderer.domElement);

        this.clock = new THREE.Clock();

        this.stats = new Stats();
        this.stats.showPanel(0);
        document.body.appendChild(this.stats.dom);

        window.addEventListener("resize", this.onWindowResize, false);

    }

    run = (gltf: GLTF) => {
        this.addLights();
        this.scene.add(gltf.scene);
        this.renderLoop();
        this.repositionCamera();
        this.playVideo();
        this.debug();
    }

    renderLoop = () => {
        this.stats.begin();
        {
            this.renderer.render(this.scene, this.camera);
            this.animateAd();
            this.pControl.update(this.clock.getDelta());
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
            light.position.set(0, 10000, 10000);
            light.lookAt(0, 0, 0);
            this.scene.add(light);
        }

        const m = new THREE.MeshStandardMaterial({ color: 0xff0000 });
        const g = new THREE.BoxGeometry(2, 2, 2);
        const mesh = new THREE.Mesh(g, m);
        const scaler = 1000;
        mesh.position.set(0, 1, 0);
        this.scene.add(mesh);
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

        const y = 2500;
        //18700
        const pos = center.clone().setY(y).setZ(10000);
        const cen = center.clone().setY(y).setZ(center.z - 4000);

        this.camera.near =  0.1;
        this.camera.far = length * 100;
        this.camera.position.copy(pos);
        this.camera.lookAt(cen);
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

        this.bigTV.rotation.y += this.speed;
        this.smallTV.rotation.y -= this.speed;
    }


    // 为什么在移动设备上无法自动播放视频:
    // https://www.aerserv.com/blog/why-does-video-autoplay-on-mobile-devices-not-work/
    // https://www.google.com/search?sxsrf=ACYBGNSWYbUUOlnNjrq-USPBftDSpPX1Kw%3A1576825687684&source=hp&ei=V3P8XYydJ5iSr7wP-tWggAE&q=can+video+autoplay+on+mobile&oq=video+can%27t+autoplay&gs_l=psy-ab.1.6.0i13i30j0i13i5i30l2j0i8i13i30l5.2832.15948..24624...4.0..0.195.3646.0j22......0....1..gws-wiz.....10..35i362i39j0j0i10j0i13j0i10i30j0i19j0i12i30i19j0i12i10i30i19j33i160.1-ba9bWx3VU
    playVideo = () => {
        const video: HTMLVideoElement = document.querySelector("#video");
        video.volume = 1.0;
        video.muted = false;
        //video.play();

        let contaienr = this.scene.getObjectByName("TV");
        let box3 = new THREE.Box3();
        box3.setFromObject(contaienr);
        let size = box3.getSize(new THREE.Vector3());

        const texture = new THREE.VideoTexture(video);
        const mat = new THREE.MeshStandardMaterial({ map: texture });
        const box = new THREE.BoxGeometry(size.x - 50, size.y, 1000);
        const mesh = new THREE.Mesh(box, mat);
        mesh.position.y -= 420;
        mesh.position.x += 4000;
        mesh.position.z += 500;
        mesh.rotation.x = THREE.Math.degToRad(-90);
        contaienr.add(mesh);

    }

    debug = ()=>{
        // this.gui = new dat.GUI();


        // this.stats.showPanel(0);
        // document.body.appendChild(this.stats.dom);

        // const self = this;

        //  const data = {
        //     playerControl:function () {
                 
        //     },

        //     orbitControls: function () {
                
        //     }
        //  }
        // const cameraFloder = this.gui.addFolder('控制器');
        // cameraFloder.add(data,'playerControl');
        // cameraFloder.add(data,'orbitControls');
    }

}

const progress: HTMLElement = document.querySelector("#progres-fill");
const progressText: HTMLElement = document.querySelector("#progress-text");
const ui: HTMLElement = document.querySelector("#ui");
const steeringWheel: HTMLElement = document.querySelector("#steering-wheel");

new GLTFLoader().load(
    './asset/model/NSP_NG.gltf',

    glft => {
        try {
            const app = new App();
            app.run(glft);

            ui.style.display = "none";
            if(Utils.isMobile()){
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
        progressText.innerText = `正在加载资源 ${p}%`;
        if(p >= 100){
            progressText.innerText = "正在进入展馆，请稍候..";
        }
    },

    err => {
        alert(`加载资源失败(${err})`);
    }
); 