---
tags:
  - 关键词一
  - 关键词二
  - 关键词三
---

# 主体认证模块

<LastUpdated/>

此模块用于为用户进行主体认证，如个人认证或企业认证。

示例代码：

```javascript
import { AuthenticationClient } from 'authing-js-sdk'
const authenticationClient = new AuthenticationClient({
  appId: 'YOUR_APP_ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
})

authenticationClient.principal.detail
authenticationClient.principal.authenticate
```

### 获取认证详情
> 获取主体认证详情

```js
PrincipalAuthentication().detail()
```

#### 示例

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'YOUR_APP_ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
})
const authenticators = await authenticationClient.principal.detail()
```

#### 返回值

- `Promise<PrincipalDetail | null>`，未认证时返回 `null`

#### 示例数据

```json
{
  "id": "60b4d72f56b49fb97281001b",
  "createdAt": "2021-05-31T12:31:43.416Z",
  "updatedAt": "2021-05-31T12:31:43.416Z",
  "userPoolId": "607fe30c14d1650eb1d888ca",
  "userId": "60a336dc179abb512dd64ae7",
  "principalType": "P", // "P" 表示个人认证，"E" 表示个人认证
  "principalName": "xxx",
  "principalCode": "xxxxxxxxxxxxxxx",
  "authenticationTime": "2021-05-31T12:31:43.414Z"
}
```

### 进行主体认证
> 进行主体认证
```js
PrincipalAuthentication().authenticate(principalInfo)
```


#### 参数

在进行个人认证和企业认证时传入的参数会有区别，具体如下。

##### 个人认证

- `principalInfo`: \<object\>
  - `principalInfo.type`: \<string\>，个人认证时应该传入固定字符串 "P"
  - `principalInfo.name`: \<string\>，个人真实名字
  - `principalInfo.idCard`: \<string\>，个人身份证号
  - `principalInfo.bankCard`: \<string\>，个人银行卡号

##### 企业认证

- `principalInfo`: \<object\>
  - `principalInfo.type`: \<string\>，企业认证时应该传入固定字符串 "E"
  - `principalInfo.enterpriseName`: \<string\>，企业名称
  - `principalInfo.enterpriseCode`: \<string\>，企业统一社会信用代码
  - `principalInfo.legalPersonName`: \<string\>，企业法人名字

#### 示例

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'YOUR_APP_ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
})
await authenticationClient.principal.authenticate({
  type: 'P',
  name: 'xxx',
  idCard: 'xxxxxxxxxxxxxxxx',
  bankCard: 'xxxxxxxxxxxxxxxxxxxxxxxxxxx',
})
```

#### 返回值

- `Promise<boolean>`，认证成功返回 `true`

#### 示例数据

```json
true
```
