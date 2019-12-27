 enum RotationDirectionEnum {
    Landscape,  //横屏
    Portrait    //竖屏
}


export class MobileRotationDirection {

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