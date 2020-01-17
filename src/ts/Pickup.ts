/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-25 13:06:19 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2020-01-12 16:01:16
 */

// 参考：
// https://threejsfundamentals.org/threejs/lessons/threejs-picking.html


import * as THREE from 'three';
import { Utils } from './utils/Utils';
import { World } from './World';
import { Product } from './Product';
import { Chili } from './Chili';
import { Kepu } from './Kepu';
import { Layout, LayoutDirection } from './config/Layout';

let pickupInstance: Pickup;

export class Pickup {

    raycaster: THREE.Raycaster;

    camera: THREE.Camera;

    scene: THREE.Scene;

    canvas: HTMLCanvasElement;

    constructor() {

        this.raycaster = new THREE.Raycaster();

        this.camera = World.x().camera;

        this.scene = World.x().scene;

        this.canvas = World.x().renderer.domElement;

        this.addEventListener();
    }

    static x(): Pickup {
        pickupInstance = pickupInstance || new Pickup();
        return pickupInstance;
    }

    pickedObject: THREE.Object3D | any;

    pick = (normalizedPosition: THREE.Vector2) => {

        // 通过摄像机和鼠标位置更新射线
        this.raycaster.setFromCamera(normalizedPosition, this.camera);

        // 计算物体和射线的焦点
        const objects = [...Chili.x().rotatedBottles, ...Kepu.x().objects];
        const intersectedObjects = this.raycaster.intersectObjects(objects, true);

        if (intersectedObjects.length > 0) {

            this.pickedObject = intersectedObjects[0];

            const obj: any = this.pickedObject.object;

            const name = obj.parent.name ? obj.parent.name : obj.name;

            if (this.pickedObject.distance < 20) {
                Product.x().show(name);
                Kepu.x().show(name);
            }
            console.log(`[Pickup] name:${name} distance:${this.pickedObject.distance}`);
        }
    }

    getCanvasRelativePosition = (event: MouseEvent | TouchEvent) => {

        const rect: DOMRect = this.canvas.getBoundingClientRect();

        const position: THREE.Vector2 = new THREE.Vector2();

        if (event instanceof MouseEvent) {

            position.x = event.clientX;
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

        const pickPoint: THREE.Vector2 = new THREE.Vector2();

        // 屏幕坐标转世界坐标的推导过程:
        // http://note.youdao.com/noteshare?id=fa72f3c8ccacc54a8e7ad56fa4feba1a
        // https://zhuanlan.zhihu.com/p/90295867?utm_source=wechat_session&utm_medium=social&utm_oi=615939963313983488
        if (Utils.isMobile() && Layout.x().layout == LayoutDirection.Horizontal) {

            pickPoint.x = ((2 * canvasPosition.y) - window.innerHeight) / window.innerHeight;
            pickPoint.y = ((2 * canvasPosition.x) - window.innerWidth) / window.innerWidth;

        } else {

            pickPoint.x = (canvasPosition.x / window.innerWidth) * 2 - 1;
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
}