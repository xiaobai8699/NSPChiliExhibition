/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-25 08:44:15 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2019-12-25 20:00:48
 */



//实现参考:
//https://zhuanlan.zhihu.com/p/40881782
//https://developer.mozilla.org/zh-CN/docs/Web/API/Touch_events
//https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect
//https://developer.mozilla.org/zh-CN/docs/Web/API/CSS_Object_Model/Determining_the_dimensions_of_elements
//https://docs.microsoft.com/en-us/previous-versions//hh781509(v=vs.85)
//https://www.quirksmode.org/mobile/viewports2.html

import * as THREE from 'three';
import { IPlayerContol } from './IPlayerControl';


class MobileMoveControl implements IPlayerContol {

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


    lastLeft: number = 0;
    lastTop: number = 0;

    moveForward: boolean;
    moveBackward: boolean;

    moveLeft: boolean;
    moveRight: boolean;

    isMoving: boolean = false;

    onTouchStart = (e: TouchEvent) => {

        e.preventDefault();
        e.stopPropagation();

        this.lastLeft = 0;
        this.lastTop = 0;

        this.isMoving = true;
        
    }

    onTouchMove = (e: TouchEvent) => {

        e.preventDefault();
        e.stopPropagation();

        const touch = e.changedTouches.item(0);

        const left = touch.clientX - this.swdHalfWidth - this.sw.offsetLeft;

        if (left > this.miniLeft && left < this.maxLeft) {

            this.swd.style.left = left.toString();

            if (left < this.lastLeft) {
                //注:因为是横屏，这里需要将在x轴的移动映射到场景中的前后移动
                this.moveBackward = true;
                this.moveForward = false;

            } else if (left > this.lastLeft) {
                this.moveBackward = false;
                this.moveForward = true;

            } else {
                // to do
            }

            this.lastLeft = left;

        }

        const top = touch.clientY - this.swdHalfHeight - this.sw.offsetTop;

        if (top > this.miniTop && top < this.maxTop) {

            this.swd.style.top = top.toString();

            if (top < this.lastTop) {

                 //注:因为是横屏，这里需要将在y轴的移动映射到场景中的左右移动
                this.moveLeft = true;
                this.moveRight = false;

            } else if (top > this.lastTop) {

                this.moveLeft = false;
                this.moveRight = true;

            } else {

            }

            this.lastTop = top;
        }
    }

    onTouchEnd = (e: TouchEvent) => {
        
        this.swd.style.left = this.originOffsetLeft.toString();
        this.swd.style.top = this.originOffsetTop.toString();

        this.isMoving = false;
        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;

    }

    moveSpeed: number = 2.5;

    update = (delta: number) => {
        
        if (this.moveForward) {
            //  if(this.object.position.z >= -14000)
            this.object.translateZ(-this.moveSpeed * delta);
        }

        if (this.moveBackward) {
            //if(this.object.position.z <= 19000)
            this.object.translateZ(this.moveSpeed * delta);
        }

        if (this.moveLeft) {
            //  if(this.object.position.x >= -14000)
            this.object.translateX(-this.moveSpeed * delta);
        }

        if (this.moveRight) {
            // if(this.object.position.x <= 17400)
            this.object.translateX(this.moveSpeed * delta);
        }
    }

    dispose = () => {
        this.object = null;
        this.domElement = null;
    }
}


export { MobileMoveControl };