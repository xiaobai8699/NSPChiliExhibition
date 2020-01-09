/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-25 08:44:52 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2019-12-31 11:48:34
 */

import * as THREE from 'three';
import { Direction } from './controls/Direction';
import { World } from './World';
import {Const } from './Const';

class Utils {

    // https://stackoverflow.com/questions/3514784/what-is-the-best-way-to-detect-a-mobile-device
    // https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Browser_detection_using_the_user_agent
    static isMobile(): boolean {

        let userAgent = navigator.userAgent || navigator.vendor;

        return (/windows phone/i.test(userAgent)) ||
            (/android/i.test(userAgent)) ||
            (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream);
    }

    static isPc(): boolean {
        return !Utils.isMobile();
    }

    static devicePixelRatio(): number {
        //手机统一设置为2
        // return Utils.isMobile() ? 2 : devicePixelRatio;
        return window.devicePixelRatio;
    }

    static dumpVec3(v3: any, precision = 3) {

        return `${v3.x.toFixed(precision)}, ${v3.y.toFixed(precision)}, ${v3.z.toFixed(precision)}`;

    }

    static dumpObject(obj: any, lines: any = [], isLast = true, prefix = ''): String[] {

        const localPrefix = isLast ? '└─' : '├─';

        lines.push(`${prefix}${prefix ? localPrefix : ''}${obj.name || '*no-name*'} [${obj.type}]`);

        const dataPrefix = obj.children.length
            ? (isLast ? '  │ ' : '│ │ ')
            : (isLast ? '    ' : '│   ');

        lines.push(`${prefix}${dataPrefix}  pos: ${Utils.dumpVec3(obj.position)}`);
        lines.push(`${prefix}${dataPrefix}  rot: ${Utils.dumpVec3(obj.rotation)}`);
        lines.push(`${prefix}${dataPrefix}  scl: ${Utils.dumpVec3(obj.scale)}`);

        const newPrefix = prefix + (isLast ? '  ' : '│ ');

        const lastNdx = obj.children.length - 1;

        obj.children.forEach((child: any, ndx: any) => {
            const isLast = ndx === lastNdx;
            Utils.dumpObject(child, lines, isLast, newPrefix);
        });

        return lines;

    }

    static setRendererSize(renderer: THREE.WebGLRenderer) {

        let w = window.innerWidth;
        let h = window.innerHeight;

        if (this.isMobile() && Direction.isLandscape()) {

            w = window.innerHeight;
            h = window.innerWidth;

        }

        renderer.setSize(w, h);

    }


    static setCameraAspect(camera: THREE.PerspectiveCamera) {

        let aspect = window.innerWidth / window.innerHeight;

        if (this.isMobile() && Direction.isLandscape()) {

            aspect = window.innerHeight / window.innerWidth;
        }

        camera.aspect = aspect;
        camera.updateProjectionMatrix();
    }

    static setCameraFOV(camera: THREE.PerspectiveCamera) {

        let fov: number = 70; // for PC

        if (this.isMobile()) {

            fov = Direction.isPortrait() ? 78 : 66;
        }

        camera.fov = fov;
        camera.updateProjectionMatrix();
    }


    static findAnimationChiliBottles(): THREE.Object3D[] {

        const bottles: THREE.Object3D[] = [];
        const names = ["LJJ1", "LJJ2", "LJJ3", "LJJ4", "64mmA016", "64mmB016", "64mmC016"];

        names.forEach(name => {

            const object: any = World.x().scene.getObjectByName(name);
            bottles.push(object);

            // 设置辣椒瓶的透明效果
            object.children.forEach((o: any) => {

                if (o.material.name == "pingshenA") {

                    o.material.transparent = true;
                    o.material.opacity = 0.7;
                    o.material.side = THREE.DoubleSide;

                }

            });
        });

        return bottles;
    }

    static getSize(object: THREE.Object3D): THREE.Vector3 {

        const box3 = new THREE.Box3();
        box3.setFromObject(object)
        const size: THREE.Vector3 = box3.getSize(new THREE.Vector3());

        return size;

    }
    
    static replaceNspLog() {


        const oldLog: any = World.x().scene.getObjectByName(Const.nspLogName);

        const size: THREE.Vector3 = Utils.getSize(oldLog);

        const geometry = new THREE.PlaneBufferGeometry(size.x, size.y);

        const texture = new THREE.TextureLoader().load(Const.logoUrl);

        const material = new THREE.MeshPhongMaterial({

            map: texture,

            transparent: true,

            alphaTest: .5,

            side: THREE.DoubleSide,
        });

        const newLog = new THREE.Mesh(geometry, material);
        
        newLog.name = Const.nspLogName;

        oldLog.getWorldPosition(newLog.position);

        newLog.rotation.x += THREE.Math.degToRad(14.6);

        oldLog.parent.remove(oldLog);

        World.x().scene.add(newLog);

    }
}


export { Utils };