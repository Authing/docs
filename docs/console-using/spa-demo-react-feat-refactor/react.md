# React

本指南将从 Authing Browser SDK 的安装开始逐步引导你如何快速为你已有或新开发的 React 应用添加用户认证能力。

<AppDetailSiderBar />

## 安装



```bash
#使用 Yarn 安装
$ yarn add @authing/web
```

## 认证你的用户

### 初始化

```js
import { Authing } from '@authing/web';

const sdk = new Authing({
  domain: 'AUTHING_DOMAIN',// 应用的认证地址
  appId: 'AUTHING_APP_ID',// 应用 ID
  redirectUri: 'AUTHING_REDIRECTURI',// 登录回调地址
});
```

### 简单认证用户

```tsx
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Authing } from '@authing/web';
import type { LoginState } from '@authing/web/dist/typings/global';

function App() {
  const sdk = useMemo(() => {
    return new Authing({
      domain: 'AUTHING_DOMAIN',
      appId: 'AUTHING_APP_ID',
      redirectUri: 'AUTHING_REDIRECTURI',
    });
  }, []);

  const [loginState, setLoginState] = useState<LoginState | null>();

  // 以跳转方式打开 Authing 托管的登录页

  const login = () => {
    sdk.loginWithRedirect();
  };

  // 获取用户的登录状态

  const getLoginState = useCallback(async () => {
    try {
      const state = await sdk.getLoginState();
      setLoginState(state);
    } catch(error) {
      console.log(error);
    }
  }, [sdk]);

  useEffect(() => {
    // 判断当前 URL 是否为 Authing 登录回调 URL
    if (sdk.isRedirectCallback()) {
      /**
       * 以跳转方式打开 Authing 托管的登录页，认证成功后需要配合 
       * handleRedirectCallback 方法，在回调端点处理 Authing 发送的
       * 授权码或 token，获取用户登录态
       */
      sdk.handleRedirectCallback().then((res) => setLoginState(res));
    } else {
      getLoginState();
    }
  }, [getLoginState, sdk]);

  return (
    <div className="App">
      <p>
        <button onClick={login}>loginWithRedirect</button>
      </p>
      <p>
        <code>{JSON.stringify(loginState)}</code>
      </p>
    </div>
  );
}
export default App;
```

## 错误处理


```ts
const getLoginState = useCallback(async () => {
  try {
    const state = await sdk.getLoginState();
    setLoginState(state);
  } catch(error) {
    console.log(error);
  }
}, [sdk]);
```
