import * as THREE from 'three';
import {IPlayerContol} from './IPlayerControl';

class MobilePlayerControl2 implements IPlayerContol {

    object: THREE.Camera;

    domElement: HTMLElement;

    constructor(object: THREE.Camera, domElement?: HTMLElement) {

        //如何动态改变HTMLElement的css属性:
        //https://developer.mozilla.org/zh-CN/docs/Web/API/Element/className
        // https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/style
        // https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Properties_Reference
        // https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/Determining_the_dimensions_of_elements
        this.domElement.classList.add("canvas-rotation");
        this.domElement.style.width = `${window.innerHeight}`;
        this.domElement.style.height = `${window.innerWidth}`;
    }

    update = (delta: number) => {

    }

    dispose = () => {
        this.object = null;
        this.domElement = null;
    }
}


export {MobilePlayerControl2};