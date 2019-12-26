/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-25 08:44:52 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2019-12-25 21:56:58
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

    static dumpVec3(v3: any, precision = 3) {
        return `${v3.x.toFixed(precision)}, ${v3.y.toFixed(precision)}, ${v3.z.toFixed(precision)}`;
    }

    static dumpObject(obj: any, lines: any = [], isLast = true, prefix = ''): String[] {
        const localPrefix = isLast ? '└─' : '├─';

        lines.push(`${prefix}${prefix ? localPrefix : ''}${obj.name || '*no-name*'} [${obj.type}]`);

        const dataPrefix = obj.children.length
            ? (isLast ? '  │ ' : '│ │ ')
            : (isLast ? '    ' : '│   ');

        lines.push(`${prefix}${dataPrefix}  pos: ${Utils.dumpVec3(obj.position)}`);
        lines.push(`${prefix}${dataPrefix}  rot: ${Utils.dumpVec3(obj.rotation)}`);
        lines.push(`${prefix}${dataPrefix}  scl: ${Utils.dumpVec3(obj.scale)}`);

        const newPrefix = prefix + (isLast ? '  ' : '│ ');
        
        const lastNdx = obj.children.length - 1;

        obj.children.forEach((child: any, ndx: any) => {
            const isLast = ndx === lastNdx;
            Utils.dumpObject(child, lines, isLast, newPrefix);
        });
        
        return lines;
    }
}


export { Utils };