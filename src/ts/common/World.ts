/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-28 09:05:57 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2020-01-10 21:16:12
 */


import * as THREE from 'three';
import { Utils } from './Utils';

let world: World;

export class World {

    scene: THREE.Scene;

    camera: THREE.PerspectiveCamera;

    renderer: THREE.WebGLRenderer;

    constructor () {
        
        this.initRenderer();
        this.initSence();
        this.initCamera(); 

        window.addEventListener("resize", this.onWindowResize, false);
    }

    static x(): World {
        world =  world || new World();  
        return world;      
    }

    initSence = () => {

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);

    }

    initCamera = () => {

        this.camera = new THREE.PerspectiveCamera();
        this.camera.near = 0.1;
        this.camera.far = 64;
        Utils.setCameraFOV(this.camera);
        Utils.setCameraAspect(this.camera);
        this.camera.position.set(0,1.7,35);
        this.scene.add(this.camera);

    }

    initRenderer = () => {

        let canvas: HTMLCanvasElement = document.querySelector("#canvas");

        // 需要设置antialias:ture, logarithmicDepthBuffer:false 在移动端才不会闪烁
        const opt = { 
            canvas, 
            antialias: true, 
            logarithmicDepthBuffer: Utils.isMobile() ? false:  true,
            autoUpdate:false
        };

        this.renderer = new THREE.WebGLRenderer(opt);


        Utils.setRendererSize(this.renderer);
        
        this.renderer.setPixelRatio(Utils.devicePixelRatio());

    }

    render = () => {
        
        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize = () => {

        Utils.setRendererSize(this.renderer);
        Utils.setCameraAspect(this.camera);

    }
}