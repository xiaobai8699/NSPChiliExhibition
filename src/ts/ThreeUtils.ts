/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2020-01-17 08:47:29 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2020-01-17 11:32:39
 */

import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

export class ThreeUtils {

    static loadModel(name: string, notify: any, compress: boolean = true) {

        if(notify == undefined) throw '[ThreeUtils] need notfiy argument';
        if(!notify.c || !notify.e) throw '[ThreeUtils] need c,e funcation';

        const loader = new GLTFLoader();

        if (compress) {
            const dracoLoader = new DRACOLoader().setDecoderPath('./ts/draco/');
            loader.setDRACOLoader(dracoLoader);
        }

        loader.load(
            name,
            notify.c, // c means completed
            notify.p, // p means progress
            notify.e  // e means error
        );
    }

    static cameraPositionToFit(camera: THREE.PerspectiveCamera, target: THREE.Object3D) {

        if (camera == undefined)  throw '[ThreeUtils] need camera argument!';
        if (target == undefined)  throw '[ThreeUtils] need target argument!';

        const box = new THREE.Box3().setFromObject(target);
        const distance = box.getSize(new THREE.Vector3()).length();
        const boxCenter = box.getCenter(new THREE.Vector3());

        const direction = new THREE.Vector3()
            .subVectors(camera.position, boxCenter)
            .multiply(new THREE.Vector3(1, 1, 1))
            .normalize();

        camera.position.copy(direction.multiplyScalar(distance).add(boxCenter));

        camera.near = 1;
        camera.far = distance * 100;

        camera.updateProjectionMatrix();

        camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z);

    }
}