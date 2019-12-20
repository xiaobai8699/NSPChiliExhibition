
class Utils {

    // https://stackoverflow.com/questions/3514784/what-is-the-best-way-to-detect-a-mobile-device
    // https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Browser_detection_using_the_user_agent
    static isMobile(): boolean {
        let userAgent = navigator.userAgent || navigator.vendor;

        return  (/windows phone/i.test(userAgent)) || 
                (/android/i.test(userAgent))       || 
                (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream);
    }

    static devicePixelRatio():number {
        //手机统一设置为2
        return Utils.isMobile() ? 1 : devicePixelRatio;
    }

}


export { Utils };