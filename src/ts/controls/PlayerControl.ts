
import {IPlayerContol} from './IPlayerControl';
import {PcPlayerContol} from './PcPlayerControl';
import {MobilePlayerContol} from './MobilePlayerControl';
import {Utils} from '../utils/Utils';

class PlayerContol implements IPlayerContol {

    playerControl: IPlayerContol;

    constructor(object: THREE.Camera, domElement?: HTMLDocument){
        this.playerControl = Utils.isMobile() ? new MobilePlayerContol(object, domElement) : new PcPlayerContol(object, domElement);;
    }

    update = (delta: number) => {
        this.playerControl.update(delta);
    }
}



export { PlayerContol };