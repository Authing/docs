# authing-js-sdk

----------

JavaScript SDK 支持 **Angular.js**, **React.js**, **Vue.js** 以及 **Node.js**.我们提供了完全一致的接口.

- [一行代码生成登录表单]()
- [Vue Demo](https://sample.authing.cn)
- [Express 中间件](https://github.com/Authing/express-middleware)

## 安装

----------

#### NPM

当构建大规模应用时，我们推荐使用```npm```进行安装， 它可以与一些模块打包工具很好地配合使用，如 ```Webpack```， ```Browserify。```

``` shell
# latest stable
$ npm install authing-js-sdk --save
```

## 开始使用

----------

##### 使用方法

##### ES5

在 ```ES5``` 中我们使用 **Promise** 处理异步编程。

``` javascript
var Authing = require('authing-js-sdk');

// 对Client ID和Client Secret进行验证，获取Access Token
var auth = new Authing({
	clientId: 'your_client_id',
	secret: 'your_app_secret'
});

auth.then(function(validAuth) {

	//验证成功后返回新的authing-js-sdk实例(validAuth)，可以将此实例挂在全局

	validAuth.login({
		email: 'test@testmail.com',
		password: 'testpassword'
	}).then(function(user) {
		console.log(user);	
	}).catch(function(error) {
		console.log(error);	
	});
	
}).catch(function(error) {
	//验证失败
	console.log(error);
});

```

[怎样获取client ID ?](https://docs.authing.cn/#/quick_start/howto)。

在初始化 Authing 构造函数时，会有网络请求，所以建议在整个程序中仅初始化一次。

##### ES6+

在```ES6+```中，我们使用 **async 函数** 和 **await 关键字** 处理异步编程。

``` javascript
import Authing from 'authing-js-sdk';

const main = async () => {

	//使用async时需要使用try...catch...捕捉错误

	let auth;

	try{
		auth = await new Authing({
			clientId: 'your_client_id',
			secret: 'your_app_secret'
		});
	}catch(error) {
		console.log('Authing验证失败:', error);
	}

	if(auth) {

		let user;

		try {
			user = await auth.login({
				email: 'test@testmail.com',
				password: 'testpassword'
			});
		}catch(error) {
			console.log('登录失败:', error);
		}

		if(user) {
			console.log('login success');
		}else {
			console.log('login failed');
		}

	}

}

main();

```

## 使用小程序扫码登录

参考文档： [小程序扫码登录](https://docs.authing.cn/#/quick_start/wxapp_scan_login)

注意：使用小程序扫码登录，请将``authing-js-sdk``升级到``v0.1.19``版本以上

了解更多报错的详情，请查看[错误代码](https://docs.authing.cn/#/quick_start/error_code)。

获取Client ID和Client Secret，请[点击这里](https://docs.authing.cn/#/quick_start/howto)。


