/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-25 08:44:18 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2019-12-30 17:12:48
 */



// 实现参考:
// https://zhuanlan.zhihu.com/p/40881782
// https://developer.mozilla.org/zh-CN/docs/Web/API/Touch_events

import * as THREE from 'three';
import { IControls } from './IControls';
import { Direction } from './Direction';


export class MobileRotateControls implements IControls {

    object: THREE.Camera;

    domElement: HTMLElement;

    constructor(object: THREE.Camera, domElement?: HTMLElement) {
        
        this.domElement = domElement;
        this.object = object;

        this.domElement.addEventListener('touchstart', this.onTouchStart, false);
        this.domElement.addEventListener('touchmove', this.onTouchMove, false);
        this.domElement.addEventListener('touchend', this.onTouchEnd, false);

    }

    lastX: number;
    lastY: number;

    xDistance: number = 0;
    yDistance: number = 0;

    isDrag: boolean = false;

    onTouchStart = (e: TouchEvent) => {

        e.preventDefault();
        e.stopPropagation();

        this.isDrag = true;

        var evt = e.changedTouches[0];
        this.lastX = evt.clientX;
        this.lastY = evt.clientY;

    }

    onTouchMove = (e: TouchEvent) => {

        e.preventDefault();
        e.stopPropagation();

        var evt = e.changedTouches[0];

        this.xDistance += (evt.clientX - this.lastX);
        this.yDistance += (evt.clientY - this.lastY);

        this.lastX = evt.clientX;
        this.lastY = evt.clientY;

    }

    onTouchEnd = (e: TouchEvent) => {

        e.preventDefault();
        e.stopPropagation();

        this.isDrag = false;

        // 这里可以添加减速效果增加流畅性
    }

    rotationSpeed = 0.2;

    update = (delta: number) => {
        
        if (this.isDrag) {

            let distance =  Direction.isLandscape()? this.yDistance : this.xDistance;
            const rad = THREE.Math.degToRad(distance * this.rotationSpeed);
            this.object.rotation.y = rad;

        }
        
    }

    dispose = () => {
        this.object = null;
        this.domElement = null;
    }
}


