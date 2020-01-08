/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-27 19:48:36 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2020-01-08 21:40:31
 */

 // https://threejsfundamentals.org/threejs/lessons/threejs-align-html-elements-to-3d.html
 // https://manu.ninja/webgl-three-js-annotations


 import * as THREE from 'three';
 import {World} from './World';

let labelInstance: Labels;

 export  class Labels {

    scene: THREE.Scene;

    camera: THREE.PerspectiveCamera;

    tips: HTMLElement = null;


    constructor() {

        this.scene = World.x().scene;
        this.camera = World.x().camera;

        this.tips = document.querySelector("#tips");

    }

    static x() : Labels {
        
        labelInstance = labelInstance || new Labels();
        return labelInstance;
    }


    static setVisible(visible: boolean) {
        const div: HTMLDivElement = document.querySelector("#labels");
        div.style.visibility =  visible ? "visible" : "hidden";
    }

    
    showTips = (name?: string) => {

        if(name == undefined) return;

        let mesh: THREE.Mesh | THREE.Object3D = this.scene.getObjectByName(name);

        let v3: THREE.Vector3 = new THREE.Vector3();

        mesh.updateMatrixWorld(true);
        mesh.getWorldPosition(v3);

        v3.project(this.camera);

        let x = (v3.x *  .5 + .5) * window.innerWidth;
        let y = (v3.y * -.5 + .5) * window.innerHeight;
        y-= 200;
 
        this.tips.style.transform = `translate(-50%, -50%) translate(${x}px,${y}px)`;
    }

    update = (delta: number) => {

       this.showTips();

    }
 }