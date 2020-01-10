/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-30 17:50:19 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2020-01-10 19:47:03
 */

export class Const {

    static readonly osspath: string = "https://3dapp.oss-cn-shenzhen.aliyuncs.com/NspChiliExhibition/";

    static readonly nspLogName: string = "logo_D";

    static readonly audioUrl: string = `${Const.osspath}audio/plws.mp3`;

    static readonly videoUrl: string = /*'./asset/video/nsp.mp4';*/`${Const.osspath}video/nsp.mp4`;

    static readonly logoUrl: string = `${Const.osspath}image/others/nsplog.png`;

    static readonly modelUrl: string = './asset/model/nsp_test.glb';/*`${Const.osspath}model/nsp.glb`*/;
    
    static staticVisitorUrl(name: string): string {

        return `${this.osspath}image/visitor/static/${name}.png`;
        
    }
    

    static dynamicVisitorUrl(name: string) {

        return `${this.osspath}image/visitor/dynamic/${name}.png`;

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
