# 使用用户凭证登录

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />


此端点为基于直接 API 调用形式的登录端点，适用于你需要自建登录页面的场景。**此端点暂时不支持 MFA、信息补全、首次密码重置等流程，如有需要，请使用 OIDC 标准协议认证端点。**


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
| connection | string | 是 | - | 认证方式：
- `PASSWORD`: 使用密码方式进行认证。
- `PASSCODE`: 使用一次性临时验证码进行认证。
- `LDAP`: 基于 LDAP 用户目录进行认证。
- `AD`: 基于 Windows AD 用户目录进行认证。
    。  枚举值：`PASSWORD`,`PASSCODE`,`LDAP`,`AD` | `PASSWORD` |
| passwordPayload | <a href="#AuthenticateByPasswordDto">AuthenticateByPasswordDto</a> | 否 | - | 当认证方式为 `PASSWORD` 时此参数必填。。   | `{"email":"test@example.com","password":"passw0rd"}` |
| passCodePayload | <a href="#AuthenticateByPassCodeDto">AuthenticateByPassCodeDto</a> | 否 | - | 当认证方式为 `PASSCODE` 时此参数必填。   | `{"email":"test@example.com","passCode":"passw0rd"}` |
| adPayload | <a href="#AuthenticateByADDto">AuthenticateByADDto</a> | 否 | - | 当认证方式为 `AD` 时此参数必填。   | `{"sAMAccountName":"test","password":"passw0rd"}` |
| ldapPayload | <a href="#AuthenticateByLDAPDto">AuthenticateByLDAPDto</a> | 否 | - | 当认证方式为 `LDAP` 时此参数必填。   | `{"sAMAccountName":"test","password":"passw0rd"}` |
| options | <a href="#SignInOptionsDto">SignInOptionsDto</a> | 否 | - | 可选参数。   | `{"passwordEncryptType":"none"}` |
| client_id | string | 否 | - | 应用 ID。当应用的「换取 token 身份验证方式」配置为 `client_secret_post` 需要传。。   | `6342b8537axxxx047d314109` |
| client_secret | string | 否 | - | 应用密钥。当应用的「换取 token 身份验证方式」配置为 `client_secret_post` 需要传。。   | `4203d30e5e915xxxxxx26c31c9adce68` |


## 示例代码

```csharp

using Authing.CSharp.SDK.Models;
using Authing.CSharp.SDK.Services;
using Authing.CSharp.SDK.Utils;
using Authing.CSharp.SDK.UtilsImpl;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Example
{
    class Program
    {
      private static ManagementClientOptions options;
      private static string ACCESS_Key_ID = "AUTHING_USERPOOL_ID";
      private static string ACCESS_KEY_SECRET = "AUTHING_USERPOOL_SECRET";

      static void Main(string[] args)
      {
          MainAsync().GetAwaiter().GetResult();
      }

      private static async Task MainAsync()
      {
          options = new ManagementClientOptions()
          {
              AccessKeyId = ACCESS_Key_ID,
              AccessKeySecret = ACCESS_KEY_SECRET,
          };

          ManagementClient managementClient = new ManagementClient(options);
        
          LoginTokenRespDto  result = await managementClient.Signin
          (  new SigninByCredentialsDto{                  Connection= SigninByCredentialsDto.connection.PASSWORD ,
                PasswordPayload= new AuthenticateByPasswordDto
                {
                          Password= "passw0rd" ,
          Account= "test" ,
          Email= "test@example.com" ,
          Username= "test" ,
          Phone= "188xxxx8888" ,
        },
                PassCodePayload= new AuthenticateByPassCodeDto
                {
                          PassCode= "123456" ,
          Email= "114114" ,
          Phone= "188xxxx8888" ,
          PhoneCountryCode= "+86" ,
        },
                AdPayload= new AuthenticateByADDto
                {
                          Password= "passw0rd" ,
          SAMAccountName= "test" ,
        },
                LdapPayload= new AuthenticateByLDAPDto
                {
                          Password= "passw0rd" ,
          SAMAccountName= "114114" ,
        },
                Options= new SignInOptionsDto
                {
                          Scope= "openid profile" ,
          ClientIp= "192.168.0.1" ,
          Context= new SignInOptionsDto{    source="utm",} ,
          TenantId= "625783d629f2bd1f5ddddd98c" ,
          CustomData= new SignInOptionsDto{    school="pku",    age="20",} ,
          AutoRegister= false ,
          CaptchaCode= a8nz ,
          PasswordEncryptType= SignInOptionsDto.passwordEncryptType.NONE ,
        },
                  Client_id= "6342b8537axxxx047d314109" ,
                  Client_secret= "4203d30e5e915xxxxxx26c31c9adce68" ,
            }
          );
        }
    }
}

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


### <a id="AuthenticateByPasswordDto"></a> AuthenticateByPasswordDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| password | string | 是 | 用户密码，默认不加密。Authing 所有 API 均通过 HTTPS 协议对密码进行安全传输，可以在一定程度上保证安全性。<br>如果你还需要更高级别的安全性，我们还支持 `RSA256` 和国密 `SM2` 的密码加密方式。详情见可选参数 `options.passwordEncryptType`。<br>。  |  `passw0rd` |
| account | string | 否 | 用户账号（用户名/手机号/邮箱）。  |  `test` |
| email | string | 否 | 邮箱，不区分大小写。。  |  `test@example.com` |
| username | string | 否 | 用户名（username）。  |  `test` |
| phone | string | 否 | 手机号。  |  `188xxxx8888` |


### <a id="AuthenticateByPassCodeDto"></a> AuthenticateByPassCodeDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| passCode | string | 是 | 一次性临时验证码，你需要先调用发送短信或者发送邮件接口获取验证码。。  |  `123456` |
| email | string | 否 | 邮箱，不区分大小写。。  |  `114114` |
| phone | string | 否 | 手机号。  |  `188xxxx8888` |
| phoneCountryCode | string | 否 | 手机区号，中国大陆手机号可不填。Authing 短信服务暂不内置支持国际手机号，你需要在 Authing 控制台配置对应的国际短信服务。完整的手机区号列表可参阅 https://en.wikipedia.org/wiki/List_of_country_calling_codes。。  |  `+86` |


### <a id="AuthenticateByADDto"></a> AuthenticateByADDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| password | string | 是 | 用户密码，默认不加密。Authing 所有 API 均通过 HTTPS 协议对密码进行安全传输，可以在一定程度上保证安全性。<br>如果你还需要更高级别的安全性，我们还支持 `RSA256` 和国密 `SM2` 的密码加密方式。详情见可选参数 `options.passwordEncryptType`。<br>。  |  `passw0rd` |
| sAMAccountName | string | 是 | Windows AD 用户目录中账号的 sAMAccountName。  |  `test` |


### <a id="AuthenticateByLDAPDto"></a> AuthenticateByLDAPDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| password | string | 是 | 用户密码，默认不加密。Authing 所有 API 均通过 HTTPS 协议对密码进行安全传输，可以在一定程度上保证安全性。<br>如果你还需要更高级别的安全性，我们还支持 `RSA256` 和国密 `SM2` 的密码加密方式。详情见可选参数 `options.passwordEncryptType`。<br>。  |  `passw0rd` |
| sAMAccountName | string | 是 | LDAP AD 用户目录中账号的 sAMAccountName。  |  `114114` |


### <a id="SignInOptionsDto"></a> SignInOptionsDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| scope | string | 否 | 需要请求的权限，必须包含 openid。如果需要获取手机号和 email 需要包含 phone email；如果需要 refresh_token 需要包含 offline_access。多个 scope 请用空格分隔。id_token 解码后的内容中会包含这些 scope 对应的用户信息相关的字段。<br>- `openid`: 必须包含。<br>- `profile`: 返回 birthdate，family_name，gender，given_name，locale，middle_name，name，nickname，picture，preferred_username，profile，updated_at，website，zoneinfo 字段。<br>- `username`: 返回 username。<br>- `email`: 返回 email，email_verified。<br>- `phone`: 返回 phone_number, phone_number_verified。<br>- `offline_access`: 如果存在此参数，token 接口会返回 refresh_token 字段。<br>- `roles`: 返回用户的角色列表。<br>- `external_id`: 用户在原有系统的用户 ID。<br>- `extended_fields`: 返回用户的扩展字段信息，内容为一个对象，key 为扩展字段名，value 为扩展字段值。<br>- `tenant_id`: 返回用户的租户 ID。<br>      。  |  `openid profile` |
| clientIp | string | 否 | 客户端真实 IP 地址。默认情况下，Authing 会将请求来源的 IP 识别为用户登录的 IP 地址，如果你在后端服务器中调用此接口，需要将此 IP 设置为用户的真实请求 IP。。  |  `192.168.0.1` |
| context | string | 否 | 额外请求上下文，将会传递到认证前和认证后的 [Pipeline](https://docs.authing.cn/v2/guides/pipeline/) 的 `context` 对象中。了解[如何在 Pipeline 的 `context` 参数中获取传入的额外 context](https://docs.authing.cn/v2/guides/pipeline/context-object.html)。。  |  `{"source":"utm"}` |
| tenantId | string | 否 | 租户 ID。  |  `625783d629f2bd1f5ddddd98c` |
| customData | object | 否 | 设置额外的用户自定义数据，你需要先在 Authing 控制台[配置自定义数据](https://docs.authing.cn/v2/guides/users/user-defined-field/)。。  |  `{"school":"pku","age":"20"}` |
| autoRegister | boolean | 否 | 是否开启自动注册。如果设置为 true，当用户不存在的时候，会先自动为其创建一个账号。。  |  |
| captchaCode | boolean | 否 | Captcha 图形验证码，不区分大小写。当**安全策略**设置为**验证码**且触发**登录失败次数限制**时，下次登录需要填写图形验证码。。  |  `a8nz` |
| passwordEncryptType | string | 否 | 密码加密类型，支持 sm2 和 rsa。默认可以不加密。<br>- `none`: 不对密码进行加密，使用明文进行传输。<br>- `rsa`: 使用 RSA256 算法对密码进行加密，需要使用 Authing 服务的 RSA 公钥进行加密，请阅读**介绍**部分了解如何获取 Authing 服务的 RSA256 公钥。<br>- `sm2`: 使用 [国密 SM2 算法](https://baike.baidu.com/item/SM2/15081831) 对密码进行加密，需要使用 Authing 服务的 SM2 公钥进行加密，请阅读**介绍**部分了解如何获取 Authing 服务的 SM2 公钥。<br>    。  | 可选枚举值：`sm2`,`rsa`,`none` |


### <a id="LoginTokenResponseDataDto"></a> LoginTokenResponseDataDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| access_token | string | 否 | 接口调用凭据，在限制时间内被授权访问资源 API。  |  `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InIxTGtiQm8zOTI1UmIyWkZGckt5VTNNVmV4OVQyODE3S3gwdmJpNmlfS2MifQ.eyJqdGkiOiJ4R01uczd5cmNFckxiakNRVW9US1MiLCJzdWIiOiI1YzlmNzVjN2NjZjg3YjA1YTkyMWU5YjAiLCJpc3MiOiJodHRwczovL2F1dGhpbmcuY24iLCJpYXQiOjE1NTQ1Mzc4NjksImV4cCI6MTU1NDU0MTQ2OSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBvZmZsaW5lX2FjY2VzcyBwaG9uZSBlbWFpbCIsImF1ZCI6IjVjYTc2NWUzOTMxOTRkNTg5MWRiMTkyNyJ9.wX05OAgYuXeYM7zCxhrkvTO_taqxrCTG_L2ImDmQjMml6E3GXjYA9EFK0NfWquUI2mdSMAqohX-ndffN0fa5cChdcMJEm3XS9tt6-_zzhoOojK-q9MHF7huZg4O1587xhSofxs-KS7BeYxEHKn_10tAkjEIo9QtYUE7zD7JXwGUsvfMMjOqEVW6KuY3ZOmIq_ncKlB4jvbdrduxy1pbky_kvzHWlE9El_N5qveQXyuvNZVMSIEpw8_y5iSxPxKfrVwGY7hBaF40Oph-d2PO7AzKvxEVMamzLvMGBMaRAP_WttBPAUSqTU5uMXwMafryhGdIcQVsDPcGNgMX6E1jzLA` |
| id_token | string | 否 | 用户的身份凭证，解析后会包含用户信息。  |  `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InIxTGtiQm8zOTI1UmIyWkZGckt5VTNNVmV4OVQyODE3S3gwdmJpNmlfS2MifQ.eyJzdWIiOiI1YzlmNzVjN2NjZjg3YjA1YTkyMWU5YjAiLCJub25jZSI6IjIyMTIxIiwiYXRfaGFzaCI6Ik5kbW9iZVBZOEFFaWQ2T216MzIyOXciLCJzaWQiOiI1ODM2NzllNC1lYWM5LTRjNDEtOGQxMS1jZWFkMmE5OWQzZWIiLCJhdWQiOiI1Y2E3NjVlMzkzMTk0ZDU4OTFkYjE5MjciLCJleHAiOjE1NTQ1NDE0NjksImlhdCI6MTU1NDUzNzg2OSwiaXNzIjoiaHR0cHM6Ly9hdXRoaW5nLmNuIn0.IQi5FRHO756e_eAmdAs3OnFMU7QuP-XtrbwCZC1gJntevYJTltEg1CLkG7eVhdi_g5MJV1c0pNZ_xHmwS0R-E4lAXcc1QveYKptnMroKpBWs5mXwoOiqbrjKEmLMaPgRzCOdLiSdoZuQNw_z-gVhFiMNxI055TyFJdXTNtExt1O3KmwqanPNUi6XyW43bUl29v_kAvKgiOB28f3I0fB4EsiZjxp1uxHQBaDeBMSPaRVWQJcIjAJ9JLgkaDt1j7HZ2a1daWZ4HPzifDuDfi6_Ob1ZL40tWEC7xdxHlCEWJ4pUIsDjvScdQsez9aV_xMwumw3X4tgUIxFOCNVEvr73Fg` |
| refresh_token | string | 否 | refresh_token 用于获取新的 AccessToken。  |  `WPsGJbvpBjqXz6IJIr1UHKyrdVF` |
| token_type | string | 是 | token 类型。  |  `xxx` |
| expire_in | number | 是 | 过期时间 单位是秒。  |  `7200` |


