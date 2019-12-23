import * as THREE from 'three';
import {IPlayerContol} from './IPlayerControl';


// https://zhuanlan.zhihu.com/p/40881782
// https://github.com/mrdoob/three.js/blob/master/examples/js/controls/FirstPersonControls.js

enum MoveDirection{
    NotMove,
    Forward,
    Backward,
    Left,
    Right
}

class PcPlayerContol implements IPlayerContol {

    object: THREE.Camera;

    domElement: HTMLElement;

    enable: boolean;

    constructor(object: THREE.Camera, domElement?: HTMLElement) {
        this.domElement = domElement;
        this.object = object;

        this.domElement.addEventListener('mousedown', this.onMouseDown, false);
        this.domElement.addEventListener('mousemove', this.onMouseMove, false);
        this.domElement.addEventListener('mouseup', this.onMouseUp, false);

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

        //需要调用focus方法后canvas元素才会响应keydown事件
        //https://github.com/mrdoob/three.js/blob/master/examples/js/controls/FirstPersonControls.js#L96
        this.domElement.focus();

        e.preventDefault();
        e.stopPropagation();

        this.isDrag = true;
        this.lastX = e.pageX;
        this.lastY = e.pageY;
    }

    onMouseMove = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!this.isDrag) return;

        this.xDelta += (e.pageX - this.lastX) * this.hSpeed;
        this.yDelta += (e.pageY - this.lastY) * this.vSpeed;
        this.lastX = e.pageX;
        this.lastY = e.pageY;       
    }

    onMouseUp = (e: MouseEvent) => {
        this.isDrag = false;
    }

    //键盘前后左右移动

    moveDirection: MoveDirection = MoveDirection.NotMove;

    onKeyDown = (event: KeyboardEvent) => {
        event.preventDefault();
        event.stopPropagation();

        switch (event.keyCode) {

            case 38: /*up*/
            case 87: /*W*/ this.moveDirection = MoveDirection.Forward; break;

            case 37: /*left*/
            case 65: /*A*/ this.moveDirection = MoveDirection.Left; break;

            case 40: /*down*/
            case 83: /*S*/ this.moveDirection = MoveDirection.Backward; break;

            case 39: /*right*/
            case 68: /*D*/ this.moveDirection = MoveDirection.Right; break;

        }

    };

    onKeyUp = (event: KeyboardEvent) => {
        event.preventDefault();
        event.stopPropagation();

        switch (event.keyCode) {
            
            case 38: /*up*/
            case 87: /*W*/
            case 37: /*left*/
            case 65: /*A*/
            case 40: /*down*/
            case 83: /*S*/
            case 39: /*right*/
            case 68: /*D*/ 
                this.moveDirection = MoveDirection.NotMove;
        }

    };

    moveSpeed:number = 9000;

    update = (delta: number) => {

        this.object.rotation.y = THREE.Math.degToRad(this.xDelta);
         // this.object.rotation.x = THREE.Math.degToRad(this.yDelta);

        if(this.moveDirection == MoveDirection.NotMove) {
            return;
        }

        if(this.moveDirection == MoveDirection.Forward) {
          //  if(this.object.position.z >= -14000)
                this.object.translateZ(-this.moveSpeed * delta);
        }

        if(this.moveDirection == MoveDirection.Backward){ 
            //if(this.object.position.z <= 19000)
                  this.object.translateZ(this.moveSpeed * delta);
        }

        if(this.moveDirection == MoveDirection.Left) {
          //  if(this.object.position.x >= -14000)
                this.object.translateX(-this.moveSpeed * delta);
        }

        if(this.moveDirection == MoveDirection.Right) {
           // if(this.object.position.x <= 17400)
                 this.object.translateX(this.moveSpeed * delta);
        }
    }

    dispose = () => {
        this.object = null;
        this.domElement = null;
    }
}


export {PcPlayerContol};