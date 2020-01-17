/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-25 08:44:15 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2020-01-16 18:19:49
 */



//实现参考:
//https://zhuanlan.zhihu.com/p/40881782
//https://developer.mozilla.org/zh-CN/docs/Web/API/Touch_events
//https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect
//https://developer.mozilla.org/zh-CN/docs/Web/API/CSS_Object_Model/Determining_the_dimensions_of_elements
//https://docs.microsoft.com/en-us/previous-versions//hh781509(v=vs.85)
//https://www.quirksmode.org/mobile/viewports2.html
// H5游戏开发:横屏适配 https://zhuanlan.zhihu.com/p/30577906

import * as THREE from 'three';
import { IControls } from './IControls';
import { VirtualJoystick } from './VirtualJoystick';
import { World } from '../World';
import { Collision } from './Collision';
import { MapControls } from 'three/examples/jsm/controls/OrbitControls';
import { Vector3 } from 'three';

export class MobileMoveControls implements IControls {

    object: THREE.Camera;

    domElement: HTMLElement;

    dir:Vector3;
    player: THREE.Object3D;
    
    constructor(object: THREE.Camera, domElement?: HTMLElement) {

        VirtualJoystick.x();

        this.domElement = domElement;
        this.object = object;

       
    }


    moveSpeed: number = 2;


    update = (delta: number) => {

        if(!this.dir || !this.player){
            this.player = World.x().scene.getObjectByName("yy");
            const c:Vector3 = World.x().camera.position;
            const p:Vector3 = this.player.position;
            this.dir = new Vector3().subVectors(c,p);
            console.log(`c:${JSON.stringify(c)} p:${JSON.stringify(p)} dir:${JSON.stringify(this.dir)}`);
        }

        let isCollision = Collision.x().detect(
            VirtualJoystick.x().moveForward,
            VirtualJoystick.x().moveBackward,
            VirtualJoystick.x().moveLeft,
            VirtualJoystick.x().moveRight);

        if (isCollision) {
            return;
        }

        if (VirtualJoystick.x().isDrag) {
            this.player.rotation.y = THREE.Math.degToRad(VirtualJoystick.x().angle);
            this.player.translateZ(-this.moveSpeed * delta);

            const p:Vector3 = this.player.position;
            const v:Vector3 = new Vector3().addVectors(p,this.dir);
            World.x().camera.position.copy(v);
            World.x().camera.lookAt(this.player.position);
        }
       
        return;

        if (VirtualJoystick.x().moveForward) {
            this.object.translateZ(-this.moveSpeed * delta);
        }

        if (VirtualJoystick.x().moveBackward) {
            this.object.translateZ(this.moveSpeed * delta);
        }

        if (VirtualJoystick.x().moveLeft) {
            this.object.translateX(-this.moveSpeed * delta);
        }

        if (VirtualJoystick.x().moveRight) {
            this.object.translateX(this.moveSpeed * delta);
        }
    }

    dispose = () => {
        this.object = null;
        this.domElement = null;
    }
}
