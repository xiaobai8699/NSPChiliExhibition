/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-30 16:50:52 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2020-01-10 09:32:54
 */

import * as THREE from 'three';
import { Vector3, AudioLoader } from 'three';
import {World} from '../World';
import { Const } from '../../business/Const';

let audioInstance: Audio;

export class Audio {

    static x(): Audio {

        audioInstance = audioInstance || new Audio();
        return audioInstance;

    }

    static play(): void {

        return;
        
        const listener = new THREE.AudioListener();
        World.x().camera.add(listener);

        const sound = new THREE.PositionalAudio(listener);

        const audioLoader = new THREE.AudioLoader();
        
        audioLoader.load(Const.audioUrl, (buffer: any) =>{
            
            sound.setBuffer(buffer);
            sound.setRefDistance(10); // 距离声源10开始衰减
            sound.setRolloffFactor(5);
            sound.setLoop(true);
            sound.play();

        });

        const logMesh = World.x().scene.getObjectByName(Const.nspLogName);
        logMesh.add(sound);

    }

}