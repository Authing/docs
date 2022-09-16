本文讲述如何使用 {{$localeConfig.brandName}} 实现应用账号打通和单点登录。

## 什么是单点登录

我们通过一个例子来说明，假设有一所大学，内部有两个系统，一个是邮箱系统，一个是课表查询系统。现在想实现这样的效果：在邮箱系统中登录一遍，然后此时进入课表系统的网站，无需再次登录，课表网站系统直接跳转到个人课表页面，反之亦然。比较专业的定义如下：

**[单点登录](/guides/app-new/sso/)**（Single Sign On），简称为 **[SSO](/guides/app-new/sso/)**，是目前比较流行的企业业务整合的解决方案之一。 [SSO](/guides/app-new/sso/) 的定义是在多个应用系统中，**用户只需要登录一次**就可以**访问所有**相互信任的应用系统。


## Authing Web SDK

基于 OIDC 标准的 Web 应用认证侧 SDK，你可以通过调用 SDK 与 Authing 完成集成，为你的多个业务软件实现浏览器内的可以跨主域的单点登录效果。

## STEP 1: 创建自建应用

> 也可以使用现有应用

在控制台的「自建应用」页面，点击「创建自建应用」，应用类型选择「单页 Web 应用」，并填入以下信息：

- 应用名称：你的应用名称；
- 认证地址：选择一个二级域名，必须为合法的域名格式，例如 `my-spa-app`；

![](~@imagesZhCn/common/integrate-sso/sso-create-app-1.png)

![](~@imagesZhCn/common/integrate-sso/sso-create-app-2.png)


## STEP 2: 配置单点登录

> 参考 [自建应用 SSO 方案](/guides/app/sso.md)

## STEP 3: 修改配置

找到刚刚配置好的应用，进入 **应用配置** 页面。

![](~@imagesZhCn/common/integrate-sso/sso-panel.png)

1. **认证配置**：配置 `登录回调 URL`

![](~@imagesZhCn/common/integrate-sso/sso-callback.png)

2. **授权配置**：`授权模式`开启 `authorization_code`

![](~@imagesZhCn/common/integrate-sso/sso-authorization-configuration.png)

3. **授权配置**：`返回类型`开启 `code`

4. 保存当前配置

至此，配置完成，**点击下方保存按钮**。

## STEP 4: 登录实例参数准备

### 获取用户池 ID

- 进入 Authing 控制台，左上角选择对应的用户池
- 点击左侧菜单栏 `设置` -> `基础设置`
- 点击右侧`密钥管理`，找到`用户池 ID`

如图所示：

![](~@imagesZhCn/common/integrate-sso/sso-userpoolid.png)

### 获取应用 ID

进入 Authing 控制台，选择左侧`自建应用` 菜单，找到并进入对应的应用，在右侧找到对应应用的 APP ID，如图所示：

![](~@imagesZhCn/common/integrate-sso/sso-appid.png)

### 获取登录回调 URL

在`认证配置`处，填写你自己的业务`登录回调 URL`，如图所示：

![](~@imagesZhCn/common/integrate-sso/sso-callback.png)

### 获取单点登录地址

进入 Authing 控制台，选择左侧`单点登录 SSO` 菜单，在右侧点击`配置`选项，复制`应用面板地址`完整 URL，如图所示：

![](~@imagesZhCn/common/integrate-sso/sso-app-panel-address.png)


为了使用 Authing Web SDK，你需要填写`应用 ID`、`单点登录地址`、`回调登录 URL`、`用户池 ID`等参数，如下示例：

## STEP 5: 安装 SDK

Authing Web SDK 支持通过包管理器安装、script 标签引入的方式集成到您的前端业务软件中。

:::: tabs :options="{ useUrlFragment: false }"
::: tab NPM
``` shell
npm install --save @authing/web
```
:::

::: tab CDN
```html
<script src="https://cdn.authing.co/packages/web/5.0.2/index.global.js"></script>
```
:::
::::

## STEP 6: 实例化 SDK

:::: tabs :options="{ useUrlFragment: false }"
::: tab NPM
```js
import { Authing } from '@authing/web';

const authing = new Authing({
  domain: '单点登录地址',
  appId: '应用 ID',
  redirectUri: '登录回调 URL',
  userPoolId: '用户池 ID'
});
```
:::

::: tab CDN
```html
<script>
  const authing = new AuthingFactory.Authing({
    domain: '单点登录地址',
    appId: '应用 ID',
    redirectUri: '登录回调 URL',
    userPoolId: '用户池 ID'
  });
</script>
```
:::
::::

## STEP 7: 发起登录

Authing Web SDK 可以向 Authing 发起认证授权请求，目前支持三种形式：

1. 在当前窗口转到 Authing 托管的登录页；
2. 弹出一个窗口，在弹出的窗口中加载 Authing 托管的登录页。
3. 静默登录

### 一、跳转登录

:::: tabs :options="{ useUrlFragment: false }"
::: tab React
```tsx{22-27}
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Authing } from '@authing/web';

import type {
  LoginState
} from '@authing/web/dist/typings/src/global';

function App() {
  const authing = useMemo(() => {
    return new Authing({
      domain: '单点登录地址',
      appId: '应用 ID',
      redirectUri: '登录回调 URL',
      userPoolId: '用户池 ID'
    });
  }, []);

  const [loginState, setLoginState] = useState<LoginState | null>();

  /**
   * 以跳转方式打开 Authing 托管的登录页
   */
  const login = () => {
    authing.loginWithRedirect();
  };

  /**
   * 获取用户的登录状态
   */
  const getLoginState = useCallback(async () => {
    const state = await authing.getLoginState();
    setLoginState(state);
  }, [authing]);

  useEffect(() => {
    // 判断当前 URL 是否为 Authing 登录回调 URL
    if (authing.isRedirectCallback()) {
      /**
       * 以跳转方式打开 Authing 托管的登录页，认证成功后需要配合 handleRedirectCallback 方法，
       * 在回调端点处理 Authing 发送的授权码或 token，获取用户登录态
       */
      console.log('redirect');
      authing.handleRedirectCallback().then((res) => {
        setLoginState(res);
        window.location.replace('/');
      });
    } else {
      getLoginState();
    }
  }, [getLoginState, authing]);

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
:::

::: tab Vue2
```html{54-59}
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
      domain: "单点登录地址",
      appId: "应用 ID",
      redirectUri: "登录回调 URL",
      userPoolId: '用户池 ID'
    });
  },

  mounted() {
    // 校验当前 url 是否是登录回调 URL
    if (this.authing.isRedirectCallback()) {
      console.log("redirect");
      this.authing.handleRedirectCallback().then((res) => {
        this.loginState = res;
        window.location.replace("/");
      });
    } else {
      this.getLoginState();
    }
  },

  methods: {
    /**
     * 以跳转方式打开 Authing 托管的登录页
     */
    login() {
      this.authing.loginWithRedirect();
    },

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
```html{47-54}
<script>
import { defineComponent, onMounted, reactive, toRefs } from "vue";

import { Authing } from "@authing/web";

export default defineComponent({
  name: "App",
  setup() {
    const authing = new Authing({
      domain: "单点登录地址",
      appId: "应用 ID",
      redirectUri: "登录回调 URL",
      userPoolId: '用户池 ID'
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

    /**
     * 以跳转方式打开 Authing 托管的登录页
     */
    const login = () => {
      authing.loginWithRedirect();
    };

    onMounted(() => {
      // 校验当前 url 是否是登录回调 URL
      if (authing.isRedirectCallback()) {
        console.log("redirect");

        /**
         * 以跳转方式打开 Authing 托管的登录页，认证成功后需要配合 handleRedirectCallback 方法，
         * 在回调端点处理 Authing 发送的授权码或 token，获取用户登录态
         */
        authing.handleRedirectCallback().then((res) => {
          state.loginState = res;
          window.location.replace("/");
        });
      } else {
        getLoginState();
      }
    });

    return {
      ...toRefs(state),
      login,
    };
  },
});
</script>
```
:::

::: tab Angular
```ts{45-52}
import { Component } from '@angular/core';
import { Authing } from '@authing/web';
import type { LoginState } from '@authing/web/dist/typings/src/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  loginState: LoginState | null = null;

  private authing = new Authing({
    domain: '单点登录地址',
    appId: '应用 ID',
    redirectUri: '登录回调 URL',
    userPoolId: '用户池 ID'
  });

  ngOnInit() {
    // 校验当前 url 是否是登录回调 URL
    if (this.authing.isRedirectCallback()) {
      console.log('redirect');

      /**
       * 以跳转方式打开 Authing 托管的登录页，认证成功后需要配合 handleRedirectCallback 方法，
       * 在回调端点处理 Authing 发送的授权码或 token，获取用户登录态
       */
      this.authing.handleRedirectCallback().then((res) => {
        this.loginState = res;
        window.location.replace('/');
      });
    } else {
      this.getLoginState();
    }
  }

  /**
   * 以跳转方式打开 Authing 托管的登录页
   */
  login() {
    this.authing.loginWithRedirect();
  }

  /**
   * 获取用户的登录状态
   */
  async getLoginState() {
    const state = await this.authing.getLoginState();
    this.loginState = state;
  }
}
```
:::
::::


您可以使用默认参数，也可以根据需要进行自定义传参：


:::: tabs :options="{ useUrlFragment: false }"
::: tab React
```js
const login = () => {
  const params: {
    // 回调登录 URL，默认为初始化参数中的 redirectUri
    redirectUri?: string;

    // 发起登录的 URL，若实例化 Authing 时设置了 redirectToOriginalUri， 会在登录结束后重定向回到此页面，默认为当前 URL
    originalUri?: string;

    // 即使在用户已登录时也提示用户再次登录
    forced?: boolean;

    // 自定义的中间状态，会被传递到回调端点
    customState?: any;
  } = {
    redirectUri: '回调登录 URL',
    originalUri: '发起登录的 URL',
    forced: false,
    customState: {},
  }
  authing.loginWithRedirect(params);
};
```
:::

::: tab Vue2
```js
export default {
  methods: {
    /**
     * 以跳转方式打开 Authing 托管的登录页
     */
    login() {
      const params = {
        redirectUri: "登录回调 URL",

        // 发起登录的 URL，若设置了 redirectToOriginalUri 会在登录结束后重定向回到此页面，默认为当前 URL
        originalUri: "发起登录的 URL",

        // 即使在用户已登录时也提示用户再次登录
        forced: false,

        // 自定义的中间状态，会被传递到回调端点
        customState: {},
      };
      this.authing.loginWithRedirect(params);
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
     * 以跳转方式打开 Authing 托管的登录页
     */
    const login = () => {
      const params = {
        redirectUri: "登录回调 URL",

        // 发起登录的 URL，若设置了 redirectToOriginalUri 会在登录结束后重定向回到此页面，默认为当前 URL
        originalUri: "发起登录的 URL",

        // 即使在用户已登录时也提示用户再次登录
        forced: false,

        // 自定义的中间状态，会被传递到回调端点
        customState: {},
      };
      authing.loginWithRedirect(params);
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
  /**
   * 以跳转方式打开 Authing 托管的登录页
   */
  login() {
    const params: {
      // 回调登录 URL，默认为初始化参数中的 redirectUri
      redirectUri?: string;

      // 发起登录的 URL，若设置了 redirectToOriginalUri 会在登录结束后重定向回到此页面，默认为当前 URL
      originalUri?: string;

      // 即使在用户已登录时也提示用户再次登录
      forced?: boolean;

      // 自定义的中间状态，会被传递到回调端点
      customState?: any;
    } = {
      redirectUri: '回调登录 URL',
      originalUri: '发起登录的 URL',
      forced: false,
      customState: {},
    }
    this.authing.loginWithRedirect(params);
  }
}
```
:::
::::


### 二、弹出窗口登录

您也可以在你的业务软件页面使用下面的方法，通过弹出一个新窗口加载 Authing 托管的登录页的方式，让用户在新窗口登录：

:::: tabs :options="{ useUrlFragment: false }"
::: tab React
```tsx{22-28}
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Authing } from '@authing/web';
import type { LoginState } from '@authing/web/dist/typings/src/global';

function App() {
  const authing = useMemo(() => {
    return new Authing({
      domain: '单点登录地址',
      appId: '应用 ID',
      redirectUri: '登录回调 URL',
      userPoolId: '用户池 ID'
    });
  }, []);

  const [loginState, setLoginState] = useState<LoginState | null>();

  /**
   * 以弹窗方式打开 Authing 托管的登录页
   */
  const login = async () => {
    const res = await authing.loginWithPopup();
    setLoginState(res);
  };

  /**
   * 获取用户的登录状态
   */
  const getLoginState = useCallback(async () => {
    const state = await authing.getLoginState();
    setLoginState(state);
  }, [authing]);

  useEffect(() => {
    getLoginState();
  }, [getLoginState]);

  return (
    <div className="App">
      <p>
        <button onClick={login}>login</button>
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
``` html
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
      domain: "单点登录地址",
      appId: "应用 ID",
      redirectUri: "登录回调 URL",
      userPoolId: '用户池 ID'
    });
  },
  mounted() {
    this.getLoginState();
  },
  methods: {
    /**
     * 以弹窗方式打开 Authing 托管的登录页
     */
    async login() {
      const res = await this.authing.loginWithPopup();
      this.loginState = res;
    },
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
```html
<script>
import { defineComponent, onMounted, reactive, toRefs } from "vue";

import { Authing } from "@authing/web";

export default defineComponent({
  name: "App",

  setup() {
    const authing = new Authing({
      domain: "单点登录地址",
      appId: "应用 ID",
      redirectUri: "登录回调 URL",
      userPoolId: '用户池 ID'
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

    /**
     * 以弹窗方式打开 Authing 托管的登录页
     */
    const login = async () => {
      const res = await authing.loginWithPopup();
      state.loginState = res;
    };

    onMounted(getLoginState);

    return {
      ...toRefs(state),
      login,
    };
  },
});
</script>
```
:::

::: tab Angular
```ts{31-39}
import { Component } from '@angular/core';
import { Authing } from '@authing/web';
import type { LoginState } from '@authing/web/dist/typings/src/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  loginState: LoginState | null = null;

  private authing = new Authing({
    domain: '单点登录地址',
    appId: '应用 ID',
    redirectUri: '登录回调 URL',
    userPoolId: '用户池 ID'
  });

  ngOnInit() {
    this.getLoginState();
  }

  /**
   * 以弹窗方式打开 Authing 托管的登录页
   */
  async login() {
    const res = await this.authing.loginWithPopup();
    this.loginState = res;
  }

  /**
   * 获取用户的登录状态
   */
  async getLoginState() {
    const state = await this.authing.getLoginState();
    this.loginState = state;
  }
}
```
:::
::::


您可以使用默认参数，也可以根据需要进行自定义传参：

:::: tabs :options="{ useUrlFragment: false }"
::: tab React
```ts
const login = async () => {
  const params: {
    // 回调登录 URL，默认为初始化参数中的 redirectUri
    redirectUri?: string;

    // 即使在用户已登录时也提示用户再次登录
    forced?: boolean;
  } = {
    redirectUri: '回调登录 URL',
    forced: false,
  };
  const res = await authing.loginWithPopup(params);
  setLoginState(res);
};
```
:::

::: tab Vue2
```js
export default {
  data() {
    return {
      authing: null,
      loginState: null,
    }
  },
  methods: {
    /**
     * 以弹窗方式打开 Authing 托管的登录页
     */
    async login() {
      const params = {
        redirectUri: "登录回调 URL",

        // 即使在用户已登录时也提示用户再次登录
        forced: false,
      };
      const res = await this.authing.loginWithPopup(params);
      this.loginState = res;
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
        redirectUri: "登录回调 URL",

        // 即使在用户已登录时也提示用户再次登录
        forced: false,
      };
      const res = await authing.loginWithPopup(params);
      state.loginState = res;
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
      // 回调登录 URL，默认为初始化参数中的 redirectUri
      redirectUri?: string;

      // 即使在用户已登录时也提示用户再次登录
      forced?: boolean;
    } = {
      redirectUri: '回调登录 URL',
      forced: false,
    };
    const res = await this.authing.loginWithPopup(params);
    this.loginState = res;
  };
}
```
:::
::::


### 三、静默登录

在 [自建应用 SSO 方案](/guides/app/sso.md) 一文中有提到，可以将多个自建应用添加到「 **单点登录 SSO」** 面板，。如果用户已经登录过其中的一个应用，那么在同一浏览器另一个标签页访问其他应用的时候，就可以实现静默登录，直接获取到用户信息，实现单点登录效果。

:::: tabs :options="{ useUrlFragment: false }"
::: tab React
```tsx{22-44}
import React, { useEffect, useMemo, useState } from 'react';
import { Authing } from '@authing/web';
import type { LoginState } from '@authing/web/dist/typings/src/global';

function App() {
  const authing = useMemo(() => {
    return new Authing({
      domain: '单点登录地址',
      appId: '应用 ID',
      redirectUri: '登录回调 URL',
      userPoolId: '用户池 ID'
    });
  }, []);

  const [loginState, setLoginState] = useState<LoginState | null>();

  useEffect(() => {
    // 判断当前 URL 是否为 Authing 登录回调 URL
    if (authing.isRedirectCallback()) {
      console.log('redirect');
      /**
       * 以跳转方式打开 Authing 托管的登录页，认证成功后需要配合 handleRedirectCallback 方法，
       * 在回调端点处理 Authing 发送的授权码或 token，获取用户登录态
       */
      authing.handleRedirectCallback().then((res) => {
        setLoginState(res);
        window.location.replace('/');
      });
    } else {
      console.log('normal');

      // 获取用户的登录状态
      authing.getLoginState().then((res) => {
        if (res) {
          setLoginState(res);
        } else {
          // 如果用户没有登录，跳转认证中心
          authing.loginWithRedirect();
        }
      });
    }
  }, [authing]);

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
```html{39-62}
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
      domain: "单点登录地址",
      appId: "应用 ID",
      redirectUri: "登录回调 URL",
      userPoolId: '用户池 ID'
    });
  },

  mounted() {
    // 校验当前 url 是否是登录回调 URL
    if (this.authing.isRedirectCallback()) {
      console.log("redirect");

      /**
       * 以跳转方式打开 Authing 托管的登录页，认证成功后需要配合 handleRedirectCallback 方法，
       * 在回调端点处理 Authing 发送的授权码或 token，获取用户登录态
       */
      this.authing.handleRedirectCallback().then((res) => {
        this.loginState = res;
        window.location.replace("/");
      });
    } else {
      console.log("normal");

      this.authing.getLoginState().then((res) => {
        if (res) {
          this.loginState = res;
        } else {
          // 静默登录。取不到用户信息直接跳转到授权中心
          this.authing.loginWithRedirect();
        }
      });
    }
  },
};
</script>
```
:::

::: tab Vue3
```html{48-65}
<script>
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { Authing } from "@authing/web";

export default defineComponent({
  name: "App",

  setup() {
    const authing = new Authing({
      domain: "单点登录地址",
      appId: "应用 ID",
      redirectUri: "登录回调 URL",
      userPoolId: '用户池 ID'
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

      if (!res) {
        authing.loginWithRedirect();
      }
    };

    onMounted(() => {
      // 校验当前 url 是否是登录回调 URL
      if (authing.isRedirectCallback()) {
        console.log("redirect");

        /**
         * 以跳转方式打开 Authing 托管的登录页，认证成功后需要配合 handleRedirectCallback 方法，
         * 在回调端点处理 Authing 发送的授权码或 token，获取用户登录态
         */
        authing.handleRedirectCallback().then((res) => {
          state.loginState = res;
          window.location.replace("/");
        });
      } else {
        console.log("normal");

        // 静默登录，直接获取到用户信息
        getLoginState();
      }
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>
```
:::

::: tab Angular
```ts{26-44}
import { Component } from '@angular/core';
import { Authing } from '@authing/web';
import type { LoginState } from '@authing/web/dist/typings/src/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  loginState: LoginState | null = null;

  private authing = new Authing({
    domain: '单点登录地址',
    appId: '应用 ID',
    redirectUri: '登录回调 URL',
    userPoolId: '用户池 ID'
  });

  ngOnInit() {
    // 校验当前 url 是否是登录回调 URL
    if (this.authing.isRedirectCallback()) {
      console.log('redirect');

      /**
       * 以跳转方式打开 Authing 托管的登录页，认证成功后需要配合 handleRedirectCallback 方法，
       * 在回调端点处理 Authing 发送的授权码或 token，获取用户登录态
       */
      this.authing.handleRedirectCallback().then((res) => {
        this.loginState = res;
        window.location.replace('/');
      });
    } else {
      console.log('normal');

      this.getLoginState();
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
::::


### 四、高级使用

每次发起登录本质是访问一个 URL 地址，可以携带许多参数。Authing Browser SDK 默认会使用缺省参数。如果你您需要精细控制登录请求参数，可以参考本示例。

```js
import { Authing } from '@authing/web';

const authing = new Authing({
  domain: '单点登录地址',
  appId: '应用 ID',
  redirectUri: '登录回调 URL',

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
  // 如果设为 true，需要在控制台中将『应用配置』-『其他配置』-『检验 token 身份验证方式』设为 none
  introspectAccessToken: false,

  // 弹出窗口的宽度
  popupWidth: 500,

  // 弹出窗口的高度
  popupHeight: 600,
});
```

## STEP 8: 登录后的处理

### 检查登录态并获取 Token

如果你您想检查用户的登录态，并获取用户的 `Access Token`、`ID Token`，可以调用 `getLoginState` 方法，。如果用户没有在 Authing 登录，该方法会抛出错误：

:::: tabs :options="{ useUrlFragment: false }"
::: tab React
```tsx{29-36}
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Authing } from '@authing/web';
import type { LoginState } from '@authing/web/dist/typings/src/global';

function App() {
  const authing = useMemo(() => {
    return new Authing({
      domain: '单点登录地址',
      appId: '应用 ID',
      redirectUri: '登录回调 URL',
      userPoolId: '用户池 ID'
    });
  }, []);

  const [loginState, setLoginState] = useState<LoginState | null>();

  /**
   * 以跳转方式打开 Authing 托管的登录页
   */
  const login = () => {
    authing.loginWithRedirect();
  };

  /**
   * 获取用户的登录状态
   */
  const getLoginState = useCallback(async () => {
    const state = await authing.getLoginState();
    setLoginState(state);
  }, [authing]);

  useEffect(() => {
    // 判断当前 URL 是否为 Authing 登录回调 URL
    if (authing.isRedirectCallback()) {
      /**
       * 以跳转方式打开 Authing 托管的登录页，认证成功后需要配合 handleRedirectCallback 方法，
       * 在回调端点处理 Authing 发送的授权码或 token，获取用户登录态
       */
      authing.handleRedirectCallback().then((res) => {
        setLoginState(res);
        window.location.replace('/');
      });
    } else {
      getLoginState();
    }
  }, [getLoginState, authing]);

  return (
    <div className="App">
      <p>
        <button onClick={login}>login</button>
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
``` html
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
      domain: "单点登录地址",
      appId: "应用 ID",
      redirectUri: "登录回调 URL",
      userPoolId: '用户池 ID'
    });
  },

  mounted() {
    // 校验当前 url 是否是登录回调 URL
    if (this.authing.isRedirectCallback()) {
      console.log("redirect");

      /**
       * 以跳转方式打开 Authing 托管的登录页，认证成功后需要配合 handleRedirectCallback 方法，
       * 在回调端点处理 Authing 发送的授权码或 token，获取用户登录态
       */
      this.authing.handleRedirectCallback().then((res) => {
        this.loginState = res;
        window.location.replace("/");
      });
    } else {
      console.log("normal");

      this.getLoginState();
    }
  },

  methods: {
    /**
     * 获取用户的登录状态
     */
    async getLoginState() {
      const state = await this.authing.getLoginState();
      this.loginState = state;
    },

    /**
     * 以跳转方式打开 Authing 托管的登录页
     */
    login() {
      this.authing.loginWithRedirect();
    },
  },
};
</script>
```
:::

::: tab Vue3
```html{39-51}
<script>
import { defineComponent, onMounted, reactive, toRefs } from "vue";

import { Authing } from "@authing/web";

export default defineComponent({
  name: "App",

  setup() {
    const authing = new Authing({
      domain: "单点登录地址",
      appId: "应用 ID",
      redirectUri: "登录回调 URL",
      userPoolId: '用户池 ID'
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

      if (!res) {
        authing.loginWithRedirect();
      }
    };

    /**
     * 以跳转方式打开 Authing 托管的登录页
     */
    const login = () => {
      authing.loginWithRedirect();
    };

    onMounted(() => {
      // 校验当前 url 是否是登录回调 URL
      if (authing.isRedirectCallback()) {
        console.log("redirect");

        /**
         * 以跳转方式打开 Authing 托管的登录页，认证成功后需要配合 handleRedirectCallback 方法，
         * 在回调端点处理 Authing 发送的授权码或 token，获取用户登录态
         */
        authing.handleRedirectCallback().then((res) => {
          state.loginState = res;
          window.location.replace("/");
        });
      } else {
        console.log("normal");

        // 静默登录，直接获取到用户信息
        getLoginState();
      }
    });

    return {
      ...toRefs(state),
      login,
    };
  },
});
</script>
```
:::

::: tab Angular
```ts{53-59}
import { Component } from '@angular/core';
import { Authing } from '@authing/web';
import type { LoginState } from '@authing/web/dist/typings/src/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  loginState: LoginState | null = null;

  private authing = new Authing({
    domain: '单点登录地址',
    appId: '应用 ID',
    redirectUri: '登录回调 URL',
    userPoolId: '用户池 ID'
  });

  ngOnInit() {
    // 校验当前 url 是否是登录回调 URL
    if (this.authing.isRedirectCallback()) {
      console.log('redirect');

      /**
       * 以跳转方式打开 Authing 托管的登录页，认证成功后需要配合 handleRedirectCallback 方法，
       * 在回调端点处理 Authing 发送的授权码或 token，获取用户登录态
       */
      this.authing.handleRedirectCallback().then((res) => {
        this.loginState = res;
        window.location.replace('/');
      });
    } else {
      this.getLoginState();
    }
  }

  /**
   * 以跳转方式打开 Authing 托管的登录页
   */
  login() {
    this.authing.loginWithRedirect();
  }

  /**
   * 获取用户的登录状态
   */
  async getLoginState() {
    const state = await this.authing.getLoginState();
    this.loginState = state;
  }
}
```
:::
::::
### 获取用户信息

您需要使用 Access Token 获取用户的个人信息：

1. 用户初次登录成功时可以在回调函数中拿到用户的 Access Token，然后使用 Access Token 获取用户信息；
2. 如果用户已经登录，你您可以先获取用户的 Access Token ，然后使用 Access Token 获取用户信息。

:::: tabs :options="{ useUrlFragment: false }"
::: tab React
```tsx{38-50}
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Authing } from '@authing/web';
import type { LoginState, IUserInfo, NormalError } from '@authing/web/dist/typings/src/global';

function App() {
  const authing = useMemo(() => {
    return new Authing({
      domain: '单点登录地址',
      appId: '应用 ID',
      redirectUri: '登录回调 URL',
      userPoolId: '用户池 ID'
    });
  }, []);

  const [loginState, setLoginState] = useState<LoginState | null>();
  const [userInfo, setUserInfo] = useState<IUserInfo | NormalError | null>();

  /**
   * 以跳转方式打开 Authing 托管的登录页
   */
  const login = () => {
    authing.loginWithRedirect();
  };

  /**
   * 获取用户的登录状态
   */
  const getLoginState = useCallback(async () => {
    const state = await authing.getLoginState();
    setLoginState(state);
  }, [authing]);

  /**
   * 用 Access Token 获取用户身份信息
   */
  const getUserInfo = async () => {
    if (!loginState) {
      alert("用户未登录");
      return;
    }
    const userInfo = await authing.getUserInfo({
      accessToken: loginState?.accessToken,
    });
    setUserInfo(userInfo);
  };

  useEffect(() => {
    // 判断当前 URL 是否为 Authing 登录回调 URL
    if (authing.isRedirectCallback()) {
      console.log('redirect');
      authing.handleRedirectCallback().then((res) => {
        setLoginState(res);
        window.location.replace('/');
      });
    } else {
      getLoginState();
    }
  }, [getLoginState, authing]);

  return (
    <div className="App">
      <p>
        <button onClick={login}>login</button>&nbsp;
        <button onClick={getUserInfo}>getUserInfo</button>&nbsp;
      </p>
      <p>
        loginState：
        <code>{JSON.stringify(loginState)}</code>
      </p>
      <p>
        userInfo：
        <code>{JSON.stringify(userInfo)}</code>
      </p>
    </div>
  );
}

export default App;
```
:::
  
::: tab Vue2
```html{71-83}
<script>
import { Authing } from "@authing/web";

export default {
  name: "App",

  data() {
    return {
      authing: null,
      loginState: null,
      userInfo: null,
    };
  },

  created() {
    this.authing = new Authing({
      domain: "单点登录地址",
      appId: "应用 ID",
      redirectUri: "登录回调 URL",
      userPoolId: '用户池 ID'
    });
  },

  mounted() {
    // 校验当前 url 是否是登录回调 URL
    if (this.authing.isRedirectCallback()) {
      console.log("redirect");

      /**
       * 以跳转方式打开 Authing 托管的登录页，认证成功后需要配合 handleRedirectCallback 方法，
       * 在回调端点处理 Authing 发送的授权码或 token，获取用户登录态
       */
      this.authing.handleRedirectCallback().then((res) => {
        this.loginState = res;
        window.location.replace("/");
      });
    } else {
      console.log("normal");

      this.getLoginState();
    }
  },

  methods: {
    /**
     * 用 Access Token 获取用户身份信息
     */
    async getUserInfo() {
      if (!this.loginState) {
        alert("用户未登录");
        return;
      }
      const userInfo = await this.authing.getUserInfo({
        accessToken: this.loginState.accessToken,
      });
      this.userInfo = userInfo;
    },

    /**
     * 获取用户的登录状态
     */
    async getLoginState() {
      const state = await this.authing.getLoginState();
      this.loginState = state;
    },

    /**
     * 以跳转方式打开 Authing 托管的登录页
     */
    login() {
      this.authing.loginWithRedirect();
    },
  },
};
</script>
```
:::

::: tab Vue3
```html{70-84}
<script>
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { Authing } from "@authing/web";

export default defineComponent({
  name: "App",

  setup() {
    const authing = new Authing({
      domain: "单点登录地址",
      appId: "应用 ID",
      redirectUri: "登录回调 URL",
      userPoolId: '用户池 ID'
    });

    const state = reactive({
      loginState: null,
      userInfo: null,
    });

    /**
     * 获取用户的登录状态
     */
    const getLoginState = async () => {
      const res = await authing.getLoginState();
      state.loginState = res;

      if (!res) {
        authing.loginWithRedirect();
      }
    };

    /**
     * 以跳转方式打开 Authing 托管的登录页
     */
    const login = () => {
      authing.loginWithRedirect();
    };

    /**
     * 用 Access Token 获取用户身份信息
     */
    const getUserInfo = async () => {
      if (!state.loginState) {
        alert("用户未登录");
        return;
      }
      const userInfo = await authing.getUserInfo({
        accessToken: state.loginState.accessToken,
      });
      state.userInfo = userInfo;
    };

    onMounted(() => {
      // 校验当前 url 是否是登录回调 URL
      if (authing.isRedirectCallback()) {
        console.log("redirect");

        /**
         * 以跳转方式打开 Authing 托管的登录页，认证成功后需要配合 handleRedirectCallback 方法，
         * 在回调端点处理 Authing 发送的授权码或 token，获取用户登录态
         */
        authing.handleRedirectCallback().then((res) => {
          state.loginState = res;
          window.location.replace("/");
        });
      } else {
        console.log("normal");

        // 静默登录，直接获取到用户信息
        getLoginState();
      }
    });

    return {
      ...toRefs(state),
      login,
      getUserInfo,
    };
  },
});
</script>
```
:::

::: tab Angular
```ts{46-60}
import { Component } from '@angular/core';
import { Authing } from '@authing/web';
import type { LoginState, IUserInfo, NormalError } from '@authing/web/dist/typings/src/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  loginState: LoginState | null = null;
  userInfo: IUserInfo | NormalError | null = null;

  private authing = new Authing({
    domain: '单点登录地址',
    appId: '应用 ID',
    redirectUri: '登录回调 URL',
    userPoolId: '用户池 ID'
  });

  ngOnInit() {
    // 校验当前 url 是否是登录回调 URL
    if (this.authing.isRedirectCallback()) {
      console.log('redirect');

      /**
       * 以跳转方式打开 Authing 托管的登录页，认证成功后需要配合 handleRedirectCallback 方法，
       * 在回调端点处理 Authing 发送的授权码或 token，获取用户登录态
       */
      this.authing.handleRedirectCallback().then((res) => {
        this.loginState = res;
        window.location.replace('/');
      });
    } else {
      this.getLoginState();
    }
  }

  /**
   * 用 Access Token 获取用户身份信息
   */
  async getUserInfo() {
    if (!this.loginState) {
      alert('用户未登录');
      return;
    }
    const userInfo = await this.authing.getUserInfo({
      accessToken: this.loginState.accessToken,
    });
    this.userInfo = userInfo;
  }

  /**
   * 以跳转方式打开 Authing 托管的登录页
   */
  login() {
    this.authing.loginWithRedirect();
  }

  /**
   * 获取用户的登录状态
   */
  async getLoginState() {
    const state = await this.authing.getLoginState();
    this.loginState = state;
  }
}
```
:::
::::


### 退出登录

可以调用 SDK 的 `logoutWithRedirect` 方法退出登录。

:::: tabs :options="{ useUrlFragment: false }"
 
::: tab React
```tsx{36-43}
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Authing } from '@authing/web';
import type { LoginState } from '@authing/web/dist/typings/src/global';

function App() {
  const authing = useMemo(() => {
    return new Authing({
      domain: '单点登录地址',
      appId: '应用 ID',
      redirectUri: '登录回调 URL',
      userPoolId: '用户池 ID'
    });
  }, []);

  const [loginState, setLoginState] = useState<LoginState | null>();

  /**
   * 以跳转方式打开 Authing 托管的登录页
   */
  const login = () => {
    authing.loginWithRedirect();
  };

  /**
   * 获取用户的登录状态
   */
  const getLoginState = useCallback(async () => {
    const state = await authing.getLoginState();
    setLoginState(state);
  }, [authing]);

  /**
   * 登出
   */
  const logout = async () => {
    await authing.logoutWithRedirect({
      // 可选项，如果传入此参数，需要在控制台配置【登出回调 URL】
      redirectUri: '退出登录后的跳转地址'
    });
  };

  useEffect(() => {
    // 判断当前 URL 是否为 Authing 登录回调 URL
    if (authing.isRedirectCallback()) {
      /**
       * 以跳转方式打开 Authing 托管的登录页，认证成功后需要配合 handleRedirectCallback 方法，
       * 在回调端点处理 Authing 发送的授权码或 token，获取用户登录态
       */
      authing.handleRedirectCallback().then((res) => {
        setLoginState(res);
        window.location.replace('/');
      });
    } else {
      getLoginState();
    }
  }, [getLoginState, authing]);

  return (
    <div className="App">
      <p>
        <button onClick={login}>login</button>&nbsp;
        <button onClick={logout}>logout</button>&nbsp;
      </p>
      <p>
        loginState：
        <code>{JSON.stringify(loginState)}</code>
      </p>
    </div>
  );
}

export default App;
```
:::

::: tab Vue2
```html{61-66}
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
      domain: "单点登录地址",
      appId: "应用 ID",
      redirectUri: "登录回调 URL",
      userPoolId: '用户池 ID'
    });
  },

  mounted() {
    // 校验当前 url 是否是登录回调 URL
    if (this.authing.isRedirectCallback()) {
      console.log("redirect");

      /**
       * 以跳转方式打开 Authing 托管的登录页，认证成功后需要配合 handleRedirectCallback 方法，
       * 在回调端点处理 Authing 发送的授权码或 token，获取用户登录态
       */
      this.authing.handleRedirectCallback().then((res) => {
        this.loginState = res;
        window.location.replace("/");
      });
    } else {
      this.getLoginState();
    }
  },

  methods: {
    /**
     * 以跳转方式打开 Authing 托管的登录页
     */
    login() {
      this.authing.loginWithRedirect();
    },

    /**
     * 登出
     */
    logout() {
      this.authing.logoutWithRedirect({
        // 可选项，如果传入此参数，需要在控制台配置【登出回调 URL】
        redirectUri: '退出登录后的跳转地址'
      });
    },

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
```html{25-32}
<script>
import { defineComponent } from "vue";
import { Authing } from "@authing/web";

export default defineComponent({
  name: "App",

  setup() {
    const authing = new Authing({
      domain: "单点登录地址",
      appId: "应用 ID",
      redirectUri: "登录回调 URL",
      userPoolId: '用户池 ID'
    });

    /**
     * 登出
     */
    const logout = () => {
      authing.logoutWithRedirect({
        // 可选项，如果传入此参数，需要在控制台配置【登出回调 URL】
        redirectUri: '退出登录后的跳转地址'
      });
    };

    return {
      logout,
    };
  },
});
</script>
```
:::

::: tab Angular
```ts{52-59}
import { Component } from '@angular/core';
import { Authing } from '@authing/web';
import type { LoginState } from '@authing/web/dist/typings/src/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  loginState: LoginState | null = null;

  private authing = new Authing({
    domain: '单点登录地址',
    appId: '应用 ID',
    redirectUri: '登录回调 URL',
    userPoolId: '用户池 ID'
  });

  ngOnInit() {
    // 校验当前 url 是否是登录回调 URL
    if (this.authing.isRedirectCallback()) {
      console.log('redirect');

      /**
       * 以跳转方式打开 Authing 托管的登录页，认证成功后需要配合 handleRedirectCallback 方法，
       * 在回调端点处理 Authing 发送的授权码或 token，获取用户登录态
       */
      this.authing.handleRedirectCallback().then((res) => {
        this.loginState = res;
        window.location.replace('/');
      });
    } else {
      this.getLoginState();
    }
  }

  /**
   * 以跳转方式打开 Authing 托管的登录页
   */
  login() {
    this.authing.loginWithRedirect();
  }

  /**
   * 登出
   */
  logout() {
    this.authing.logoutWithRedirect({
      // 可选项，如果传入此参数，需要在控制台配置【登出回调 URL】
      redirectUri: '退出登录后的跳转地址'
    });
  }

  /**
   * 获取用户的登录状态
   */
  async getLoginState() {
    const state = await this.authing.getLoginState();
    this.loginState = state;
  }
}
```
:::
::::

## 代码参考

[Demo](https://github.com/Authing/authing-js-sdk/tree/master/examples/web/sso)

## 获取帮助 <a id="get-help"></a>

[#authing-chat](https://forum.authing.cn/)
