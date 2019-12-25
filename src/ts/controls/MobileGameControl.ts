/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-25 08:44:11 
 * @Last Modified by:   Li Hong (lh.work@qq.com) 
 * @Last Modified time: 2019-12-25 08:44:11 
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