# 获取应用开启的外部身份源列表

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

获取应用开启的外部身份源列表，前端可以基于此渲染外部身份源按钮。

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |


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
  const result = await managementClient.getExtidps({
 });
})();
```



## 请求响应

类型： `GetExtIdpsRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |
| data | array | 外部身份源列表 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "requestId": "934108e5-9fbf-4d24-8da1-c330328abd6c",
  "data": {
    "identifier": "wechat"
  }
}
```

## 数据结构


### <a id="ExtIdpInfoDto"></a> ExtIdpInfoDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| identifier | string | 是 | 身份源连接唯一标志。  |  `wechat` |
| extIdpId | string | 是 | 身份源 ID。  |  |
| type | string | 是 | 身份源类型。  | 可选枚举值：`oidc`,`oauth2`,`saml`,`ldap`,`ad`,`cas`,`azure-ad`,`wechat`,`google`,`qq`,`wechatwork`,`dingtalk`,`weibo`,`github`,`alipay`,`apple`,`baidu`,`lark`,`gitlab`,`twitter`,`facebook`,`slack`,`linkedin`,`yidun`,`qingcloud`,`gitee`,`instagram`,`welink` |
| extIdpType | string | 是 | 认证类型。  | 可选枚举值：`social`,`enterprise` |
| bindUrl | string | 是 | 认证地址。  |  |
| name | string | 是 | 身份源显示名称。  |  |
| name_en | string | 否 | 身份源显示名称（英文）。  |  |
| desc | string | 否 | 描述。  |  |
| desc_en | string | 否 | 描述英文。  |  |
| logo | string | 否 | 图标。  |  |


