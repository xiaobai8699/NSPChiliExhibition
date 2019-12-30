/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-30 16:50:52 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2019-12-30 17:02:59
 */

import * as THREE from 'three';
import { Vector3 } from 'three';
import {World} from './World';

let audioInstance: Audio;

class Audio {

    static x(): Audio {

        audioInstance = audioInstance || new Audio();
        return audioInstance;

    }

    

}