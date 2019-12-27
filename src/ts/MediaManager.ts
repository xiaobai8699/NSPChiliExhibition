/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-26 13:05:05 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2019-12-27 18:44:14
 */

// 为什么在移动设备上无法自动播放视频:
// https://www.aerserv.com/blog/why-does-video-autoplay-on-mobile-devices-not-work/
// https://www.google.com/search?sxsrf=ACYBGNSWYbUUOlnNjrq-USPBftDSpPX1Kw%3A1576825687684&source=hp&ei=V3P8XYydJ5iSr7wP-tWggAE&q=can+video+autoplay+on+mobile&oq=video+can%27t+autoplay&gs_l=psy-ab.1.6.0i13i30j0i13i5i30l2j0i8i13i30l5.2832.15948..24624...4.0..0.195.3646.0j22......0....1..gws-wiz.....10..35i362i39j0j0i10j0i13j0i10i30j0i19j0i12i30i19j0i12i10i30i19j33i160.1-ba9bWx3VU

import * as THREE from 'three';
import { Vector3 } from 'three';

let mediaManager: MediaManager = null; 

export class MediaManager {

    scene: THREE.Scene;

    video: HTMLVideoElement;

    isReadPlayVideo: boolean;

    constructor(scene: THREE.Scene) {
        this.scene = scene;

        this.video = document.querySelector("#video");

        document.querySelector("#canvas").addEventListener("mousedown", this.playVideo,false);
    }

    static init = (scene: THREE.Scene)=> {
        if(mediaManager == null) {

            mediaManager = new MediaManager(scene);
        }

        return mediaManager;
    }

    static x = () => {
        return mediaManager;
    }

    readyPlayVideo = () => {

            if(this.isReadPlayVideo) {
                return;
            }

            this.isReadPlayVideo = true;
            
            this.video.volume = 1.0;
            this.video.muted = false;

            const texure: THREE.VideoTexture = new THREE.VideoTexture(this.video);
            texure.minFilter = THREE.LinearFilter;
            texure.magFilter = THREE.LinearFilter;
            texure.format = THREE.RGBAFormat;
            texure.wrapS = texure.wrapT = THREE.ClampToEdgeWrapping;
            texure.needsUpdate = true;

            const tvMesh: any = this.scene.getObjectByName("TV");

            const box3: THREE.Box3 = new THREE.Box3();
            box3.setFromObject(tvMesh);
            const size: THREE.Vector3 = box3.getSize(new Vector3());

            const mat = new THREE.MeshStandardMaterial({ map: texure });
            mat.side = THREE.FrontSide;
            const geo = new THREE.BoxGeometry(size.x, size.y, 1);
            const mesh = new THREE.Mesh(geo, mat);
            tvMesh.getWorldPosition(mesh.position);
            console.log(JSON.stringify(mesh.position))
            mesh.position.z = -19.14;
            // mesh.position.x += 4;
            // mesh.position.y -= 0.5;
            this.scene.add(mesh);

    }
    
     //https://stackoverflow.com/questions/49930680/how-to-handle-uncaught-in-promise-domexception-play-failed-because-the-use

     playVideo = () => {
         
        this.readyPlayVideo();

        this.video.play().then(xrh=>{

        });

    }
}