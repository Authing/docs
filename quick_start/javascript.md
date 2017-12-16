# authing-js-sdk

----------

JavaScript SDK 支持 **Angular.js**, **React.js**, **Vue.js** 以及 **Node.js**.我们提供了完全一致的接口.

## 安装

----------

#### NPM

当构建大规模应用时，我们推荐使用```npm```进行安装， 它可以与一些模块打包工具很好地配合使用，如 ```Webpack```， ```Browserify。```

``` shell
# latest stable
$ npm install authing
```

## 开始使用

----------

##### 使用方法

##### ES5

在```ES5```中我们使用 **Promise** 处理异步编程。

``` javascript
var Authing = require('authing');

var clientId = 'your_client_id'; //your client ID applied on our website
var secret = 'your_app_secret'; //your app secret

var auth = new Authing({
	clientId: clientId,
	secret: secret
});

auth.then(function(auth) {

	var email = 'test@testmail.com';
	var password = 'testpassword';

	Auth.login({
		email: email,
		password: password,
		clientId: clientId
	}).then(function(res) {
		console.log(res);	
	}).catch(function(error) {
		conosle.log(error);	
	});
	
});

```

[怎样获取client ID ?](/quick_start/howto.md)。


##### ES6+

在```ES6+```中，我们使用 **async 函数** 和 **await 关键字** 处理异步编程。

``` javascript
import Authing from 'authing';

const main = async () => {

	let clientId = 'your_client_id';
	let secret = 'your_app_secret';

	const Auth = await new Authing({
		clientId,
		secret
	});

	let email = 'test@testmail.com';
	let password = 'testpassword';

	const res = await Auth.login({
		email,
		password
	});

	if(res) {
		console.log('login success');
	}else {
		console.log('login failed');
	}

}

main();

```

想了解更多API，请[继续阅读](/quick_start/howto.md)。


