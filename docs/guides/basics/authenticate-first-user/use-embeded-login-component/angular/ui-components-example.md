### 安装

使用 `yarn` 或 `npm` 安装：

```bash
$ yarn add @authing/ng-ui-components

# OR

$ npm install @authing/ng-ui-components --save
```

使用 CDN 引入：

```html
<script src="https://cdn.authing.co/packages/ng-ui-components/2.4.45/authing-ng-ui-components.umd.min.js"></script>

<div ng-app="">
  <authing-guard [appId]="AUTHING_APP_ID"></authing-guard>
</div>
```

### 初始化

```javascript
// app.module.ts
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { AuthingGuardModule } from '@authing/ng-ui-components'
import { AppComponent } from './app.component'
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AuthingGuardModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

// app.component.ts
import { Component } from '@angular/core'
import {
  CommonMessage,
  AuthenticationClient,
} from 'ng-ui-components'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'demo'
  appId = 'AUTHING_APP_ID'
  onLoad([e]: [AuthenticationClient]) {
    console.log('ffffff', e)
  }
}

// app.component.html
<authing-guard [appId]="appId" (onLoad)="onLoad($event)"></authing-guard>
```

### 监听成功登录事件

监听成功登录事件非常简单，你只需要传入一个 `onLogin` 回调函数即可：

```html
<authing-guard [appId]="appId" (onLogin)="onLoad($event)"></authing-guard>
```

```javascript
export class AppComponent {
  title = "demo";
  appId = "AUTHING_APP_ID";
  onLogin([user]) {
    console.log("userInfo: ", user);
  }
}
```

用户信息中的 `token` 字段为该用户的身份凭证，后续访问你后端资源的时候应该带上，然后在后端验证此 `token` 的身份。
