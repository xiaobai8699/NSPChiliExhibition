import * as THREE from 'three';

interface IPlayerContol{
    
    update(delta: number): void;

    dispose():void;
}

export {IPlayerContol}