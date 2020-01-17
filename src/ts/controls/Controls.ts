/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-25 08:44:28 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2020-01-16 18:41:36
 */

import { IControls } from './IControls';
import { PcControls } from './PcControls';
import { MobileControls } from './MobileControls';
import {World} from '../World';
import { Utils } from '../utils/Utils';
import {FirstPersonControls } from './FirstPersonControls';

let playerContol: Controls;

export class Controls implements IControls {

    control: IControls;

    fpsCtrl: FirstPersonControls;

    constructor() {
        this.control = 
        
        Utils.isMobile() ? 

        new MobileControls(World.x().camera, World.x().renderer.domElement) : 

        new PcControls(World.x().camera, World.x().renderer.domElement);

       // this.fpsCtrl = new FirstPersonControls(World.x().camera, World.x().renderer.domElement);
    }


    static x(): Controls {
        playerContol = playerContol || new Controls();
        return playerContol;
    }

    update = (delta: number) => {
        this.control.update(delta);
    //    Utils.isMobile() ? this.control.update(delta) : this.fpsCtrl.update(delta);
    }

    dispose = () => {
        this.control.dispose();
    }
}
