/*
author:Li Hong
email:lh.work@qq.com 
*/

import { IPlayerContol } from './IPlayerControl';
import { PcGameControl } from './PcGameControl';
import { MobileGameControl } from './MobileGameControl';

import { Utils } from '../utils/Utils';

class PlayerContol implements IPlayerContol {

    playerControl: IPlayerContol;

    constructor(object: THREE.Camera, domElement?: HTMLElement) {
        this.playerControl = Utils.isMobile() ? new MobileGameControl(object, domElement) : new PcGameControl(object, domElement);;
    }

    update = (delta: number) => {
        this.playerControl.update(delta);
    }

    dispose = () => {
        this.playerControl.dispose();
    }
}



export { PlayerContol };