/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-25 08:44:28 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2019-12-28 09:59:20
 */

import { IPlayerContol } from './IPlayerControl';
import { PcGameControl } from './PcGameControl';
import { MobileGameControl } from './MobileGameControl';
import {World} from '../World';
import { Utils } from '../utils/Utils';

let playerContol: PlayerContol;

class PlayerContol implements IPlayerContol {

    control: IPlayerContol;

    constructor() {
        this.control = 
        
        Utils.isMobile() ? 

        new MobileGameControl(World.x().camera, World.x().renderer.domElement) : 

        new PcGameControl(World.x().camera, World.x().renderer.domElement);

    }


    static x(): PlayerContol {
        playerContol = playerContol || new PlayerContol();
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