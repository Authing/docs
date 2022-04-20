---
meta:
  - name: description
    content: 管理 MFA
---

# 管理 MFA

<LastUpdated/>

此模块主要用来管理 MFA 相关操作。

请使用以下方式使用该模块：

```javascript
import { ManagementClient } from 'authing-js-sdk'

const managementClient = new ManagementClient({
  userPoolId: 'YOUR_USERPOOL_ID',
  secret: 'YOUR_USERPOOL_SECRET',
})
managementClient.mfa.getStatus(USER_ID) // 用户 MFA 绑定状态
```

## 获取用户 MFA 绑定状态
> 获取用户 MFA 绑定状态

```js
managementClient.mfa.getStatus(userId)
```


#### 参数

- `userId` \<string\> 用户 ID

#### 示例

```javascript
managementClient.mfa.getStatus(USER_ID)
```

#### 示例数据

```js
{
  "FACE": true,
  "OTP": false
}
```

## 解绑用户 MFA
> 解绑用户 MFA

```js
managementClient.mfa.unAssociateMfa(userId, mfaType)
```


#### 参数

- `userId` \<string\> 用户 ID
- `mfaType` \<string\> 解绑类型，可选值为 `FACE`, `OTP`

#### 示例

```javascript
managementClient.mfa.unAssociateMfa(USER_ID, 'OTP')
```

#### 示例数据

```js
true
```

## 导入已有 TOTP 密钥到 Authing
> 导入已有 TOTP 密钥到 Authing，并为用户启用 TOTP 多因素认证。适合场景：业务系统已有一套 MFA 系统，用户已经在原有系统绑定过 MFA，现在希望将用户的 MFA 认证器迁移到 Authing。

```js
managementClient.mfa.importTotp(userId, secret, recoveryCode)
```


#### 参数

- `userId` \<string\> 用户 ID
- `secret` \<string\> TOTP 密钥
- `recoveryCode` \<string\> 恢复代码，用户丢失 TOTP 时可以使用恢复代码登录

#### 示例

```javascript
managementClient.mfa.importTotp('USER_ID', 'SECRET', 'RECOVERY_CODE')
```

#### 示例数据

```json
{
    userId: '60ae0cf98370aa285819af72',
    enable: true,
    secret: 'XXXXXXXXXXXXX',
    authenticatorType: 'totp',
    recoveryCode: 'xxxx-xxxx-xxxx-xxxx-xxxx-xxxx',
    createdAt: '2021-05-26T09:53:37.268Z',
    updatedAt: '2021-05-26T09:53:37.268Z',
    id: '60ae1aa11d63d248ee25a895',
}
```
