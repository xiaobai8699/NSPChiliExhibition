/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2020-01-12 13:42:03 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2020-01-17 14:08:12
 */

import '../../css/layout.css';
import '../../css/product.css';

import * as THREE from 'three';
import { World } from '../World';
import { Utils } from '../utils/Utils';
import { VirtualJoystick, VirtualJoystickLayout } from '../controls/VirtualJoystick';
import { MobileRotateControls } from '../controls/MobileRotateControls';
import {Config} from './Config';

export enum LayoutDirection {
    Horizontal = 0,  //横屏
    Vertical = 1   //竖屏
}

let layoutInstance: Layout = null;

const LayoutChangeEvent = "LiHong_LayoutChangeEvent";

export class Layout {

    layout: LayoutDirection = LayoutDirection.Horizontal;

    app: HTMLDivElement;

    canvas: HTMLCanvasElement;

    camera: THREE.PerspectiveCamera;

    renderer: THREE.WebGLRenderer;


    static x(): Layout {

        layoutInstance = layoutInstance || new Layout();
        return layoutInstance;
    }

    constructor() {

        this.camera = World.x().camera;
        this.renderer = World.x().renderer;

        this.app = document.querySelector("#app");
        this.canvas = document.querySelector("#canvas");

        window.addEventListener("resize", this.onWindowResize, false);

        if(Utils.isPc()){
            this.vertical();
        }else {
            Config.isLandscapeDisplay ? this.horizontal() : this.vertical();
        }

        const rotateButton: HTMLDivElement = document.querySelector("#rotate_button");
        Utils.isPc() ? rotateButton.style.display = "none" : rotateButton.addEventListener("click", this.rotate, false);
    }

    rotate = () => {
        this.layout == LayoutDirection.Vertical ? this.horizontal() : this.vertical();
    }

    vertical = () => {

        this.layout = LayoutDirection.Vertical;

        if (this.app.classList.contains('app-horizontal')) {

            this.app.classList.remove('app-horizontal');
            //this.app.classList.add('app-vertical');
        }

        let product: HTMLCanvasElement = document.querySelector("#product-page");
        product.classList.remove("product-page-horizontal");
        product.classList.add("product-page-vertical");

        this.app.style.width = `${window.innerWidth}`;
        this.app.style.height = `${window.innerHeight}`;

        this.canvas.style.width = `${window.innerWidth}`;
        this.canvas.style.height = `${window.innerHeight}`;

        this.setupRenderSize();
        this.setupCameraAspect();
        this.setupCameraFov();

        if (Utils.isMobile()) {
            VirtualJoystick.x().updateLayout(VirtualJoystickLayout.Portrait);
            MobileRotateControls.x().updateDirection(LayoutDirection.Vertical);
        }
    }

    horizontal = () => {

        this.layout = LayoutDirection.Horizontal;

        // this.app.classList.remove('app-vertical');
        this.app.classList.add('app-horizontal');

        this.app.style.width = `${window.innerHeight}`;
        this.app.style.height = `${window.innerWidth}`;

        this.canvas.style.width = `${window.innerHeight}`;
        this.canvas.style.height = `${window.innerWidth}`;

        let product: HTMLCanvasElement = document.querySelector("#product-page");
        product.classList.remove("product-page-vertical");
        product.classList.add("product-page-horizontal");

        this.setupRenderSize();
        this.setupCameraAspect();
        this.setupCameraFov();

        if (Utils.isMobile()) {
            VirtualJoystick.x().updateLayout(VirtualJoystickLayout.Landscape);
            MobileRotateControls.x().updateDirection(LayoutDirection.Horizontal);
        }
    }

    setupRenderSize = () => {

        let w = window.innerWidth;
        let h = window.innerHeight;

        if (Utils.isMobile()) {
            if (this.layout == LayoutDirection.Horizontal) {
                w = window.innerHeight;
                h = window.innerWidth;
            }
        }

        this.renderer.setSize(w, h);
    }

    setupCameraAspect = () => {

        let aspect = window.innerWidth / window.innerHeight;
        if (Utils.isMobile() && this.layout == LayoutDirection.Horizontal) {
            aspect = window.innerHeight / window.innerWidth;
        }
        this.camera.aspect = aspect;
        this.camera.updateProjectionMatrix();
    }

    setupCameraFov = () => {

        let fov: number = 70;
        if (Utils.isMobile()) {
            fov = (this.layout == LayoutDirection.Vertical) ? 78 : 59;
        }
        this.camera.fov = fov;
        this.camera.updateProjectionMatrix();
    }

    onWindowResize = () => {

        this.setupRenderSize();
        this.setupCameraAspect();
    }
}