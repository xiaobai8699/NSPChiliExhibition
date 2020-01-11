/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-25 08:44:15 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2020-01-11 10:05:57
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
import { Direction } from './Direction';
import {ControlMap} from './ControlMap';
import { World } from '../World';
import { Collision } from './Collision';

export class MobileMoveControls implements IControls {

    object: THREE.Camera;

    domElement: HTMLElement;


    constructor(object: THREE.Camera, domElement?: HTMLElement) {

        this.domElement = domElement;
        
        this.object = object;
        
        if (Direction.isLandscape()) {

            // https://github.com/lh2lyc/ForceLandscape
            this.domElement.classList.add("canvas-rotation");
            this.domElement.style.width = `${window.innerHeight}`;
            this.domElement.style.height = `${window.innerWidth}`;
            
        }

    }


    moveSpeed: number = 2;

    update = (delta: number) => {

        let isCollision = Collision.x().detect(
            ControlMap.x().moveForward, 
            ControlMap.x().moveBackward, 
            ControlMap.x().moveLeft, 
            ControlMap.x().moveRight);

        if (isCollision) {
            return;
        }
          
        if (ControlMap.x().moveForward) {
            this.object.translateZ(-this.moveSpeed * delta);
        }

        if (ControlMap.x().moveBackward) {
            this.object.translateZ(this.moveSpeed * delta);
        }

        if (ControlMap.x().moveLeft) {
                 this.object.translateX(-this.moveSpeed * delta);
        }

        if (ControlMap.x().moveRight) {
                 this.object.translateX(this.moveSpeed * delta);
        }
    }

    dispose = () => {
        this.object = null;
        this.domElement = null;
    }
}
