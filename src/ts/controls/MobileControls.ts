/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-25 08:44:11 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2020-01-12 15:57:35
 */



import { IControls } from './IControls';
import { MobileRotateControls } from './MobileRotateControls';
import { MobileMoveControls } from './MobileMoveControls';


export class MobileControls implements IControls {

    rControl: MobileRotateControls;
    
    mControl: MobileMoveControls;

    constructor(object: THREE.Camera, domElement?: HTMLElement) {

        this.rControl = MobileRotateControls.x();

        this.mControl = new MobileMoveControls(object, domElement);
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
