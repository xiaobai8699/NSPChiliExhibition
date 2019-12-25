/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-25 08:44:52 
 * @Last Modified by:   Li Hong (lh.work@qq.com) 
 * @Last Modified time: 2019-12-25 08:44:52 
 */


class Utils {

    // https://stackoverflow.com/questions/3514784/what-is-the-best-way-to-detect-a-mobile-device
    // https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Browser_detection_using_the_user_agent
    static isMobile(): boolean {
        let userAgent = navigator.userAgent || navigator.vendor;

        return (/windows phone/i.test(userAgent)) ||
            (/android/i.test(userAgent)) ||
            (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream);
    }

    static devicePixelRatio(): number {
        //手机统一设置为2
        // return Utils.isMobile() ? 2 : devicePixelRatio;
        return window.devicePixelRatio;
    }

}


export { Utils };