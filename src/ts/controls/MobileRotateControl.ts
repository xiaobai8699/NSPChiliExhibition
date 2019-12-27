/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-25 08:44:18 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2019-12-27 11:43:59
 */



// 实现参考:
// https://zhuanlan.zhihu.com/p/40881782
// https://developer.mozilla.org/zh-CN/docs/Web/API/Touch_events

import * as THREE from 'three';
import { IPlayerContol } from './IPlayerControl';
import { MobileRotationDirection } from './MobileRotationDirection';


class MobileRotateControl implements IPlayerContol {

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

    xDelta: number = 0;
    yDelta: number = 0;

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

        this.xDelta += (evt.clientX - this.lastX);
        this.yDelta += (evt.clientY - this.lastY);
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
            let delta =  MobileRotationDirection.isLandscape()? this.yDelta : this.xDelta;
            this.object.rotation.y = THREE.Math.degToRad(delta * this.rotationSpeed);
            // this.object.rotation.x = THREE.Math.degToRad(this.yDelta);
        }

    }

    dispose = () => {
        this.object = null;
        this.domElement = null;
    }
}


export { MobileRotateControl };