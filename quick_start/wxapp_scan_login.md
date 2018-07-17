# 小程序扫码登录(authing-js-sdk)

小程序扫码登录指使用Authing小程序``身份管家``在网页端或其它客户端执行微信登录，目前的SDK仅支持客户端JavaScript。其它语言若想使用可参考[HTTP接口说明](https://docs.authing.cn/#/quick_start/wxapp_scan_login?id=http%E6%8E%A5%E5%8F%A3%E8%AF%B4%E6%98%8E)。[点击此处立即体验小程序扫码登录](http://sample.authing.cn)

注意：使用小程序扫码登录，请将``authing-js-sdk``升级到``v0.1.19``版本以上

![小程序扫码登录实例图片](https://usercontents.authing.cn/wxapp-sacan.png)

### 基础用法

在``authing-js-sdk``中使用``startWXAppScaning``方法（[authing-js-sdk文档](https://docs.authing.cn/#/quick_start/javascript)）： 

``` javascript

var Authing = require('authing-js-sdk');

// 对Client ID和Client Secret进行验证，获取Access Token
var auth = new Authing({
	clientId: 'your_client_id',
	secret: 'your_app_secret'
});

auth.then(function(validAuth) {

	validAuth.startWXAppScaning({
    	mount: 'qrcode-node', //二维码挂载点，如不写则默认漂浮在文档中间
	});
	
})

```

扫码完成后会自动跳到用户配置的URL上。

### 参数说明

``` javascript

validAuth.startWXAppScaning({
  	mount: 'qrcode-node', // 二维码挂载点，如不写则默认漂浮在文档中间
  	redirect: true, // 是否执行跳转（在用户后台配置的URL），默认为true，相关用户信息回传至url上
  	onSuccess: function(res) {}, // 登录成功后回调函数，redirect为true时不回调此函数
  	onError: function(error) {}, // 登录失败后回调函数，一般为网络问题
  	interval: 1500, // 每隔多少秒检查一次，默认1500
  	tips: '搜索小程序 <strong>身份管家</strong> 扫码登录', // 提示信息，可写HTML
});

```

### HTTP接口说明

HTTP接口适用于非JavaScript平台，JavaScript开发者可以略过此节。

扫码登录需要客户端做两个步骤：

1. 生成二维码
2. 客户端轮询查询扫码状态

还有一个步骤是用户搜索``身份管家``小程序进行扫码登录，这块Authing已经做好，不需要开发者操心。

#### 1. 生成二维码

##### 地址：https://oauth.authing.cn/oauth/wxapp/qrcode/:clientId?random=RANDOM_STRING

- **请求方法:**

  - ```GET```

- **参数:**

  - ```{String} clientId```
  	- 即将登录的Authing应用Id
  - ```{String} random```
  	- 客户端生成的随机字符串

- **返回数据:**

  - ``` javascript
	{
		"data": {
			"_id": "*********************",
			"client": "*********************",
			"oauth": "*********************",
			"oauthWithApplication": "*********************",
			"qrcode": "https://usercontents.authing.cn/wxapp/qrcode/SweuVjfoPwSUTVEUv.png",
			"expiredAt": "2018-07-16T12:56:03.000Z",
			"__v": 0,
			"createdAt": "2018-07-16T12:55:03.302Z",
			"redirect": "",
			"success": false,
			"used": false
		},
		"code": 200
	}
    ```
   - 返回数据中data中的qrcode即二维码地址，可直接先客户端显示。
   - 若处理成功，code为200，非200都为失败。

#### 2. 轮询查询扫码状态

##### 地址：https://oauth.authing.cn/oauth/wxapp/confirm/qr?random=RANDOM_STRING

- **请求方法:**

  - ```POST```

- **参数:**

  - ```{String} random```
  	- 在第一步生成二维码时客户端生成的随机字符串

- **返回数据:**

  - ``` javascript
	{
		"data": {
			"code": 200,
			"message": "扫码登录成功",
			"data": {
				"_id": "*********************",
				"email": null,
				"emailVerified": false,
				"username": "ivy",
				"nickname": "ivy",
				"company": "",
				"photo": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLkQc7PfrbBqFMib6lkPUxaA5UsMiadibfWQtKv0CBcKnH2khXicvUB9WB2ibYxN6GRTaTsQfPtlsAafBg/132",
				"browser": "",
				"token": "******************************************.*********************.*********************",
				"tokenExpiredAt": "Wed Aug 01 2018 15:59:42 GMT+0800 (CST)",
				"loginsCount": 14,
				"lastLogin": "Tue Jul 17 2018 15:59:42 GMT+0800 (CST)",
				"lastIP": "*********************",
				"signedUp": "Tue Jul 17 2018 11:15:03 GMT+0800 (CST)",
				"blocked": false,
				"isDeleted": false,
				"__typename": "ExtendUser"
			},
			"redirect": "http://sample.authing.cn/#/redirect"
		},
		"code": 200
	}
    ```
  - ``redirect``为用户在Authing控制台中配置的回调地址，开发者可自行回调到此地址
