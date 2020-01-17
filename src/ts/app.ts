/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-25 08:44:37 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2020-01-17 13:54:22
 */


import * as THREE from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { Controls } from './controls/Controls';
import { Pickup } from './Pickup';
import { LED } from './LED';
import { Lights } from './Lights';
import { Video } from './Video';
import { World } from './World';
import { Utils } from './Utils';
import { Audio } from './Audio';
import { Visitor } from './Visitor';
import { Const } from './Const';
import { Debuger } from './Debuger';
import { Chili } from './Chili';
import { FixMaterial } from './FixMaterial';
import { FixModel } from './FixModel';
import { Layout } from './Layout';
import { Hero } from './Hero';
import { ThreeUtils } from './ThreeUtils';
import { Nsp as ModelNsp } from './models/Nsp';

class App {

    clock: THREE.Clock;

    run = () => {

        World.x();
        Layout.x();
        Controls.x();
        Pickup.x();
        Debuger.x();

        ModelNsp.load(this.didLoadMainScene);

        const mat = new THREE.MeshStandardMaterial({ color: 0xff0000 });
        const geo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(0, 0, 15);
        mesh.name = "yy";
        mesh.visible = false;
        World.x().scene.add(mesh);
    }


    didLoadMainScene = (gltf: GLTF) => {

        World.x().scene.add(gltf.scene);
        FixModel.do();
        FixMaterial.do();
        Lights.addLights();
        Visitor.x().newAllVisitors();
        Audio.play();
        Video.x();

        this.clock = new THREE.Clock();
        World.x().renderer.setAnimationLoop(this.animationLoop);

    }

    animationLoop = () => {

        Debuger.x().stats.begin();
        {
            World.x().render();

            let delta = this.clock.getDelta();

            LED.update();
            Chili.x().update(delta);
            Controls.x().update(delta);
            Debuger.x().update(delta);
            Visitor.x().update(delta);

        }
        Debuger.x().stats.end();

    }
}


const app = new App();
app.run();



