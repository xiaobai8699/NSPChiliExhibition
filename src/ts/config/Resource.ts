/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-30 17:50:19 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2020-01-17 14:08:35
 */

import {Config} from './Config';

export class Resource {

    static readonly osspath: string = Config.isDevelopmentMode ? "./asset/" : "https://3dapp.oss-cn-shenzhen.aliyuncs.com/NspChiliExhibition/";

    static readonly nspLogName: string = "logo_D";

    static readonly audioUrl: string = `${Resource.osspath}audio/plws.mp3`;

    static readonly videoUrl: string = `./asset/video/nsp.mp4`; //注意：video标签会存在跨域播放的问题，视频须放在我们自己的服务器上

    static readonly logoUrl: string = `${Resource.osspath}image/others/nsplog.png`;

    static readonly modelUrl: string = `${Resource.osspath}model/nsp.glb`;

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
