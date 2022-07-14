# 更新身份源连接

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

更新身份源连接，可以设置身份源图标、是否只支持登录等。

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| fields | object | 是 | - | 身份源连接自定义参数（增量修改）。  | `{"clientId":"clientId"}` |
| displayName | string | 是 | - | 身份源连接显示名称。  | `exampleName` |
| id | string | 是 | - | 身份源连接 ID。  | `60b49eb83fd80adb96f26e68` |
| logo | string | 否 | - | 身份源连接的图标。  | `https://files.authing.co/authing-console/social-connections/icon_xiaochengxu@2x.png` |
| loginOnly | boolean | 否 | - | 是否只支持登录。  |  |


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
  const result = await managementClient.updateExtIdpConn({
    id: '60b49eb83fd80adb96f26e68',
    displayName: 'exampleName',
    fields: {
			"clientId":	"clientId"
		},
    logo: 'https://files.authing.co/authing-console/social-connections/icon_xiaochengxu@2x.png',
    loginOnly: false,
 });
})();
```



## 请求响应

类型： `ExtIdpConnDetailSingleRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#ExtIdpConnDetail">ExtIdpConnDetail</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "apiCode": 20001,
  "data": {
    "id": "60b49eb83fd80adb96f26e68",
    "type": "default",
    "logo": "https://files.authing.co/authing-console/social-connections/icon_xiaochengxu@2x.png",
    "identifier": "60b49eb83fd80adb96f26e68",
    "displayName": "登录页",
    "loginOnly": true,
    "associationMode": "challenge",
    "challengeBindingMethods": "[\"email-password\"]",
    "fields": "60b49eb83fd80adb96f26e68"
  }
}
```

## 数据结构


### <a id="ExtIdpConnDetail"></a> ExtIdpConnDetail

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| id | string | 是 | 身份源连接 id。 示例值： `60b49eb83fd80adb96f26e68`  |
| type | string | 是 | 身份源连接类型。 枚举值：`oidc`,`oauth`,`saml`,`ldap`,`ad`,`cas`,`azure-ad`,`alipay`,`facebook`,`twitter`,`google`,`wechat:pc`,`wechat:mobile`,`wechat:webpage-authorization`,`wechatmp-qrcode`,`wechat:miniprogram:default`,`wechat:miniprogram:qrconnect`,`wechat:miniprogram:app-launch`,`github`,`qq`,`wechatwork:corp:qrconnect`,`wechatwork:agency:qrconnect`,`wechatwork:service-provider:qrconnect`,`wechatwork:mobile`,`dingtalk`,`dingtalk:provider`,`weibo`,`apple`,`apple:web`,`baidu`,`lark-internal`,`lark-public`,`gitlab`,`linkedin`,`slack`,`yidun`,`qingcloud`,`gitee`,`instagram`,`welink`  |
| logo | string | 是 | 身份源图标。 示例值： `https://files.authing.co/authing-console/social-connections/icon_xiaochengxu@2x.png`  |
| identifier | string | 否 | 身份源连接标识。 示例值： `60b49eb83fd80adb96f26e68`  |
| displayName | string | 否 | 身份源连接在登录页的显示名称。 示例值： `登录页`  |
| loginOnly | boolean | 是 | 是否只支持登录。 示例值： `true`  |
| associationMode | string | 是 | 账号关联模式。 枚举值：`none`,`field`,`challenge`  |
| challengeBindingMethods | array | 是 | 账号绑定方式。 示例值： `["email-password"]`  |
| fields | object | 是 | 自定义参数。 示例值： `60b49eb83fd80adb96f26e68`  |


