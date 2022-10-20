# 获取同步任务详情

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

获取同步任务详情

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| syncTaskId | number  | 是 | - | 同步任务 ID。  | `1000` |


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
  const result = await managementClient.getSyncTask({

    syncTaskId: 1000,
 });
})();
```



## 请求响应

类型： `SyncTaskSingleRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |
| data | <a href="#SyncTaskDto">SyncTaskDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "requestId": "934108e5-9fbf-4d24-8da1-c330328abd6c",
  "data": {
    "syncTaskId": 1000,
    "createdAt": "2022-07-03T02:20:30.000Z",
    "updatedAt": "2022-07-03T02:20:30.000Z",
    "syncTaskName": "我的飞书同步任务",
    "syncTaskType": "lark",
    "syncFlow": "upstream",
    "syncTrigger": "manually",
    "lastSyncRate": 80,
    "lastSyncStatus": "success",
    "lastSyncTime": "2022-07-03T02:20:30.000Z",
    "organizationCode": "steamory",
    "provisioningScope": {
      "all": true,
      "includeNewUsers": true
    },
    "fieldMapping": {
      "expression": "mobile",
      "targetKey": "phone"
    },
    "timedScheduler": {
      "cycle": "days",
      "startTime": 1664249726701
    }
  }
}
```

## 数据结构


### <a id="SyncTaskDto"></a> SyncTaskDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| syncTaskId | number | 是 | 同步任务 ID。  |  `1000` |
| createdAt | string | 是 | 创建时间。  |  `2022-07-03T02:20:30.000Z` |
| updatedAt | string | 是 | 更新时间。  |  `2022-07-03T02:20:30.000Z` |
| syncTaskName | string | 是 | 同步任务名称。  |  `我的飞书同步任务` |
| syncTaskType | string | 是 | 同步任务类型:<br>- `lark`: 飞书<br>- `lark-international`: 飞书国际版<br>- `wechatwork`: 企业微信<br>- `dingtalk`: 钉钉<br>- `active-directory`: Windows AD<br>- `ldap`: LDAP<br>- `italent`: 北森<br>- `maycur`: 每刻报销<br>- `moka`: Moka<br>- `fxiaoke`: 纷享销客<br>- `xiaoshouyi`: 销售易<br>- `kayang`: 嘉扬 HR<br>- `scim`: 自定义同步源<br>    。  | 可选枚举值：`lark`,`lark-international`,`wechatwork`,`dingtalk`,`active-directory`,`italent`,`maycur`,`ldap`,`moka`,`fxiaoke`,`scim`,`xiaoshouyi`,`kayang`,`custom` |
| syncFlow | string | 是 | 同步任务数据流向：<br>- `upstream`: 作为上游，将数据同步到 Authing<br>- `downstream`: 作为下游，将 Authing 数据同步到此系统<br>    。  | 可选枚举值：`upstream`,`downstream` |
| syncTrigger | string | 是 | 同步任务触发类型：<br>- `manually`: 手动触发执行<br>- `timed`: 定时触发<br>- `automatic`: 根据事件自动触发<br>。  | 可选枚举值：`manually`,`timed`,`automatic` |
| lastSyncMessage | boolean | 否 | 最近一次同步错误信息。  |  |
| lastSyncRate | number | 否 | 最近一次同步进度。  |  `80` |
| lastSyncStatus | string | 否 | 最近一次同步状态:<br>- `free`: 空闲状态，从未执行<br>- `pending`: 等待系统执行<br>- `onProgress`: 正在执行<br>- `success`: 成功<br>- `failed`: 失败<br>    。  | 可选枚举值：`free`,`pending`,`onProgress`,`success`,`failed` |
| lastSyncTime | string | 否 | 最近一次同步时间。  |  `2022-07-03T02:20:30.000Z` |
| organizationCode | string | 否 | 此同步任务绑定的组织机构。针对上游同步，需执行一次同步任务之后才会绑定组织机构；针对下游同步，创建同步任务的时候就需要设置。。  |  `steamory` |
| provisioningScope |  | 否 | 同步范围，**只针对下游同步任务有效**。为空表示同步整个组织机构。。嵌套类型：<a href="#SyncTaskProvisioningScope">SyncTaskProvisioningScope</a>。  |  |
| fieldMapping | array | 是 | 字段映射配置。嵌套类型：<a href="#SyncTaskFieldMapping">SyncTaskFieldMapping</a>。  |  |
| timedScheduler |  | 否 | 定时同步时间设置。嵌套类型：<a href="#SyncTaskTimedScheduler">SyncTaskTimedScheduler</a>。  |  |


### <a id="SyncTaskProvisioningScope"></a> SyncTaskProvisioningScope

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| all | boolean | 是 | 是否同步所选组织机构下的所有用户和部门。  |  `true` |
| includeNewUsers | boolean | 是 | 是否包含新增的用户。  |  |


### <a id="SyncTaskFieldMapping"></a> SyncTaskFieldMapping

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| expression | string | 是 | 源字段。  |  `mobile` |
| targetKey | string | 是 | 转换后的字段。  |  `phone` |


### <a id="SyncTaskTimedScheduler"></a> SyncTaskTimedScheduler

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| cycle | string | 是 | 定时周期：<br>- `month`: 每个月执行一次<br>- `week`: 每周执行一次<br>- `days`: 每天执行一次<br>- `sixHours`: 每六小时执行一次<br>- `twoHours`: 每两小时执行一次<br>    。  | 可选枚举值：`month`,`week`,`days`,`sixHours`,`twoHours` |
| startTime | number | 是 | 开始时间。  |  `1664249726701` |


