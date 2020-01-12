/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-30 16:50:52 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2020-01-11 11:52:06
 */

import * as THREE from 'three';
import { Vector3, AudioLoader } from 'three';
import {World} from '../World';
import { Const } from '../../business/Const';
import { Utils } from '../Utils';

let audioInstance: Audio;

export class Audio {

    static x(): Audio {

        audioInstance = audioInstance || new Audio();
        return audioInstance;

    }

    static playBgm(){
        //只在安卓机上播放背景音乐(但不在安卓小程序内播放)
        //因为：小程序和iOS均可播放视频，但安卓的微信H5页面不能播放视频，所以播放背景音乐替代
        if(Utils.isAndroid()){
            if(!Utils.inWxMiniApp()){

                const listener = new THREE.AudioListener();
                World.x().camera.add(listener);
        
                const sound = new THREE.PositionalAudio(listener);
        
                const audioLoader = new THREE.AudioLoader();
                
                audioLoader.load(Const.audioUrl, (buffer: any) =>{
                    
                    sound.setBuffer(buffer);
                    sound.setRefDistance(20); // 距离声源10开始衰减
                    sound.setRolloffFactor(5);
                    sound.setLoop(true);
                    sound.play();
        
                });
        
                const logMesh = World.x().scene.getObjectByName(Const.nspLogName);
                logMesh.add(sound);
            }
        }
    }

    static play() {

        this.playBgm();
        
    }

}