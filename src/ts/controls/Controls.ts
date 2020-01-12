/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-25 08:44:28 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2019-12-30 17:11:07
 */

import { IControls } from './IControls';
import { PcControls } from './PcControls';
import { MobileControls } from './MobileControls';
import {World} from '../World';
import { Utils } from '../Utils';

let playerContol: Controls;

export class Controls implements IControls {

    control: IControls;

    constructor() {
        this.control = 
        
        Utils.isMobile() ? 

        new MobileControls(World.x().camera, World.x().renderer.domElement) : 

        new PcControls(World.x().camera, World.x().renderer.domElement);

    }


    static x(): Controls {
        playerContol = playerContol || new Controls();
        return playerContol;
    }

    update = (delta: number) => {
        this.control.update(delta);
    }

    dispose = () => {
        this.control.dispose();
    }
}
