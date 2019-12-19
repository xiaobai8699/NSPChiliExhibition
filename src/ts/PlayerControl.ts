import * as THREE from 'three';
import { _Math } from 'three/src/math/Math';

class PlayerContol {

    object: THREE.Camera;

    domElement: HTMLElement | HTMLDocument;

    enable: boolean;

    constructor(object: THREE.Camera, domElement?: HTMLDocument) {
        this.domElement = domElement || document;
        this.object = object;

        this.domElement.addEventListener('mousedown', this.onMouseDown, false);
        this.domElement.addEventListener('mousemove', this.onMouseMove, false);
        this.domElement.addEventListener('mouseup', this.onMouseUp, false);
        this.domElement.addEventListener('keydown', this.onKeyDown, false);
        this.domElement.addEventListener('keyup', this.onKeyUp, false);

    }

    //上下左右转动

    mouseMovingX: number;
    mouseMovingY: number;

    xDelta: number = 0;
    yDelta: number = 0;

    horizontalSpeed: number = 1;
    verticalSpeed: number = 1;

    isDrag: boolean = false;
    canRotation: boolean = false;

    onMouseDown = (e: MouseEvent) => {
        this.isDrag = true;

        this.mouseMovingX = e.pageX;
        this.mouseMovingY = e.pageY;
    }

    onMouseMove = (e: MouseEvent) => {
        if (!this.isDrag) return;
        let xDelta = (e.pageX - this.mouseMovingX);
        let yDelta = (e.pageY - this.mouseMovingY);

        this.xDelta += xDelta * this.horizontalSpeed;
        this.yDelta += yDelta * this.verticalSpeed;
        this.mouseMovingX = e.pageX;
        this.mouseMovingY = e.pageY;
        console.log(`x:${this.xDelta} y:${this.yDelta}`);
    }

    onMouseUp = (e: MouseEvent) => {
        this.isDrag = false;
    }

    // 前后左右移动

    moveForward: boolean;
    moveBackward: boolean;

    moveLeft: boolean;
    moveRight: boolean;

    onKeyDown = (event: KeyboardEvent) => {

        //event.preventDefault();

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

    moveSpeed:number = 2000;

    update = (delta: number) => {

        if(this.moveForward) {
            if(this.object.position.z >= -14000)
                this.object.translateZ(-this.moveSpeed * delta);
        }

        if(this.moveBackward){ 
            if(this.object.position.z <= 19000)
                  this.object.translateZ(this.moveSpeed * delta);
        }
        if(this.moveLeft) {
            if(this.object.position.x >= -14000)
                this.object.translateX(-this.moveSpeed * delta);
        }

        if(this.moveRight) {
            if(this.object.position.x <= 17400)
                 this.object.translateX(this.moveSpeed * delta);
        }

        console.log(this.object.position.x);

        if (!this.isDrag) return;

        this.object.rotation.y = THREE.Math.degToRad(this.xDelta);
        // if(THREE.Math.degToRad(this.yDelta) > Math.PI/6) return;
        // this.object.rotation.x = THREE.Math.degToRad(this.yDelta);

    }
}

export { PlayerContol };