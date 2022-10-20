# 使用移动端社会化登录

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />


此端点为移动端社会化登录接口，使用第三方移动社会化登录返回的临时凭证登录，并换取用户的 `id_token` 和 `access_token`。请先阅读相应社会化登录的接入流程。


注意事项：取决于你在 Authing 创建应用时选择的**应用类型**和应用配置的**换取 token 身份验证方式**，在调用此接口时需要对客户端的身份进行不同形式的验证。

<details>
<summary>点击展开详情</summary>

<br>

你可以在 [Authing 控制台](https://console.authing.cn) 的**应用** - **自建应用** - **应用详情** - **应用配置** - **其他设置** - **授权配置**
中找到**换取 token 身份验证方式** 配置项：

> 单页 Web 应用和客户端应用隐藏，默认为 `none`，不允许修改；后端应用和标准 Web 应用可以修改此配置项。

![](https://files.authing.co/api-explorer/tokenAuthMethod.jpg)

#### 换取 token 身份验证方式为 none 时

调用此接口不需要进行额外操作。

#### 换取 token 身份验证方式为 client_secret_post 时

调用此接口时必须在 body 中传递 `client_id` 和 `client_secret` 参数，作为验证客户端身份的条件。其中 `client_id` 为应用 ID、`client_secret` 为应用密钥。

#### 换取 token 身份验证方式为 client_secret_basic 时

调用此接口时必须在 HTTP 请求头中携带 `authorization` 请求头，作为验证客户端身份的条件。`authorization` 请求头的格式如下（其中 `client_id` 为应用 ID、`client_secret` 为应用密钥。）：

```
Basic base64(<client_id>:<client_secret>)
```

结果示例：

```
Basic NjA2M2ZiMmYzY3h4eHg2ZGY1NWYzOWViOjJmZTdjODdhODFmODY3eHh4eDAzMjRkZjEyZGFlZGM3
```

JS 代码示例：

```js
'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64');
```

</details>

  

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| extIdpConnidentifier | string | 是 | - | 外部身份源连接标志符。   | `wework` |
| connection | string | 是 | - | 移动端社会化登录类型：
- `wechat`: 微信移动应用
- `alipay`: 支付宝移动应用
- `wechatwork`: 企业微信移动应用
- `wechatwork_agency`: 企业微信移动应用（代开发模式）
- `lark_internal`: 飞书移动端企业自建应用
- `lark_public`: 飞书移动端应用商店应用
- `yidun`: 网易易盾一键登录
- `wechat_mini_program_code`: 微信小程序使用 code 登录
- `wechat_mini_program_phone `: 微信小程序使用手机号登录
。  枚举值：`wechat`,`alipay`,`wechatwork`,`wechatwork_agency`,`lark_internal`,`lark_public`,`yidun`,`wechat_mini_program_code`,`wechat_mini_program_phone` | `wechat` |
| wechatPayload | <a href="#AuthenticateByWechatDto">AuthenticateByWechatDto</a> | 否 | - | 微信移动端社会化登录数据，当 `connection` 为 `wechat` 的时候必填。   |  |
| alipayPayload | <a href="#AuthenticateByAlipayDto">AuthenticateByAlipayDto</a> | 否 | - | 支付宝移动端社会化登录数据，当 `connection` 为 `alipay` 的时候必填。   |  |
| wechatworkPayload | <a href="#AuthenticateByWechatworkDto">AuthenticateByWechatworkDto</a> | 否 | - | 企业微信移动端社会化登录数据，当 `connection` 为 `wechatwork` 的时候必填。   |  |
| wechatworkAgencyPayload | <a href="#AuthenticateByWechatworkAgencyDto">AuthenticateByWechatworkAgencyDto</a> | 否 | - | 企业微信（代开发模式）移动端社会化登录数据，当 `connection` 为 `wechatwork_agency` 的时候必填。   |  |
| larkPublicPayload | <a href="#AuthenticateByLarkPublicDto">AuthenticateByLarkPublicDto</a> | 否 | - | 飞书应用商店应用移动端社会化登录数据，当 `connection` 为 `lark_public` 的时候必填。   |  |
| larkInternalPayload | <a href="#AuthenticateByLarkInternalDto">AuthenticateByLarkInternalDto</a> | 否 | - | 飞书应用商店应用移动端社会化登录数据，当 `connection` 为 `lark_internal` 的时候必填。   |  |
| yidunPayload | <a href="#AuthenticateByYidunDto">AuthenticateByYidunDto</a> | 否 | - | 网易易盾移动端社会化登录数据，当 `connection` 为 `yidun` 的时候必填。   |  |
| wechatMiniProgramCodePayload | <a href="#AuthenticateByWechatMiniProgramCodeDto">AuthenticateByWechatMiniProgramCodeDto</a> | 否 | - | 网易易盾移动端社会化登录数据，当 `connection` 为 `wechat_mini_program_code` 的时候必填。   |  |
| wechatMiniProgramPhonePayload | <a href="#AuthenticateByWechatMiniProgramPhoneDto">AuthenticateByWechatMiniProgramPhoneDto</a> | 否 | - | 网易易盾移动端社会化登录数据，当 `connection` 为 `wechat_mini_program_phone` 的时候必填。   |  |
| options | <a href="#SignInByMobileOptionsDto">SignInByMobileOptionsDto</a> | 否 | - | 可选参数。   |  |
| client_id | string | 否 | - | 应用 ID。当应用的「换取 token 身份验证方式」配置为 `client_secret_post` 需要传。。   | `6342b8537axxxx047d314109` |
| client_secret | string | 否 | - | 应用密钥。当应用的「换取 token 身份验证方式」配置为 `client_secret_post` 需要传。。   | `4203d30e5e915xxxxxx26c31c9adce68` |


## 示例代码

```ts
import { ManagementClient } from 'authing-node-sdk';
// 在 Node.js 中引用：
// const { ManagementClient } = require('authing-node-sdk');

const managementClient = new ManagementClient({
  accessKeyId: 'AUTHING_USERPOOL_ID',
  accessKeySecret: 'AUTHING_USERPOOL_SECRET',
});

(async () => {
  const result = await managementClient.signinByMobile({
    connection: 'wechat',
    extIdpConnidentifier: 'wework',
    wechatPayload: {
          code: '1660291866076',
    },
    alipayPayload: {
          code: '1660291866076',
    },
    wechatworkPayload: {
          code: '1660291866076',
    },
    wechatworkAgencyPayload: {
          code: '1660291866076',
    },
    larkPublicPayload: {
          code: '1660291866076',
    },
    larkInternalPayload: {
          code: '1660291866076',
    },
    yidunPayload: {
          token: '1660291866076',
        accessToken: '1660291866076',
    },
    wechatMiniProgramCodePayload: {
          encryptedData: '',
        iv: '',
        code: '',
    },
    wechatMiniProgramPhonePayload: {
          encryptedData: '',
        iv: '',
        code: '',
    },
    options: {
          scope: 'openid profile',
        context: '{
			"source":	"utm"
		}',
        tenantId: '625783d629f2bd1f5ddddd98c',
        customData: {
			"school":	"pku",
			"age":	"20"
		},
    },
    client_id: '6342b8537axxxx047d314109',
    client_secret: '4203d30e5e915xxxxxx26c31c9adce68',
 });
})();
```



## 请求响应

类型： `LoginTokenRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |
| data | <a href="#LoginTokenResponseDataDto">LoginTokenResponseDataDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "requestId": "934108e5-9fbf-4d24-8da1-c330328abd6c",
  "data": {
    "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InIxTGtiQm8zOTI1UmIyWkZGckt5VTNNVmV4OVQyODE3S3gwdmJpNmlfS2MifQ.eyJqdGkiOiJ4R01uczd5cmNFckxiakNRVW9US1MiLCJzdWIiOiI1YzlmNzVjN2NjZjg3YjA1YTkyMWU5YjAiLCJpc3MiOiJodHRwczovL2F1dGhpbmcuY24iLCJpYXQiOjE1NTQ1Mzc4NjksImV4cCI6MTU1NDU0MTQ2OSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBvZmZsaW5lX2FjY2VzcyBwaG9uZSBlbWFpbCIsImF1ZCI6IjVjYTc2NWUzOTMxOTRkNTg5MWRiMTkyNyJ9.wX05OAgYuXeYM7zCxhrkvTO_taqxrCTG_L2ImDmQjMml6E3GXjYA9EFK0NfWquUI2mdSMAqohX-ndffN0fa5cChdcMJEm3XS9tt6-_zzhoOojK-q9MHF7huZg4O1587xhSofxs-KS7BeYxEHKn_10tAkjEIo9QtYUE7zD7JXwGUsvfMMjOqEVW6KuY3ZOmIq_ncKlB4jvbdrduxy1pbky_kvzHWlE9El_N5qveQXyuvNZVMSIEpw8_y5iSxPxKfrVwGY7hBaF40Oph-d2PO7AzKvxEVMamzLvMGBMaRAP_WttBPAUSqTU5uMXwMafryhGdIcQVsDPcGNgMX6E1jzLA",
    "id_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InIxTGtiQm8zOTI1UmIyWkZGckt5VTNNVmV4OVQyODE3S3gwdmJpNmlfS2MifQ.eyJzdWIiOiI1YzlmNzVjN2NjZjg3YjA1YTkyMWU5YjAiLCJub25jZSI6IjIyMTIxIiwiYXRfaGFzaCI6Ik5kbW9iZVBZOEFFaWQ2T216MzIyOXciLCJzaWQiOiI1ODM2NzllNC1lYWM5LTRjNDEtOGQxMS1jZWFkMmE5OWQzZWIiLCJhdWQiOiI1Y2E3NjVlMzkzMTk0ZDU4OTFkYjE5MjciLCJleHAiOjE1NTQ1NDE0NjksImlhdCI6MTU1NDUzNzg2OSwiaXNzIjoiaHR0cHM6Ly9hdXRoaW5nLmNuIn0.IQi5FRHO756e_eAmdAs3OnFMU7QuP-XtrbwCZC1gJntevYJTltEg1CLkG7eVhdi_g5MJV1c0pNZ_xHmwS0R-E4lAXcc1QveYKptnMroKpBWs5mXwoOiqbrjKEmLMaPgRzCOdLiSdoZuQNw_z-gVhFiMNxI055TyFJdXTNtExt1O3KmwqanPNUi6XyW43bUl29v_kAvKgiOB28f3I0fB4EsiZjxp1uxHQBaDeBMSPaRVWQJcIjAJ9JLgkaDt1j7HZ2a1daWZ4HPzifDuDfi6_Ob1ZL40tWEC7xdxHlCEWJ4pUIsDjvScdQsez9aV_xMwumw3X4tgUIxFOCNVEvr73Fg",
    "refresh_token": "WPsGJbvpBjqXz6IJIr1UHKyrdVF",
    "token_type": "xxx",
    "expire_in": 7200
  }
}
```

## 数据结构


### <a id="AuthenticateByWechatDto"></a> AuthenticateByWechatDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| code | string | 否 | 微信移动端社会化登录返回的一次性临时 code。  |  `1660291866076` |


### <a id="AuthenticateByAlipayDto"></a> AuthenticateByAlipayDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| code | string | 否 | 支付宝移动端社会化登录返回的一次性临时 code。  |  `1660291866076` |


### <a id="AuthenticateByWechatworkDto"></a> AuthenticateByWechatworkDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| code | string | 否 | 企业微信移动端社会化登录返回的一次性临时 code。  |  `1660291866076` |


### <a id="AuthenticateByWechatworkAgencyDto"></a> AuthenticateByWechatworkAgencyDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| code | string | 否 | 企业微信（代开发模式）移动端社会化登录返回的一次性临时 code。  |  `1660291866076` |


### <a id="AuthenticateByLarkPublicDto"></a> AuthenticateByLarkPublicDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| code | string | 否 | 飞书应用商店应用移动端社会化登录返回的一次性临时 code。  |  `1660291866076` |


### <a id="AuthenticateByLarkInternalDto"></a> AuthenticateByLarkInternalDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| code | string | 否 | 飞书自建应用移动端社会化登录返回的一次性临时 code。  |  `1660291866076` |


### <a id="AuthenticateByYidunDto"></a> AuthenticateByYidunDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| token | string | 否 | 网易易盾 token。  |  `1660291866076` |
| accessToken | string | 否 | 网易易盾运营商授权码。  |  `1660291866076` |


### <a id="AuthenticateByWechatMiniProgramCodeDto"></a> AuthenticateByWechatMiniProgramCodeDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| encryptedData | string | 是 | 获取微信开放数据返回的加密数据（encryptedData）。  |  |
| iv | string | 是 | 对称解密算法初始向量，由微信返回。  |  |
| code | string | 是 | `wx.login` 接口返回的用户 `code`。  |  |


### <a id="AuthenticateByWechatMiniProgramPhoneDto"></a> AuthenticateByWechatMiniProgramPhoneDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| encryptedData | string | 是 | 获取微信开放数据返回的加密数据（encryptedData）。  |  |
| iv | string | 是 | 对称解密算法初始向量，由微信返回。  |  |
| code | string | 是 | `wx.login` 接口返回的用户 `code`。  |  |


### <a id="SignInByMobileOptionsDto"></a> SignInByMobileOptionsDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| scope | string | 否 | 需要请求的权限，必须包含 openid。如果需要获取手机号和 email 需要包含 phone email；如果需要 refresh_token 需要包含 offline_access。多个 scope 请用空格分隔。id_token 解码后的内容中会包含这些 scope 对应的用户信息相关的字段。<br>- `openid`: 必须包含。<br>- `profile`: 返回 birthdate，family_name，gender，given_name，locale，middle_name，name，nickname，picture，preferred_username，profile，updated_at，website，zoneinfo 字段。<br>- `username`: 返回 username。<br>- `email`: 返回 email，email_verified。<br>- `phone`: 返回 phone_number, phone_number_verified。<br>- `offline_access`: 如果存在此参数，token 接口会返回 refresh_token 字段。<br>- `roles`: 返回用户的角色列表。<br>- `external_id`: 用户在原有系统的用户 ID。<br>- `extended_fields`: 返回用户的扩展字段信息，内容为一个对象，key 为扩展字段名，value 为扩展字段值。<br>- `tenant_id`: 返回用户的租户 ID。<br>      。  |  `openid profile` |
| context | string | 否 | 额外请求上下文，将会传递到认证前和认证后的 [Pipeline](https://docs.authing.cn/v2/guides/pipeline/) 的 `context` 对象中。了解[如何在 Pipeline 的 `context` 参数中获取传入的额外 context](https://docs.authing.cn/v2/guides/pipeline/context-object.html)。。  |  `{"source":"utm"}` |
| tenantId | string | 否 | 租户 ID。  |  `625783d629f2bd1f5ddddd98c` |
| customData | object | 否 | 设置额外的用户自定义数据，你需要先在 Authing 控制台[配置自定义数据](https://docs.authing.cn/v2/guides/users/user-defined-field/)。。  |  `{"school":"pku","age":"20"}` |


### <a id="LoginTokenResponseDataDto"></a> LoginTokenResponseDataDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| access_token | string | 否 | 接口调用凭据，在限制时间内被授权访问资源 API。  |  `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InIxTGtiQm8zOTI1UmIyWkZGckt5VTNNVmV4OVQyODE3S3gwdmJpNmlfS2MifQ.eyJqdGkiOiJ4R01uczd5cmNFckxiakNRVW9US1MiLCJzdWIiOiI1YzlmNzVjN2NjZjg3YjA1YTkyMWU5YjAiLCJpc3MiOiJodHRwczovL2F1dGhpbmcuY24iLCJpYXQiOjE1NTQ1Mzc4NjksImV4cCI6MTU1NDU0MTQ2OSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBvZmZsaW5lX2FjY2VzcyBwaG9uZSBlbWFpbCIsImF1ZCI6IjVjYTc2NWUzOTMxOTRkNTg5MWRiMTkyNyJ9.wX05OAgYuXeYM7zCxhrkvTO_taqxrCTG_L2ImDmQjMml6E3GXjYA9EFK0NfWquUI2mdSMAqohX-ndffN0fa5cChdcMJEm3XS9tt6-_zzhoOojK-q9MHF7huZg4O1587xhSofxs-KS7BeYxEHKn_10tAkjEIo9QtYUE7zD7JXwGUsvfMMjOqEVW6KuY3ZOmIq_ncKlB4jvbdrduxy1pbky_kvzHWlE9El_N5qveQXyuvNZVMSIEpw8_y5iSxPxKfrVwGY7hBaF40Oph-d2PO7AzKvxEVMamzLvMGBMaRAP_WttBPAUSqTU5uMXwMafryhGdIcQVsDPcGNgMX6E1jzLA` |
| id_token | string | 否 | 用户的身份凭证，解析后会包含用户信息。  |  `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InIxTGtiQm8zOTI1UmIyWkZGckt5VTNNVmV4OVQyODE3S3gwdmJpNmlfS2MifQ.eyJzdWIiOiI1YzlmNzVjN2NjZjg3YjA1YTkyMWU5YjAiLCJub25jZSI6IjIyMTIxIiwiYXRfaGFzaCI6Ik5kbW9iZVBZOEFFaWQ2T216MzIyOXciLCJzaWQiOiI1ODM2NzllNC1lYWM5LTRjNDEtOGQxMS1jZWFkMmE5OWQzZWIiLCJhdWQiOiI1Y2E3NjVlMzkzMTk0ZDU4OTFkYjE5MjciLCJleHAiOjE1NTQ1NDE0NjksImlhdCI6MTU1NDUzNzg2OSwiaXNzIjoiaHR0cHM6Ly9hdXRoaW5nLmNuIn0.IQi5FRHO756e_eAmdAs3OnFMU7QuP-XtrbwCZC1gJntevYJTltEg1CLkG7eVhdi_g5MJV1c0pNZ_xHmwS0R-E4lAXcc1QveYKptnMroKpBWs5mXwoOiqbrjKEmLMaPgRzCOdLiSdoZuQNw_z-gVhFiMNxI055TyFJdXTNtExt1O3KmwqanPNUi6XyW43bUl29v_kAvKgiOB28f3I0fB4EsiZjxp1uxHQBaDeBMSPaRVWQJcIjAJ9JLgkaDt1j7HZ2a1daWZ4HPzifDuDfi6_Ob1ZL40tWEC7xdxHlCEWJ4pUIsDjvScdQsez9aV_xMwumw3X4tgUIxFOCNVEvr73Fg` |
| refresh_token | string | 否 | refresh_token 用于获取新的 AccessToken。  |  `WPsGJbvpBjqXz6IJIr1UHKyrdVF` |
| token_type | string | 是 | token 类型。  |  `xxx` |
| expire_in | number | 是 | 过期时间 单位是秒。  |  `7200` |


