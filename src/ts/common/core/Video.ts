/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-26 13:05:05 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2020-01-11 10:20:20
 */

// 为什么在移动设备上无法自动播放视频:
// https://www.aerserv.com/blog/why-does-video-autoplay-on-mobile-devices-not-work/
// https://www.google.com/search?sxsrf=ACYBGNSWYbUUOlnNjrq-USPBftDSpPX1Kw%3A1576825687684&source=hp&ei=V3P8XYydJ5iSr7wP-tWggAE&q=can+video+autoplay+on+mobile&oq=video+can%27t+autoplay&gs_l=psy-ab.1.6.0i13i30j0i13i5i30l2j0i8i13i30l5.2832.15948..24624...4.0..0.195.3646.0j22......0....1..gws-wiz.....10..35i362i39j0j0i10j0i13j0i10i30j0i19j0i12i30i19j0i12i10i30i19j33i160.1-ba9bWx3VU

import * as THREE from 'three';
import {ControlMap} from '../controls/ControlMap';
import { World } from '../World';
import { Utils } from '../Utils';

let videoInstance: Video = null;

export class Video {

    video: HTMLVideoElement;

    videoMesh: THREE.Mesh = null;

    constructor() {

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

    newVideoMesh = () => {

        this.video = document.querySelector("#video");
        this.video.addEventListener("ended", this.end, false);

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

    isTouched: boolean = false;
    
    touchPlay = () => {
        if(!this.isTouched){
            this.isTouched = true;
            this.video.play();
        }
    }

    play = () => {

        if (this.video.paused) {
            this.videoMesh.visible = true;
            this.video.play();
            this.video.muted = false;
            this.video.volume = 1;
        }
    }


    end = () => {

        if (this.videoMesh) {
            this.video.pause();
            this.videoMesh.visible = false;
        }
    }

    onKeyDown = (event: KeyboardEvent) => {

        event.preventDefault();
        event.stopPropagation();

        //Press p key to play
        if (event.keyCode == 80) {
            this.play();
        }
    }

    distanceCache: number = 0;
    
    update = (delta: number) => {

        if(Utils.isMobile()){
            
            if(ControlMap.x().isMoving()){ // 移动时才做检测，否则每一帧都计算距离，影响性能

                const distance = this.videoMesh.position.distanceTo(World.x().camera.position);

                let needPlay = (distance <= 30);

                needPlay ? this.play() : this.end();
            }
        }
    }
}