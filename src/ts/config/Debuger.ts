/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-26 13:50:04 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2020-01-17 14:25:00
 */

// https://github.com/mrdoob/stats.js
// https://github.com/dataarts/dat.gui

import * as dat from 'dat.gui';
import * as Stats from 'stats.js';
import * as THREE from 'three';
import {World} from '../World';
import {Config} from './Config';


let debugerInstance: Debuger = null;

export class Debuger {

    enable: boolean = Config.isDevelopmentMode;
    
    stats: Stats;

    gui: dat.GUI;

    scene: THREE.Scene;

    lightFolder: dat.GUI;

    camera: THREE.PerspectiveCamera;

    constructor() {

        this.scene = World.x().scene;

        this.camera = World.x().camera;

        this.stats = new Stats();
        this.stats.showPanel(0);

        if(this.enable) {
             document.body.appendChild(this.stats.dom);
        }

        if(this.enable && !Config.onlyShowDebuggerFps) {

          this.gui = new dat.GUI();
          this.lightFolder = this.gui.addFolder("Lights");

          this.debugCamera();

        }
    }

    static x(): Debuger {
        debugerInstance = debugerInstance || new Debuger();
        return debugerInstance;
    }


    disableDataGUI = ()=>{
        return (!this.enable || Config.onlyShowDebuggerFps);
    }

    debugAmbientLight = (light: THREE.AmbientLight) => {

        if(this.disableDataGUI()) return;

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

        if(this.disableDataGUI()) return;

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

    pointLightHelper: THREE.PointLightHelper;

    debugPointLight = (pointLight: THREE.PointLight, name:string) => {

        if(this.disableDataGUI()) return;

        const self = this;

        const floder: dat.GUI = this.lightFolder.addFolder(name);

        var controls = {
            disable:false,

            helper: false,

            x: pointLight.position.x,

            y: pointLight.position.y,

            z: pointLight.position.z,

            rotationX:pointLight.rotation.x,

            intensity: pointLight.intensity,

            pointColor: pointLight.color.getStyle(),

            
            distance: pointLight.distance
        }

        floder.add(controls, 'disable').onChange(function (e) {

            pointLight.visible = !e;

        });
        
        floder.add(controls, 'helper').onChange(function (e) {

            self.pointLightHelper = self.pointLightHelper || new THREE.PointLightHelper(pointLight);

            if (e) {

                self.scene.add(self.pointLightHelper);

            } else {

                self.scene.remove(self.pointLightHelper);
                self.pointLightHelper.dispose();
                self.pointLightHelper = null;
                
            }
        });

        floder.add(controls, "x", -50, 50).onChange(function (e) {

            pointLight.position.x = e;

        });

        floder.add(controls, "y", -50, 50).onChange(function (e) {

            pointLight.position.y = e;

        });

        floder.add(controls, "z", -50, 50).onChange(function (e) {

            pointLight.position.z = e;

        });

        floder.add(controls, "rotationX", -180,180).onChange(function(e){

            pointLight.rotation.x = THREE.Math.degToRad(e);

        });

        floder.add(controls, "intensity", 0, 5).onChange(function (e) {

            pointLight.intensity = e;

        });

        floder.addColor(controls, 'pointColor').onChange(function (e) {

            pointLight.color = new THREE.Color(e);

        });


        floder.add(controls, 'distance', 0, 50).onChange(function (e) {

            pointLight.distance = e;

        });
    }

    directionalLightHelper: THREE.DirectionalLightHelper = null;

    debugDirectionalLight= (directionalLight: THREE.DirectionalLight, name: string) => {
       
        if(this.disableDataGUI()) return;
        
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


    cameraHelper: THREE.CameraHelper;;

    debugCamera = () => {
        
        if(this.disableDataGUI()) return;
        
        const controls = {

            near: World.x().camera.near,

            far: World.x().camera.far,

            aspect: World.x().camera.aspect,

            fov: World.x().camera.fov,

            enableHelper:false
        }
        
        const floder: dat.GUI = this.gui.addFolder("Camera");

        floder.add(controls, "near",0.1,100).onChange(function (e){

            World.x().camera.near = e;
            World.x().camera.updateProjectionMatrix();

        });
        
        floder.add(controls, "far",10,100).onChange(function (e){

            World.x().camera.far = e;
            World.x().camera.updateProjectionMatrix();

        });

        floder.add(controls, "aspect",0,5).onChange(function (e){

            World.x().camera.aspect = e;
            World.x().camera.updateProjectionMatrix();

        });

        floder.add(controls, "fov",0,180).onChange(function (e){

            World.x().camera.fov = e;
            World.x().camera.updateProjectionMatrix();

        });

        const self = this;
        
        floder.add(controls, "enableHelper",).onChange(function (e){

            if(e){

                self.cameraHelper = new THREE.CameraHelper(World.x().camera);
                World.x().scene.add(this.cameraHelper);
                World.x().camera.updateProjectionMatrix();

            }else {

                World.x().scene.remove(self.cameraHelper);
                self.cameraHelper = null;
                World.x().camera.updateProjectionMatrix();

            }

        });
        
      
    }
    
    debugTransform = (object: THREE.Object3D) => {

        if(this.disableDataGUI()) return;

        const controls = {

            px: object.position.x,
            py: object.position.y,
            pz: object.position.z,
            rx: object.rotation.x,
            ry: object.rotation.y,
            rz: object.rotation.z,
            sx: object.scale.x,
            sy: object.scale.y,
            sz: object.scale.z

        };

        const floder: dat.GUI = this.gui.addFolder("Transform");

        floder.add(controls, "px",-50,50).onChange(e=>{
            object.position.x = e;
        });

        floder.add(controls, "py",-50,50).onChange(e=>{
            object.position.y = e;
        });

        floder.add(controls, "pz",-50,50).onChange(e=>{
            object.position.z = e;
        });

        floder.add(controls, "rx",-360,360).onChange(e=>{
            object.rotation.x = THREE.Math.degToRad(e);
        });

        floder.add(controls, "ry",-360,360).onChange(e=>{
            object.rotation.y = THREE.Math.degToRad(e);
        });

        floder.add(controls, "rz",-360,360).onChange(e=>{
            object.rotation.z = THREE.Math.degToRad(e);
        });
    }

    update = (delta: number) => {

        if(!this.enable) {
            return;
        }
        
        this.spotLightHelper ? this.spotLightHelper.update() : undefined ;

        this.cameraHelper ? this.cameraHelper.update() : undefined ;

    }
}