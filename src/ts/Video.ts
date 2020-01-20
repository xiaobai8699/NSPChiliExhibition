/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-26 13:05:05 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2020-01-11 15:56:13
 */

// 为什么在移动设备上无法自动播放视频:
// https://www.aerserv.com/blog/why-does-video-autoplay-on-mobile-devices-not-work/
// https://www.google.com/search?sxsrf=ACYBGNSWYbUUOlnNjrq-USPBftDSpPX1Kw%3A1576825687684&source=hp&ei=V3P8XYydJ5iSr7wP-tWggAE&q=can+video+autoplay+on+mobile&oq=video+can%27t+autoplay&gs_l=psy-ab.1.6.0i13i30j0i13i5i30l2j0i8i13i30l5.2832.15948..24624...4.0..0.195.3646.0j22......0....1..gws-wiz.....10..35i362i39j0j0i10j0i13j0i10i30j0i19j0i12i30i19j0i12i10i30i19j33i160.1-ba9bWx3VU

import * as THREE from 'three';
import {VirtualJoystick} from './controls/VirtualJoystick';
import { World } from './World';
import { Utils } from './utils/Utils';
import { Resource } from './config/Resource';

let videoInstance: Video = null;


export class Video {

    video: HTMLVideoElement;

    videoMesh: THREE.Mesh = null;

    constructor() {

        this.newVideoElement();
        this.newVideoMesh();

        const canvas = document.querySelector("#canvas");
        canvas.addEventListener('keydown', this.onKeyDown, false);

        //在移动端必须通过用户点击触发视频播放，否则放不了视频
        if (Utils.isMobile()) {
            document.querySelector("#map-control").addEventListener("touchstart", this.touchPlay, false);
        }
    }


    static x = () => {

        videoInstance = videoInstance || new Video();
        return videoInstance;
    }

    newVideoElement = () => {
        const video = document.createElement('video');
        video.setAttribute("id","video");
        video.volume = 1;
        video.loop = true;
        video.crossOrigin = "anonymous";
        video.src = Resource.videoUrl;
        video.setAttribute("playsinline","true");
        video.setAttribute("x5-video-player-type","h5");
        video.style.display = "none";
        document.body.appendChild(video);
    }

    newVideoMesh = () => {

        this.video = document.querySelector("#video");

        const texure: THREE.VideoTexture = new THREE.VideoTexture(this.video);
        texure.needsUpdate = true;

        const tvMesh: any = World.x().scene.getObjectByName("TV");

        const size: THREE.Vector3 = Utils.getSize(tvMesh);

        const mat = new THREE.MeshStandardMaterial({ map: texure });
        mat.side = THREE.FrontSide;

        const geo = new THREE.BoxGeometry(size.x, size.y, 1);

        this.videoMesh = new THREE.Mesh(geo, mat);
        this.videoMesh.visible = false;
        tvMesh.getWorldPosition(this.videoMesh.position);
        this.videoMesh.position.z = -19.14;

        World.x().scene.add(this.videoMesh);

    }

    //https://stackoverflow.com/questions/49930680/how-to-handle-uncaught-in-promise-domexception-play-failed-because-the-use

    notTouched: boolean = true;
    
    touchPlay = () => {
        if(this.notTouched){
            this.notTouched = false;
            this.play();
            this.end();
            console.log('Touch Play');
        }
    }

    play = () => {
        
        //在安卓机上，如果不是在小程序内，则不启用视频播放功能。因为腾讯X5浏览器的限制，导致只能全屏幕播放视频。见:
         //https://www.cnblogs.com/macliu/p/10956824.html
        //https://www.cnblogs.com/-867259206/p/10864479.html
        if(Utils.isAndroid() && Utils.inWxMiniApp() == false){
            return;
        }

        this.videoMesh.visible = true;
        this.video.play();
    }


    end = () => {
        this.videoMesh.visible = false;
        this.video.pause();
    }

    update = (delta: number) => {

       const distance = World.x().camera.position.distanceTo(this.videoMesh.position);
       distance < 30 ? this.play() : this.end();
    }

    onKeyDown = (event: KeyboardEvent) => {

        event.preventDefault();
        event.stopPropagation();

        switch(event.keyCode){
            case 80: //press p
                this.play();
                break;

            case 79: //press o
                 this.video.pause();
                 break;
        }
    }
}