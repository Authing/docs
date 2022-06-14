# 强制下线用户

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

强制下线用户

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 |
| ---- | ---- | ---- | ---- | ---- |
| userId | string | 是 |  | 用户 ID。  |
| appIds | array | 是 |  | APP ID 集合。 示例值： `["62188e71cxxxx3075289c580"]` |


## 示例代码

```java

import cn.authing.core.mgmt.ManagementClient;

class ManagementClientTest {
    private static String ACCESS_Key_ID = "AUTHING_USERPOOL_ID";
    private static String ACCESS_KEY_SECRET = "AUTHING_USERPOOL_SECRET";

    public static void main(String[] args){
        ManagementClient managementClient = new ManagementClient(ACCESS_Key_ID, ACCESS_KEY_SECRET);
    
        managementClient.kickUsers(
          new KickUsersDto(
         "undefined" ,
         new List<String>("62188e71cxxxx3075289c580",) ,
        )
        ).execute();
    }
}
```



## 请求响应

类型： `IsSuccessRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#IsSuccessDto">IsSuccessDto</a> | 操作是否成功 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "apiCode": 20001,
  "data": {
    "success": true
  }
}
```

## 数据结构


### <a id="IsSuccessDto"></a> IsSuccessDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| success | boolean | 是 | 操作是否成功。 示例值： `true`  |


