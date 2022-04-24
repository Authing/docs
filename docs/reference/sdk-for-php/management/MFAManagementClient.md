---
meta:
  - name: description
    content: 管理 MFA
---

# 管理 MFA

<LastUpdated/>

此模块主要用来管理 MFA 相关操作。

请使用以下方式使用该模块：

```php
use Authing\Mgmt\ManagementClient;

$manageClient = new ManagementClient('YOUR_USERPOOL_ID', 'YOUR_USERPOOL_SECRET');

$mfaManagementClient = $managementClient->mfa();
$mfaManagementClient->getStatus(USER_ID); // 用户 MFA 绑定状态
```

## 获取用户 MFA 绑定状态

MfaManagementClient->getStatus(string $userId);

获取用户 MFA 绑定状态

#### 参数

- `userId` \<string\> 用户 ID

#### 示例

```php
$mfaManagementClient->getStatus(string $userId);
```

#### 示例数据

```json
{
  "FACE": true,
  "OTP": false
}
```

## 解绑用户 MFA

MfaManagementClient->unAssociateMfa(string $userId, string $mfaType);

解绑用户 MFA

#### 参数

- `userId` \<string\> 用户 ID
- `mfaType` \<string\> 解绑类型，可选值为 `FACE`, `OTP`

#### 示例

```php
$mfaManagementClient->unAssociateMfa(USER_ID, 'OTP');
```

#### 示例数据

```json
true
```
