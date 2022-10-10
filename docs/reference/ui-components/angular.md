# Angular 登录组件

<LastUpdated/>

::: hint-info
本文对应 {{$localeConfig.brandName}} 老版本产品。如想了解最新功能说明，请查看 [接入 Authing Guard](https://docs.authing.cn/v2/reference/guard/v2/)。
::: 

Authing 登录组件（Guard）是一种可嵌入的登录表单，可根据你的需求进行配置，建议用于单页面应用程序。它使你可以轻松添加各种社会化登录方式，以便你的用户可以无缝登录，并且在不同平台拥有一致的登录体验。Guard 为开发者屏蔽了很多底层认证的实现细节，同时也包括繁琐的 UI 开发。

Guard 可以通过组件化的形式集成到你的 Angular 项目中，你可以借助此组件快速实现登录认证流程。

## 快速开始

### 使用 npm

#### 安装

```bash
$ yarn add @authing/ng-ui-components

# OR

$ npm install @authing/ng-ui-components --save
```

#### 初始化

首先需要在项目的 tsconfig.json 里面的 compilerOptions 添加：

```json
"skipLibCheck": true
```

在 Angular 项目中初始化：

1. `app.module.ts`

```javascript
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { AuthingGuardModule } from "@authing/ng-ui-components";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, AuthingGuardModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

2. `app.component.ts`

```javascript
//
import { Component } from "@angular/core";
import { CommonMessage, AuthenticationClient } from "ng-ui-components";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  appId = "AUTHING_APP_ID";
  onLoad([e]: [AuthenticationClient]) {
    console.log("onLoad", e);
  }
}
```

3. `app.component.html`

```javascript
<authing-guard [appId]="appId" (onLoad)="onLoad($event)"></authing-guard>
```

### 使用 CDN

#### 使用 CDN 引入

```html
<script src="https://cdn.authing.co/packages/ng-ui-components/{LATEST_VERSION}/authing-ng-ui-components.umd.min.js"></script>
```

注意检查最新版本号，格式如：`3.1.21`。

#### 在 Script 代码块中初始化

```html
<div ng-app="">
  <authing-guard [appId]="AUTHING_APP_ID"></authing-guard>
</div>
```

### 监听登录事件

`authing-guard` 组件传入 `onLogin` 事件回调函数，当用户成功登录时回调用此函数，你可以在此获取当前用户的用户信息。[查看完整事件列表](#完整参数)。

```html
<authing-guard [appId]="appId" (onLogin)="onLogin($event)"></authing-guard>
```

```javascript
import { AuthenticationClient } from "@authing/ng-ui-components";
import { User } from "@authing/native-js-ui-components";
export class AppComponent {
  appId = "AUTHING_APP_ID";
  onLogin([user]: [User, AuthenticationClient]) {
    console.log("userInfo: ", user);
  }
}
```

<details><summary><b>了解获取用户信息之后该怎么做？</b></summary>

!!!include(common/what-to-do-when-you-get-userinfo.md)!!!

</details>

### 添加社会化登录

在初始化参数 `config` 中传入 `socialConnections` 列表指定需要显示的社会化登录（默认显示[该应用配置的所有社会化登录](/guides/app-new/create-app/login-control.md#添加社会化登录)）。

```html
<authing-guard [appId]="appId" [config]="config"></authing-guard>
```

```javascript
export class AppComponent {
  appId = "AUTHING_APP_ID";
  config = {
    socialConnections: ["github"],
  };
}
```

<details><summary><b>查看支持的社会化登录列表及接入流程</b></summary>

{{$localeConfig.brandName}} 目前一共支持国内外将近 20 余种社会化登录，如微信、GitHub、Sign in with Apple、支付宝等，以下是完整的列表：

!!!include(common/social-connections-table.md)!!!

</details>

### 退出登录

1. 在项目入口文件中初始化 [AuthenticationClient](/reference/sdk-for-node/#使用认证模块)。

```js
import { initAuthClient } from "@authing/ng-ui-components";

initAuthClient({
  appId: "AUTHING_APP_ID",
});
```

2. 添加一个退出登录的 `button` 组件，并绑定点击事件为 `getAuthClient().logout()`。

```html
<button (click)="logout()">退出登录</button>
```

```javascript
import { initAuthClient } from "@authing/react-ui-components";

export class AppComponent {
  logout() {
    getAuthClient().logout();
  }
}
```

### 实现单点登录

使用 Guard 进行单点登录只需要初始化的时候设置 `isSSO` 为 `true` 即可：

```html
<authing-guard [appId]="appId" [config]="config"></authing-guard>
```

```javascript
export class AppComponent {
  appId = "AUTHING_APP_ID";
  config = {
    isSSO: true,
  };
}
```

## 导出 `authing-js-sdk`

Guard 组件本身基于 [Authing JavaScript SDK](../sdk-for-node/) 进行封装，当你需要进行一些更高级的操作（如管理用户自定义数据、修改用户资料、退出登录）时：

1. 调用 `initAuthClient` 初始化 [AuthenticationClient](/reference/sdk-for-node/authentication/AuthenticationClient.md)，多次调用此函数只会初始化一次。

```js
import { initAuthClient } from "@authing/ng-ui-components";

initAuthClient({
  appId: "AUTHING_APP_ID",
});
```

2. 之后使用 `getAuthClient` 获取 `AuthenticationClient` 实例。

```js
import { getAuthClient } from "@authing/ng-ui-components";

const authClient = getAuthClient();
```

3. 调用 `AuthenticationClient` 实例的方法，完整方法列表请见 [AuthenticationClient 方法列表](/reference/sdk-for-node/authentication/AuthenticationClient.md)。

```js
authClient.getCurrentUser().then((user) => console.log(user));
```

## 完整参数

Authing 登录组件（Guard）提供了很多高级配置，如自定义 UI，使用特定登录方式等。详细请见[完整参数列表](./parameters.md)。

## 事件列表

| 事件名                        | 事件说明                                             | 事件参数                | 事件参数说明                                                                                                  |
| :---------------------------- | :--------------------------------------------------- | :---------------------- | :------------------------------------------------------------------------------------------------------------ |
| load                          | {{$localeConfig.brandName}} appId 验证通过，加载完成 | authClient              | AuthenticationClient 对象，可直接操作 login， register，详情请查看 [authing-js-sdk](/reference/sdk-for-node/) |
| load-error                    | {{$localeConfig.brandName}} appId 验证失败，加载失败 | error                   | 错误信息                                                                                                      |
| login                         | 用户登录成功                                         | user, authClient        | <p>user: 用户信息</p><p>authClient 同上</p>                                                                   |
| login-error                   | 用户登录失败                                         | error                   | 错误信息，包含字段缺失／非法或服务器错误等信息                                                                |
| register                      | 用户注册成功                                         | user, authClient        | <p>user: 用户信息</p><p>authClient 同上</p>                                                                   |
| register-error                | 用户注册失败                                         | error                   | 错误信息，包含字段缺失／非法或服务器错误等信息                                                                |
| pwd-email-send                | 忘记密码邮件发送成功                                 | -                       | -                                                                                                             |
| pwd-email-send-error          | 忘记密码邮件发送失败                                 | error                   | 错误信息                                                                                                      |
| pwd-phone-send                | 忘记密码手机验证码发送成功                           | -                       | -                                                                                                             |
| pwd-phone-send-error          | 忘记密码手机验证码发送失败                           | error                   | 错误信息                                                                                                      |
| pwd-reset                     | 重置密码成功                                         | -                       | -                                                                                                             |
| pwd-reset-error               | 重置密码失败                                         | error                   | 错误信息                                                                                                      |
| close                         | modal 模式中 guard 关闭事件                          | -                       | -                                                                                                             |
| login-tab-change              | 登录 tab 切换事件                                    | activeTab               | 切换后的 tab                                                                                                  |
| register-tab-change           | 注册 tab 切换事件                                    | activeTab               | 切换后的 tab                                                                                                  |
| register-info-completed       | 注册补充成功事件                                     | user, udfs, authClient  | <p>user: 用户信息</p><p>udfs: 补充的自定义字段信息</p><p>authClient 同上</p>                                  |
| register-info-completed-error | 注册补充失败事件                                     | error, udfs, authClient | <p>error: 错误信息</p><p>udfs: 补充的自定义字段信息</p><p>authClient 同上</p>                                 |

## 私有化部署

**私有化部署**场景需要指定你私有化的 Authing 服务的 GraphQL 端点（**不带协议头和 Path**），如果你不清楚可以联系 Authing IDaaS 服务管理员。

```html
<authing-guard [appId]="appId" [config]="config"></authing-guard>
```

```javascript
export class AppComponent {
  appId = "AUTHING_APP_ID";
  config = {
    apiHost: "https://core.you-authing-service.com",
  };
}
```

## 在线示例

<br>
<iframe src="https://codesandbox.io/embed/authi-0w6nh?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="authing-ng-guard"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

## 获取帮助

Join us on forum: [#authing-chat](https://forum.authing.cn/)
