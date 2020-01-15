/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-30 17:50:19 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2020-01-15 16:34:53
 */

export class Const {

    static readonly devMode = false;

    static readonly osspath: string = Const.devMode? "./asset/" : "https://3dapp.oss-cn-shenzhen.aliyuncs.com/NspChiliExhibition/";

    static readonly nspLogName: string = "logo_D";

    static readonly audioUrl: string = `${Const.osspath}audio/plws.mp3`;

    static readonly videoUrl: string = `${Const.osspath}video/nsp.mp4`;

    static readonly logoUrl: string = `${Const.osspath}image/others/nsplog.png`;

    static readonly modelUrl: string = `${Const.osspath}model/nsp.glb`;

    static staticVisitorUrl(name: string): string {

        return `${this.osspath}image/visitor/static/${name}.png`;
        
    }
    

    static dynamicVisitorUrl(name: string) {

        return `${this.osspath}image/visitor/dynamic/bigsize/${name}.png`;

    }

    static skyboxUrl(name: string) {

        return `${this.osspath}image/skybox/${name}.png`;

    }

    static mapUrl(name: string) {
        
        return `${this.osspath}image/map/${name}.png`;

    }

    static kepuUrl(name: string) {
        
        return `${this.osspath}image/kepu/${name}.png`;

    }
}
