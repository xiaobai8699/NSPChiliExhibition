/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-28 09:05:57 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2020-01-16 17:40:31
 */


import * as THREE from 'three';
import { Utils } from './utils/Utils';

let world: World;

export class World {

    scene: THREE.Scene;

    camera: THREE.PerspectiveCamera;

    renderer: THREE.WebGLRenderer;

    constructor () {
        
        this.initRenderer();
        this.initSence();
        this.initCamera(); 

    }

    static x(): World {
        world =  world || new World();  
        return world;      
    }

    initSence = () => {

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);

        //(window as any).scene = this.scene;
    }

    initCamera = () => {

        this.camera = new THREE.PerspectiveCamera();
        this.camera.near = 0.1;
        this.camera.far = 64;
        this.camera.position.set(0,1.7,20);
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
        
        this.renderer.setPixelRatio(window.devicePixelRatio);

    }

    render = () => {
        
        this.renderer.render(this.scene, this.camera);
    }
}