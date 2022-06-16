**首先，通过 npm/yarn/cnpm 安装 Authing library.**

推荐使用 npm （稳定版本 v3.1.10）或 yarn，它们能更好的和 [webpack](https://webpack.js.org/) 打包工具进行配合，也可放心地在生产环境打包部署使用，享受整个生态圈和工具链带来的诸多好处。
如果你的网络环境不佳，也可使用 [cnpm](https://github.com/cnpm/cnpm) 。

运行下列命令行安装 Authing Angular.JS library：

```sh
$ yarn add @authing/ng-ui-components

# OR

$ npm install @authing/ng-ui-components --save
```

**接下来，在你的 Angular 应用中完成配置：**


首先你需要在项目的 tsconfig.json 里面的 compilerOptions 添加:

```json
"skipLibCheck": true
```

在 Angular 项目中初始化：

`app.module.ts`

```js
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { GuardModule } from "@authing/ng-ui-components";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, GuardModule],
  providers: [],
  bootstrap: [AppComponent],
})

export class AppModule {}
```

`app.component.ts`

```js
import { Component } from '@angular/core';
import { User, AuthenticationClient } from '@authing/ng-ui-components';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  // 替换你的 AppId
  appId = 'your_appId_at_authing_console';

  onLogin([user]: [User, AuthenticationClient]): void {
    console.log(user);
  }
}
```

`app.component.html`

```html
<guard [appId]="appId" (onLogin)="onLogin($event)"></guard>
```
