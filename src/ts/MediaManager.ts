/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-26 13:05:05 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2019-12-27 13:49:52
 */

// 为什么在移动设备上无法自动播放视频:
// https://www.aerserv.com/blog/why-does-video-autoplay-on-mobile-devices-not-work/
// https://www.google.com/search?sxsrf=ACYBGNSWYbUUOlnNjrq-USPBftDSpPX1Kw%3A1576825687684&source=hp&ei=V3P8XYydJ5iSr7wP-tWggAE&q=can+video+autoplay+on+mobile&oq=video+can%27t+autoplay&gs_l=psy-ab.1.6.0i13i30j0i13i5i30l2j0i8i13i30l5.2832.15948..24624...4.0..0.195.3646.0j22......0....1..gws-wiz.....10..35i362i39j0j0i10j0i13j0i10i30j0i19j0i12i30i19j0i12i10i30i19j33i160.1-ba9bWx3VU

import * as THREE from 'three';
import { Vector3 } from 'three';

export class MediaManager {

    static playVideo(scene: THREE.Scene) {
        const video: HTMLVideoElement = document.querySelector("#video");
        video.volume = 1.0;
        video.muted = false;

        const texure:THREE.VideoTexture = new THREE.VideoTexture(video);
        texure.minFilter = THREE.LinearFilter;
        texure.magFilter = THREE.LinearFilter;
        texure.format = THREE.RGBAFormat;
        texure.wrapS = texure.wrapT = THREE.ClampToEdgeWrapping;
        texure.needsUpdate = true;

        const tvMesh: any = scene.getObjectByName("TV");

        const box3: THREE.Box3 = new THREE.Box3();
        box3.setFromObject(tvMesh);
        const size: THREE.Vector3 = box3.getSize(new Vector3());

        const mat = new THREE.MeshStandardMaterial({map:texure});
        const geo = new THREE.PlaneGeometry(size.x,size.y);
        const mesh = new THREE.Mesh(geo,mat);
        tvMesh.getWorldPosition(mesh.position);
        mesh.position.z = -18.6;
        mesh.name = "BigTV";
        mesh.position.x += 4;
        mesh.position.y -= 0.5;
        scene.add(mesh);
    }
}