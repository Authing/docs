# React Native

本指南将从 Authing React Native SDK 的安装开始逐步引导你如何快速为你已有或新开发的应用添加用户认证与管理能力。

<AppDetailSiderBar />

## 安装

```shell
# 安装 React Native SDK
yarn add @authing/rn

# 安装 SDK 所需要的依赖
yarn add react-native-gesture-handler react-native-webview
```



## 认证你的用户

### 初始化

```js
//接入 AuthingGuard 非常简单，最简情况下，你只需要指定应用 id 和成功登录事件的回调函数即可。
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { AuthingGuard } from '@authing/rn';

const App = () => {
	const appId = 'AUTHING_APP_ID'; // 应用 ID
	const onLogin = (userInfo) => {
		/*
		* 用户成功登录之后，会将用户信息 userInfo 回调给传入的 onLogin 函数中。
		* 用户信息中包含了 Authing 用户 ID、头像、昵称等，还包括登录凭证 token
		*/ 
	};
	return (
		<>
			<StatusBar barStyle="dark-content" />
			<SafeAreaView style={{ flex: 1 }}>
				<AuthingGuard appId={appId} onLogin={onLogin} />
			</SafeAreaView>
		</>
	);
};

export default App;
```



## 管理你的用户

### 初始化

```shell
# 安装 js-sdk
yarn add authing-js-sdk
```

```js
import { ManagementClient } from 'authing-js-sdk'

const managementClient = new ManagementClient({
  userPoolId: 'AUTHING_USERPOOL_ID', // 用户池 ID
  secret: 'AUTHING_USERPOOL_SECRET', // 用户池密钥
})
```

### 简单管理用户

```js
// 创建用户
managementClient.create({
	 email: 'admin@test.com',
   password: 'test'
})
```



## 错误处理

```js
<AuthingGuard 
	appId={appId} 
	onLogin={onLogin} 
	onLoginError={(error)=>{
		// 如果出错都有各自的错误码，可以通过错误码来进行兜底处理
	}
}/>
  

// 管理模块 你可以使用 try catch 进行错误处理。
try{
  managementClient.create({
     email: 'admin@test.com',
     password: 'test'
  })
} catch(e) {
  
}
```