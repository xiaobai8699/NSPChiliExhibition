/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-30 17:50:19 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2020-01-02 17:29:49
 */

export class Const {

    static readonly nspLogName: string = "logo_D";

    static readonly audioUrl: string = "";

    static readonly videoUrl: string = "";


    static staticVisitorUrl(name: string): string {

        return "./asset/image/visitor/static/"+ name + ".png";
        
    }
    

    static dynamicVisitorUrl(name: string) {

        return "./asset/image/visitor/dynamic/"+ name + ".png";

    }
}
