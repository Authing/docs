# 从 Guard V1 迁移
<LastUpdated/>

本指南是为使用 Guard V1 版本（版本号小于 3.0.0 的版本）的用户提供的。你在使用 V1 版本已经了解 Guard 的使用方式，我们主要阐述你想进行版本升级所需要的操作。

> 你如果使用的是 Guard V1 可以放心升级，Guard V1 我们会进行维护的，你如果在使用的时候发现某些缺陷，你可以通过提出 issues 的方式来进行反馈。

## 升级部分

我们本次更新是一个大版本的迭代，我们列出了我们更新的列表：

- DOM 结构优化，你在使用自定义 CSS 的时候可以更好的进行定义样式
- Guard 功能添加 - MFA 中支持人脸识别 & 活体检测
- Guard 功能添加 - 首次登录修改密码
- Guard 功能添加 - 密码轮换策略
- Guard 功能添加 - 邮箱绑定验证
- Guard 功能添加 - 支持注册协议
- Guard 功能添加 - 支持 TOTP 验证器的下载
- Guard 功能添加 - 支持登录安全策略的相关功功能
- Guard 功能添加 - 支持多租户相关的功能

## 使用方式

你原有的使用方式为在 `@authing/react-ui-components` 或者`@authing/vue-ui-components` 中导出 `AuthingGuard` 组件，将 `AuthingGuard` 组件改为 `Guard` 你导出直接替换原有的 `AuthingGuard`即可继续使用。下面我用 React 代码作为示例。

- Guard V1 的使用方式

```javascript
import React from "react";
import { AuthingGuard } from "@authing/react-ui-components";
import "@authing/react-ui-components/lib/index.min.css";

const App = () => {
  const appId = "AUTHING_APP_ID";
  const config = {
    host: "https://core.you-authing-service.com",
  };
  return <AuthingGuard appId={appId} />;
};
```

- 新版 Guard 的使用方式

```javascript
import React from "react";
import { Guard } from "@authing/react-ui-components";
import "@authing/react-ui-components/lib/index.min.css";

const App = () => {
  const appId = "AUTHING_APP_ID";
  const config = {
    host: "https://core.you-authing-service.com",
  };
  return <Guard appId={appId} />;
};
```

`config` 中我们移除了一些参数，具体的字段下表所示：

| 参数名  | 状态 | 兼容方式                 |
| ------- | ---- | ------------------------ |
| appHost | 移除 | 使用 `host` 字段代替即可 |

### 使用自定义 CSS

如果你在 Guard V1 中使用了 `contentCss` (自定义 CSS)，我们不能保证 100 % 的兼容。如果在使用中发现了不兼容的 Dom ClassName 你可以给我们进行反馈，我们会及时进行处理。

> Github issues：[https://github.com/Authing/authing-ui-components/issues](https://github.com/Authing/authing-ui-components/issues)

### 从控制台切换至新版组件

为了保证使用体验的一致性，本次升级将不会自动改变你正在使用的登录框界面。你可以在控制台中实现手动切换，具体操作步骤请参考：[从控制台切换至新版 Guard 组件](./console-migrate.md)
