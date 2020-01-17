/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-31 09:26:17 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2020-01-17 14:33:24
 */

//https://threejsfundamentals.org/threejs/lessons/threejs-textures.html
//https://threejsfundamentals.org/threejs/lessons/threejs-canvas-textures.html

import * as THREE from 'three';
import { Utils } from './utils/Utils';
import { World } from './World';
import { Resource } from './config/Resource';

let visitorInstance: Visitor = null;

const spriteSize = 512;
const spriteNameArr:Array<string> = ["people022A", "people023A", "people024A", "people025A", "people026A"];

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
        this.newAllVisitorsSprites();

        VisitorDownloader.start((e:any)=>{

        });
    }

    getStaticVisitors = () => {

        const names = new Set();
        for (let i = 1; i <= 21; i++) {
            names.add(`people0${i}A`)
        }

        names.forEach((name: string) => {
            const visitor: THREE.Mesh = <THREE.Mesh>World.x().scene.getObjectByName(name);
            this.staticVisitors.add(visitor);
        });

        //xiong qi
        const self = this;
        new THREE.TextureLoader().load(
            Resource.staticVisitorUrl("xiong2"),

            function (texture) {
                self.newTransparentMesh("people01A", texture);
            }
        );
    }

    sprites = new Set<VisitorSprite>();

    newAllVisitorsSprites = () => {

        spriteNameArr.forEach(name => {
            const s = this.newVisitorSprite(name);
            this.sprites.add(s);
        });
    }


    newVisitorSprite = (name: string): VisitorSprite => {

        const ctx = document.createElement('canvas').getContext('2d');

        ctx.canvas.width = 512;
        ctx.canvas.height = 512;

        const texture = new THREE.CanvasTexture(ctx.canvas);

        const mesh = this.newTransparentMesh(name, texture);
        this.dynamicVisitors.add(mesh);

        return new VisitorSprite(texture, ctx, name);

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


class VisitorSprite {

    texture: THREE.CanvasTexture;

    context: CanvasRenderingContext2D;

    textureName: string;

    index: number;

    count: number;

    lastFrameTime: number = 0;

    constructor(texture: THREE.CanvasTexture, ctx: CanvasRenderingContext2D, textureName: string) {

        this.texture = texture;

        this.context = ctx;

        this.textureName = textureName;

        this.index = 0;

    }


    draw = () => {
        const sprites = VisitorDownloader.memoryCache.get(this.textureName);
        if(!sprites){
            return;
        }

        const now = Date.now();
        const interval = (now - this.lastFrameTime) / 1000;
        const fps = (1 / 15);
        if (this.lastFrameTime != 0 && interval < fps) {
            return;
        }
        this.lastFrameTime = now;

        if (this.index == 45) {
            this.index = 0;
        }

        const image  = sprites[this.index];
        this.index++;

        this.context.clearRect(0, 0, spriteSize,spriteSize);
        this.context.drawImage(image, 0, 0, spriteSize, spriteSize, 0, 0, spriteSize, spriteSize);
        this.texture.needsUpdate = true;
    }
}


export class VisitorSpriteLoader {

  static  counter:number = 0;

  static memoryCache:any = {};

   static load(callback:Function) {
       
        spriteNameArr.forEach(name => {

            this._load(name, (e?:any)=>{
                
                if(e){
                    callback(e);
                }else {
                    
                    this.counter++;
                    if(this.counter == spriteNameArr.length){
                        console.log(`[VisitorSpriteDownloader]完成精灵创建${this.counter}`);
                        callback();
                    }
                }
            })

        });
    }

   static _load = (imageName: string, callback:Function) => {

        const loader = new THREE.ImageLoader();

        loader.load(

            Resource.dynamicVisitorUrl(imageName),

            (image) => {

                let promiseArr = [];

                for (let i = 0; i < 46; i++) {
                    const x = i * spriteSize;

                    //createImageBitmap在Safari浏览器上不被支持，因此会导致在iPhone上无法显示精灵图
                    //https://caniuse.com/#feat=createimagebitmap
                    let promise = createImageBitmap(image, x, 0, spriteSize, spriteSize);
                    promiseArr.push(promise);
                }

                Promise.all(promiseArr)
                    .then(sprites => {
                        VisitorSpriteLoader.memoryCache[imageName] = sprites;
                        console.log(`[VisitorSpriteDownloader]创建精灵${imageName}:${sprites.length}`);
                        callback();
                    })
                    .catch(e => {
                        console.error(`[VisitorSpriteDownloader]${e}`);
                        callback(e);
                    });
            },

            undefined,

            (err) => {
                console.error(`[VisitorSpriteDownloader] ${err}`);
                callback(err);
            }
        );

    }

}


export class VisitorDownloader {

  static memoryCache = new Map();

   static start = (callback:Function) =>{

        const mapArr = new Map();

        for(let i = 1; i <= 5;i++){
            const arr:Array<string> = [];

            for(let j = 1; j <= 46; j++){
                const name = `VisitorSprite${i}_${j}`;
                arr.push(name);
            }

            const key:any = spriteNameArr[i-1];
            mapArr.set(key, arr);
        }


        let counter = 0;

        mapArr.forEach((v,k)=>{
            VisitorDownloader.download(v,k,function(image:ImageBitmap, err:any){
                
                if(image){
                    VisitorDownloader.memoryCache.set(k,image);
                    counter++;
                    if(counter == mapArr.size){
                        if(callback){
                            callback();
                        }
                    }
                }else {
                    if(callback){
                        callback(err);
                    }
                }
            });
        });
    }

   static download = (nameArr:Array<string>, key:string, callback:Function) => {

        const promiseArr:Array<any> = [];

        nameArr.forEach( name => {

            const promise = new Promise((res, rej) => {

                // 注意：safari浏览不支持createbitimage方法，不能使用ImageBitmapLoader
                var loader = new THREE.ImageLoader();

                loader.load(

                    Resource.dynamicVisitorUrl(name),

                    function (imageBitmap) {
                        res(imageBitmap);
                    },

                    undefined,

                    function (err) {
                        console.log(`[VisitorDownloader]: ERR:${err}`);
                        rej(err);
                    }
                );

            });


            promiseArr.push(promise);
        });

        Promise.all(promiseArr)
        .then(imageArr =>{
            if(callback){
                callback(imageArr, undefined);
            }
        })
        .catch(err => {
            callback(undefined, err);
        });
        
    }

}