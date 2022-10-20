# 获取密码强度和账号安全等级评分

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

获取用户的密码强度和账号安全等级评分，需要在请求头中带上用户的 `access_token`。

## 请求参数

| 名称 | 类型 | <div style="width:80px">是否必填</div> | 默认值 | <div style="width:300px">描述</div> | <div style="width:200px"></div>示例值</div> |
| ---- | ---- | ---- | ---- | ---- | ---- |


<!-- 暂时不显示示例代码 -->
<!-- ## 示例代码
```php
<?php

require 'vendor/autoload.php';

use Authing\ManagementClient;

$management = new ManagementClient(
    "AUTHING_USERPOOL_ID",
    "AUTHING_USERPOOL_SECRET"
);

$data = $management->getSecurityInfo(array(
  
));
``` -->

## 请求响应

类型： `GetSecurityInfoRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |
| data | <a href="#GetSecurityInfoDto">GetSecurityInfoDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "requestId": "934108e5-9fbf-4d24-8da1-c330328abd6c",
  "data": {}
}
```

## 数据结构


### <a id="GetSecurityInfoDto"></a> GetSecurityInfoDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| passwordSecurityLevel | number | 是 | 密码强度等级   |  |
| mfaEnrolled | boolean | 是 | 是否绑定了 MFA   |  |
| passwordSet | boolean | 是 | 是否设置了密码   |  |
| emailBinded | boolean | 是 | 是否绑定了邮箱   |  |
| phoneBinded | boolean | 是 | 是否绑定了手机号   |  |
| securityScore | number | 是 | 账号等级评分   |  |


