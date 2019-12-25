/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-25 08:44:06 
 * @Last Modified by:   Li Hong (lh.work@qq.com) 
 * @Last Modified time: 2019-12-25 08:44:06 
 */




interface IPlayerContol {

    update(delta: number): void;

    dispose(): void;
}

export { IPlayerContol }