/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-25 13:06:19 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2019-12-28 15:49:38
 */

// 参考：
// https://threejsfundamentals.org/threejs/lessons/threejs-picking.html
 

import * as THREE from 'three';
import { Utils } from './utils/Utils';
import {World} from './World';
import {ProductManager} from './ProductManager';

let pickupManager: PickupManager;

export class PickupManager {

    raycaster: THREE.Raycaster;

    camera: THREE.Camera;

    scene: THREE.Scene;

    canvas: HTMLCanvasElement;

    constructor() {

        this.raycaster = new THREE.Raycaster();

        this.camera = World.x().camera;

        this.scene =  World.x().scene;

        this.canvas = World.x().renderer.domElement;

        this.addEventListener();
    }

    static x(): PickupManager {
        pickupManager = pickupManager || new PickupManager();
        return pickupManager;
    }

    pickedObject: THREE.Object3D | any;

    pick = (normalizedPosition: THREE.Vector2) => {

        // 通过摄像机和鼠标位置更新射线
        this.raycaster.setFromCamera(normalizedPosition, this.camera);

        // 计算物体和射线的焦点
        const intersectedObjects = this.raycaster.intersectObjects(this.getIntersectedObjects(),true);

        if (intersectedObjects.length > 0) { 

            this.pickedObject = intersectedObjects[0];

            const obj:THREE.Object3D = this.pickedObject.object;

            const name = obj.parent.name ? obj.parent.name : obj.name;
            
            ProductManager.x().showProduct(name);
            
            console.log(`selected object: ${name}`);

        } else {

            console.log("Not found!")
        }
    }

    getCanvasRelativePosition = (event: MouseEvent | TouchEvent) => {

        const rect: DOMRect = this.canvas.getBoundingClientRect();

        const position: THREE.Vector2 = new THREE.Vector2();

        if (event instanceof MouseEvent) {

            position.x = event.clientX ;
            position.y = event.clientY;
            
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

        // 屏幕坐标转世界坐标的推导过程:
        // http://note.youdao.com/noteshare?id=fa72f3c8ccacc54a8e7ad56fa4feba1a
        // https://zhuanlan.zhihu.com/p/90295867?utm_source=wechat_session&utm_medium=social&utm_oi=615939963313983488
        if(Utils.isMobile()){

            pickPoint.x = (canvasPosition.x / window.innerWidth ) *  2 - 1;
            pickPoint.y = (canvasPosition.y / window.innerHeight) * -2 + 1;

        }else {

            pickPoint.x = (canvasPosition.x / window.innerWidth ) *  2 - 1;
            pickPoint.y = (canvasPosition.y / window.innerHeight) * -2 + 1;

        }
     
        return pickPoint;
        
    }

    addEventListener = () => {

        this.canvas.addEventListener('mousedown', this.onClick, false);
        this.canvas.addEventListener('touchstart', this.onClick, false);
    }

    onClick = (event: MouseEvent | TouchEvent) => {

        event.preventDefault();
        this.pick(this.getPickPoint(event));

    }


    ljj1: THREE.Object3D = null;
    ljj2: THREE.Object3D = null;
    ljj3: THREE.Object3D = null;
    ljj4: THREE.Object3D = null;
    ljj5: THREE.Object3D = null;
    ljj6: THREE.Object3D = null;
    ljj7: THREE.Object3D = null;

    getIntersectedObjects = ()=>{
        
        this.ljj1 = this.ljj1 || this.scene.getObjectByName("LJJ1");
        this.ljj2 = this.ljj2 || this.scene.getObjectByName("LJJ2");
        this.ljj3 = this.ljj3 || this.scene.getObjectByName("LJJ3");
        this.ljj4 = this.ljj4 || this.scene.getObjectByName("LJJ4");
        this.ljj5 = this.ljj5 || this.scene.getObjectByName("64mmA016");
        this.ljj6 = this.ljj6 || this.scene.getObjectByName("64mmB016");
        this.ljj7 = this.ljj7 || this.scene.getObjectByName("64mmC016");

        const objects = [
            this.ljj1, 
            this.ljj2, 
            this.ljj3,
            this.ljj4, 
            this.ljj5,
            this.ljj6, 
            this.ljj7];

        return objects;
    }
}