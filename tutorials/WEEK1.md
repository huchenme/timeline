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

这个项目打算用 React.js，目前主流用编译 CommonJS 的工具有 Browserify 和 Webpack，这个项目我打算用没尝试过的 Webpack 来做。Webpack 的功能非常强大，Instagram 的网页版就是用的它。用不同的 loader，可以实现 es6 语法，编译 PostCSS，小图片自动转换成 data-url 等等的功能。

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

	修改作者名和项目介绍后，安装 Dependencies

	```
	$ npm install
	```

	安装结束后你会发现文件夹多了个 node_modules 的文件夹，里面安装了 react 和 babel-loader。babel loader 可以转换 es6 到 es5，也可以转换 JSX。

3. 把 LeanCloud 的文件放入 leancloud 文件夹

	LeanCloud 因为可以当后端用，所以他也会分析上传的 package.json，我们这个文件完全本地使用，连同安装的 node_modules 都没有必要上传到服务器，所以还是把 LeanCloud 的文件夹分开来比较好一点。

	现在新建一个 `leancloud` 文件夹，把`cloud`，`config`和`public`文件夹移到新建的`leancloud`里面。

4. 添加 React.js 的 hello world 文件

	1. 在根目录下建立 `src` 文件夹
	2. 在 `src` 文件夹里添加 `main.js`

		```javascript
		const React = require("react");
		const Container = require("components/Container");

		React.render(<Container />, document.getElementById("main"));
		```

	3. 在 `src` 文件夹里添加 `components` 文件夹
	4. 在 `components` 文件夹里添加 `Container.js`

		```javascript
		const React = require("react");

		const Container = React.createClass({
		  render () {
		    return (
		      <h1>Hello World from Webpack & React.js</h1>
		    );
		  }
		});

		module.exports = Container;
		```

		注意这里用到了一些 ES6 的语法和 JSX

5. 在根目录添加 `webpack.config.js`

	```javascript
	const webpack = require('webpack');

	module.exports = {
	  entry: './src/main.js',
	  output: {
	    path: './leancloud/public',
	    filename: 'bundle.js'
	  },
	  resolve: {
	    extensions: ['', '.jsx', '.js'],
	    modulesDirectories: ["src", "node_modules"]
	  },
	  module: {
	    loaders: [
	      { test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/ }
	    ]
	  }
	};
	```
	这个文件就是告诉 Webpack 如何编译的文件了，我大概讲一下每个的意思：
	1. `entry` 需要编译的源文件
	2. `output` 编译后的文件

		`path`：输出的文件夹
		`filename`：输入文件
	3. `resolve`

		`extensions`：这些文件后缀名在 require 的时候是不用加的，比如在 `main.js` 第二排里的 `Container`
		`modulesDirectories`: 在查找的 path 里面加上 `src` 和 `node_modules`，比如 `main.js` 里面的 `react` 来自 `node_modules`，`components/Container` 来自 `src`
	4. `loaders`

		我这里只用了一个 loader，意思是任何后缀名为 `js` 或者 `jsx` 的都用 `babel` 来解析，但是在 `node_modules` 文件夹里面的除外

	关于 Webpack 的 config，我这里只接触了皮毛，要想深研究的话，可以去官网看看，或者看这两个：

	- [webpack-howto](https://github.com/petehunt/webpack-howto)
	- [Webpack 怎么用](http://segmentfault.com/a/1190000002552008)

6. 修改 index.ejs

	```html
	<!DOCTYPE html>
	<html>
	  <head>
	    <meta charset="UTF-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1">
	    <title>人生简历</title>
	  </head>
	  <body>
	    <div id="main"></div>
	    <script src="bundle.js"></script>
	  </body>
	</html>
	```

	这里我们就需要使用生成的 `bundle.js` 文件

7. 编译 webpack

	```
	$ webpack
	```

	编译后，你会发现 `leancloud/public/` 文件夹里面多出一个 `bundle.js`

8. 本地测试

	```
	cd leancloud
	avoscloud
	```

	浏览器访问 `http://localhost:3000`

	![screenshot](https://cloud.githubusercontent.com/assets/2078389/7441607/c6fbdb72-f121-11e4-9073-ad8783664813.png)

9. 上传到 LeanCloud

	```
	cd ..
	webpack -p
	cd leancloud
	avoscloud deploy
	avoscloud publish
	```

	回到跟目录，编译 webpack 到 production，这会进一步缩小文件大小，然后 deploy 后 publish，访问 `http://timeline.avosapps.com` 你会得到和本地一样的页面

## Hello World in PostCSS

我们都知道 Module based JS 文件的好处，那么 css 能不能也是按 Component 来分呢。用 Webpack 的好处之一就是 css 也能组件化，每个 component 都有单独的 css。

这里我们用 PostCSS 来建立我们的 style，现在好像国内只有淘宝在用 PostCSS，据说 Bootstrap 4 会用 PostCSS 来重写。我觉得这时候我有必要来尝个鲜。

1. 	修改 package.json

	```javascript
	"dependencies": {
		"babel-loader": "^5.0.0",
		"css-loader": "^0.12.0",
		"postcss-loader": "^0.4.2",
		"react": "^0.13.2",
		"style-loader": "^0.12.1",
		"cssnext": "^1.4.0",
		"suitcss": "latest",
		"suitcss-base": "latest",
		"suitcss-components-arrange": "latest",
		"suitcss-components-button": "latest",
		"suitcss-components-flex-embed": "latest",
		"suitcss-components-grid": "latest",
		"suitcss-utils-align": "latest",
		"suitcss-utils-display": "latest",
		"suitcss-utils-layout": "latest",
		"suitcss-utils-link": "latest",
		"suitcss-utils-offset": "latest",
		"suitcss-utils-position": "latest",
		"suitcss-utils-size": "latest",
		"suitcss-utils-text": "latest"
  	}
	```

	安装新添加的 loaders

	```
	$ npm install
	```

2. 修改 `webpack.config.js` 来使用 postcss

	```javascript
	const cssnext = require('cssnext');

	module.exports = {
	  entry: './src/main.js',
	  output: {
	    path: './leancloud/public',
	    filename: 'bundle.js'
	  },
	  resolve: {
	    extensions: ['', '.jsx', '.js', '.css'],
	    modulesDirectories: ["src", "node_modules"]
	  },
	  module: {
	    loaders: [
	      { test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/ },
	      { test: /\.css$/, loader: 'style!css!postcss' }
	    ]
	  },
	  postcss: [
	    cssnext({
	      import: {
	        path: ['node_modules', 'src/css']
	      }
	    })
	  ]
	};
	```

3. 添加 `src/css/base.css`

	```scss
	@import "suitcss-base";
	@import "variables";
	```

4. 添加 `src/css/components/header.css`

	```scss
	.tl-Header {
	  font-weight: bold;
	}
	```

	这里每个 Component 都对应一个 React 的 component，我用到了 [SUIT CSS 的命名规则](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md)，为了避免和别的 css 冲突，我也用到了 namespace `tl` 来代表 `timeline`

5. 添加 `src/css/components/footer.css`

	```scss
	.tl-Footer {
	  font-style: italic;
	}
	```

6. 添加 `src/css/components/container.css`

	```scss
	.tl-Container {
	  background: var(--color-red);
	}

	@import "variables";
	```

7. 添加 `src/css/variables.css`

	```scss
	/**
	 * Breakpoints
	 */

	@custom-media --sm-viewport (min-width:320px);
	@custom-media --md-viewport (min-width:640px);
	@custom-media --lg-viewport (min-width:960px);

	/**
	 * Colors
	 */

	:root {
	  --color-twitter-blue: #55acee;
	  --color-white: #fff;

	  /* Primary grays */
	  --color-charcoal: #292f33;
	  --color-dark-gray: #66757f;
	  --color-medium-gray: #8899a6;
	  --color-gray: #ccd6dd;
	  --color-border-gray: #e1e8ed;
	  --color-faint-gray: #f5f8fa;

	  /* Primary blues */
	  --color-dark-blue: #226699;
	  --color-deep-blue: #3b88c3;
	  --color-light-blue: #88c9f9;

	  /* Secondary colors */
	  --color-orange: #ffac33;
	  --color-green: #77b255;
	  --color-purple: #9266cc;
	  --color-red: #dd2e44;
	  --color-yellow: #ffcc4d;

	  /* Secondary color variants */
	  --color-dark-orange: #f4900c;
	  --color-dark-green: #3e721d;
	  --color-dark-purple: #553788;
	  --color-dark-red: #a0041e;
	  --color-deep-green: #5c913b;
	  --color-deep-purple: #744eaa;
	  --color-deep-red: #be1931;
	  --color-light-yellow: #ffd983;
	  --color-light-green: #a6d388;
	  --color-light-purple: #aa8dd8;
	  --color-light-red: #ea596e;
	  --color-faded-yellow: #ffe8b6;
	  --color-faded-green: #c6e5b3;
	  --color-faded-blue: #bbddf5;
	  --color-faded-purple: #cbb7ea;
	  --color-faded-red: #f4abba;
	}

	/**
	 * Fonts
	 */

	:root {
	  --font-size: 16px;
	  --font-family: sans-serif;
	  --line-height: 1.4;
	}

	/**
	 * Spacing
	 */

	:root {
	  --space-small-px: 10px;
	  --space-medium-px: 15px;
	  --space-large-px: 20px;
	}

	```

	这里都是用的 CSS4 的语法，主要用来改 SUIT CSS 的一些参数，和我们会用到的各个组件的参数

8. 把 `src/components` 改为 `src/js/components`

9. 新建 `src/js/components/Container.js`

	```javascript
	const React = require("react");
	const Header = require("js/components/Header");
	const Footer = require("js/components/Footer");

	require("css/components/container");
	require("suitcss-utils-layout");

	const Container = React.createClass({
	  render () {
	    return (
	      <div className="tl-Container u-cf">
	        <Header />
	        <Footer />
	      </div>
	    );
	  }
	});

	module.exports = Container;

	```

	现在和 commonJS 一样，每个 Component 都需要 require 对应的 css 文件。比如这里用了 `tl-Container` 和 `u-cf` 这两个 class，就需要分别 require 他们对应的文件。

10. 新建 `src/js/components/Header.js`

	```javascript
	const React = require("react");

	require("css/components/header");

	const Header = React.createClass({
	  render () {
	    return (
	      <div>
	        <div className="tl-Header">
	          Header
	        </div>
	      </div>
	    );
	  }
	});

	module.exports = Header;
	```

11. 新建 `src/js/components/Footer.js`

	```javascript
	const React = require("react");

	require("css/components/footer");

	const Footer = React.createClass({
	  render () {
	    return (
	      <div className="footer">
	        Footer
	      </div>
	    );
	  }
	});

	module.exports = Footer;
	```

12. 修改 `src/main.js`

	```javascript
	const React = require("react");
	const Container = require("js/components/Container");

	require("css/base");

	React.render(<Container />, document.getElementById("main"));

	```

13. 测试

	再运行 `webpack` 编译后，在 `localhost` 里面就能看到新的带 css 的页面了

	![screenshot](https://cloud.githubusercontent.com/assets/2078389/7444077/c0243ea8-f1a7-11e4-8d2b-da0928a5f92d.png)

	如果你注意，你会发现 css 会自动加载到 header 里面，而不是单独的 css 文件。这就是 webpack 的一个独特的地方，他只会加载当前页面需要的 css 文件，如果你的 App 有很多页面，比如 admin 的话，在页面 A 就不会加载页面 B 的 style。

	当然这么做也会有一些弊端，比如如果 css 文件很大的话，那么在页面加载过程中会出现几秒没有美化的页面，直到整个 bundle.js 加载成功才会出现美化。

15. 单一 css 文件

	要解决这个问题，可以使用一个 webpack 的 plugin

	```
	$ npm install extract-text-webpack-plugin --save
	```

	修改 webpack.config.js

	```javascript
	const webpack = require('webpack');
	const ExtractTextPlugin = require('extract-text-webpack-plugin');
	const cssnext = require('cssnext');

	const definePlugin = new webpack.DefinePlugin({
	  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'false'))
	});

	module.exports = {
	  entry: './src/main.js',
	  output: {
	    path: './leancloud/public',
	    filename: 'bundle.js'
	  },
	  resolve: {
	    extensions: ['', '.jsx', '.js', '.css'],
	    modulesDirectories: ["src", "node_modules"]
	  },
	  module: {
	    loaders: [
	      { test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/ },
	      { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css!postcss') }
	    ]
	  },
	  postcss: [
	    cssnext({
	      import: {
	        path: ['node_modules', 'src/css']
	      }
	    })
	  ],
	  plugins: [
	    definePlugin,
	    new ExtractTextPlugin("bundle.css")
	  ]
	};
	```

	再运行 `webpack`，你会发现 `leancloud/public` 里面，除了 bundle.js 之外，还多出了一个 bundle.css

	注意这里我还加了段 `definePlugin`，有什么用呢？如果在你的源码里面加入

	```javascript
	if (__DEV__) {
	  console.log('Dev');
	}
	```

	的话，那么这一段只会在本地运行，在 `webpack -p` 的时候这段代码会被自动移除掉

	现在在 `index.ejs` 里面的 header 里加上

	```html
	<link rel="stylesheet" href="bundle.css" />
	```

	刷新浏览器，你会发现一样的结果，只不过现在的 style 都在 bundle.css 里面了

16. 部署到 production

	```
	$ webpack -p
	$ cd leancloud
	$ avoscloud deploy
	$ avoscloud publish
	```

	现在访问 `timeline.avosapps.com`，能看到刚才的修改都已经上线了。

17. 把常用的命令放到 package.json 里面

	修改 package.json

	```javascript
	"scripts": {
		"start": "cd leancloud && avoscloud -P 4567 && cd $OLDPWD",
		"watch": "BUILD_DEV=1 webpack --watch",
		"build": "npm run clean && NODE_ENV=production webpack -p",
		"clean": "rm -rf leancloud/public/*",
		"deploy": "npm run build && cd leancloud && avoscloud deploy && cd $OLDPWD",
		"publish": "cd leancloud && avoscloud publish && cd $OLDPWD"
	},
	```

	现在用 `npm run deploy` 的话就可以先清除 `public` 文件夹，再编译 webpack，然后再 deploy 到 LeanCloud

### 资源

- [Smarter CSS builds with Webpack](http://bensmithett.com/smarter-css-builds-with-webpack/)
- [GitHub Webpack CSS example](https://github.com/bensmithett/webpack-css-example)
- [react-webpack-cookbook](https://christianalfoni.github.io/react-webpack-cookbook)
- [SUIT CSS](https://suitcss.github.io/)
- [SUIT CSS naming conventions](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md)

### [本周源码](https://github.com/huchenme/timeline/tree/week1)



