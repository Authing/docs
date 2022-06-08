# 安装

```bash
# NPM
npm install authing-node-sdk
# Yarn
yarn add authing-node-sdk
```

## 初始化

::: hint-info
初始化 ManagementClient 需要使用 accessKeyId 和 accessKeySecret 参数:
:::

```ts
import { ManagementClient } from "authing-node-sdk";
// 在 Node.js 中引用：
// const { ManagementClient } = require('authing-node-sdk');

const managementClient = new ManagementClient({
  accessKeyId: "AUTHING_USERPOOL_ID",
  accessKeySecret: "AUTHING_USERPOOL_SECRET"
});
```

`ManagementClient` 会自动从 Authing 服务器获取 Management API Token，并通过返回的 Token 过期时间自动对 Token 进行缓存。

完整的参数和释义如下：

- `accessKeyId`: Authing 用户池 ID;
- `accessKeySecret`: Authing 用户池密钥;
- `timeout`: 超时时间，单位为 ms，默认为 10000 ms;
- `host`: Authing 服务器地址，默认为 `https://api.authing.cn`。如果你使用的是 Authing 公有云版本，请忽略此参数。如果你使用的是私有化部署的版本，此参数必填，格式如下: https://authing-api.my-authing-service.com（最后不带斜杠 /）。
- `lang`: 接口 Message 返回语言格式（可选），可选值为 zh-CN 和 en-US，默认为 zh-CN。

## 快速开始

初始化完成 `ManagementClient` 之后，你可以获取 `ManagementClient` 的实例，然后调用此实例上的方法。例如：

- 获取用户列表

```typescript
import { ManagementClient } from "authing-node-sdk";

const managementClient = new ManagementClient({
  accessKeyId: "AUTHING_USERPOOL_ID",
  accessKeySecret: "AUTHING_USERPOOL_SECRET"
})(async () => {
  const { data } = await managementClient.listUsers({
    page: 1,
    limit: 10
  });
})();
```

- 创建角色

```typescript
const { data } = await managementClient.createRole({
  code: "admin",
  description: "管理员",
  namespace: "default"
});
```

完整的接口列表，你可以在 [Authing Open API](https://api.authing.cn/openapi/) 中获取。

## 错误处理

`ManagementClient` 中的每个方法，遵循统一的返回结构：

- `code`: 请求是否成功状态码，当 `code` 为 200 时，表示操作成功，非 200 全部为失败。
- `errorCode`: 细分错误码，当 `code` 非 200 时，可通过此错误码得到具体的错误类型。完整的错误码列表，请见：[TODO](TODO)。
- `message`: 具体的错误信息。
- `data`: 具体返回的接口数据。

一般情况下，如果你只需要判断操作是否成功，只需要对比一下 `code` 是否为 200。如果非 200，可以在代码中通抛出异常或者任何你项目中使用的异常处理方式。

```typescript
const { code, errorCode, message, data } = await managementClient.getUser({
  userId: "62559df6b2xxxx259877b5f4"
});

if (code !== 200) {
  throw Error(message); // 抛出异常，由全局异常捕捉中间件进行异常捕捉
}

// 继续你的业务逻辑 ...
```

## 私有化部署

如果你使用的是私有化部署的 Authing IDaaS 服务，需要指定此 Authing 私有化实例的 `host`，如：

```typescript
import { ManagementClient } from "authing-node-sdk";

const managementClient = new ManagementClient({
  accessKeyId: "YOUR_ACCESS_KEY_ID",
  accessKeySecret: "YOUR_ACCESS_KEY_SECRET",
  host: "https://authing-api.my-authing-service.com"
});
```
