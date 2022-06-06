# 获取用户被授权的所有资源

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

获取用户被授权的所有资源，用户被授权的资源是用户自身被授予、通过分组继承、通过角色继承、通过组织机构继承的集合

## 请求参数

| 名称 | 位置 | 类型 | 必填 | 默认值 | 描述 |
| ---- | --- | ---- | ---- | ---- | ---- |
| userId | query | string  | \* |  | 用户 ID。 示例值： `6229ffaxxxxxxxxcade3e3d9` |
| namespace | query | string  |  |  | 所属权限分组的 code。 示例值： `default` |
| resourceType | query | string  |  |  | 资源类型。 枚举值：`DATA`,`API`,`MENU`,`BUTTON` |


## 示例代码

```php
<?php

require 'vendor/autoload.php';

use Authing\ManagementClient;

$management = new ManagementClient(
    "AUTHING_USERPOOL_ID",
    "AUTHING_USERPOOL_SECRET"
);

$data = $management->getUserAuthorizedResources(array(
  
    "userId" => "6229ffaxxxxxxxxcade3e3d9",

    "namespace" => "default",

    "resourceType" => "undefined",
 });
));
```


## 请求响应

类型： `AuthorizedResourcePaginatedRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#AuthorizedResourcePagingDto">AuthorizedResourcePagingDto</a> | 响应数据 |



示例结果：

```js
{
  "statusCode": 200,
  "message": "操作成功",
  "apiCode": 20001,
  "data": {
    "list": {
      "resourceCode": "ecs:1"
    }
  }
}
```

## 数据结构


### <a id="AuthorizedResourcePagingDto"></a> AuthorizedResourcePagingDto

| 名称 | 类型 | 必填 |默认值| 描述 |
| ---- |  ---- | ---- | --- | ---- |
| totalCount | number | \* |  | 记录总数。   |
  | list | array | \* |  | 响应数据。   |
  

### <a id="AuthorizedResourceDto"></a> AuthorizedResourceDto

| 名称 | 类型 | 必填 |默认值| 描述 |
| ---- |  ---- | ---- | --- | ---- |
| resourceCode | string | \* |  | 资源标识符。 示例值： `ecs:1`  |
  | resourceType | string |  |  | 资源类型。 枚举值：`DATA`,`API`,`MENU`,`BUTTON`  |
  | actions | array |  |  | 被授权的资源的操作列表。   |
  | apiIdentifier | string |  |  | 资源对应的 API Identifier。   |
  

