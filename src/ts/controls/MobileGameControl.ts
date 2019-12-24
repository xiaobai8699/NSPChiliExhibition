/*
author:Li Hong
email:lh.work@qq.com 
*/

import { IPlayerContol } from './IPlayerControl';
import { MobileRotateControl } from './MobileRotateControl';
import { MobileMoveControl } from './MobileMoveControl';


class MobileGameControl implements IPlayerContol {

    mrControl: MobileRotateControl;
    mmControl: MobileMoveControl;

    constructor(object: THREE.Camera, domElement?: HTMLElement) {

        this.mrControl = new MobileRotateControl(object, domElement);
        this.mmControl = new MobileMoveControl(object, domElement);
    }

    update = (delta: number) => {
        this.mrControl.update(delta);
        this.mmControl.update(delta);
    }

    dispose = () => {
        this.mrControl.dispose();
        this.mmControl.dispose();
    }
}

export { MobileGameControl };