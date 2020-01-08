/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-25 08:44:15 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2020-01-08 19:35:53
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

export class MobileMoveControls implements IControls {

    object: THREE.Camera;

    domElement: HTMLElement;

    controlMap: ControlMap;

    constructor(object: THREE.Camera, domElement?: HTMLElement) {

        this.domElement = domElement;
        
        this.object = object;

        this.controlMap = new ControlMap();
        
        if (Direction.isLandscape()) {

            // https://github.com/lh2lyc/ForceLandscape
            this.domElement.classList.add("canvas-rotation");
            this.domElement.style.width = `${window.innerHeight}`;
            this.domElement.style.height = `${window.innerWidth}`;
            
        }

    }


    moveSpeed: number = 3;

    update = (delta: number) => {

        if (this.controlMap.moveForward) {
             if(this.object.position.z >= -6)
                 this.object.translateZ(-this.moveSpeed * delta);
        }

        if (this.controlMap.moveBackward) {
            if(this.object.position.z <= 19)
                 this.object.translateZ(this.moveSpeed * delta);
        }

        if (this.controlMap.moveLeft) {
             if(this.object.position.x >= -14)
                 this.object.translateX(-this.moveSpeed * delta);
        }

        if (this.controlMap.moveRight) {
            if(this.object.position.x <= 17.4)
                 this.object.translateX(this.moveSpeed * delta);
        }
    }

    dispose = () => {
        this.object = null;
        this.domElement = null;
    }
}
