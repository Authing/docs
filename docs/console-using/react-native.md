# React Native

SDK for React Native 是 Authing 提供的一种在 webview 中嵌入了 Guard 组件的集成功能 sdk，你可以把它嵌入在你任何的 React-Native 应用中，一站式处理复杂的用户认证流程。

<AppDetailSiderBar />

## 安装

> 注：authing-rn-sdk 的 npm 包名称为 @authing/rn

```shell
yarn add react-native-gesture-handler react-native-webview
yarn add @authing/rn
```

如果是 iOS，需要执行：

```shell
cd ios && pod install
```



## 认证你的用户

### 1.快速开始

用户在登录成功后会触发 `onLogin` 事件，并且在事件中会返回用户的详细信息。`onLogin` 具体的使用方法如下：

```js
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { AuthingGuard } from '@authing/rn';

const App = () => {
  // 替换你的 AppId
	const appId = 'your_appId_at_authing_console';
	const options = {
		title: 'SDK for React Native',
		forceLogin: true // 将注册和登录合并，当用户不存在的时候为其自动注册
	};
	const onLogin = (loginMethod, userInfo) => {
		alert(JSON.stringify(userInfo));
	};
	return (
		<>
			<StatusBar barStyle="dark-content" />
			<SafeAreaView style={{ flex: 1 }}>
				<AuthingGuard appId={appId} options={options} onLogin={onLogin} />
			</SafeAreaView>
		</>
	);
};

export default App;

```



### 2. 携带 Token 信息到请求中

用户成功登录之后 authing-rn-sdk 会将用户信息 `userInfo` 回调给传入的 `onLogin` 函数，`userInfo` 是数组类型，第一项是用户信息，用户信息中包含了 Authing 用户 ID、头像、昵称等，还包括登录凭证 `token`。

将 `Authorization` 请求头设置为 "Bearer " + token，例如：

```js
Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVuaW9uaWQiOiJvaVBiRHVHNFM3bXNyS0hQS0RjOE1FQ1NlOGpNIiwiaWQiOiI1ZGMxMGJjYjZmOTRjMTc4YzZmZmZmYjkiLCJjbGllbnRJZCI6IjVkYTdlZGFiNTAzOTZjMWFkOTYyMzc4YSJ9LCJpYXQiOjE1NzI5NTY0MjUsImV4cCI6MTU3NDI1MjQyNX0.OTgl72WZS8So3R5DbWCJ7I_Bd0LaZa4S0TAVMg9qaYQ';

```

如果你使用的是 axios，可以这样写：

```js
axios.get('https://mywebsite.com/endpoint/', {
	headers: {
		Authorization: `Bearer ${userInfo[0].token}`
	}
});
```

如果你使用的是 fetch，可以这样写：

```js
fetch('https://mywebsite.com/endpoint/', {
	method: 'POST',
	headers: {
		Authorization: `Bearer ${userInfo[0].token}`
	},
	body: JSON.stringify({
		firstParam: 'yourValue',
		secondParam: 'yourOtherValue'
	})
});
```



### 3.在后端验证 Token

Authing 提供了几种方法帮助检验 token 的合法性和对应用户的登录状态，[文档点这里 (opens new window)](https://docs.authing.cn/v2/guides/faqs/how-to-validate-user-token.html)。

开发者可以把这个方法封装成一个函数，比如说 check_authing_token_status（为了方便我使用了 Python ）：

> 开发者不用在后端存储该 token，只需要调用 Authing 提供的接口。

```py
def check_authing_token_status(token: str) -> bool:
    """
    :param token: Authing 返回用户信息中携带的 token
    :return: 布尔值，表示是否处于登录状态
    """
    # 调用 Authing 提供的方法，具体实现方法省略，请参见上文提到的文档
    pass
```



然后就可以通过登录状态和自己的业务逻辑对请求进行响应了，比如：

```py
logged_in = check_authing_token_status(token)
if not logged_in:
    # 返回错误提示
# 正常继续下面的逻辑
```



## 管理你的用户

`ManagementClient` 以管理员（Administrator）的身份进行请求，用于管理用户池资源和执行管理任务，提供了管理用户、角色、应用、资源等方法；一般来说，你在 [Authing 控制台 (opens new window)](https://console.authing.cn/console/userpool)中能做的所有操作，都能用此模块完成。此模块适合在后端或者**可信任**的前端环境下使用。下面使用 NodeJs 的sdk来实现（或者也可以在 React-Native 前端项目中使用）：

### 1.安装

```shell
yarn add authing-js-sdk
```

### 2.初始化

```js
import { ManagementClient } from 'authing-js-sdk'

const managementClient = new ManagementClient({
  userPoolId: 'YOUR_USERPOOL_ID',
  secret: 'YOUR_USERPOOL_SECRET',
})
```

完整参数列表如下:

-   `userPoolId`: 用户池 ID（必填）。
-   `secret`: 用户池密钥（必填）。
-   `timeout`: 请求超时时间（可选）。单位为毫秒，默认为 10000（10 秒）。
-   `onError`: 错误处理函数，你可以用其来全局捕捉 Authing 客户端请求的所有异常。
-   `host`: Authing 服务器地址。如果你使用的是公有云版本，请忽略此参数。如果你使用的是私有化部署的版本，此参数必填。格式如下: `https://authing-api.mydomain.com`，最后不带 `/`。
-   `publicKey`: 密码非对称加密公钥（可选），如果你使用的是 Authing 公有云服务，可以忽略；如果你使用的是私有化部署的 Authing，请联系 Authing IDaaS 服务管理员。
-   `lang`: 接口 Message 返回语言格式（可选），可选值为 `zh-CN` 和 `en-US`，默认为 `zh-CN`。

### 3.快速开始

1. 获取用户目录列表:

```js
const { list, totalCount } = await managementClient.users.list()
```

2. 创建角色:

```js
const role = await managementClient.roles.create('code', '角色名称')
```

3. 修改用户池配置:

```js
const userpool = await managementClient.userpool.update({
  registerDisabled: true, // 关闭用户池注册
})
```



## 错误处理

Sdk 有专门的回调函数来处理遇到的错误，如下列表：

| onRegisterError              | 用户注册失败                     | `error` | 错误信息.  |
| ---------------------------- | -------------------------------- | ------- | ---------- |
| onLoginError                 | 登录失败                         | `error` | 错误信息。 |
| onRegisterInfoCompletedError | 注册补充失败事件                 | `error` | 错误信息。 |
| onPwdResetError              | 密码重置事件失败事件             | `error` | 错误信息。 |
| onPwdPhoneSendError          | 手机号重置密码发送验证码失败事件 | `error` | 错误信息。 |
| onPwdEmailSendError          | 邮箱重置密码发送验证码失败事件   | `error` | 错误信息。 |
| onLoadError                  | Authing appId 验证失败事件       | `error` | 错误信息。 |

如果出错都有各自的错误码，可以通过错误码来进行兜底处理
完整的错误码可以看这个[列表](https://docs.authing.cn/v2/reference/error-code.html)
