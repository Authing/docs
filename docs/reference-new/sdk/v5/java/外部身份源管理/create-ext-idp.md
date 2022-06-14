# 创建身份源

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

创建身份源

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 |
| ---- | ---- | ---- | ---- | ---- |
| name | string | 是 |  | 身份源名称。 示例值： `exampleName` |
| type | string | 是 |  | 身份源连接类型。 枚举值：`oidc`,`oauth2`,`saml`,`ldap`,`ad`,`cas`,`azure-ad`,`wechat`,`google`,`qq`,`wechatwork`,`dingtalk`,`weibo`,`github`,`alipay`,`apple`,`baidu`,`lark`,`gitlab`,`twitter`,`facebook`,`slack`,`linkedin`,`yidun`,`qingcloud`,`gitee`,`instagram`,`welink` |
| tenantId | string | 否 |  | 租户 ID。 示例值： `60b49eb83fd80adb96f26e68` |


## 示例代码

```java

import cn.authing.core.mgmt.ManagementClient;

class ManagementClientTest {
    private static String ACCESS_Key_ID = "AUTHING_USERPOOL_ID";
    private static String ACCESS_KEY_SECRET = "AUTHING_USERPOOL_SECRET";

    public static void main(String[] args){
        ManagementClient managementClient = new ManagementClient(ACCESS_Key_ID, ACCESS_KEY_SECRET);
    
        managementClient.createExtIdp(
          new CreateExtIdpDto(
         "exampleName" ,
         CreateExtIdpDto.type.AD ,
         "60b49eb83fd80adb96f26e68" ,
        )
        ).execute();
    }
}
```



## 请求响应

类型： `ExtIdpSingleRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#ExtIdpDto">ExtIdpDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "apiCode": 20001,
  "data": {
    "id": "60b49eb83fd80adb96f26e68",
    "name": "default",
    "tenantId": "60b49eb83fd80adb96f26e68",
    "type": "wechat"
  }
}
```

## 数据结构


### <a id="ExtIdpDto"></a> ExtIdpDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| id | string | 是 | 身份源 id。 示例值： `60b49eb83fd80adb96f26e68`  |
| name | string | 是 | 身份源名称。 示例值： `default`  |
| tenantId | string | 否 | 租户 ID。 示例值： `60b49eb83fd80adb96f26e68`  |
| type | string | 是 | 身份源类型。 示例值： `wechat`  |


