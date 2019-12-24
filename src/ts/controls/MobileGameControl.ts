//实现参考:
//https://zhuanlan.zhihu.com/p/40881782
//https://developer.mozilla.org/zh-CN/docs/Web/API/Touch_events
//https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect
//https://developer.mozilla.org/zh-CN/docs/Web/API/CSS_Object_Model/Determining_the_dimensions_of_elements
//https://docs.microsoft.com/en-us/previous-versions//hh781509(v=vs.85)
//https://www.quirksmode.org/mobile/viewports2.html

import * as THREE from 'three';
import { IPlayerContol } from './IPlayerControl';


class MobileGameControl implements IPlayerContol {

    object: THREE.Camera;

    domElement: HTMLElement;

    sw: HTMLElement = document.querySelector("#steering-wheel");
    swd: HTMLElement = document.querySelector("#steering-wheel-dot");

    swRect: DOMRect = this.sw.getBoundingClientRect();
    swdRect: DOMRect = this.swd.getBoundingClientRect();

    swdHalfWidth: number = this.swdRect.width / 2;
    swdHalfHeight: number = this.swdRect.height / 2;

    miniLeft: number = 0;
    maxLeft: number = this.swRect.width - this.swdRect.width;
    miniTop: number = 0;
    maxTop: number = this.swRect.height - this.swdRect.height;

    originOffsetTop: number = this.swd.offsetTop;
    originOffsetLeft: number = this.swd.offsetLeft;

    constructor(object: THREE.Camera, domElement?: HTMLElement) {

        this.domElement = domElement;
        this.object = object;

        // https://github.com/lh2lyc/ForceLandscape
        this.domElement.classList.add("canvas-rotation");
        this.domElement.style.width = `${window.innerHeight}`;
        this.domElement.style.height = `${window.innerWidth}`;

        this.swd.addEventListener('touchstart', this.onTouchStart, false);
        this.swd.addEventListener('touchmove', this.onTouchMove, false);
        this.swd.addEventListener('touchend', this.onTouchEnd, false);
    }

    
    lastMoveX: number = 0;
    lastMoveY: number = 0;

    moveXDelta: number = 0;
    moveYDelta: number = 0;

    isMoving: boolean = false;

    onTouchStart = (e: TouchEvent) => {
        e.preventDefault();
        e.stopPropagation();

        this.lastMoveX = 0;
        this.lastMoveY = 0;
        this.moveXDelta = 0;
        this.moveYDelta = 0;

        this.isMoving = true;
    }

    onTouchMove = (e: TouchEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const touch = e.changedTouches.item(0);

        const left = touch.clientX - this.swdHalfWidth - this.sw.offsetLeft;
        if (left > this.miniLeft && left < this.maxLeft) {
            this.swd.style.left = left.toString();

            const x = (left + this.swdHalfWidth) - (this.swRect.width / 2)
            this.moveXDelta = this.lastMoveX - x;
            this.lastMoveX = x;
        }

        const top = touch.clientY - this.swdHalfHeight - this.sw.offsetTop;
        if (top > this.miniTop && top < this.maxTop) {
            this.swd.style.top = top.toString();

            const y = (top + this.swdHalfHeight) - (this.swRect.height / 2);
            this.moveYDelta = this.lastMoveY - y;
            this.lastMoveY = y;
        }
    }

    onTouchEnd = (e: TouchEvent) => {
        this.swd.style.left = this.originOffsetLeft.toString();
        this.swd.style.top = this.originOffsetTop.toString();

        this.isMoving = false;
    }

    moveSpeed: number = 9000;

    update = (delta: number) => {
        if(this.isMoving) {
            const z = this.moveXDelta * delta * this.moveSpeed;
            const x = this.moveYDelta * delta * this.moveSpeed;
            this.object.translateZ(z);
            this.object.translateX(-x);
        }
    }

    dispose = () => {
        this.object = null;
        this.domElement = null;
    }
}


export { MobileGameControl };