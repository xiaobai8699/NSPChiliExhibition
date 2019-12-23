import * as THREE from 'three';
import {IPlayerContol} from './IPlayerControl';

class MobilePlayerControl2 implements IPlayerContol {

    object: THREE.Camera;

    domElement: HTMLElement;

    constructor(object: THREE.Camera, domElement?: HTMLElement) {

    }

    update = (delta: number) => {

    }

    dispose = () => {

    }
}


export {MobilePlayerControl2};