/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-31 09:26:17 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2020-01-11 17:46:05
 */

//https://threejsfundamentals.org/threejs/lessons/threejs-textures.html
//https://threejsfundamentals.org/threejs/lessons/threejs-canvas-textures.html

import * as THREE from 'three';
import { Utils } from '../common/Utils';
import { World } from '../common/World';
import { Const } from './Const';

let visitorInstance: Visitor = null;

export class Visitor {

    staticVisitors: Set<THREE.Mesh>;
    dynamicVisitors: Set<THREE.Mesh>;

    constructor() {
        this.staticVisitors = new Set();
        this.dynamicVisitors = new Set();
    }

    static x(): Visitor {

        visitorInstance = visitorInstance || new Visitor();
        return visitorInstance;

    }

    newAllVisitors = () => {
        this.getStaticVisitors();
        this.newAllDynamicVisitors();
    }

    getStaticVisitors = () => {

        const names = new Set();
        for (let i = 1; i <= 21; i++) {
            names.add(`people0${i}A`)
        }

        names.forEach((name: string) => {
            const visitor:THREE.Mesh = <THREE.Mesh>World.x().scene.getObjectByName(name);
            this.staticVisitors.add(visitor);
        });

    }



    sprites = new Set<DynamicVisitorSprite>();

    newAllDynamicVisitors = () => {

        const names = ["people022A", "people023A", "people024A", "people025A", "people026A"];
        names.forEach(name => {
            const s = this.newDynamicVisitorSprite(name);
            this.sprites.add(s);
        });
    }


    newDynamicVisitorSprite = (name: string): DynamicVisitorSprite => {

        const ctx = document.createElement('canvas').getContext('2d');

        ctx.canvas.width = 512;
        ctx.canvas.height = 512;

        const texture = new THREE.CanvasTexture(ctx.canvas);

        const mesh = this.newTransparentMesh(name, texture);
        this.dynamicVisitors.add(mesh);

        return new DynamicVisitorSprite(texture, ctx, name);

    }

    update = (detal: number) => {

        this.staticVisitors.forEach(v => {
            v.rotation.z = -World.x().camera.rotation.y;
        });

        this.dynamicVisitors.forEach(v => {
            v.rotation.y = World.x().camera.rotation.y;
        });
        
        this.sprites.forEach(v => {
            v.draw();
        });
    }


    newTransparentMesh = (meshName: string, texture: THREE.Texture): THREE.Mesh => {

        const mesh: any = World.x().scene.getObjectByName(meshName);

        if (mesh) {

            const material = new THREE.MeshStandardMaterial({

                map: texture,

                transparent: true,

                alphaTest: .5,

                side: THREE.DoubleSide,
            });

            const size = Utils.getSize(mesh);

            const geometry = new THREE.PlaneBufferGeometry(size.x, size.y);

            const visitor: THREE.Mesh = new THREE.Mesh(geometry, material);

            mesh.getWorldPosition(visitor.position);

            visitor.name = mesh.name;

            mesh.parent.remove(mesh);

            World.x().scene.add(visitor);

           return visitor;
        }

        else {

            console.error(`not found visitor:${meshName}`);

        }
    }
}


class DynamicVisitorSprite {

    texture: THREE.CanvasTexture;

    context: CanvasRenderingContext2D;

    textureName: string;

    index: number;

    count: number;

    image: HTMLImageElement = null;

    loading: boolean = false;

    lastFrameTime: number = 0;

    constructor(texture: THREE.CanvasTexture, ctx: CanvasRenderingContext2D, textureName: string) {

        this.texture = texture;

        this.context = ctx;

        this.textureName = textureName;

        this.index = 0;

        this.count = 46;

        this.image = null;

    }



    draw = () => {

        if (this.loading) return;

        const now = Date.now();
        const interval = (now - this.lastFrameTime) / 1000;
        const fps = (1 / 15);
        if (this.lastFrameTime != 0 && interval < fps) {
            return;
        }
        this.lastFrameTime = now;


        if (this.index == this.count) {
            this.index = 0;
        }

        if (this.image) {

            const size = 512;

            const sx = this.index * size;

            this.index++;

            this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

            //https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage
            this.context.drawImage(this.image, sx, 0, size, size, 0, 0, size, size);

            this.texture.needsUpdate = true;

        }
        else {

            this.loading = true;

            const self = this;

            const image = new Image();

            // 跨域
            image.setAttribute('crossOrigin', 'anonymous');

            image.src = Const.dynamicVisitorUrl(this.textureName);

            image.onload = () => {

                self.loading = false;

                self.image = image;

            };

            image.onerror = (err) => {

                console.error(`[DynamicVisitorSprite] load image error: ${err}`);

            }
        }

    }
}