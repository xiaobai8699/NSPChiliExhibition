import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';
import { PlayerContol } from './controls/PlayerControl';
import {Utils} from './utils/Utils';

class App {

    renderer: THREE.WebGLRenderer;

    camera: THREE.PerspectiveCamera;

    scene: THREE.Scene;

    fpControls: FirstPersonControls;

    clock: THREE.Clock;

    loader: GLTFLoader;

    pControl: PlayerContol;

    public constructor() {

        let canvas: HTMLCanvasElement = document.querySelector("#c");

        this.renderer = new THREE.WebGLRenderer({ canvas, logarithmicDepthBuffer: true, antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Utils.devicePixelRatio());

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);

        this.camera = new THREE.PerspectiveCamera();
        this.camera.fov = 65;
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.scene.add(this.camera);

        this.pControl = new PlayerContol(this.camera, document);

        this.clock = new THREE.Clock();

        window.addEventListener("resize", this.onWindowResize, false);
    }

    run = (gltf: GLTF) => {
        this.addLights();
        this.scene.add(gltf.scene);
        this.renderLoop();
        this.repositionCamera();
        this.playVideo();
    }

    renderLoop = () => {
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.renderLoop);

        this.animateAd();
        this.pControl.update(this.clock.getDelta());
    }

    addLights = () => {
        {
            const skyColor = 0xffffff;
            const groundColor = 0xffffff;
            const intensity = 1;
            const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
            this.scene.add(light);
        }

        {
            const color = 0xffffff;
            const intensity = 1;
            const light = new THREE.DirectionalLight(color, intensity);
            light.position.set(0, 1000000, 200000);
            this.scene.add(light);
            this.scene.add(light.target);
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

        const y = 2500;
        //18700
        const pos = center.clone().setY(y).setZ(0);
        const cen = center.clone().setY(y).setZ(center.z - 4000);

        this.camera.near = 0.1;
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
        this.bigTVTXT = this.bigTVTXT || this.scene.getObjectByName("BIG_ADTXT");
        this.smallTV = this.smallTV || this.scene.getObjectByName("SMALL_AD");
        this.smallTVTXT = this.smallTVTXT || this.scene.getObjectByName("SMALL_ADTXT");

        this.bigTV.rotation.y += this.speed;
        this.bigTVTXT.rotation.y += this.speed;
        this.smallTV.rotation.y -= this.speed;
        this.smallTVTXT.rotation.y -= this.speed;
    }


    playVideo = () => {
        const video: HTMLVideoElement = document.querySelector("#video");
        let contaienr = this.scene.getObjectByName("TV");
        let box3 = new THREE.Box3();
        box3.setFromObject(contaienr);
        let size = box3.getSize(new THREE.Vector3());

        const texture = new THREE.VideoTexture(video);
        const mat = new THREE.MeshStandardMaterial({ map: texture });
        const box = new THREE.BoxGeometry(size.x - 50, size.y, 1000);
        const mesh = new THREE.Mesh(box, mat);
        mesh.position.y -= 440;
        mesh.position.x += 4000;
        mesh.position.z += 500;
        mesh.rotation.x = THREE.Math.degToRad(-90);
        contaienr.add(mesh);
        video.play();
    }
}

const progress: HTMLElement = document.querySelector("#progres-fill");

/*
new GLTFLoader().load(
    './asset/model/NSP_CJ.glb',

    glft => {
       try{
        const app = new App();
        app.run(glft);
       }
       catch(e){
           alert(`应用异常(${e})`);
       }
    },
    
    xhr => {
        let p = (xhr.loaded / xhr.total) * 100 ;
        console.log(p);
        progress.style.width = `${p}%`;
        if(p >= 100){
            progress.parentElement.style.display = "none";
        }
    },

    err => {
        alert(`加载资源失败(${err})`);
    }
); */