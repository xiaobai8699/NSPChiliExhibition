/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2020-01-10 10:56:32 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2020-01-10 15:25:04
 */

import * as THREE from 'three';
import { World } from '../common/World';
import { Utils} from '../common/Utils';
import {Const } from './Const';

let kepuInstance: Kepu = null;

export class Kepu {

    objects: THREE.Object3D[] = [];

    nameArr: Array<string> = ["gongyikupuA01","Text001","jiatingjucanA01"];

    motherImage: HTMLImageElement;

    chiliImage: HTMLImageElement;

    constructor(){

        this.getObjects();
        this.addEventListener();
    }
    
    static x = () => {
        kepuInstance = kepuInstance || new Kepu();
        return kepuInstance;
    }

    getObjects = () => {

        this.nameArr.forEach(name => {

            const object: any = World.x().scene.getObjectByName(name);
            if(object){
                 this.objects.push(object);
            }
        });

    }

    show = (name: string) => {

        if(this.nameArr.indexOf(name) == -1 ){
            return;
        }

        const kepuDiv: HTMLDivElement = document.querySelector("#kepu");
        kepuDiv.style.visibility = "visible";

        const kepuContentDiv: HTMLDivElement = document.querySelector("#kepu-content");
        
        //妈妈的拿手菜科普
        if(name == "jiatingjucanA01"){
            
            if(this.motherImage) {
                
                kepuContentDiv.appendChild(this.motherImage);

            }else {
                const image  = new Image();
                image.onload = () => {
                    this.motherImage = <any>image;
                    kepuContentDiv.appendChild(this.motherImage);
                }
                image.src = Const.kepuUrl("mamadeweidao");
            }


        //辣椒科普
        }else if(name == "gongyikupuA01" || name == "Text001"){

            if(this.chiliImage) {

                kepuContentDiv.appendChild(this.chiliImage);
            } else {

                const image  = new Image();
                image.onload = () => {
                    this.chiliImage = <any>image;
                    kepuContentDiv.appendChild(this.chiliImage);
                }
                const name = Utils.isMobile() ? "kepu_mobile" : "kepu_pc";
                image.src = Const.kepuUrl(name);
                
            }
        }


    }


    addEventListener = () => {

        const self = this;

        const kepuDiv: HTMLDivElement = document.querySelector("#kepu");

        function hide(e: MouseEvent|TouchEvent){

            e.preventDefault();
            e.stopPropagation();
            
            if(self.motherImage && self.motherImage.parentElement){
                self.motherImage.parentElement.removeChild(self.motherImage);
            }

            if(self.chiliImage && self.chiliImage.parentElement){
                self.chiliImage.parentElement.removeChild(self.chiliImage);
            }

            kepuDiv.style.visibility = "hidden";
        }


        const closeBtnb = document.querySelector("#kepu-close")
        closeBtnb.addEventListener("mousedown", hide, false);
        closeBtnb.addEventListener("touchstart", hide, false);

    }

}