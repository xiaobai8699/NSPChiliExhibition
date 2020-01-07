/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-25 08:44:22 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2020-01-07 13:51:31
 */



import * as THREE from 'three';
import { IControls } from './IControls';
import { Collision } from './Collision';

// 参考实现:
// https://zhuanlan.zhihu.com/p/40881782
// https://github.com/mrdoob/three.js/blob/master/examples/js/controls/FirstPersonControls.js


export class PcControls implements IControls {

    object: THREE.Camera;

    domElement: HTMLElement;


    constructor(object: THREE.Camera, domElement?: HTMLElement) {

        this.domElement = domElement;
        this.object = object;

        this.domElement.addEventListener('mousedown', this.onMouseDown, false);
        this.domElement.addEventListener('mousemove', this.onMouseMove, false);
        this.domElement.addEventListener('mouseup', this.onMouseUp, false);
        this.domElement.addEventListener('mouseleave', this.onMouseleave, false);

        this.domElement.addEventListener('keydown', this.onKeyDown, false);
        this.domElement.addEventListener('keyup', this.onKeyUp, false);

    }

    //鼠标上下左右转动

    lastX: number;
    lastY: number;

    xDelta: number = 0;
    yDelta: number = 0;

    hSpeed: number = 0.1;
    vSpeed: number = 0.1;

    isDrag: boolean = false;

    onMouseDown = (e: MouseEvent) => {

        e.preventDefault();
        e.stopPropagation();

        //需要调用focus方法后canvas元素才会响应keydown事件
        //https://github.com/mrdoob/three.js/blob/master/examples/js/controls/FirstPersonControls.js#L96
        this.domElement.focus();

        this.isDrag = true;
        this.lastX = e.pageX;
        this.lastY = e.pageY;

    }

    onMouseMove = (e: MouseEvent) => {

        e.preventDefault();
        e.stopPropagation();

        if (!this.isDrag) return;

        this.xDelta += (e.pageX - this.lastX);
        this.yDelta += (e.pageY - this.lastY);
        this.lastX = e.pageX;
        this.lastY = e.pageY;

    }

    onMouseUp = (e: MouseEvent) => {

        this.isDrag = false;
    }

    onMouseleave = (e: MouseEvent) => {

        this.isDrag = false;
    }

    //键盘前后左右移动

    moveForward: boolean;
    moveBackward: boolean;

    moveLeft: boolean;
    moveRight: boolean;

    onKeyDown = (event: KeyboardEvent) => {

        event.preventDefault();
        event.stopPropagation();

        switch (event.keyCode) {

            case 38: /*up*/
            case 87: /*W*/ this.moveForward = true; break;

            case 37: /*left*/
            case 65: /*A*/ this.moveLeft = true; break;

            case 40: /*down*/
            case 83: /*S*/ this.moveBackward = true; break;

            case 39: /*right*/
            case 68: /*D*/ this.moveRight = true; break;

        }

    };

    onKeyUp = (event: KeyboardEvent) => {

        event.preventDefault();
        event.stopPropagation();

        switch (event.keyCode) {

            case 38: /*up*/
            case 87: /*W*/ this.moveForward = false; break;

            case 37: /*left*/
            case 65: /*A*/ this.moveLeft = false; break;

            case 40: /*down*/
            case 83: /*S*/ this.moveBackward = false; break;

            case 39: /*right*/
            case 68: /*D*/ this.moveRight = false; break;
        }

    };

    moveSpeed: number = 3;
    rotationSpeed: number = 0.08;

    update = (delta: number) => {

        if (this.isDrag) {
            this.object.rotation.y = THREE.Math.degToRad(this.xDelta * this.rotationSpeed);
            // this.object.rotation.x = THREE.Math.degToRad(this.yDelta);
        }
        
        let isCollision = Collision.x().detect(this.moveForward, this.moveBackward, this.moveLeft, this.moveRight);
        if (isCollision) {
            return;
        }

        if (this.moveForward) {
            this.object.translateZ(-this.moveSpeed * delta);
        }

        if (this.moveBackward) {
            this.object.translateZ(this.moveSpeed * delta);
        }

        if (this.moveLeft) {
            this.object.translateX(-this.moveSpeed * delta);
        }

        if (this.moveRight) {
            this.object.translateX(this.moveSpeed * delta);
        }
    }

    dispose = () => {
        this.object = null;
        this.domElement = null;
    }
}


