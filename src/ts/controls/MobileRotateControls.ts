/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-25 08:44:18 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2020-01-12 15:56:28
 */



// 实现参考:
// https://zhuanlan.zhihu.com/p/40881782
// https://developer.mozilla.org/zh-CN/docs/Web/API/Touch_events

import * as THREE from 'three';
import { IControls } from './IControls';
import {LayoutDirection} from '../config/Layout';
import {World} from '../World';

let mrcInstance: MobileRotateControls;

export class MobileRotateControls implements IControls {

    direction: LayoutDirection = LayoutDirection.Horizontal;
    
    object: THREE.Camera;

    domElement: HTMLElement;

    static x(): MobileRotateControls {
        mrcInstance = mrcInstance || new MobileRotateControls();
        return mrcInstance;
    }

    constructor() {
        
        this.domElement = World.x().renderer.domElement;
        this.object = World.x().camera;

        this.domElement.addEventListener('touchstart', this.onTouchStart, false);
        this.domElement.addEventListener('touchmove', this.onTouchMove, false);
        this.domElement.addEventListener('touchend', this.onTouchEnd, false);

    }

    updateDirection = (dir:LayoutDirection) => {
        this.direction = dir;
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

            let distance = (this.direction == LayoutDirection.Horizontal ? this.yDistance : this.xDistance);
            const rad = THREE.Math.degToRad(distance * this.rotationSpeed);
            this.object.rotation.y = rad;
        }
    }

    dispose = () => {
        this.object = null;
        this.domElement = null;
    }
}


