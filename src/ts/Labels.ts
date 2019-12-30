/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-27 19:48:36 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2019-12-30 16:52:42
 */

 // https://threejsfundamentals.org/threejs/lessons/threejs-align-html-elements-to-3d.html
 // https://manu.ninja/webgl-three-js-annotations


 import * as THREE from 'three';
 import {World} from './World';

let labelInstance: Labels;

 export  class Labels {

    scene: THREE.Scene;

    camera: THREE.PerspectiveCamera;

    constructor() {

        this.scene = World.x().scene;
        this.camera = World.x().camera;
    }

    static x() : Labels {
        
        labelInstance = labelInstance || new Labels();
        return labelInstance;
    }


    static setVisible(visible: boolean) {
        const div: HTMLDivElement = document.querySelector("#labels");
        div.style.visibility =  visible ? "visible" : "hidden";
    }

    update = (delta: number) => {

       let mesh: THREE.Mesh | THREE.Object3D = this.scene.getObjectByName("64mmA016");

        let v3: THREE.Vector3 = new THREE.Vector3();

        mesh.updateMatrixWorld(true);
        mesh.getWorldPosition(v3);

        v3.project(this.camera);

        let x = (v3.x *  .5 + .5) * window.innerWidth;
        let y = (v3.y * -.5 + .5) * window.innerHeight;
 
        y -= 35;;

        let label: HTMLElement = document.querySelector("#juhua");
        label.style.transform = `translate(-50%, -50%) translate(${x}px,${y}px)`;

    }
 }