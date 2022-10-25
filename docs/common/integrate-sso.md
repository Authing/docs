本文讲述在浏览器环境中，如何使用 {{$localeConfig.brandName}} 提供的 SDK，实现 [单点登录](/guides/app-new/sso/)。

本文使用的 **SDK 名称**：Authing Web SDK，**NPM 包名**：[@authing/web](https://www.npmjs.com/package/@authing/web)。

## Authing Web SDK

Authing Web SDK 为开发者提供了简单易用的函数来实现浏览器端的单点登录效果，它是一款基于 [OIDC](https://docs.authing.cn/v2/guides/federation/oidc.html) 标准的 Web 应用认证侧 SDK，你可以通过调用 SDK 与 Authing 完成集成，帮你实现浏览器内多个应用跨主域的[单点登录](/guides/app-new/sso/)效果。

Authing Web SDK 可以帮你实现浏览器内多个应用跨主域的单点登录效果，**目前只适合单独使用**，暂不支持与 Guard 或其他 SDK 混用。

Authing Web SDK 目前支持的功能如下：

|功能|说明|
|----|----|
|loginWithRedirect|跳转登录|
|loginWithPopup|弹窗登录|
|isRedirectCallback|判断当前 URL 是否为 Authing 登录回调 URL，结合 getLoginState 实现静默登录|
|getLoginState|获取登录态|
|getUserInfo|获取用户信息|
|logoutWithRedirect|退出登录|

除此之外，Authing Web SDK 未来将陆续从 [authing-js-sdk](https://docs.authing.cn/v2/reference/sdk-for-node/authentication/) 中迁移所有可在浏览器中运行的 Authing 大部分认证类功能，并集成 Authing 最新的 V3 版认证类 API，为用户提供更好的使用体验。

## 什么是单点登录

我们通过一个例子来说明，假设有一所大学，内部有两个系统，一个是邮箱系统，一个是课表查询系统。现在想实现这样的效果：在邮箱系统中登录一遍，然后此时进入课表系统的网站，无需再次登录，课表网站系统直接跳转到个人课表页面，反之亦然。比较专业的定义如下：

**[单点登录](/guides/app-new/sso/)**（Single Sign On），简称为 **[SSO](/guides/app-new/sso/)**，是目前比较流行的企业业务整合的解决方案之一。 [SSO](/guides/app-new/sso/) 的定义是在多个应用系统中，**用户只需要登录一次**就可以**访问所有**相互信任的应用系统。

## 第一步：创建自建应用

::: hint-info
参考 [创建自建应用](https://docs.authing.cn/v2/guides/app-new/create-app/create-app.html)。
:::

## 第二步：配置单点登录

::: hint-info
参考 [自建应用 SSO 方案](https://docs.authing.cn/v2/guides/app-new/sso/create-app-sso.html)。
:::

## 第三步：修改配置

找到刚刚配置为单点登录的几个应用，分别进入其 **应用配置** 页面，填写以下信息：

![](~@imagesZhCn/common/integrate-sso/sso-panel.png)

1. **认证配置**：配置 **登录回调 URL**。

![](~@imagesZhCn/common/integrate-sso/sso-callback.png)

2. **授权配置**：**授权模式** 开启 **authorization_code**，**返回类型** 开启 **code**。

![](~@imagesZhCn/common/integrate-sso/sso-authorization-configuration.png)

3. 如果你创建的是 **标准 Web 应用**，则以下 `token` 验证方式勾选 **none**。

![](~@imagesZhCn/common/integrate-sso/sso-authorization-token-new.png)

4. 保存当前配置。

::: hint-info
注意，如果使用社会化身份源或企业身份源登录，且登录后获取用户信息时需要返回包含所有身份源的 `identities` 字段，则需要开启账号关联配置，具体参考 [身份源连接的账号关联](/guides/connections/account-association.html)。
:::

## 第四步：安装 SDK

Authing Web SDK 支持通过包管理器安装、script 标签引入的方式集成到你的前端业务软件中。

:::: tabs :options="{ useUrlFragment: false }"
::: tab NPM
``` shell
npm install --save @authing/web
```
:::

::: tab Yarn
``` shell
yarn add @authing/web
```
:::

::: tab CDN
```html
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="https://cdn.authing.co/packages/web/5.1.0/index.global.js"></script>
```
:::
::::

## 第五步：实例化 SDK

::: hint-info
实现单点登录至少需要两个应用，所以 SDK 也需要分别实例化两次并传入不同的参数。
:::

:::: tabs :options="{ useUrlFragment: false }"
::: tab React
```tsx
// 代码示例：https://github.com/Authing/authing-js-sdk/blob/master/examples/web/sso/react/website1/src/App.tsx
// App.tsx
import { Authing } from '@authing/web'

import React, { useMemo } from 'react'

import { Authing } from '@authing/web'

function App() {
  const authing = useMemo(() => {
    return new Authing({
      // 控制台 -> 应用 -> 单点登录 SSO -> 配置 -> 应用面板地址，如：https://my-awesome-sso.authing.cn
      domain: 'AUTHING_DOMAIN_URL',
      
      // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 端点信息 -> APP ID
      appId: 'AUTHING_APP_ID',

      // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 认证配置 -> 登录回调 URL
      redirectUri: 'YOUR_REDIRECT_URL',

      // 控制台 -> 设置 -> 基础设置 -> 基础信息 -> 用户池 ID
      userPoolId: 'AUTHING_USER_POOL_ID'
    })
  }, [])

  return (
    <div className="App"></div>
  );
}

export default App;
```
:::

::: tab Vue2
``` vue
<!-- 代码示例：https://github.com/Authing/authing-js-sdk/blob/master/examples/web/sso/vue2/website1/src/App.vue -->
<template>
  <div id="app"></div>
</template>
<script>
import { Authing } from "@authing/web"

export default {
  name: 'APP',
  data () {
    return {
      authing: null
    }
  },
  created() {
    this.authing = new Authing({
      // 控制台 -> 应用 -> 单点登录 SSO -> 配置 -> 应用面板地址，如：https://my-awesome-sso.authing.cn
      domain: 'AUTHING_DOMAIN_URL',

      // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 端点信息 -> APP ID
      appId: 'AUTHING_APP_ID',

      // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 认证配置 -> 登录回调 URL
      redirectUri: 'YOUR_REDIRECT_URL',

      // 控制台 -> 设置 -> 基础设置 -> 基础信息 -> 用户池 ID
      userPoolId: 'AUTHING_USER_POOL_ID'
    })
  }
}
</script>
```
:::

::: tab Vue3
``` vue
<script>
// 代码示例：https://github.com/Authing/authing-js-sdk/blob/master/examples/web/sso/vue3/website1/src/App.vue
// App.vue
import { defineComponent } from 'vue'

import { Authing } from '@authing/web'

export default defineComponent({
  name: 'App',

  setup() {
    const authing = new Authing({
      // 控制台 -> 应用 -> 单点登录 SSO -> 配置 -> 应用面板地址，如：https://my-awesome-sso.authing.cn
      domain: 'AUTHING_DOMAIN_URL',

      // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 端点信息 -> APP ID
      appId: 'AUTHING_APP_ID',

      // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 认证配置 -> 登录回调 URL
      redirectUri: 'YOUR_REDIRECT_URL',

      // 控制台 -> 设置 -> 基础设置 -> 基础信息 -> 用户池 ID
      userPoolId: 'AUTHING_USER_POOL_ID'
    })
  },
})
</script>
```
:::

::: tab Angular
``` typescript
// 代码示例：https://github.com/Authing/authing-js-sdk/blob/master/examples/web/sso/angular/website1/src/app/app.component.ts
// app.component.ts
import { Component } from '@angular/core'

import { Authing } from '@authing/web'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private authing = new Authing({
    // 控制台 -> 应用 -> 单点登录 SSO -> 配置 -> 应用面板地址，如：https://my-awesome-sso.authing.cn
    domain: 'AUTHING_DOMAIN_URL',
    
    // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 端点信息 -> APP ID
    appId: 'AUTHING_APP_ID',

    // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 认证配置 -> 登录回调 URL
    redirectUri: 'YOUR_REDIRECT_URL',

    // 控制台 -> 设置 -> 基础设置 -> 基础信息 -> 用户池 ID
    userPoolId: 'AUTHING_USER_POOL_ID'
  })
}
```
:::

::: tab CDN
```html
<!-- 代码示例：https://github.com/Authing/authing-js-sdk/blob/master/examples/web/sso/cdn/website1/index.js -->
<script>
  const authing = new AuthingFactory.Authing({
    // 控制台 -> 应用 -> 单点登录 SSO -> 配置 -> 应用面板地址，如：https://my-awesome-sso.authing.cn
    domain: 'AUTHING_DOMAIN_URL',
    
    // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 端点信息 -> APP ID
    appId: 'AUTHING_APP_ID',

    // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 认证配置 -> 登录回调 URL
    redirectUri: 'YOUR_REDIRECT_URL',

    // 控制台 -> 设置 -> 基础设置 -> 基础信息 -> 用户池 ID
    userPoolId: 'AUTHING_USER_POOL_ID'
  });
</script>
```
:::
::::

## 第六步：发起登录

Authing Web SDK 可以向 Authing 发起认证授权请求，目前支持三种形式：

1. 跳转登录：从当前页面跳转到 Authing 的托管登录页进行登录。
2. 弹窗登录：弹出一个窗口，在弹出窗口中加载 Authing 托管的登录页，无需页面跳转。
3. 静默登录：在 [自建应用 SSO 方案](/guides/app-new/sso/create-app-sso.md) 一文中有提到，可以将多个自建应用添加到 **单点登录 SSO** 面板。如果用户已经登录过其中的一个应用，那么在同一浏览器另一个标签页访问其他应用的时候，就可以实现静默登录，直接获取到用户信息，实现单点登录效果。

### 一、跳转登录

:::: tabs :options="{ useUrlFragment: false }"
::: tab React
```tsx
// 代码示例：https://github.com/Authing/authing-js-sdk/blob/master/examples/web/sso/react/website1/src/App.tsx
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Authing } from '@authing/web'

import type {
  LoginState
} from '@authing/web/dist/typings/src/global'

function App() {
  const authing = useMemo(() => {
    return new Authing({
      // 控制台 -> 应用 -> 单点登录 SSO -> 配置 -> 应用面板地址，如：https://my-awesome-sso.authing.cn
      domain: 'AUTHING_DOMAIN_URL',
      
      // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 端点信息 -> APP ID
      appId: 'AUTHING_APP_ID',

      // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 认证配置 -> 登录回调 URL
      redirectUri: 'YOUR_REDIRECT_URL',

      // 控制台 -> 设置 -> 基础设置 -> 基础信息 -> 用户池 ID
      userPoolId: 'AUTHING_USER_POOL_ID'
    })
  }, [])

  const [loginState, setLoginState] = useState<LoginState | null>()

  /**
   * 以跳转方式打开 Authing 托管的登录页
   */
  const loginWithRedirect = () => {
    // 将用户重定向到 Authing 认证端点进行登录，需要配合 handleRedirectCallback 使用
    authing.loginWithRedirect()
  }

  /**
   * 获取用户的登录状态
   */
  const getLoginState = useCallback(async () => {
    const loginState = await authing.getLoginState()
    setLoginState(loginState)
  }, [])

  useEffect(() => {
    // 判断当前 URL 是否为 Authing 登录回调 URL
    if (authing.isRedirectCallback()) {
      /**
       * 以跳转方式打开 Authing 托管的登录页，认证成功后需要配合 handleRedirectCallback 方法，
       * 在回调端点处理 Authing 发送的授权码或 token，获取用户登录态
       */
      authing.handleRedirectCallback().then((res) => {
        setLoginState(res);
        // 因 code 只能使用一次，所以这里需要将页面重定向到其他地址，这里以刷新当前页面为例：
        window.location.replace('/');
      });
    } else {
      getLoginState()
    }
  }, [])

  return (
    <div className="App">
      <p>
        <button onClick={loginWithRedirect}>Login With Redirect</button>
      </p>
      <p>
        <code>{JSON.stringify(loginState)}</code>
      </p>
    </div>
  );
}

export default App
```
:::

::: tab Vue2
```vue
<!-- 代码示例：https://github.com/Authing/authing-js-sdk/blob/master/examples/web/sso/vue2/website1/src/App.vue -->
<template>
  <div id="app">
    <button @click="login">Login With Redirect</button>
    <p v-if="loginState">
      <textarea
        cols="100"
        rows="20"
        readOnly
        :value="JSON.stringify(loginState, null, 2)"
      ></textarea>
    </p>
  </div>
</template>
<script>
import { Authing } from '@authing/web'

export default {
  name: 'App',

  data() {
    return {
      authing: null,
      loginState: null
    };
  },

  created() {
    this.authing = new Authing({
      // 控制台 -> 应用 -> 单点登录 SSO -> 配置 -> 应用面板地址，如：https://my-awesome-sso.authing.cn
      domain: 'AUTHING_DOMAIN_URL',

      // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 端点信息 -> APP ID
      appId: 'AUTHING_APP_ID',

      // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 认证配置 -> 登录回调 URL
      redirectUri: 'YOUR_REDIRECT_URL',

      // 控制台 -> 设置 -> 基础设置 -> 基础信息 -> 用户池 ID
      userPoolId: 'AUTHING_USER_POOL_ID'
    });
  },
  mounted() {
   // 校验当前 url 是否是登录回调地址
   if (this.authing.isRedirectCallback()) {
      console.log('redirect')

      /**
       * 以跳转方式打开 Authing 托管的登录页，认证成功后，需要配合 handleRedirectCallback，
       * 在回调端点处理 Authing 发送的授权码或 token，获取用户登录态
       */
      this.authing.handleRedirectCallback().then((res) => {
        this.loginState = res
        // 因 code 只能使用一次，所以这里需要将页面重定向到其他地址，这里以刷新当前页面为例：
        window.location.replace('/')
      });
    } else {
      console.log('normal')

      this.getLoginState()
    }
  },
  methods: {
    /**
     * 以跳转方式打开 Authing 托管的登录页
     */
    login() {
      this.authing.loginWithRedirect()
    },
    /**
     * 获取用户的登录状态
     */
     async getLoginState() {
      const state = await this.authing.getLoginState()
      this.loginState = state
    }
  }
};
</script>
```
:::

::: tab Vue3
```vue
<!-- 代码示例：https://github.com/Authing/authing-js-sdk/blob/master/examples/web/sso/vue3/website1/src/App.vue -->
<template>
  <div>
    <button @click="login">Login With Redirect</button>

    <p v-if="loginState">
      <textarea
        cols="100"
        rows="20"
        readOnly
        :value="JSON.stringify(loginState, null, 2)"
      ></textarea>
    </p>
  </div>
</template>
<script>
import { defineComponent, onMounted, reactive, toRefs } from 'vue'

import { Authing } from '@authing/web'

export default defineComponent({
  name: "App",
  setup() {
    const authing = new Authing({
      // 控制台 -> 应用 -> 单点登录 SSO -> 配置 -> 应用面板地址，如：https://my-awesome-sso.authing.cn
      domain: 'AUTHING_DOMAIN_URL',

      // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 端点信息 -> APP ID
      appId: 'AUTHING_APP_ID',

      // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 认证配置 -> 登录回调 URL
      redirectUri: 'YOUR_REDIRECT_URL',

      // 控制台 -> 设置 -> 基础设置 -> 基础信息 -> 用户池 ID
      userPoolId: 'AUTHING_USER_POOL_ID'
    });

    const state = reactive({
      loginState: null
    })

    /**
     * 以跳转方式打开 Authing 托管的登录页
     */
    const login = () => {
      authing.loginWithRedirect()
    };

    /**
     * 获取用户的登录状态
     */
     const getLoginState = async () => {
      const res = await authing.getLoginState()
      state.loginState = res
    }

    onMounted(() => {
      // 校验当前 url 是否是登录回调 URL
      if (authing.isRedirectCallback()) {
        console.log('redirect')

        /**
         * 以跳转方式打开 Authing 托管的登录页，认证成功后需要配合 handleRedirectCallback 方法，
         * 在回调端点处理 Authing 发送的授权码或 token，获取用户登录态
         */
        authing.handleRedirectCallback().then((res) => {
          state.loginState = res;
          // 因 code 只能使用一次，所以这里需要将页面重定向到其他地址，这里以刷新当前页面为例：
          window.location.replace('/')
        });
      } else {
        console.log('normal')
        
        getLoginState()
      }
    })

    return {
      ...toRefs(state),
      login,
      getLoginState
    };
  },
});
</script>
```
:::

::: tab Angular
``` html
<button (click)="loginWithRedirect()">Login With Redirect</button>

<p *ngIf="loginState">
  <textarea cols="100" rows="20" readOnly>{{ loginState | json }}</textarea>
</p>
```
```ts
// 代码示例：https://github.com/Authing/authing-js-sdk/blob/master/examples/web/sso/angular/website1/src/app/app.component.ts
import { Component } from '@angular/core'
import { Authing } from '@authing/web'
import type { LoginState } from '@authing/web/dist/typings/src/global'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  loginState: LoginState | null = null;

  private authing = new Authing({
    // 控制台 -> 应用 -> 单点登录 SSO -> 配置 -> 应用面板地址，如：https://my-awesome-sso.authing.cn
    domain: 'AUTHING_DOMAIN_URL',
    
    // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 端点信息 -> APP ID
    appId: 'AUTHING_APP_ID',

    // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 认证配置 -> 登录回调 URL
    redirectUri: 'YOUR_REDIRECT_URL',

    // 控制台 -> 设置 -> 基础设置 -> 基础信息 -> 用户池 ID
    userPoolId: 'AUTHING_USER_POOL_ID'
  });

  ngOnInit() {
    // 校验当前 url 是否是登录回调 URL
    if (this.authing.isRedirectCallback()) {
      console.log('redirect')

      /**
       * 以跳转方式打开 Authing 托管的登录页，认证成功后需要配合 handleRedirectCallback 方法，
       * 在回调端点处理 Authing 发送的授权码或 token，获取用户登录态
       */
      this.authing.handleRedirectCallback().then((res) => {
        this.loginState = res;
        // 因 code 只能使用一次，所以这里需要将页面重定向到其他地址，这里以刷新当前页面为例：
        window.location.replace('/')
      });
    } else {
      this.getLoginState()
    }
  }

  /**
   * 以跳转方式打开 Authing 托管的登录页
   */
  loginWithRedirect() {
    this.authing.loginWithRedirect();
  }

  /**
   * 获取用户的登录状态
   */
  async getLoginState() {
    const state = await this.authing.getLoginState()
    this.loginState = state
  }
}
```
:::

::: tab CDN
``` html
<!-- 代码示例：https://github.com/Authing/authing-js-sdk/blob/master/examples/web/sso/cdn/website1/index.js -->
<button id="loginWithRedirect">Login With Redirect</button>
```
``` javascript
const authing = new AuthingFactory.Authing({
  // 控制台 -> 应用 -> 单点登录 SSO -> 配置 -> 应用面板地址，如：https://my-awesome-sso.authing.cn
  domain: 'AUTHING_DOMAIN_URL',

  // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 端点信息 -> APP ID
  appId: 'AUTHING_APP_ID',

  // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 认证配置 -> 登录回调 URL
  redirectUri: 'YOUR_REDIRECT_URL',

  // 控制台 -> 设置 -> 基础设置 -> 基础信息 -> 用户池 ID
  userPoolId: 'AUTHING_USER_POOL_ID'
})

if (authing.isRedirectCallback()) {
  console.log('redirect')
  authing.handleRedirectCallback().then(loginState => {
    console.log('loginState: ', loginState)
    // 因 code 只能使用一次，所以这里需要将页面重定向到其他地址，这里以刷新当前页面为例：
    window.location.replace('/')
  })
} else {
  authing.getLoginState().then(loginState => {
    console.log('loginState: ', loginState)
  })
}

document.querySelector('#loginWithRedirect').onclick = function () {
  authing.loginWithRedirect()
}
```
:::
::::


`loginWithRedirect` 方法也可以传入以下自定义传参：

:::: tabs :options="{ useUrlFragment: false }"
::: tab React
```js
const params: {
  // 回调登录 URL，默认为初始化参数中的 redirectUri
  redirectUri?: string;

  // 发起登录的 URL，若实例化 Authing 时设置了 redirectToOriginalUri， 会在登录结束后重定向回到此页面，默认为当前 URL
  originalUri?: string;

  // 即使在用户已登录时也强制用户再次登录，默认为 false
  forced?: boolean;
} = {
  redirectUri: 'YOUR_REDIRECT_URL',
  originalUri: 'YOUR_ORIGINAL_URL',
  forced: true
}

authing.loginWithRedirect(params)
```
:::

::: tab Vue2
```js
export default {
  methods: {
    login() {
      const params = {
        redirectUri: 'YOUR_REDIRECT_URL',

        // 发起登录的 URL，若设置了 redirectToOriginalUri 会在登录结束后重定向回到此页面，默认为当前 URL
        originalUri: 'YOUR_ORIGINAL_URL',

        // 即使在用户已登录时也强制用户再次登录，默认为 false
        forced: true
      }

      this.authing.loginWithRedirect(params)
    }
  }
}
```
:::

::: tab Vue3
```js
export default {
  setup() {
    const login = () => {
      const params = {
        redirectUri: 'YOUR_REDIRECT_URL',

        // 发起登录的 URL，若设置了 redirectToOriginalUri 会在登录结束后重定向回到此页面，默认为当前 URL
        originalUri: 'YOUR_ORIGINAL_URL',

        // 即使在用户已登录时也强制用户再次登录，默认为 false
        forced: true
      }

      authing.loginWithRedirect(params)
    }

    return {
      login
    }
  }
}
```
:::

::: tab Angular
```js
export class AppComponent {
  login() {
    const params: {
      // 回调登录 URL，默认为初始化参数中的 redirectUri
      redirectUri?: string;

      // 发起登录的 URL，若设置了 redirectToOriginalUri 会在登录结束后重定向回到此页面，默认为当前 URL
      originalUri?: string;

      // 即使在用户已登录时也强制用户再次登录，默认为 false
      forced?: boolean
    } = {
      redirectUri: 'YOUR_REDIRECT_URL',
      originalUri: 'YOUR_ORIGINAL_URL',
      forced: true
    }

    this.authing.loginWithRedirect(params)
  }
}
```
:::

::: tab CDN
``` javascript
const params = {
  redirectUri: 'YOUR_REDIRECT_URL',

  // 发起登录的 URL，若设置了 redirectToOriginalUri 会在登录结束后重定向回到此页面，默认为当前 URL
  originalUri: 'YOUR_ORIGINAL_URL',

  // 即使在用户已登录时也强制用户再次登录，默认为 false
  forced: true
}

authing.loginWithRedirect(params)
```
:::
::::


### 二、弹窗登录

:::: tabs :options="{ useUrlFragment: false }"
::: tab React
```tsx
// 代码示例：https://github.com/Authing/authing-js-sdk/blob/master/examples/web/sso/react/website1/src/App.tsx
import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { Authing } from '@authing/web'

import type { LoginState } from '@authing/web/dist/typings/src/global'

function App() {
  const authing = useMemo(() => {
    return new Authing({
      // 控制台 -> 应用 -> 单点登录 SSO -> 配置 -> 应用面板地址，如：https://my-awesome-sso.authing.cn
      domain: 'AUTHING_DOMAIN_URL',

      // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 端点信息 -> APP ID
      appId: 'AUTHING_APP_ID',

      // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 认证配置 -> 登录回调 URL
      redirectUri: 'YOUR_REDIRECT_URL',

      // 控制台 -> 设置 -> 基础设置 -> 基础信息 -> 用户池 ID
      userPoolId: 'AUTHING_USER_POOL_ID'
    })
  }, [])

  const [loginState, setLoginState] = useState<LoginState | null>()

  /**
   * 以弹窗方式打开 Authing 托管的登录页
   */
  const loginWithPopup = async () => {
    const loginState = await authing.loginWithPopup()
    setLoginState(loginState)
  }

  return (
    <div className="App">
      <p>
        <button onClick={loginWithPopup}>Login With Popup</button>
      </p>
      <p>
        <code>{JSON.stringify(loginState)}</code>
      </p>
    </div>
  );
}

export default App;
```
:::

::: tab Vue2
``` vue
<!-- 代码示例：https://github.com/Authing/authing-js-sdk/blob/master/examples/web/sso/vue2/website1/src/App.vue -->
<template>
  <div id="app">
    <button @click="loginWithPopup">Login With Popup</button>
    <p v-if="loginState">
      <textarea
        cols="100"
        rows="20"
        readOnly
        :value="JSON.stringify(loginState, null, 2)"
      ></textarea>
    </p>
  </div>
</template>
<script>
import { Authing } from "@authing/web";

export default {
  name: "App",
  data() {
    return {
      authing: null,
      loginState: null,
    };
  },
  created() {
    this.authing = new Authing({
      // 控制台 -> 应用 -> 单点登录 SSO -> 配置 -> 应用面板地址，如：https://my-awesome-sso.authing.cn
      domain: 'AUTHING_DOMAIN_URL',

      // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 端点信息 -> APP ID
      appId: 'AUTHING_APP_ID',

      // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 认证配置 -> 登录回调 URL
      redirectUri: 'YOUR_REDIRECT_URL',

      // 控制台 -> 设置 -> 基础设置 -> 基础信息 -> 用户池 ID
      userPoolId: 'AUTHING_USER_POOL_ID'
    })
  },
  methods: {
    /**
     * 以弹窗方式打开 Authing 托管的登录页
     */
    async loginWithPopup() {
      this.loginState = await this.authing.loginWithPopup()
    },
  },
};
</script>
```
:::

::: tab Vue3
```vue
<!-- 代码示例：https://github.com/Authing/authing-js-sdk/blob/master/examples/web/sso/vue3/website1/src/App.vue -->
<template>
  <div>
    <button @click="loginWithPopup">Login With Popup</button>
    <p v-if="loginState">
      <textarea
        cols="100"
        rows="20"
        readOnly
        :value="JSON.stringify(loginState, null, 2)"
      ></textarea>
    </p>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs } from "vue";

import { Authing } from "@authing/web";

export default defineComponent({
  name: "App",

  setup() {
    const authing = new Authing({
      // 控制台 -> 应用 -> 单点登录 SSO -> 配置 -> 应用面板地址，如：https://my-awesome-sso.authing.cn
      domain: 'AUTHING_DOMAIN_URL',

      // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 端点信息 -> APP ID
      appId: 'AUTHING_APP_ID',

      // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 认证配置 -> 登录回调 URL
      redirectUri: 'YOUR_REDIRECT_URL',

      // 控制台 -> 设置 -> 基础设置 -> 基础信息 -> 用户池 ID
      userPoolId: 'AUTHING_USER_POOL_ID'
    });

    const state = reactive({
      loginState: null,
    })

    /**
     * 以弹窗方式打开 Authing 托管的登录页
     */
    const loginWithPopup = async () => {
      state.loginState = await authing.loginWithPopup()
    }

    return {
      ...toRefs(state),
      loginWithPopup,
    }
  }
})
</script>
```
:::

::: tab Angular
``` html
<button (click)="loginWithPopup()">Login With Popup</button>

<p *ngIf="loginState">
  <textarea cols="100" rows="20" readOnly>{{ loginState | json }}</textarea>
</p>
```
```ts
// 代码示例：https://github.com/Authing/authing-js-sdk/blob/master/examples/web/sso/angular/website1/src/app/app.component.ts
import { Component } from '@angular/core'

import { Authing } from '@authing/web'

import type {
  LoginState,
  NormalError
} from '@authing/web/dist/typings/src/global'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  loginState: LoginState | null = null;

  private authing = new Authing({
    // 控制台 -> 应用 -> 单点登录 SSO -> 配置 -> 应用面板地址，如：https://my-awesome-sso.authing.cn
    domain: 'AUTHING_DOMAIN_URL',

    // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 端点信息 -> APP ID
    appId: 'AUTHING_APP_ID',

    // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 认证配置 -> 登录回调 URL
    redirectUri: 'YOUR_REDIRECT_URL',

    // 控制台 -> 设置 -> 基础设置 -> 基础信息 -> 用户池 ID
    userPoolId: 'AUTHING_USER_POOL_ID'
  });

  /**
   * 以弹窗方式打开 Authing 托管的登录页
   */
  async loginWithPopup() {
    this.loginState = await this.authing.loginWithPopup()
  }
}

```
:::

::: tab CDN
``` html
<!-- 代码示例：https://github.com/Authing/authing-js-sdk/blob/master/examples/web/sso/cdn/website1/index.js -->
<button id="loginWithPopup">Login With Popup</button>
```
``` javascript
const authing = new AuthingFactory.Authing({
  // 控制台 -> 应用 -> 单点登录 SSO -> 配置 -> 应用面板地址，如：https://my-awesome-sso.authing.cn
  domain: 'AUTHING_DOMAIN_URL',

  // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 端点信息 -> APP ID
  appId: 'AUTHING_APP_ID',

  // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 认证配置 -> 登录回调 URL
  redirectUri: 'YOUR_REDIRECT_URL',

  // 控制台 -> 设置 -> 基础设置 -> 基础信息 -> 用户池 ID
  userPoolId: 'AUTHING_USER_POOL_ID'
});

document.querySelector('#loginWithPopup').onclick = function () {
  authing.loginWithPopup().then(loginState => {
    console.log('loginState: ', loginState)
  })
}
```
:::
::::


你可以使用默认参数，也可以根据需要进行自定义传参：

:::: tabs :options="{ useUrlFragment: false }"

::: tab React
```ts
const login = async () => {
  const params: {
    // 即使在用户已登录时也强制用户再次登录，默认为 false
    forced?: boolean;
  } = {
    forced: true,
  };

  const res = await authing.loginWithPopup(params)
  
  console.log(res)
};
```
:::

::: tab Vue2
```js
export default {
  methods: {
    /**
     * 以弹窗方式打开 Authing 托管的登录页
     */
    async login() {
      const params = {
        // 即使在用户已登录时也强制用户再次登录，默认为 false
        forced: true,
      };
      await this.authing.loginWithPopup(params);
    },
  },
}
```
:::

::: tab Vue3
```js
export default {
  setup() {
    /**
     * 以弹窗方式打开 Authing 托管的登录页
     */
    const login = async () => {
      const params = {
        // 即使在用户已登录时也强制用户再次登录，默认为 false
        forced: true,
      };
      await authing.loginWithPopup(params);
    };

    return {
      login
    }
  }
}
```
:::

::: tab Angular
```ts
export class AppComponent {
  /**
   * 以弹窗方式打开 Authing 托管的登录页
   */
  async login() {
    const params: {
      // 即使在用户已登录时也强制用户再次登录，默认为 false
      forced?: boolean;
    } = {
      forced: true,
    }

    const res = await this.authing.loginWithPopup(params);
    
    console.log(res)
  };
}
```
:::

::: tab CDN
``` javascript
const params = {
  // 即使在用户已登录时也强制用户再次登录，默认为 false
  forced: true
}

authing.loginWithPopup(params)
```
:::

::::

### 三、静默登录

:::: tabs :options="{ useUrlFragment: false }"

::: tab React
```tsx
// 代码示例：https://github.com/Authing/authing-js-sdk/blob/master/examples/web/sso/react/website1/src/App.tsx
import React, { useEffect, useMemo, useState } from 'react'

import { Authing } from '@authing/web'

import type { LoginState } from '@authing/web/dist/typings/src/global'

function App() {
  const authing = useMemo(() => {
    return new Authing({
      // 控制台 -> 应用 -> 单点登录 SSO -> 配置 -> 应用面板地址，如：https://my-awesome-sso.authing.cn
      domain: 'AUTHING_DOMAIN_URL',

      // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 端点信息 -> APP ID
      appId: 'AUTHING_APP_ID',

      // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 认证配置 -> 登录回调 URL
      redirectUri: 'YOUR_REDIRECT_URL',

      // 控制台 -> 设置 -> 基础设置 -> 基础信息 -> 用户池 ID
      userPoolId: 'AUTHING_USER_POOL_ID'
    })
  }, [])

  const [loginState, setLoginState] = useState<LoginState | null>()

  useEffect(() => {
    // 判断当前 URL 是否为 Authing 登录回调 URL
    if (authing.isRedirectCallback()) {
      console.log('redirect')
      /**
       * 以跳转方式打开 Authing 托管的登录页，认证成功后需要配合 handleRedirectCallback 方法，
       * 在回调端点处理 Authing 发送的授权码或 token，获取用户登录态
       */
      authing.handleRedirectCallback().then((res) => {
        setLoginState(res);
        // 因 code 只能使用一次，所以这里需要将页面重定向到其他地址，这里以刷新当前页面为例：
        window.location.replace('/')
      });
    } else {
      console.log('normal')

      // 获取用户的登录状态
      authing.getLoginState().then((res) => {
        if (res) {
          setLoginState(res)
        } else {
          // 如果用户没有登录，跳转认证中心
          authing.loginWithRedirect()
        }
      })
    }
  }, [])

  return (
    <div>
      <p>
        Access Token: <code>{loginState?.accessToken}</code>
      </p>
      <p>
        User Info: <code>{JSON.stringify(loginState?.parsedIdToken)}</code>
      </p>
      <p>
        Access Token Info:
        <code>{JSON.stringify(loginState?.parsedAccessToken)}</code>
      </p>
      <p>
        Expire At: <code>{loginState?.expireAt}</code>
      </p>
    </div>
  );
}

export default App;
```
:::

::: tab Vue2
```vue
<!-- 代码示例：https://github.com/Authing/authing-js-sdk/blob/master/examples/web/sso/vue2/website1/src/App.vue -->
<template>
  <div id="app">
    <p v-if="loginState">
      <textarea
        cols="100"
        rows="20"
        readOnly
        :value="JSON.stringify(loginState, null, 2)"
      ></textarea>
    </p>
  </div>
</template>
<script>
import { Authing } from '@authing/web'

export default {
  name: 'App',

  data() {
    return {
      authing: null,
      loginState: null,
    };
  },

  created() {
    this.authing = new Authing({
      // 控制台 -> 应用 -> 单点登录 SSO -> 配置 -> 应用面板地址，如：https://my-awesome-sso.authing.cn
      domain: 'AUTHING_DOMAIN_URL',

      // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 端点信息 -> APP ID
      appId: 'AUTHING_APP_ID',

      // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 认证配置 -> 登录回调 URL
      redirectUri: 'YOUR_REDIRECT_URL',

      // 控制台 -> 设置 -> 基础设置 -> 基础信息 -> 用户池 ID
      userPoolId: 'AUTHING_USER_POOL_ID'
    });
  },

  mounted() {
    // 校验当前 url 是否是登录回调 URL
    if (this.authing.isRedirectCallback()) {
      console.log('redirect')

      /**
       * 以跳转方式打开 Authing 托管的登录页，认证成功后需要配合 handleRedirectCallback 方法，
       * 在回调端点处理 Authing 发送的授权码或 token，获取用户登录态
       */
      this.authing.handleRedirectCallback().then((res) => {
        this.loginState = res
        // 因 code 只能使用一次，所以这里需要将页面重定向到其他地址，这里以刷新当前页面为例：
        window.location.replace('/')
      });
    } else {
      console.log('normal')

      this.authing.getLoginState().then((res) => {
        this.loginState = res
        if (!res) {
          // 静默登录。取不到用户信息直接跳转到授权中心
          this.authing.loginWithRedirect()
        }
      });
    }
  },
};
</script>
```
:::

::: tab Vue3
```vue
<!-- 代码示例：https://github.com/Authing/authing-js-sdk/blob/master/examples/web/sso/vue3/website1/src/App.vue -->
<template>
  <div>
    <p v-if="loginState">
      <textarea
        cols="100"
        rows="20"
        readOnly
        :value="JSON.stringify(loginState, null, 2)"
      ></textarea>
    </p>
  </div>
</template>
<script>
import { defineComponent, onMounted, reactive, toRefs } from 'vue'

import { Authing } from '@authing/web'

export default defineComponent({
  name: 'App',

  setup() {
    const authing = new Authing({
      // 控制台 -> 应用 -> 单点登录 SSO -> 配置 -> 应用面板地址，如：https://my-awesome-sso.authing.cn
      domain: 'AUTHING_DOMAIN_URL',

      // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 端点信息 -> APP ID
      appId: 'AUTHING_APP_ID',

      // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 认证配置 -> 登录回调 URL
      redirectUri: 'YOUR_REDIRECT_URL',

      // 控制台 -> 设置 -> 基础设置 -> 基础信息 -> 用户池 ID
      userPoolId: 'AUTHING_USER_POOL_ID'
    })

    const state = reactive({
      loginState: null,
    })

    /**
     * 获取用户的登录状态
     */
    const getLoginState = async () => {
      const res = await authing.getLoginState()
      state.loginState = res

      if (!res) {
        authing.loginWithRedirect()
      }
    }

    onMounted(() => {
      // 校验当前 url 是否是登录回调 URL
      if (authing.isRedirectCallback()) {
        console.log('redirect')

        /**
         * 以跳转方式打开 Authing 托管的登录页，认证成功后需要配合 handleRedirectCallback 方法，
         * 在回调端点处理 Authing 发送的授权码或 token，获取用户登录态
         */
        authing.handleRedirectCallback().then((res) => {
          state.loginState = res
          // 因 code 只能使用一次，所以这里需要将页面重定向到其他地址，这里以刷新当前页面为例：
          window.location.replace('/')
        });
      } else {
        console.log('normal')
        // 静默登录，直接获取到用户信息
        getLoginState();
      }
    });

    return {
      ...toRefs(state),
    }
  }
})
</script>
```
:::

::: tab Angular
```ts
// 代码示例：https://github.com/Authing/authing-js-sdk/blob/master/examples/web/sso/angular/website1/src/app/app.component.ts
import { Component } from '@angular/core'

import { Authing } from '@authing/web'

import type { LoginState } from '@authing/web/dist/typings/src/global'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  loginState: LoginState | null = null;

  private authing = new Authing({
    // 控制台 -> 应用 -> 单点登录 SSO -> 配置 -> 应用面板地址，如：https://my-awesome-sso.authing.cn
    domain: 'AUTHING_DOMAIN_URL',

    // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 端点信息 -> APP ID
    appId: 'AUTHING_APP_ID',

    // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 认证配置 -> 登录回调 URL
    redirectUri: 'YOUR_REDIRECT_URL',

    // 控制台 -> 设置 -> 基础设置 -> 基础信息 -> 用户池 ID
    userPoolId: 'AUTHING_USER_POOL_ID'
  });

  ngOnInit() {
    // 校验当前 url 是否是登录回调 URL
    if (this.authing.isRedirectCallback()) {
      console.log('redirect')

      /**
       * 以跳转方式打开 Authing 托管的登录页，认证成功后需要配合 handleRedirectCallback 方法，
       * 在回调端点处理 Authing 发送的授权码或 token，获取用户登录态
       */
      this.authing.handleRedirectCallback().then((res) => {
        this.loginState = res
        // 因 code 只能使用一次，所以这里需要将页面重定向到其他地址，这里以刷新当前页面为例：
        window.location.replace('/')
      });
    } else {
      console.log('normal')

      this.getLoginState()
    }
  }

  /**
   * 获取用户的登录状态
   */
  async getLoginState() {
    const res = await this.authing.getLoginState();
    if (res) {
      this.loginState = res;
    } else {
      // 静默登录。取不到用户信息直接跳转到授权中心
      this.authing.loginWithRedirect();
    }
  }
}
```
:::

::: tab CDN
``` javascript
// 代码示例：https://github.com/Authing/authing-js-sdk/blob/master/examples/web/sso/cdn/website1/index.js
var authing = new AuthingFactory.Authing({
  // 控制台 -> 应用 -> 单点登录 SSO -> 配置 -> 应用面板地址，如：https://my-awesome-sso.authing.cn
  domain: 'AUTHING_DOMAIN_URL',

  // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 端点信息 -> APP ID
  appId: 'AUTHING_APP_ID',

  // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 认证配置 -> 登录回调 URL
  redirectUri: 'YOUR_REDIRECT_URL',

  // 控制台 -> 设置 -> 基础设置 -> 基础信息 -> 用户池 ID
  userPoolId: 'AUTHING_USER_POOL_ID'
})

if (authing.isRedirectCallback()) {
  console.log('redirect')
  authing.handleRedirectCallback().then((loginState) => {
    console.log('loginState: ', loginState)
    // 因 code 只能使用一次，所以这里需要将页面重定向到其他地址，这里以刷新当前页面为例：
    window.location.replace('/')
  })
} else {
  authing.getLoginState().then(loginState => {
    console.log('loginState: ', loginState)
    if (!loginState) {
      // 静默登录。取不到用户信息直接跳转到授权中心
      authing.loginWithRedirect();
    }
  })
}
```
:::
::::


### 四、高级使用

Authing Web SDK 默认会使用缺省参数。如果你需要精细控制登录请求参数，可以参考本示例。

```js
import { Authing } from '@authing/web'

const authing = new Authing({
  // 控制台 -> 应用 -> 单点登录 SSO -> 配置 -> 应用面板地址，如：https://my-awesome-sso.authing.cn
  domain: 'AUTHING_DOMAIN_URL',

  // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 端点信息 -> APP ID
  appId: 'AUTHING_APP_ID',

  // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 认证配置 -> 登录回调 URL
  redirectUri: 'YOUR_REDIRECT_URL',

  // 控制台 -> 设置 -> 基础设置 -> 基础信息 -> 用户池 ID
  userPoolId: 'AUTHING_USER_POOL_ID'

  // 应用侧向 Authing 请求的权限，以空格分隔，默认为 'openid profile'
  scope: 'openid email phone profile',

  // 回调时在何处携带身份凭据，默认为 fragment
  // fragment: 在 URL hash 中携带
  // query: 在查询参数中携带
  responseMode: 'fragment',

  // 是否使用 OIDC implicit 模式替代默认的 PKCE 模式
  // 由于 implicit 模式安全性较低，不推荐使用，只用于兼容不支持 crypto 的浏览器
  useImplicitMode: false,

  // implicit 模式返回的凭据种类，默认为 'token id_token'
  // token: 返回 Access Token
  // id_token: 返回 ID Token
  implicitResponseType: 'token id_token',

  // 是否在每次获取登录态时请求 Authing 检查 Access Token 有效性，可用于单点登出场景，默认为 false
  // 如果设为 true，需要在控制台中将「应用配置」-「其他配置」-「检验 token 身份验证方式」设为 none
  introspectAccessToken: false,

  // 弹出窗口的宽度
  popupWidth: 500,

  // 弹出窗口的高度
  popupHeight: 600,
});
```

## 第七步：登录后的处理

### 获取 Token

如果你想检查用户的登录态，并获取用户的 `Access Token`、`ID Token`，可以调用 `getLoginState` 方法，如果用户没有在 Authing 登录，登录状态为 `null`：

:::: tabs :options="{ useUrlFragment: false }"

::: tab React
```tsx
// 代码示例：https://github.com/Authing/authing-js-sdk/blob/master/examples/web/sso/react/website1/src/App.tsx
import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { Authing } from '@authing/web'

import type { LoginState } from '@authing/web/dist/typings/src/global'

function App() {
  const authing = useMemo(() => {
    return new Authing({
      // 控制台 -> 应用 -> 单点登录 SSO -> 配置 -> 应用面板地址，如：https://my-awesome-sso.authing.cn
      domain: 'AUTHING_DOMAIN_URL',

      // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 端点信息 -> APP ID
      appId: 'AUTHING_APP_ID',

      // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 认证配置 -> 登录回调 URL
      redirectUri: 'YOUR_REDIRECT_URL',

      // 控制台 -> 设置 -> 基础设置 -> 基础信息 -> 用户池 ID
      userPoolId: 'AUTHING_USER_POOL_ID'
    });
  }, [])

  const [loginState, setLoginState] = useState<LoginState | null>()

  /**
   * 获取用户的登录状态
   */
  const getLoginState = useCallback(async () => {
    const loginState = await authing.getLoginState()
    setLoginState(loginState)
  }, [])

  return (
    <div className="App">
      <p>
        <code>{JSON.stringify(loginState)}</code>
      </p>
    </div>
  );
}

export default App;
```
:::

::: tab Vue2
``` vue
<!-- 代码示例：https://github.com/Authing/authing-js-sdk/blob/master/examples/web/sso/vue2/website1/src/App.vue -->
<template>
  <div id="app">
    <button @click="getLoginState">Get Login State</button>
    <p v-if="loginState">
      <textarea
        cols="100"
        rows="20"
        readOnly
        :value="JSON.stringify(loginState, null, 2)"
      ></textarea>
    </p>
  </div>
</template>
<script>
import { Authing } from "@authing/web";

export default {
  name: "App",

  data() {
    return {
      authing: null,
      loginState: null,
    };
  },

  created() {
    this.authing = new Authing({
      // 控制台 -> 应用 -> 单点登录 SSO -> 配置 -> 应用面板地址，如：https://my-awesome-sso.authing.cn
      domain: 'AUTHING_DOMAIN_URL',

      // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 端点信息 -> APP ID
      appId: 'AUTHING_APP_ID',

      // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 认证配置 -> 登录回调 URL
      redirectUri: 'YOUR_REDIRECT_URL',

      // 控制台 -> 设置 -> 基础设置 -> 基础信息 -> 用户池 ID
      userPoolId: 'AUTHING_USER_POOL_ID'
    });
  },

  methods: {
    /**
     * 获取用户的登录状态
     */
    async getLoginState() {
      const state = await this.authing.getLoginState();
      this.loginState = state;
    },
  },
};
</script>
```
:::

::: tab Vue3
```vue
<!-- 代码示例：https://github.com/Authing/authing-js-sdk/blob/master/examples/web/sso/vue3/website1/src/App.vue -->
<template>
  <div>
    <button @click="getLoginState">Get Login State</button>
    <p v-if="loginState">
      <textarea
        cols="100"
        rows="20"
        readOnly
        :value="JSON.stringify(loginState, null, 2)"
      ></textarea>
    </p>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs } from "vue";

import { Authing } from "@authing/web";

export default defineComponent({
  name: "App",

  setup() {
    const authing = new Authing({
      // 控制台 -> 应用 -> 单点登录 SSO -> 配置 -> 应用面板地址，如：https://my-awesome-sso.authing.cn
      domain: 'AUTHING_DOMAIN_URL',

      // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 端点信息 -> APP ID
      appId: 'AUTHING_APP_ID',

      // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 认证配置 -> 登录回调 URL
      redirectUri: 'YOUR_REDIRECT_URL',

      // 控制台 -> 设置 -> 基础设置 -> 基础信息 -> 用户池 ID
      userPoolId: 'AUTHING_USER_POOL_ID'
    });

    const state = reactive({
      loginState: null,
    });

    /**
     * 获取用户的登录状态
     */
    const getLoginState = async () => {
      const res = await authing.getLoginState();
      state.loginState = res;
    };

    return {
      ...toRefs(state),
      getLoginState
    };
  },
});
</script>
```
:::

::: tab Angular
```ts
// 代码示例：https://github.com/Authing/authing-js-sdk/blob/master/examples/web/sso/angular/website1/src/app/app.component.ts
import { Component } from '@angular/core'

import { Authing } from '@authing/web'

import type { LoginState } from '@authing/web/dist/typings/src/global'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  loginState: LoginState | null = null;

  private authing = new Authing({
    // 控制台 -> 应用 -> 单点登录 SSO -> 配置 -> 应用面板地址，如：https://my-awesome-sso.authing.cn
    domain: 'AUTHING_DOMAIN_URL',

    // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 端点信息 -> APP ID
    appId: 'AUTHING_APP_ID',

    // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 认证配置 -> 登录回调 URL
    redirectUri: 'YOUR_REDIRECT_URL',

    // 控制台 -> 设置 -> 基础设置 -> 基础信息 -> 用户池 ID
    userPoolId: 'AUTHING_USER_POOL_ID'
  })

  /**
   * 获取用户的登录状态
   */
  async getLoginState() {
    this.loginState = await this.authing.getLoginState()
  }
}
```
:::

::: tab CDN
``` javascript
// 代码示例：https://github.com/Authing/authing-js-sdk/blob/master/examples/web/sso/cdn/website1/index.js
const authing = new AuthingFactory.Authing({
  // 控制台 -> 应用 -> 单点登录 SSO -> 配置 -> 应用面板地址，如：https://my-awesome-sso.authing.cn
  domain: 'AUTHING_DOMAIN_URL',

  // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 端点信息 -> APP ID
  appId: 'AUTHING_APP_ID',

  // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 认证配置 -> 登录回调 URL
  redirectUri: 'YOUR_REDIRECT_URL',

  // 控制台 -> 设置 -> 基础设置 -> 基础信息 -> 用户池 ID
  userPoolId: 'AUTHING_USER_POOL_ID'
});

document.querySelector('#getLoginState').onclick = function () {
  authing.getLoginState().then(loginState => {
    console.log('loginState: ', loginState)
  })
}
```
:::
::::

### 获取用户信息

:::: tabs :options="{ useUrlFragment: false }"

::: tab React
```tsx
// 代码示例：https://github.com/Authing/authing-js-sdk/blob/master/examples/web/sso/react/website1/src/App.tsx
import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { Authing } from '@authing/web'

import type { IUserInfo, NormalError } from '@authing/web/dist/typings/src/global'

function App() {
  const authing = useMemo(() => {
    return new Authing({
      // 控制台 -> 应用 -> 单点登录 SSO -> 配置 -> 应用面板地址，如：https://my-awesome-sso.authing.cn
      domain: 'AUTHING_DOMAIN_URL',

      // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 端点信息 -> APP ID
      appId: 'AUTHING_APP_ID',

      // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 认证配置 -> 登录回调 URL
      redirectUri: 'YOUR_REDIRECT_URL',

      // 控制台 -> 设置 -> 基础设置 -> 基础信息 -> 用户池 ID
      userPoolId: 'AUTHING_USER_POOL_ID'
    })
  }, [])

  const [userInfo, setUserInfo] = useState<IUserInfo | NormalError | null>()

  /**
   * 用 Access Token 获取用户身份信息
   */
  const getUserInfo = async () => {
    const userInfo = await authing.getUserInfo()
    setUserInfo(userInfo)
  }

  return (
    <div className="App">
      <p>
        <button onClick={getUserInfo}>Get User Info</button>
      </p>
      <p>
        User Info：
        <code>{JSON.stringify(userInfo)}</code>
      </p>
    </div>
  );
}

export default App;
```
:::
  
::: tab Vue2
```vue
<!-- 代码示例：https://github.com/Authing/authing-js-sdk/blob/master/examples/web/sso/vue2/website1/src/App.vue -->
<template>
  <div id="app">
    <button @click="getUserInfo">Get User Info</button>
    <p v-if="userInfo">
      <textarea
        cols="100"
        rows="15"
        readOnly
        :value="JSON.stringify(userInfo, null, 2)"
      ></textarea>
    </p>
  </div>
</template>
<script>
import { Authing } from "@authing/web";

export default {
  name: "App",

  data() {
    return {
      authing: null,
      userInfo: null,
    };
  },

  created() {
    this.authing = new Authing({
      // 控制台 -> 应用 -> 单点登录 SSO -> 配置 -> 应用面板地址，如：https://my-awesome-sso.authing.cn
      domain: 'AUTHING_DOMAIN_URL',

      // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 端点信息 -> APP ID
      appId: 'AUTHING_APP_ID',

      // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 认证配置 -> 登录回调 URL
      redirectUri: 'YOUR_REDIRECT_URL',

      // 控制台 -> 设置 -> 基础设置 -> 基础信息 -> 用户池 ID
      userPoolId: 'AUTHING_USER_POOL_ID'
    });
  },

  methods: {
    /**
     * 获取用户身份信息
     */
    async getUserInfo() {
      const userInfo = await this.authing.getUserInfo();
      this.userInfo = userInfo;
    },
  },
};
</script>
```
:::

::: tab Vue3
```vue
<!-- 代码示例：https://github.com/Authing/authing-js-sdk/blob/master/examples/web/sso/vue3/website1/src/App.vue -->
<template>
  <div id="app">
    <button @click="getUserInfo">Get User Info</button>
    <p v-if="userInfo">
      <textarea
        cols="100"
        rows="15"
        readOnly
        :value="JSON.stringify(userInfo, null, 2)"
      ></textarea>
    </p>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs } from "vue";
import { Authing } from "@authing/web";

export default defineComponent({
  name: "App",

  setup() {
    const authing = new Authing({
      // 控制台 -> 应用 -> 单点登录 SSO -> 配置 -> 应用面板地址，如：https://my-awesome-sso.authing.cn
      domain: 'AUTHING_DOMAIN_URL',

      // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 端点信息 -> APP ID
      appId: 'AUTHING_APP_ID',

      // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 认证配置 -> 登录回调 URL
      redirectUri: 'YOUR_REDIRECT_URL',

      // 控制台 -> 设置 -> 基础设置 -> 基础信息 -> 用户池 ID
      userPoolId: 'AUTHING_USER_POOL_ID'
    });

    const state = reactive({
      userInfo: null,
    });

    /**
     * 获取用户身份信息
     */
    const getUserInfo = async () => {
      const userInfo = await authing.getUserInfo();
      state.userInfo = userInfo;
    };

    return {
      ...toRefs(state),
      getUserInfo,
    };
  },
});
</script>
```
:::

::: tab Angular
``` html
<!-- app.component.html -->
<button (click)="getUserInfo()">Get User Info</button>

<p *ngIf="userInfo">
  <textarea cols="100" rows="15" readOnly>{{ userInfo | json }}</textarea>
</p>
```
```ts
// 代码示例：https://github.com/Authing/authing-js-sdk/blob/master/examples/web/sso/angular/website1/src/app/app.component.ts
// app.component.ts
import { Component } from '@angular/core'

import { Authing } from '@authing/web'

import type { IUserInfo, NormalError } from '@authing/web/dist/typings/src/global'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  userInfo: IUserInfo | NormalError | null = null

  private authing = new Authing({
    // 控制台 -> 应用 -> 单点登录 SSO -> 配置 -> 应用面板地址，如：https://my-awesome-sso.authing.cn
    domain: 'AUTHING_DOMAIN_URL',

    // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 端点信息 -> APP ID
    appId: 'AUTHING_APP_ID',

    // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 认证配置 -> 登录回调 URL
    redirectUri: 'YOUR_REDIRECT_URL',

    // 控制台 -> 设置 -> 基础设置 -> 基础信息 -> 用户池 ID
    userPoolId: 'AUTHING_USER_POOL_ID'
  })

  /**
   * 获取用户身份信息
   */
  async getUserInfo() {
    this.userInfo = await this.authing.getUserInfo()
  }
}
```
:::

::: tab CDN
``` html
<button id="getUserInfo">Get User Info</button>
```
``` javascript
// 代码示例：https://github.com/Authing/authing-js-sdk/blob/master/examples/web/sso/cdn/website1/index.js
const authing = new AuthingFactory.Authing({
  // 控制台 -> 应用 -> 单点登录 SSO -> 配置 -> 应用面板地址，如：https://my-awesome-sso.authing.cn
  domain: 'AUTHING_DOMAIN_URL',

  // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 端点信息 -> APP ID
  appId: 'AUTHING_APP_ID',

  // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 认证配置 -> 登录回调 URL
  redirectUri: 'YOUR_REDIRECT_URL',

  // 控制台 -> 设置 -> 基础设置 -> 基础信息 -> 用户池 ID
  userPoolId: 'AUTHING_USER_POOL_ID'
});

document.querySelector('#getUserInfo').onclick = function () {
  authing.getUserInfo().then(userInfo => {
    console.log('userInfo: ', userInfo)
  })
}
```
:::
::::


### 退出登录

可以调用 SDK 的 `logoutWithRedirect` 方法退出登录。

::: hint-info
如果是「单点登出」的场景，则实例化 SDK 时需要传入 `introspectAccessToken` 参数并设置为 `true`。
:::

:::: tabs :options="{ useUrlFragment: false }"

::: tab React
```tsx
// 代码示例：https://github.com/Authing/authing-js-sdk/blob/master/examples/web/sso/react/website1/src/App.tsx
import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { Authing } from '@authing/web'

function App() {
  const authing = useMemo(() => {
    return new Authing({
      // 控制台 -> 应用 -> 单点登录 SSO -> 配置 -> 应用面板地址，如：https://my-awesome-sso.authing.cn
      domain: 'AUTHING_DOMAIN_URL',

      // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 端点信息 -> APP ID
      appId: 'AUTHING_APP_ID',

      // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 认证配置 -> 登录回调 URL
      redirectUri: 'YOUR_REDIRECT_URL',

      // 控制台 -> 设置 -> 基础设置 -> 基础信息 -> 用户池 ID
      userPoolId: 'AUTHING_USER_POOL_ID',

      // 是否在每次获取登录态时请求 Authing 检查 Access Token 有效性，可用于「单点登出」场景，默认为 false
      // 如果设为 true，需要在控制台中将「应用配置」-「其他配置」-「检验 token 身份验证方式」设为 none
      introspectAccessToken: true
    })
  }, [])

  /**
   * 退出登录
   */
  const logoutWithRedirect = async () => {
    await authing.logoutWithRedirect({
      // 可选项，如果传入此参数，需要在控制台配置「登出回调 URL」
      redirectUri: 'YOUR_REDIRECT_URL'
    });
  };

  return (
    <div className="App">
      <p>
        <button onClick={logoutWithRedirect}>Logout With Redirect</button>
      </p>
    </div>
  );
}

export default App;
```
:::

::: tab Vue2
```vue
<!-- 代码示例：https://github.com/Authing/authing-js-sdk/blob/master/examples/web/sso/vue2/website1/src/App.vue -->
<template>
  <div id="app">
    <button @click="logoutWithRedirect">Logout With Redirect</button>
  </div>
</template>
<script>
import { Authing } from "@authing/web";

export default {
  name: "App",

  data() {
    return {
      authing: null,
    };
  },

  created() {
    this.authing = new Authing({
      // 控制台 -> 应用 -> 单点登录 SSO -> 配置 -> 应用面板地址，如：https://my-awesome-sso.authing.cn
      domain: 'AUTHING_DOMAIN_URL',

      // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 端点信息 -> APP ID
      appId: 'AUTHING_APP_ID',

      // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 认证配置 -> 登录回调 URL
      redirectUri: 'YOUR_REDIRECT_URL',

      // 控制台 -> 设置 -> 基础设置 -> 基础信息 -> 用户池 ID
      userPoolId: 'AUTHING_USER_POOL_ID',

      // 是否在每次获取登录态时请求 Authing 检查 Access Token 有效性，可用于「单点登出」场景，默认为 false
      // 如果设为 true，需要在控制台中将「应用配置」-「其他配置」-「检验 token 身份验证方式」设为 none
      introspectAccessToken: true
    });
  },

  methods: {
    /**
     * 登出
     */
    logoutWithRedirect() {
      this.authing.logoutWithRedirect({
        // 可选项，如果传入此参数，需要在控制台配置「登出回调 URL」
        redirectUri: 'YOUR_REDIRECT_URL'
      });
    },
  },
};
</script>
```
:::

::: tab Vue3
```vue
<!-- 代码示例：https://github.com/Authing/authing-js-sdk/blob/master/examples/web/sso/vue3/website1/src/App.vue -->
<template>
  <div id="app">
    <button @click="logoutWithRedirect">Logout With Redirect</button>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { Authing } from "@authing/web";

export default defineComponent({
  name: "App",

  setup() {
    const authing = new Authing({
      // 控制台 -> 应用 -> 单点登录 SSO -> 配置 -> 应用面板地址，如：https://my-awesome-sso.authing.cn
      domain: 'AUTHING_DOMAIN_URL',

      // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 端点信息 -> APP ID
      appId: 'AUTHING_APP_ID',

      // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 认证配置 -> 登录回调 URL
      redirectUri: 'YOUR_REDIRECT_URL',

      // 控制台 -> 设置 -> 基础设置 -> 基础信息 -> 用户池 ID
      userPoolId: 'AUTHING_USER_POOL_ID',

      // 是否在每次获取登录态时请求 Authing 检查 Access Token 有效性，可用于「单点登出」场景，默认为 false
      // 如果设为 true，需要在控制台中将「应用配置」-「其他配置」-「检验 token 身份验证方式」设为 none
      introspectAccessToken: true
    });

    /**
     * 登出
     */
    const logoutWithRedirect = () => {
      authing.logoutWithRedirect({
        // 可选项，如果传入此参数，需要在控制台配置「登出回调 URL」
        redirectUri: 'YOUR_REDIRECT_URL'
      });
    };

    return {
      logoutWithRedirect,
    };
  },
});
</script>
```
:::

::: tab Angular
``` html
<button (click)="logoutWithRedirect()">Logout With Redirect</button>
```
```ts
// 代码示例：https://github.com/Authing/authing-js-sdk/blob/master/examples/web/sso/angular/website1/src/app/app.component.ts
import { Component } from '@angular/core'

import { Authing } from '@authing/web'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private authing = new Authing({
    // 控制台 -> 应用 -> 单点登录 SSO -> 配置 -> 应用面板地址，如：https://my-awesome-sso.authing.cn
    domain: 'AUTHING_DOMAIN_URL',

    // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 端点信息 -> APP ID
    appId: 'AUTHING_APP_ID',

    // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 认证配置 -> 登录回调 URL
    redirectUri: 'YOUR_REDIRECT_URL',

    // 控制台 -> 设置 -> 基础设置 -> 基础信息 -> 用户池 ID
    userPoolId: 'AUTHING_USER_POOL_ID',

    // 是否在每次获取登录态时请求 Authing 检查 Access Token 有效性，可用于「单点登出」场景，默认为 false
    // 如果设为 true，需要在控制台中将「应用配置」-「其他配置」-「检验 token 身份验证方式」设为 none
    introspectAccessToken: true
  })

  /**
   * 登出
   */
  logoutWithRedirect() {
    this.authing.logoutWithRedirect({
      // 可选项，如果传入此参数，需要在控制台配置「登出回调 URL」
      redirectUri: 'YOUR_REDIRECT_URL'
    })
  }
}
```
:::
::: tab CDN
``` html
<button id="logoutWithRedirect">Logout With Redirect</button>
```
``` javascript
// 代码示例：https://github.com/Authing/authing-js-sdk/blob/master/examples/web/sso/cdn/website1/index.js
const authing = new AuthingFactory.Authing({
  // 控制台 -> 应用 -> 单点登录 SSO -> 配置 -> 应用面板地址，如：https://my-awesome-sso.authing.cn
  domain: 'AUTHING_DOMAIN_URL',

  // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 端点信息 -> APP ID
  appId: 'AUTHING_APP_ID',

  // 控制台 -> 自建应用 -> 点击进入相应的应用 -> 认证配置 -> 登录回调 URL
  redirectUri: 'YOUR_REDIRECT_URL',

  // 控制台 -> 设置 -> 基础设置 -> 基础信息 -> 用户池 ID
  userPoolId: 'AUTHING_USER_POOL_ID',

  // 是否在每次获取登录态时请求 Authing 检查 Access Token 有效性，可用于「单点登出」场景，默认为 false
  // 如果设为 true，需要在控制台中将「应用配置」-「其他配置」-「检验 token 身份验证方式」设为 none
  introspectAccessToken: true
});

document.querySelector('#logoutWithRedirect').onclick = function () {
  authing.logoutWithRedirect({
    // 可选项，如果传入此参数，需要在控制台配置「登出回调 URL」
    redirectUri: 'YOUR_REDIRECT_URL'
  })
}
```
:::
::::

## 获取帮助 <a id="get-help"></a>

请访问 [Authing 论坛](https://forum.authing.cn/)。
