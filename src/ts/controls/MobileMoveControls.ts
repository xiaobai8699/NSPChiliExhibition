/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-25 08:44:15 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2020-01-18 10:36:04
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
import { Collision } from './Collision';
import {Hero} from '../models/Hero';
import {CameraFollow} from './CameraFollow';
import { World } from '../World';

export class MobileMoveControls implements IControls {

    object: THREE.Camera;

    domElement: HTMLElement;
    
    constructor(object: THREE.Camera, domElement?: HTMLElement) {

        VirtualJoystick.x();

        this.domElement = domElement;
        this.object = object;

        // CameraFollow.x().set(this.object, Hero.x().hero);
    }


    moveSpeed: number = 2;


    update = (delta: number) => {

        if(!VirtualJoystick.x().isDrag) return;

        let isCollision = Collision.x().detect(
            VirtualJoystick.x().moveForward,
            VirtualJoystick.x().moveBackward,
            VirtualJoystick.x().moveLeft,
            VirtualJoystick.x().moveRight);

        if (isCollision) {
            return;
        }

        // Hero.x().hero.rotation.y = THREE.Math.degToRad(VirtualJoystick.x().outputAngle);
        // Hero.x().hero.translateZ(-this.moveSpeed * delta);
        // CameraFollow.x().update();

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
