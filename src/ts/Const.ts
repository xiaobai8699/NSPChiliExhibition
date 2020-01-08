/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-30 17:50:19 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2020-01-02 17:29:49
 */

export class Const {

    static readonly osspath: string = "http://3dapp.oss-cn-shenzhen.aliyuncs.com/NspChiliExhibition/";

    static readonly nspLogName: string = "logo_D";

    static readonly audioUrl: string = `${Const.osspath}audio/noise.mp3`;

    static readonly videoUrl: string = `${Const.osspath}video/nsp.mp4`;

    static readonly logoUrl: string = `${Const.osspath}image/others/nsplog.png`;

    static staticVisitorUrl(name: string): string {

        return `${this.osspath}image/visitor/static/${name}.png`;
        
    }
    

    static dynamicVisitorUrl(name: string) {

        return `${this.osspath}image/visitor/dynamic/${name}.png`;

    }
}
