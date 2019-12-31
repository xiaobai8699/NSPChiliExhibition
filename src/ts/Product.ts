/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-28 08:49:51 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2019-12-30 16:52:15
 */

// https://threejsfundamentals.org/threejs/lessons/threejs-multiple-scenes.html

import * as THREE from 'three';
import { Utils } from './Utils';
import { World } from './World';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Vector2, Vector3 } from 'three';

let productInstance: Product;

export class Product {

    scene: THREE.Scene;

    camera: THREE.PerspectiveCamera;

    renderer: THREE.WebGLRenderer;

    orbitControls: OrbitControls;

    visible: boolean;

    constructor() {

        this.visible = false;

        this.initRenderer();

        this.initSence();

        this.initCamera();

        this.renderer.setAnimationLoop(this.animationLoop);

        this.addEventListener();

    }

    static x() {

        productInstance = productInstance || new Product();
        return productInstance;

    }

    initRenderer = () => {

        let canvas: HTMLCanvasElement = document.querySelector("#product-canvas");

        //需要设置alpha: ture
        this.renderer = new THREE.WebGLRenderer({ 
            canvas, 
            antialias: true, 
            alpha: true 
        });

        this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);

        this.renderer.setPixelRatio(window.devicePixelRatio);

    }

    initSence = () => {

        this.scene = new THREE.Scene();

        const light = new THREE.AmbientLight("#FFFFFF");
        light.intensity = 1.5;
        this.scene.add(light);

    }

    initCamera = () => {

        this.camera = new THREE.PerspectiveCamera();

        this.camera.near = 0.1;

        this.camera.far = 100;

        this.camera.fov = 15;

        this.camera.aspect = this.renderer.domElement.clientWidth / this.renderer.domElement.clientHeight;

        this.scene.add(this.camera);

        this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
        this.orbitControls.minDistance = 3;
        this.orbitControls.autoRotate = true;
        this.orbitControls.autoRotateSpeed = -4;
        this.orbitControls.enableDamping = true;
    }

    animationLoop = () => {

        if (this.visible) {

            this.renderer.render(this.scene, this.camera);

            this.orbitControls.update();
        }
    }

    onWindowResize = () => {

        const w = this.renderer.domElement.clientWidth;
        const h = this.renderer.domElement.clientHeight;

        this.renderer.setSize(w, h);

        this.camera.aspect = w / h;

        this.camera.updateProjectionMatrix();

    }


    resetCameraPosition = (object: THREE.Object3D) => {

        const size: THREE.Vector3 = Utils.getSize(object);
        const length: number = size.length();

        this.camera.position.set(0, size.y / 2, length*3);
        this.camera.updateProjectionMatrix();

        this.orbitControls.target = object.position;
        this.orbitControls.maxDistance = length * 5;
    }

    addedObject: THREE.Object3D = null;


    showProduct = (name: string) => {

        this.visible = true;

        const div: HTMLDivElement = document.querySelector("#product-container");
        div.style.visibility = "visible";

        this.addedObject = World.x().scene.getObjectByName(name).clone(true);

        this.addedObject.position.set(0, 0, 0);

        this.scene.add(this.addedObject);

        this.orbitControls.target = this.addedObject.position;

        this.resetCameraPosition(this.addedObject);

    }

    //https://threejsfundamentals.org/threejs/lessons/threejs-cleanup.html
    hideProduct = () => {

        this.visible = false;

        if (this.addedObject) {
            this.scene.remove(this.addedObject);
        }

        this.scene.dispose();
        this.renderer.clearColor();
        this.renderer.clearDepth();
        this.renderer.clearStencil();

        const div: HTMLDivElement = document.querySelector("#product-container");
        div.style.visibility = "hidden";
    }


    addEventListener = () => {

        window.addEventListener("resize", this.onWindowResize, false);

        document.querySelector("#prodcut-close").addEventListener("mousedown", this.hideProduct, false);
        document.querySelector("#prodcut-close").addEventListener("touchstart", this.hideProduct, false);

    }
}