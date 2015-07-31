# 个人简历

## 项目介绍

[每个人都应该有一份「人生简历」](http://zhuanlan.zhihu.com/12in12/20015683)

## 教程

- [第一周：LeanCloud Web hosting & Webpack & PostCSS & SUIT CSS](https://github.com/huchenme/timeline/blob/master/tutorials/week-1.md)， [源码](https://github.com/huchenme/timeline/tree/week1)
- 第二周：React.js & Flux
- 第三周：连接 LeanCloud 后端
- 第四周：部署

## 本地运行

1. 安装 node.js
2. `npm install -g webpack avoscloud-code`
3. `npm install -g npm-check-updates`
4. 注册 LeanCloud 并新建应用
5. `cp leancloud/config/global.json.sample leancloud/config/global.json` 并替换 key
6. `npm intall` 安装 dependencies

本 Repo 是结合 LeanCloud 的 Web Hosting，不过不需要的话，可以考虑参考另一个自带 live reload 的 Repo https://github.com/huchenme/react-hot-postcss-boilerplate

## 开发

### 本地

1. 开启服务器

	```
	$ npm run
	```
2. 自动 compile webpack

	```
	$ npm run watch
	```
3. ESlint

	```
	$ gulp eslint
	```
4. SCSSlint

	```
	$ scss-lint
	```
5. 更新 npm

	```
	$ ncu -u
	```
6. 安装新的 package

	```
	$ npm i
	```
7. 打开浏览器 `http://localhost:4567` 测试

### Staging

1. `BUILD_DEV=1 webpack -p`(测试DB) 或者 `webpack -p`(生产DB)
2. commit and push to master
3. `avoscloud -g deploy`
4. 访问 http://dev.timeline.avosapps.com

### Production

1. 确保 Staging 的DB是生产DB
2. `avoscloud publish`
3. 访问 http://timeline.avosapps.com


## 开发进度

https://github.com/huchenme/timeline/issues/3

## Bug

请开新的 issue，或者提交 pull request
