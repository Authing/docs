# 获取 client ID

----------

```client ID``` 可以在 [Authing](http://authing.cn)申请，步骤如下。

#### 登录

[登录 - Authing](http://authing.cn/login).

#### 新建一个应用

[控制中心 - Authing](http://authing.cn/dashboard).


#### 获取 client ID

然后就能在应用的控制面板获取 client ID.

#### 使用 client ID

##### ES5

``` javascript

var Authing = require('authing');

var clientId = 'your_client_id'; //your client ID applied on our website
var secret = 'your_app_secret'; //your app secret

var auth = new Authing({
	clientId: clientId,
	secret: secret
});

auth.then(function(auth) {
	//use auth
});

```

##### ES6+

``` javascript
import Authing from 'authing';

const main = async () => {

	let clientId = 'your_client_id';
	let secret = 'your_app_secret';

	const Auth = await new Authing({
		clientId,
		secret
	});

	//user auth

}

main();

```
