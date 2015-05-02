# 第一周

## 1. Hello World in LeanCloud

这次这个小项目想要找一个免费，无后台，国内访问速度快的方案，经过一番调查，发现了 [LeanCloud](https://leancloud.cn/)。

LeanCloud 不仅提供类 Parse 和 Firebase 的云数据库 API，他的云代码功能提供还 web hosting，能用 express.js 来做一些简单的后端处理，正好是我想要的，如果流量不大的话，所以东西都可以完全免费。

首先，我就来教你如何把一段代码放在 LeanCloud 上面。

1. 安装 node.js

	参考 [官网说明](https://nodejs.org/)，或者用 Homebrew
	
	```
	$ brew install node
	```
2. 安装 LeanCloud 命令行工具使用详解

	[官网说明](https://cn.avoscloud.com/docs/cloud_code_commandline.html)
	
	```
	$ npm install -g avoscloud-code
	```
	
	安装成功后，你应该就可以看到版本号了
	
	```
	$ avoscloud -V
	0.6.8
	```
3. 用 LeanCloud 开始一个新项目

	如果你没有 LeanCloud 的话，首先注册新用户，然后创建应用，选择你的应用名，我选择的是 `timeline`
	
	在你想要放置项目的文件夹里，用 `avoscloud new` 开始一个新项目，这时候你会看到一些设置。
	
	```
	$ avoscloud new
开始输入应用信息，这些信息可以从'开发者平台的应用设置 -> 应用 key'里找到。
请输入应用的 Application ID: 7jb2qe0qp3q33s0kv5jytvmn092f8gvjyl8mgziq9do0il1q
请输入应用的 Master Key:
选择您的应用类型（标准版或者 web 主机版）: [standard(S) or web(W)] W
Creating project...
  timeline/
  timeline/README.md
  timeline/config/
  timeline/config/global.json
  timeline/public/
  timeline/public/index.html
  timeline/cloud/
  timeline/cloud/main.js
  timeline/cloud/app.js
  timeline/cloud/views/
  timeline/cloud/views/hello.ejs
  ```
  
  - 输入 App Key 和 Master Key，这个可以在 '开发者平台的应用设置 -> 应用 key' 里找到
  ![keys](https://cloud.githubusercontent.com/assets/2078389/7440867/b9cf013a-f0ff-11e4-86df-9fe0600169cf.jpg)
  - 应用类型：标准或者 web，标准的意思是整个网站是静态页面，web 的意思是用 express.js 来驱动的服务器，因为后面我需要用到一点服务器，这里选择 web `W`
  
  现在你就能看到 LeanCloud 自动给你创建了一些文件，包括一些比较重要的账号信息。
  
4. 在本地测试

	```
	$ cd timeline
	$ avoscloud
	```
	
	现在去浏览器打开 `http://localhost:3000`，你就能看到成功页面了。
	![localhost](https://cloud.githubusercontent.com/assets/2078389/7440931/b364220a-f102-11e4-91c3-580009b85c79.png)
	
5. 添加 404 页面

	修改 `cloud/app.js` 如下
	
	```javascript
	// 在 Cloud code 里初始化 Express 框架
	var express = require('express');
	var app = express();

	// App 全局配置
	app.set('views','cloud/views');   // 设置模板目录
	app.set('view engine', 'ejs');    // 设置 template 引擎
	app.use(express.bodyParser());    // 读取请求 body 的中间件

	// 使用 Express 路由 API 服务 /hello 的 HTTP GET 请求
	app.get('/', function(req, res) {
	  res.render('index');
	});

	// 最后，必须有这行代码来使 express 响应 HTTP 请求
	app.listen();

	app.use(function(req, res, next){
	  res.status(404).render('404');
	});
	```
	
	删除 `cloud/views/hello.ejs` 和 `public/index.html`
	
	添加 `cloud/views/index.ejs`
	
	```html
	hello world
	```
	
	添加 `cloud/views/404.ejs`
	
	```html
	404
	```
	
	刷新浏览器，你会看到 `hello world`
	
	访问 `http://localhost:3000/asdfasdf` 这个不存在的页面，你会看到 `404`
	
6. 把代码部署到测试服务器

	LeanCloud 的部署有两种方法，一是本地上传，还有一种是用 GitHub。由于文件里面有一些 key 你不会愿意别人看到，如果用 GitHub 的话最好是用私有 repo，但是私有 repo 是收费的。当然你也可以选择 Bitbucket 这样的免费方案，这里我们选择用本地上传方式，也是非常简单。
	
	在上传之前，你首先需要设置你的 url，也就是访问地址。（储存 -> 云代码 -> 设置）
	![url setting](https://cloud.githubusercontent.com/assets/2078389/7440870/e514893c-f0ff-11e4-8363-8abe22bc2672.jpg)
	我选择了 timeline.avosapps.com，如果你输入的和别人重复了，你需要再填一个新的，然后保存。
	
	
	```
	$ avoscloud deploy
	```
	
	如果你看到了上传成功的话，那么现在可以访问 `http://dev.timeline.avosapps.com`，把 `timeline` 换成你刚才选择的 url 名字，你就可以看到测试版的 `hello world` 啦。（如果部署失败的话，可以多试几次，我第一次就失败了）
	
7. 把代码部署到 production 服务器

	现在你也在线测试了你刚才写的代码没有问题，可以正式上线啦。
	
	```
	$ avoscloud publish
	```
	
	现在直接在浏览器上输入你刚才设置的 url：`http://timeline.avosapps.com`，你应该能看到一样的结果。
	
	如果你想要用个人域名的话，你需要备案，然后联系 LeanCloud 客服去验证你的备案。如果验证成功，那么你的个人域名打开就有你新建的网站啦。
	
## 2. Hello World in Webpack & React.js

这个项目打算用 React.js，目前主流用编译 CommonJS 的工具有 Browserify 和 Webpack，这个项目我打算用没尝试过的 Webpack 来做。Webpack 的功能非常强大，Instagram 的网页版就是用的它。用不同的 loader，可以实现 es6 语法，编译 sass，小图片自动转换成 data-url 等等的功能。

Webpack 还支持 webpack-dev-server，一个本地 http 服务器还支持 live reload，但是这个项目我们需要用到 LeanCloud，就用 LeanCloud 自带的本地服务器就好。

1. 安装 Webpack

	上一章我们已经安装好了 node.js，现在安装 Webpack
	
	```
	$ npm install webpack -g
	```
	
2. 安装 loaders

	Loader 是 Webpack 的一个核心，这里我们需要安装一些用来编译 React.js 的 loader。
	
	在文件夹新建一个文件 `package.json`
	
	```javascript
	{
	  "name": "timeline",
	  "version": "1.0.0",
	  "description": "Personal Timeline",
	  "scripts": {
	  },
	  "author": "Hu Chen",
	  "license": "MIT",
	  "dependencies": {
	    "babel-loader": "^5.0.0",
	    "react": "^0.13.2"
	  }
	}
	```
	
	修改作者名和项目介绍后

	

