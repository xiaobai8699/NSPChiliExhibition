/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-25 08:44:11 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2019-12-30 17:14:07
 */



import { IControls } from './IControls';
import { MobileRotateControls } from './MobileRotateControls';
import { MobileMoveControl } from './MobileMoveControls';


export class MobileControls implements IControls {

    rControl: MobileRotateControls;
    
    mControl: MobileMoveControl;

    constructor(object: THREE.Camera, domElement?: HTMLElement) {

        this.rControl = new MobileRotateControls(object, domElement);

        this.mControl = new MobileMoveControl(object, domElement);
    }

    update = (delta: number) => {

        this.rControl.update(delta);
        this.mControl.update(delta);

    }

    dispose = () => {

        this.rControl.dispose();
        this.mControl.dispose();
        
    }
}
