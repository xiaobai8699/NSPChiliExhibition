/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-27 15:51:25 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2020-01-11 16:36:00
 */


enum RotationDirectionEnum {
    Landscape,  //横屏
    Portrait    //竖屏
}


export class Direction {

    static direction: RotationDirectionEnum = RotationDirectionEnum.Portrait;

    static setLandscape(){
        this.direction = RotationDirectionEnum.Landscape;
    }

    static setPortraint(){
        this.direction = RotationDirectionEnum.Portrait;
    }

    static isLandscape(): boolean {
        return this.direction == RotationDirectionEnum.Landscape;
    }

    static isPortrait(): boolean {
        return this.direction == RotationDirectionEnum.Portrait;
    }

}