# 获取资源被授权的主体

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

获取资源被授权的主体

## 请求参数

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:60px">默认值</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- | ---- | ---- | ---- | ---- | ---- |
| resource | string | 是 | - | 资源  | `ecs:1` |
| namespace | string | 否 | default | 权限分组  |  |
| targetType | string | 否 | - | 目标对象类型：<br>- `USER`: 用户<br>- `ROLE`: 角色<br>- `GROUP`: 分组<br>- `DEPARTMENT`: 部门<br>      | `USER` |
| page | number | 否 | 1 | 当前页数，从 1 开始  | `1` |
| limit | number | 否 | 10 | 每页数目，最大不能超过 50，默认为 10  | `10` |


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

$data = $management->getResourceAuthorizedTargets(array(
      "resource" => "ecs:1",
    "namespace" => "default",
    "targetType" => "USER",
    "page" => 1,
    "limit" => 10,

));
``` -->


## 请求响应

类型： `GetResourceAuthorizedTargetRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |
| data | <a href="#GetResourceAuthorizedTargetDataDto">GetResourceAuthorizedTargetDataDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "requestId": "934108e5-9fbf-4d24-8da1-c330328abd6c",
  "data": {
    "totalCount": 10,
    "list": {
      "targetType": "USER",
      "targetIdentifier": "code",
      "actions": "[\"ecs:Start\",\"ecs:Stop\"]"
    }
  }
}
```

## 数据结构


### <a id="GetResourceAuthorizedTargetDataDto"></a> GetResourceAuthorizedTargetDataDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| totalCount | number | 是 | 总数   |  `10` |
| list | array | 是 | 元素列表 嵌套类型：<a href="#ResourceAuthorizedTargetDto">ResourceAuthorizedTargetDto</a>。  |  |


### <a id="ResourceAuthorizedTargetDto"></a> ResourceAuthorizedTargetDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| targetType | string | 是 | 主体类型   | USER |
| targetIdentifier | string | 是 | 主体唯一标志符   |  `code` |
| actions | array | 是 | 操作列表   |  `["ecs:Start","ecs:Stop"]` |


