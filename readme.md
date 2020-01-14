

# 如何运行项目
- npm install
- npm run build-test
- npm run start 

# 如何验证和查看glTF
推荐使用vscode的插件[glTF Tools](https://marketplace.visualstudio.com/items?itemName=cesium.gltf-vscode)

# 如何导出glTF文件
- [glTF Tutorial](https://github.com/KhronosGroup/glTF-Tutorials/blob/master/gltfTutorial/README.md)
- 3Dmax可使用[BabylonJS plugin](https://doc.babylonjs.com/resources/3dsmax#how-to-install-the-3ds-max-plugin)导出glTF。更多导出工具请参考[glTF官方列出的工具](https://github.com/KhronosGroup/glTF#converters-importers-and-exporters)

# 如何优化模型文件
[官方给出很多工具](https://github.com/KhronosGroup/glTF#optimizers),我主要使用官方提供[glTF Pipeline](https://github.com/AnalyticalGraphicsInc/gltf-pipeline)这个工具将glTF转为glb并进行模型文件的压缩。

常用命令（其他用法请参考[官方的github库](https://github.com/AnalyticalGraphicsInc/gltf-pipeline)):
> gltf-pipeline -i model.gltf -o model.glb -d

# 使用Typescript
本项目使用typescript作为开发语言，下面是如何在vscode中配置使用typescript的链接
- [配置webpack使用TypeScript](https://www.tslang.cn/docs/handbook/react-&-webpack.html)
- [TypeScript教程](https://www.tslang.cn/docs/home.html)