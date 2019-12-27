/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-27 19:48:36 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2019-12-27 20:20:48
 */


 import * as THREE from 'three';

let labelManager: LabelManager;

 export   class LabelManager {

    scene: THREE.Scene;

    camera: THREE.PerspectiveCamera;

    constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera) {

        this.scene = scene;
        this.camera = camera;
    }

    static init = (scene: THREE.Scene, camera: THREE.PerspectiveCamera) => {
        if( labelManager == null ) {
            labelManager = new LabelManager(scene, camera);
        }
        
        return labelManager;
    }

    static x() : LabelManager {
        return labelManager;
    }

    update = (delta: number) => {

       
       let mesh: THREE.Mesh | THREE.Object3D = this.scene.getObjectByName("LJJ1");

        let v3: THREE.Vector3 = new THREE.Vector3();

        mesh.updateMatrixWorld(true);
        mesh.getWorldPosition(v3);

        v3.project(this.camera);

        let x = (v3.x *  .5 + .5) * window.innerWidth;
        let y = (v3.y * -.5 + .5) * window.innerHeight;
 
        y -= 35;;

        let label: HTMLElement = document.querySelector("#juhua");
        label.style.transform = `translate(-50%, -50%) translate(${x}px,${y}px)`;

        console.log(`${x},${y}`)
    }
 }