/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2020-01-08 17:52:35 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2020-01-08 19:23:13
 */


export class ControlMap {

    map: HTMLDivElement = null;

    point: HTMLDivElement = null;

    pointInitOffsetTop: number;
    pointInitOffsetLeft: number;

    constructor() {

        const body = document.querySelector('body');

        if (!body) {
            throw "页面中没有body元素";
        }

        this.map = document.createElement('div');
        this.map.setAttribute("id","map-control");
        this.map.classList.add("map-control");
        this.map.classList.add("map-control-portrait");

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

    lastPointOffsetLeft: number = 0;
    lastPointOffsetTop: number = 0;

    onTouchStart = (e: TouchEvent) => {

        e.preventDefault();
        e.stopPropagation();

        this.lastPointOffsetLeft = 0;
        this.lastPointOffsetTop = 0;

    }

  
    moveForward: boolean = false;
    moveBackward: boolean = false;

    moveLeft: boolean = false;
    moveRight: boolean = false;

    onTouchMove = (e: TouchEvent) => {

        e.preventDefault();
        e.stopPropagation();

        if (this.map.clientHeight != this.map.clientWidth) {
            throw "map control的宽高必须相等";
        }

        const touch = e.changedTouches.item(0);

        const canHorizontalMove = (touch.clientX >= this.map.offsetLeft && touch.clientX <= this.map.offsetLeft + this.map.clientWidth);

        const canVerticalMove = (touch.clientY >= this.map.offsetTop && touch.clientY < this.map.offsetTop + this.map.clientHeight);

        if (!canHorizontalMove && !canVerticalMove) {
            return;
        }

        //移动控制点
        const pointOffsetLeft = touch.clientX - this.point.clientWidth / 2 - this.map.offsetLeft;
        this.point.style.left = `${pointOffsetLeft}`;
        this.lastPointOffsetLeft = pointOffsetLeft;

        const pointOffsetTop = touch.clientY - this.point.clientHeight / 2 - this.map.offsetTop;
        this.point.style.top = `${pointOffsetTop}`;
        this.lastPointOffsetLeft = pointOffsetTop;


        //计算点击点在map control中的坐标。这里将点击的屏幕坐标转换为map control坐标
        const x = touch.clientX - (this.map.offsetLeft + this.map.clientWidth / 2);
        const y = (this.map.offsetTop + this.map.clientHeight / 2) - touch.clientY;

        // 以map control直径的一半作为圆的半径
        const R = this.map.clientWidth / 2;

        const px = Math.abs(x);
        const py = Math.abs(y);

        //将用户点击的在y轴的任意点转换为以R为半径的圆的圆周上点
        const r = Math.sqrt(px * px + py * py);
        const y2 = R * (py / r);

        //将圆周上点进行归一化为单位圆上的点
        const ny = y2 / R;

        //计算用户点击点在单位圆上角度
        const angle = Math.asin(ny) * (180 / Math.PI);

        let angle2 = 0;

        // 判断点击点位于象限的位置计算出最终角度
        if (x > 0 && y > 0) {

            angle2 = angle;
        }

        else if (x < 0 && y >= 0) {

            angle2 = 180 - angle;
        }

        else if (x < 0 && y < 0) {

            angle2 = 180 + angle;
        }

        else if (x >= 0 && y < 0) {

            angle2 = 360 - angle;
        }

        else {
        }

        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;
        
        // 判断角度范围确定移动的方向
        if (angle2 > 45 && angle2 < 135) {

            this.moveForward = true;
        }

        else if (angle2 > 135 && angle2 < 225) {

            this.moveLeft = true;
        }

        else if (angle2 > 225 && angle2 < 315) {

            this.moveBackward = true;
        }

        else if (angle2 > 315 || angle2 < 45) {

            this.moveRight = true;
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
}