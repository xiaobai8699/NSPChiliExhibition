/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-25 13:06:19 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2019-12-25 15:23:42
 */

// 参考：
// https://threejsfundamentals.org/threejs/lessons/threejs-picking.html
 

import * as THREE from 'three';

export class PickupManager {

    raycaster: THREE.Raycaster;

    camera: THREE.Camera;

    scene: THREE.Scene;

    canvas: HTMLCanvasElement;

    constructor(camera: THREE.Camera, scene: THREE.Scene, canvas: HTMLCanvasElement) {

        this.raycaster = new THREE.Raycaster();

        this.camera = camera;

        this.scene = scene;

        this.canvas = canvas;

        this.addEventListener();
    }

    pickedObject: THREE.Object3D | any;

    pick = (normalizedPosition: THREE.Vector2) => {

        // 通过摄像机和鼠标位置更新射线
        this.raycaster.setFromCamera(normalizedPosition, this.camera);

        // 计算物体和射线的焦点
        const intersectedObjects = this.raycaster.intersectObjects(this.scene.children);

        if (intersectedObjects.length > 0) {

            this.pickedObject = intersectedObjects[0];

            console.log(`pick object:${this.pickedObject.name}`)
        } else {

            console.log("Not found!")
        }
    }

    getCanvasRelativePosition = (event: MouseEvent | TouchEvent) => {

        const rect: DOMRect = this.canvas.getBoundingClientRect();

        if (event instanceof MouseEvent) {

            const position: THREE.Vector2 = new THREE.Vector2();

            position.x = event.pageX - rect.left;

            position.y = event.pageY - rect.top;

            return position;
        }

        else if (event instanceof TouchEvent) {

            const touch: Touch = event.changedTouches[0];

            const position: THREE.Vector2 = new THREE.Vector2();

            position.x = touch.clientX - rect.left;

            position.y = touch.clientY - rect.top;

            return position;

        }

        else {
            throw "Incorrect event, needs MouseEvent or TouchEvent";
        }
    }

    getPickPoint = (event: MouseEvent | TouchEvent) => {

        const canvasPosition = this.getCanvasRelativePosition(event);

        console.log(`canvasPosition: ${JSON.stringify(canvasPosition)}`);

        const pickPoint:THREE.Vector2 = new THREE.Vector2();

        // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
        pickPoint.x = (canvasPosition.x / this.canvas.width ) * 2 - 1;
        pickPoint.y = (canvasPosition.y / this.canvas.height) * 2 + 1;

        console.log(`pickPoint: ${JSON.stringify(pickPoint)}`);

        return pickPoint;
        
    }

    addEventListener = () => {

        this.canvas.addEventListener('mousedown', this.onMouseDown, false);
        this.canvas.addEventListener('mousemove', this.onMouseMove, false);
        this.canvas.addEventListener('mouseup',   this.onMouseUp,   false);

        this.canvas.addEventListener('touchstart', this.onTouchStart, false);
        this.canvas.addEventListener('touchmove',  this.onTouchMove,  false);
        this.canvas.addEventListener('touchend',   this.onTouchEnd,   false);

    }

    onMouseDown = (event: MouseEvent) => {

        event.preventDefault();

        this.pick(this.getPickPoint(event));

    }

    onMouseMove = (event: MouseEvent) => {

    }

    onMouseUp = (event: MouseEvent) => {

    }

    onTouchStart = (event: TouchEvent) => {

        event.preventDefault();

        this.pick(this.getPickPoint(event));

    }

    onTouchMove = (event: TouchEvent) => {
        
    }

    onTouchEnd = (event: TouchEvent) => {
        
    }
}