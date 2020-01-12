/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2020-01-12 13:42:03 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2020-01-12 16:08:34
 */

import '../css/layout.css';
import * as THREE from 'three'; 
import {World} from './World';
import {Utils} from './Utils';
import {ControlMap,ControlMapLayout} from './controls/ControlMap';
import { MobileRotateControls } from './controls/MobileRotateControls';

export enum LayoutEnum{
    Horizontal = 0,  //横屏
    Vertical   = 1   //竖屏
}
 
let layoutInstance:Layout = null;

const LayoutChangeEvent = "LiHong_LayoutChangeEvent";

 export class Layout {
    
    layout: LayoutEnum;

    app: HTMLDivElement;

    canvas: HTMLCanvasElement;

    camera: THREE.PerspectiveCamera;

    renderer: THREE.WebGLRenderer;

    w: number;

    h: number;

    static x():Layout {

        layoutInstance = layoutInstance || new Layout();
        return layoutInstance;
    }

    constructor(){

        this.camera = World.x().camera;
        this.renderer = World.x().renderer;

        this.w = window.innerWidth;
        this.h = window.innerHeight;
        
        this.app = document.querySelector("#app");
        this.canvas = document.querySelector("#canvas");

        window.addEventListener("resize", this.onWindowResize, false);

        this.horizontal();
    }

    vertical = () =>{

        this.layout = LayoutEnum.Vertical;

        if(this.app.classList.contains('app-horizontal')){

            this.app.classList.remove('app-horizontal');
            this.app.classList.add('app-vertical');
        }

        this.app.style.width  = `${this.w}`;
        this.app.style.height = `${this.h}`;

        this.canvas.style.width  = `${this.w}`;
        this.canvas.style.height = `${this.h}`;

        this.renderer.setSize(this.w, this.h);
        this.setupCameraAspect();
        this.setupCameraFov();

        ControlMap.x().updateLayout(ControlMapLayout.Portrait);
        MobileRotateControls.x().updateDirection(LayoutEnum.Vertical);
    }

    horizontal = () =>{

        this.layout = LayoutEnum.Horizontal;
        
        this.app.classList.remove('app-vertical');
        this.app.classList.add('app-horizontal');

        this.app.style.width  = `${this.h}`;
        this.app.style.height = `${this.w}`;

        this.canvas.style.width = `${this.h}`;
        this.canvas.style.height = `${this.w}`;

        this.renderer.setSize(this.h, this.w);
        this.setupCameraAspect();
        this.setupCameraFov();

        ControlMap.x().updateLayout(ControlMapLayout.Landscape);
        MobileRotateControls.x().updateDirection(LayoutEnum.Horizontal);
    }

    setupCameraAspect = () => {

        let aspect = this.w / this.h;
        if (Utils.isMobile() && this.layout == LayoutEnum.Horizontal) {
            aspect = this.h / this.w;
        }
        this.camera.aspect = aspect;
        this.camera.updateProjectionMatrix();
    }

    setupCameraFov = () => {

        let fov: number = 70; 
        if (Utils.isMobile()) {
            fov = (this.layout == LayoutEnum.Vertical) ? 78 : 59;
        }
        this.camera.fov = fov;
        this.camera.updateProjectionMatrix();
    }

    onWindowResize = () =>{
        
        this.setupCameraFov();
        this.setupCameraAspect();
    }
 }