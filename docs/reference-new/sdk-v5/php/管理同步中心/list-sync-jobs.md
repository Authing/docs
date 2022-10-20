# 获取同步作业详情

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

获取同步作业详情

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| syncTaskId | number  | 是 | - | 同步任务 ID。  | `1000` |
| page | number  | 否 | 1 | 当前页数，从 1 开始。  | `1` |
| limit | number  | 否 | 10 | 每页数目，最大不能超过 50，默认为 10。  | `10` |
| syncTrigger | string  | 否 | - | 同步任务触发类型：
- `manually`: 手动触发执行
- `timed`: 定时触发
- `automatic`: 根据事件自动触发
。 枚举值：`manually`,`timed`,`automatic` | `manually` |


## 示例代码

```php
<?php

require 'vendor/autoload.php';

use Authing\ManagementClient;

$management = new ManagementClient(
    "AUTHING_USERPOOL_ID",
    "AUTHING_USERPOOL_SECRET"
);

$data = $management->listSyncJobs(array(
  
    "syncTaskId" => 1000,

    "page" => 1,

    "limit" => 10,

    "syncTrigger" => "manually",

));
```


## 请求响应

类型： `SyncJobPaginatedRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#SyncJobPagingDto">SyncJobPagingDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "data": {
    "list": {
      "syncJobId": 1,
      "syncTaskId": 1000,
      "createdAt": "2022-07-03T02:20:30.000Z",
      "updatedAt": "2022-07-03T02:20:30.000Z",
      "syncStatus": "success",
      "syncFlow": "upstream",
      "syncTrigger": "manually"
    }
  }
}
```

## 数据结构


### <a id="SyncJobPagingDto"></a> SyncJobPagingDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| totalCount | number | 是 | 记录总数。  |  |
| list | array | 是 | 数据列表。嵌套类型：<a href="#SyncJobDto">SyncJobDto</a>。  |  |


### <a id="SyncJobDto"></a> SyncJobDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| syncJobId | number | 是 | 同步作业 ID。  |  `1` |
| syncTaskId | number | 是 | 此同步作业对应的同步任务 ID。  |  `1000` |
| createdAt | string | 是 | 创建时间。  |  `2022-07-03T02:20:30.000Z` |
| updatedAt | string | 是 | 更新时间。  |  `2022-07-03T02:20:30.000Z` |
| syncStatus | string | 是 | 当前同步状态:<br>- `free`: 空闲状态，从未执行<br>- `pending`: 等待系统执行<br>- `onProgress`: 正在执行<br>- `success`: 成功<br>- `failed`: 失败<br>    。  | 可选枚举值：`free`,`pending`,`onProgress`,`success`,`failed` |
| syncFlow | string | 是 | 同步任务数据流向：<br>- `upstream`: 作为上游，将数据同步到 Authing<br>- `downstream`: 作为下游，将 Authing 数据同步到此系统<br>    。  | 可选枚举值：`upstream`,`downstream` |
| syncTrigger | string | 是 | 同步任务触发类型：<br>- `manually`: 手动触发执行<br>- `timed`: 定时触发<br>- `automatic`: 根据事件自动触发<br>。  | 可选枚举值：`manually`,`timed`,`automatic` |
| departmentCountAll | number | 是 | 需要同步的部门个数。  |  |
| departmentCountSucc | number | 是 | 成功同步的部门个数。  |  |
| departmentUpdateCountAll | number | 是 | 需要更新的部门个数。  |  |
| departmentUpdateCountSucc | number | 是 | 成功更新的部门个数。  |  |
| accountCountAll | number | 是 | 需要同步的用户个数。  |  |
| accountCountSucc | number | 是 | 成功同步的用户个数。  |  |
| accountUpdateCountAll | number | 是 | 需要更新的用户个数。  |  |
| accountUpdateCountSucc | number | 是 | 成功更新的用户个数。  |  |
| errMsg | string | 否 | 错误信息。  |  |


