/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-26 13:05:05 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2019-12-30 16:53:05
 */

// 为什么在移动设备上无法自动播放视频:
// https://www.aerserv.com/blog/why-does-video-autoplay-on-mobile-devices-not-work/
// https://www.google.com/search?sxsrf=ACYBGNSWYbUUOlnNjrq-USPBftDSpPX1Kw%3A1576825687684&source=hp&ei=V3P8XYydJ5iSr7wP-tWggAE&q=can+video+autoplay+on+mobile&oq=video+can%27t+autoplay&gs_l=psy-ab.1.6.0i13i30j0i13i5i30l2j0i8i13i30l5.2832.15948..24624...4.0..0.195.3646.0j22......0....1..gws-wiz.....10..35i362i39j0j0i10j0i13j0i10i30j0i19j0i12i30i19j0i12i10i30i19j33i160.1-ba9bWx3VU

import * as THREE from 'three';
import { Vector3 } from 'three';
import {World} from '../World';
import { Utils } from '../Utils';

let videoInstance: Video = null; 

export class Video {

    scene: THREE.Scene;

    video: HTMLVideoElement;

    videoMesh: THREE.Mesh = null;

    constructor() {

        this.scene = World.x().scene;

        this.video = document.querySelector("#video");

        const canvas =  document.querySelector("#canvas");
        canvas.addEventListener('keydown', this.onKeyDown, false);
       // canvas.addEventListener("mousedown", this.playVideo, false);
        //canvas.addEventListener("touchstart", this.playVideo, false);

        this.video.addEventListener("ended",this.onVideoEnded, false);
    }


    static x = () => {
        videoInstance = videoInstance || new Video();
        return videoInstance;
    }

    readyPlayVideo = () => {

            if(this.videoMesh) return;
            
            const texure: THREE.VideoTexture = new THREE.VideoTexture(this.video);
            texure.needsUpdate = true;

            const tvMesh: any = this.scene.getObjectByName("TV");

            const size: THREE.Vector3 = Utils.getSize(tvMesh);

            const mat = new THREE.MeshStandardMaterial({ map: texure });
            mat.side = THREE.FrontSide;

            const geo = new THREE.BoxGeometry(size.x, size.y, 1);

            this.videoMesh = new THREE.Mesh(geo, mat);
            tvMesh.getWorldPosition(this.videoMesh.position);
          
             this.videoMesh.position.z = -19.14;

            this.scene.add(this.videoMesh);

    }
    
     //https://stackoverflow.com/questions/49930680/how-to-handle-uncaught-in-promise-domexception-play-failed-because-the-use

     playVideo = () => {
         
        this.readyPlayVideo();

        this.video.volume = 1;
        this.video.muted = false;

        this.video.play().then(xrh=>{

        });

        
    }

    onKeyDown = (event: KeyboardEvent) => {

        event.preventDefault();
        event.stopPropagation();

        //p
        if(event.keyCode == 80) {

            this.playVideo();

        }

    }

    onVideoEnded = () => {

       World.x().scene.remove(this.videoMesh);
        this.videoMesh = null;

    }
}