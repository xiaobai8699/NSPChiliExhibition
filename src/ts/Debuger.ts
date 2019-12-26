/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-26 13:50:04 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2019-12-26 19:05:22
 */

// https://github.com/mrdoob/stats.js
// https://github.com/dataarts/dat.gui

import * as dat from 'dat.gui';
import * as Stats from 'stats.js';
import * as THREE from 'three';

let debuger: Debuger = null;

export class Debuger {

    stats: Stats;

    gui: dat.GUI;

    scene: THREE.Scene;

    constructor(scene: THREE.Scene) {

        this.scene = scene;

        this.stats = new Stats();
        this.stats.showPanel(0);
        document.body.appendChild(this.stats.dom);

        this.gui = new dat.GUI();

        this.createLightFolder();
    }

    static start(scene: THREE.Scene): Debuger {
        if (debuger == null) {
            debuger = new Debuger(scene);
        }
        return debuger;
    }

    static x(): Debuger {
        return debuger;
    }

    lightFolder: dat.GUI;

    createLightFolder = () => {

        this.lightFolder = this.gui.addFolder("Lights");

    }

    debugAmbientLight = (light: THREE.AmbientLight) => {

        const floder: dat.GUI = this.lightFolder.addFolder("AmbientLight");
        
        var controls = {
            intensity: light.intensity,
            ambientColor: light.color.getStyle(),
            disable: false
        };

        floder.add(controls, 'intensity', 0, 3, 0.1).onChange(function (e) {

            light.color = new THREE.Color(controls.ambientColor);
            light.intensity = controls.intensity;

        });

        floder.addColor(controls, 'ambientColor').onChange(function (e) {

            light.color = new THREE.Color(controls.ambientColor);
            light.intensity = controls.intensity;

        });

        floder.add(controls, 'disable').onChange(function (e) {
            light.visible = !e;
        });
    }

    spotLightHelper: THREE.SpotLightHelper;

    debugSpotLight = (spotLight: THREE.SpotLight, name:string) => {

        const self = this;

        const floder: dat.GUI = this.lightFolder.addFolder(name);

        var controls = {
            disable:false,
            helper: false,
            x: spotLight.position.x,
            y: spotLight.position.y,
            z: spotLight.position.z,
            intensity: spotLight.intensity,
            pointColor: spotLight.color.getStyle(),
            angle: spotLight.angle,
            distance: spotLight.distance
        }

        floder.add(controls, 'disable').onChange(function (e) {
            spotLight.visible = !e;
        });
        
        floder.add(controls, 'helper').onChange(function (e) {
            self.spotLightHelper = self.spotLightHelper || new THREE.SpotLightHelper(spotLight);
            if (e) {
                self.scene.add(self.spotLightHelper);
            } else {
                self.scene.remove(self.spotLightHelper);
                self.spotLightHelper.dispose();
                self.spotLightHelper = null;
            }
        });

        floder.add(controls, "x", -50, 50).onChange(function (e) {
            spotLight.position.x = e;
        });

        floder.add(controls, "y", -50, 50).onChange(function (e) {
            spotLight.position.y = e;
        });

        floder.add(controls, "z", -50, 50).onChange(function (e) {
            spotLight.position.z = e;
        });

        floder.add(controls, "intensity", 0, 5).onChange(function (e) {
            spotLight.intensity = e;
        });

        floder.addColor(controls, 'pointColor').onChange(function (e) {
            spotLight.color = new THREE.Color(e);
        });

        floder.add(controls, 'angle', 0, Math.PI * 2).onChange(function (e) {
            spotLight.angle = e;
        });

        floder.add(controls, 'distance', 0, 50).onChange(function (e) {
            spotLight.distance = e;
        });
    }

    directionalLightHelper: THREE.DirectionalLightHelper = null;

    debugDirectionalLight= (directionalLight: THREE.DirectionalLight, name: string) => {
       
        const self = this;

        const floder: dat.GUI = this.lightFolder.addFolder(name);

        var controls = {
            disable:false,
            helper: false,
            x: directionalLight.position.x,
            y: directionalLight.position.y,
            z: directionalLight.position.z,
            intensity: directionalLight.intensity,
            pointColor: directionalLight.color.getStyle(),
        }

        floder.add(controls, 'disable').onChange(function (e) {
            directionalLight.visible = !e;
        });
        
        floder.add(controls, 'helper').onChange(function (e) {
            self.directionalLightHelper = self.directionalLightHelper || new THREE.DirectionalLightHelper(directionalLight,2);
            if (e) {
                self.scene.add(self.directionalLightHelper);
            } else {
                self.directionalLightHelper.dispose();
                self.scene.remove(self.directionalLightHelper);
                self.directionalLightHelper = null;
            }
        });

        floder.add(controls, "x", -20, 20).onChange(function (e) {
            directionalLight.position.x = e;
        });

        floder.add(controls, "y", 0, 20).onChange(function (e) {
            directionalLight.position.y = e;
        });

        floder.add(controls, "z", -20, 20).onChange(function (e) {
            directionalLight.position.z = e;
        });

        floder.add(controls, "intensity", 0, 5).onChange(function (e) {
            directionalLight.intensity = e;
        });

        floder.addColor(controls, 'pointColor').onChange(function (e) {
            directionalLight.color = new THREE.Color(e);
        });

    }

    update = (delta: number) => {

        if (this.spotLightHelper) {
            this.spotLightHelper.update();
        }

    }
}