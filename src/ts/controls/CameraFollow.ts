/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2020-01-18 10:25:39 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2020-01-18 10:33:58
 */

import * as THREE from 'three';
import { Vector3 } from 'three';

let cameraFollowInstance: CameraFollow = null;

 export class CameraFollow {

    camera: THREE.Camera;

    target: THREE.Object3D;
    
    direction: THREE.Vector3;

    static x(): CameraFollow {
        cameraFollowInstance = cameraFollowInstance || new CameraFollow();
        return cameraFollowInstance;
    }

    set = (camera: THREE.Camera, target: THREE.Object3D) => {
        if(camera == undefined) throw '[CameraFollow] need first agrument!';
        if(target == undefined) throw '[CameraFollow] need second argument!';

        this.camera = camera;
        this.target = target;
        this.direction = new Vector3().subVectors(camera.position, target.position);

    }
    
    update = ()=>{

        const v:Vector3 = new Vector3().addVectors(this.target.position,this.direction);
        this.camera.position.copy(v);
        
    }
 }