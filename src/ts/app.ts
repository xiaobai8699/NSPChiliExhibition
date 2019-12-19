import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
 import {FirstPersonControls} from 'three/examples/jsm/controls/FirstPersonControls';
import {PlayerContol} from './PlayerControl';

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
        this.renderer.setPixelRatio(window.devicePixelRatio);

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);

        this.camera = new THREE.PerspectiveCamera();
        this.camera.fov = 65;
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.scene.add(this.camera);

        // this.fpControls = new FirstPersonControls(this.camera,document.body);
        // this.fpControls.movementSpeed  = 3500;
        // this.fpControls.lookSpeed = 0.2;
        // this.fpControls.lookVertical  = false;
        // this.fpControls.constrainVertical = true;
        // this.fpControls.verticalMin = 1.0;
        // this.fpControls.verticalMax = 1.8;

        this.pControl = new PlayerContol(this.camera,document);

        this.clock = new THREE.Clock();

        window.addEventListener("resize", this.onWindowResize, false);
    }

    run = (gltf: GLTF) => {
        this.addLights();
        this.scene.add(gltf.scene);
        this.renderLoop();
        this.repositionCamera();
    }

    renderLoop = () => {
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.renderLoop);
        // this.fpControls.update(this.clock.getDelta());
        // this.fpControls.activeLook  = this.fpControls.mouseDragOn;
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
        const pos = center.clone().setY(y).setZ(18700);
        const cen = center.clone().setY(y).setZ(center.z-4000);

        this.camera.near = 0.1;
        this.camera.far = length * 100;
        this.camera.position.copy(pos);       
        this.camera.lookAt(cen);
        this.camera.updateProjectionMatrix();
    }
}


new GLTFLoader().load('./asset/model/NSP_CJ.glb', glft => {
    const app = new App();
    app.run(glft);
});