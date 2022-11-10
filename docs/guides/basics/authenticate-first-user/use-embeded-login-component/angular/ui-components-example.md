**首先，通过 npm/yarn/cnpm 安装 Authing library.**

推荐使用 npm （稳定版本 v3.1.21）或 yarn，它们能更好的和 [webpack](https://webpack.js.org/) 打包工具进行配合，也可放心地在生产环境打包部署使用，享受整个生态圈和工具链带来的诸多好处。
如果你的网络环境不佳，也可使用 [cnpm](https://github.com/cnpm/cnpm) 。

运行下列命令行安装 Authing Angular.JS library：

```sh
$ yarn add @authing/guard-angular

# OR

$ npm install @authing/guard-angular --save
```

**接下来，在你的 Angular 应用中完成配置：**


首先你需要在项目的 angular.json 添加:

```json
// 代码示例：https://github.com/Authing/Guard/blob/master/examples/guard-angular/normal/angular.json
{
  "projects": {
    "architect": {
      "build": {
        "styles": ["node_modules/@authing/guard-angular/dist/guard.min.css"]
      }
    }
  }
}
```

在 Angular 项目中初始化：

`app.module.ts`

```js
// 代码示例：https://github.com/Authing/Guard/blob/master/examples/guard-angular/normal/src/app/app.module.ts
// app.module.ts
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { GuardModule } from "@authing/guard-angular";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GuardModule.forRoot({
      appId: "AUTHING_APP_ID",
      // 如果你使用的是私有化部署的 Authing 服务，需要传入自定义 host，如:
      // host: 'https://my-authing-app.example.com',

      // 默认情况下，会使用你在 Authing 控制台中配置的第一个回调地址为此次认证使用的回调地址。
      // 如果你配置了多个回调地址，也可以手动指定（此地址也需要加入到应用的「登录回调 URL」中）：
      // redirectUri: "YOUR_REDIRECT_URI",
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```