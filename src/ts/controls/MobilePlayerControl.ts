import * as THREE from 'three';
import {IPlayerContol} from './IPlayerControl';

// https://developer.mozilla.org/zh-CN/docs/Web/API/Touch_events

class MobilePlayerContol implements IPlayerContol {
    object: THREE.Camera;

    domElement: HTMLElement | HTMLDocument;

    enable: boolean;

    constructor(object: THREE.Camera, domElement?: HTMLDocument) {
        this.domElement = domElement || document;
        this.object = object;

        this.domElement.addEventListener('touchstart', this.onTouchStart, false);
        this.domElement.addEventListener('touchmove', this.onTouchMove, false);
    }


    lastX: number;
    lastY: number;

    xDelta: number = 0;
    yDelta: number = 0;

    hSpeed: number = 0.1;
    vSpeed: number = 0.1;


    onTouchStart = (e: TouchEvent) => {
        var evt = e.changedTouches[0];
        this.lastX = evt.pageX;
        this.lastY = evt.pageY;
    }

    onTouchMove = (e: TouchEvent) => {
        var evt = e.changedTouches[0];
        this.xDelta += (evt.pageX - this.lastX) * this.hSpeed;
        this.yDelta += (evt.pageY - this.lastY) * this.vSpeed;
        this.lastX = evt.pageX;
        this.lastY = evt.pageY;       
    }

    update = (delta: number) => {
        this.object.rotation.y = THREE.Math.degToRad(this.xDelta);
        // this.object.rotation.x = THREE.Math.degToRad(this.yDelta);

    }
}


export {MobilePlayerContol};