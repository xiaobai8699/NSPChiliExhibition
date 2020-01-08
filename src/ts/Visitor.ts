/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-31 09:26:17 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2020-01-08 20:56:08
 */

//https://threejsfundamentals.org/threejs/lessons/threejs-textures.html
//https://threejsfundamentals.org/threejs/lessons/threejs-canvas-textures.html

import * as THREE from 'three';
import { Utils } from './Utils';
import { World } from './World';
import { Const } from './Const';

let visitorInstance: Visitor = null;

export class Visitor {

    allVisitors: Set<THREE.Mesh>;

    constructor() {

        this.allVisitors = new Set();
    }

    static x(): Visitor {

        visitorInstance = visitorInstance || new Visitor();
        return visitorInstance;

    }

    newAllVisitors = () => {

        this.newAllStaticVisitor();
        this.newAllDynamicVisitors();

    }

    newAllStaticVisitor = () => {

        this.allVisitors.clear();

        const names = new Set();

        for (let i = 1; i <= 21; i++) {

            names.add(`people0${i}A`)

        }

        names.forEach((name: string) => {

            this.newStaticVisitor(name);

        });

    }


    newStaticVisitor = (name: string) => {

        const loader: THREE.TextureLoader = new THREE.TextureLoader();

        loader.load(

            Const.staticVisitorUrl(name),

            texture => {

                this.newTransparentVisitor(name, texture);

            },

            undefined,

            err => {
                console.log(`[Visitor]: load texture failed! ${err}`)
            });
    }

    sprites = new Set<DynamicVisitorSprite>();

    newAllDynamicVisitors = () => {

        const names = ["people022A","people023A","people024A","people025A", "people026A"];
        
        names.forEach( name => {

          const s = this.newDynamicVisitorSprite(name);
          this.sprites.add(s);

        });
    }


    newDynamicVisitorSprite = (name: string): DynamicVisitorSprite => {

        const ctx = document.createElement('canvas').getContext('2d');

        ctx.canvas.width = 512;
        ctx.canvas.height = 512;

        const texture = new THREE.CanvasTexture(ctx.canvas);

        this.newTransparentVisitor(name, texture);

        return new DynamicVisitorSprite(texture, ctx, name);

    }

    update = (detal: number) => {

        this.allVisitors.forEach(v => {

            // 实时让观众与摄像机方向保持一直
            v.rotation.y = World.x().camera.rotation.y;

        });


        this.sprites.forEach(v => {

             v.draw();

        });
    }


    newTransparentVisitor = (name: string, texture: THREE.Texture) => {

        const mesh: any = World.x().scene.getObjectByName(name);

        if (mesh) {

            const material = new THREE.MeshStandardMaterial({

                 map:  texture,

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

            this.allVisitors.add(visitor);
        }

        else {

            console.error(`not found visitor:${name}`);

        }
    }
}


class DynamicVisitorSprite {

    texture: THREE.CanvasTexture;

    context: CanvasRenderingContext2D;

    name: string;

    index: number;

    count: number;

    image: HTMLImageElement = null;

    loading: boolean = false;

    lastFrameTime: number = 0;

    constructor(texture: THREE.CanvasTexture, ctx: CanvasRenderingContext2D, name: string) {

        this.texture = texture;

        this.context = ctx;

        this.name = name;

        this.index = 0;

        this.count = 46;
        
        this.image = null;

    }



    draw = () => {

        if(this.loading) return;

        const now = Date.now();
        const interval = (now - this.lastFrameTime) / 1000;
        const fps = (1 / 15);
        if(this.lastFrameTime != 0 && interval < fps) {
            return;
        }
        this.lastFrameTime = now;
        

        if(this.index == this.count) {
            this.index = 0;
        }

        if(this.image) {

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

            image.src = Const.dynamicVisitorUrl(this.name);

            image.onload = () => {
                
                self.loading = false;

                self.image = image;

                self.draw();

            };

            image.onerror = (err) => {

                console.error(`[DynamicVisitorSprite] load image error: ${err}`);

            }
        }

    }
}