/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2020-01-08 17:52:35 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2020-01-12 16:38:05
 */

import '../../css/mapcontrol.css';

let controlMapInstance: ControlMap = null;

export enum ControlMapLayout {
    Landscape = 0,  //横屏
    Portrait  = 1   //竖屏
}

export class ControlMap {

    map: HTMLDivElement = null;

    point: HTMLDivElement = null;

    layout: ControlMapLayout = ControlMapLayout.Landscape;

    pointInitOffsetTop: number;
    pointInitOffsetLeft: number;

    static x(): ControlMap {
        controlMapInstance = controlMapInstance || new ControlMap();
        return controlMapInstance;
    }

    constructor() {

        const body = document.querySelector('body');

        if (!body) {
            throw "页面中没有body元素";
        }

        this.map = document.createElement('div');
        this.map.setAttribute("id", "map-control");
        this.map.classList.add("map-control");
        this.map.classList.add("map-control-portrait");
        this.updateLayout();

        this.map.addEventListener('touchstart', this.onTouchStart, false);
        this.map.addEventListener('touchmove', this.onTouchMove, false);
        this.map.addEventListener('touchend', this.onTouchEnd, false);
        this.map.addEventListener('touchcancle', this.onTouchCancle, false);

        this.point = document.createElement('div');
        this.point.classList.add("map-control-point");

        body.appendChild(this.map);
        this.map.appendChild(this.point);

        this.pointInitOffsetTop = this.point.offsetTop;
        this.pointInitOffsetLeft = this.point.offsetLeft;

    }


    updateLayout = (layout?:ControlMapLayout) => {
        this.layout = layout != undefined ? layout : ControlMapLayout.Landscape;
       
        const l = "map-control-landscape";
        const p = "map-control-portrait";
        const cls = this.layout == ControlMapLayout.Landscape ? l: p;

        this.map.classList.remove(l);
        this.map.classList.remove(p);
        this.map.classList.add(cls);
    }

    onTouchStart = (e: TouchEvent) => {

        e.preventDefault();
        e.stopPropagation();

    }


    moveForward: boolean = false;
    moveBackward: boolean = false;

    moveLeft: boolean = false;
    moveRight: boolean = false;

    angle: number = 0;

    onTouchMove = (e: TouchEvent) => {

        e.preventDefault();
        e.stopPropagation();

        if (this.map.clientHeight != this.map.clientWidth) {
            throw "map control的宽高必须相等";
        }

        const touch = e.changedTouches.item(0);

        //1、限制移动范围
        const canHorizontalMove = (touch.clientX >= this.map.offsetLeft && touch.clientX <= this.map.offsetLeft + this.map.clientWidth);
        const canVerticalMove = (touch.clientY >= this.map.offsetTop && touch.clientY < this.map.offsetTop + this.map.clientHeight);
        if (!canHorizontalMove || !canVerticalMove) {
            return;
        }

        //2、移动控制点
        const pointOffsetLeft = touch.clientX - this.point.clientWidth / 2 - this.map.offsetLeft;
        this.point.style.left = `${pointOffsetLeft}`;

        const pointOffsetTop = touch.clientY - this.point.clientHeight / 2 - this.map.offsetTop;
        this.point.style.top = `${pointOffsetTop}`;


        //3、转换触摸点的坐标为以map中心为坐标原点的坐标系中的点
        const x = touch.clientX - (this.map.offsetLeft + this.map.clientWidth / 2);
        const y = -touch.clientY + (this.map.offsetTop + this.map.clientHeight / 2);

        // 以map control直径的一半作为圆的半径
        const R = this.map.clientWidth / 2;

        const px = Math.abs(x);
        const py = Math.abs(y);

        //4、将用户点击的在y轴的任意点转换为以R为半径的圆的圆周上点y2
        const r = Math.sqrt(px * px + py * py);
        const y2 = R * (py / r);

        //5、将y2转换为单位圆上的点ny
        const ny = y2 / R;

        //6、在单位圆上有ny=cos0,可以将ny作为反余弦函数的输入值来求角度
        const degree = Math.asin(ny) * (180 / Math.PI);

        //7、判断点击点处于那个象限以计算出最终角度

        if (x > 0 && y > 0) {

            this.angle = degree;
        }

        else if (x < 0 && y >= 0) {

            this.angle = 180 - degree;
        }

        else if (x < 0 && y < 0) {

            this.angle = 180 + degree;
        }

        else if (x >= 0 && y < 0) {

            this.angle = 360 - degree;
        }

        else {
        }

        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;

        //8、 判断角度范围确定移动的方向

        let isLandscape = (this.layout == ControlMapLayout.Landscape);

        if (this.angle > 45 && this.angle < 135) {
            isLandscape ? this.moveLeft = true : this.moveForward = true;
        }

        else if (this.angle > 135 && this.angle < 225) {
            isLandscape ? this.moveBackward = true : this.moveLeft = true;
        }

        else if (this.angle > 225 && this.angle < 315) {
           isLandscape ? this.moveRight = true : this.moveBackward = true;
        }

        else if (this.angle > 315 || this.angle < 45) {
           isLandscape ? this.moveForward = true : this.moveRight = true;
        }
    }



    onTouchEnd = (e: TouchEvent) => {

        this.reset();
    }

    onTouchCancle = (e: TouchEvent) => {

        this.reset();
    }

    reset = () => {

        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;

        this.point.style.left = `${this.pointInitOffsetLeft}`;
        this.point.style.top = `${this.pointInitOffsetTop}`;
    }

    isMoving = () => {
        return this.moveForward || this.moveLeft || this.moveRight || this.moveBackward;
    }
}