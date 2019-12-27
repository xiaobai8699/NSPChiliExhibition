/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-25 08:44:28 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2019-12-27 19:57:57
 */

import { IPlayerContol } from './IPlayerControl';
import { PcGameControl } from './PcGameControl';
import { MobileGameControl } from './MobileGameControl';

import { Utils } from '../utils/Utils';

let playerContol: PlayerContol;

class PlayerContol implements IPlayerContol {

    control: IPlayerContol;

    constructor(object: THREE.Camera, domElement?: HTMLElement) {
        this.control = Utils.isMobile() ? new MobileGameControl(object, domElement) : new PcGameControl(object, domElement);;
    }

    static init(object: THREE.Camera, domElement?: HTMLElement){
        if(playerContol == null) {
            playerContol = new PlayerContol(object, domElement);
        }
        return playerContol;
    }

    static x(): PlayerContol {
        return playerContol;
    }

    update = (delta: number) => {
        this.control.update(delta);
    }

    dispose = () => {
        this.control.dispose();
    }
}



export { PlayerContol };