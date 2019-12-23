
import {IPlayerContol} from './IPlayerControl';
import {PcPlayerContol} from './PcPlayerControl';
import {MobilePlayerControl} from './MobilePlayerControl';
import {MobilePlayerControl2} from './MobilePlayerControl2';
import {Utils} from '../utils/Utils';

class PlayerContol implements IPlayerContol {

    playerControl: IPlayerContol;

    constructor(object: THREE.Camera, domElement?: HTMLElement){
        this.playerControl = Utils.isMobile() ? new MobilePlayerControl2(object, domElement) : new PcPlayerContol(object, domElement);;
    }

    update = (delta: number) => {
        this.playerControl.update(delta);
    }

    dispose = () => {
       this.playerControl.dispose();
    }
}



export { PlayerContol };