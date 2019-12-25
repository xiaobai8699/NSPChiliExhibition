/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-25 13:06:19 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2019-12-25 17:11:08
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

         const nspScene = this.scene.getObjectByName("NSP");

        // 计算物体和射线的焦点
        const intersectedObjects = this.raycaster.intersectObjects(nspScene.children);

        if (intersectedObjects.length > 0) {    
            this.pickedObject = intersectedObjects[0];

            console.log(`pick object:${this.pickedObject.object.name}`)
            const obj:THREE.Object3D = this.pickedObject.object;
            obj.translateX(20000);
        } else {

            console.log("Not found!")
        }
    }

    getCanvasRelativePosition = (event: MouseEvent | TouchEvent) => {

        const rect: DOMRect = this.canvas.getBoundingClientRect();

        const position: THREE.Vector2 = new THREE.Vector2();

        if (event instanceof MouseEvent) {

            position.x = event.clientX - rect.left;
            position.y = event.clientY - rect.top;
            
        }

        else if (event instanceof TouchEvent) {

            const touch: Touch = event.changedTouches[0];

            position.x = touch.clientX - rect.left;
            position.y = touch.clientY - rect.top;

        }

        else {
            throw "Incorrect event, needs MouseEvent or TouchEvent";
        }

        return position;
    }

    getPickPoint = (event: MouseEvent | TouchEvent) => {

        const canvasPosition = this.getCanvasRelativePosition(event);

        const pickPoint:THREE.Vector2 = new THREE.Vector2();

        // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
        pickPoint.x = (canvasPosition.x / this.canvas.clientWidth ) * 2 - 1;
        pickPoint.y = (canvasPosition.y / this.canvas.clientHeight) * 2 + 1;

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