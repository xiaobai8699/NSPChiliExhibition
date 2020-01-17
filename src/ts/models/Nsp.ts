/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2020-01-17 11:57:01 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2020-01-17 13:49:28
 */

import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { World } from '../World';
import { ThreeUtils } from '../ThreeUtils';
import { Model } from './Model';
import {Const} from '../Const';

export class Nsp  {

   static load = (success:Function) => {
       
        if(!success) throw "[ModelNsp] need a callback funcation";

        const loading: HTMLElement = document.querySelector("#loading");
        const progressText: HTMLElement = document.querySelector("#progress-text");

        const c = function (gltf: any) {

            success(gltf);
            loading.style.display = "none";
            
        }

        const p = function (progress: any) {

            const M = 1048576;
            let percent = (progress.loaded / progress.total) * 100;
            let total = (progress.total / M).toFixed(2);
            let loaded = (progress.loaded / M).toFixed(2);

            progressText.innerText = `载入资源 ${percent.toFixed(2)}% (${total}M / ${loaded}M)`;

            if (percent >= 100) {
                progressText.innerText = "解压资源，请稍候☕️..";
            }
        }

        const e = function (err: any) {

            alert(`加载资源失败,请刷新重试!(${JSON.stringify(err)})`);

        }

        ThreeUtils.loadModel(Const.modelUrl, { c, p, e });

    }
}