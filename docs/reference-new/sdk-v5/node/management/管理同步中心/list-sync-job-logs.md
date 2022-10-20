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

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:60px">默认值</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- | ---- | ---- | ---- | ---- | ---- |
 | syncJobId | number  | 是 | - | 同步作业 ID  | `1000` |
 | page | number  | 否 | 1 | 当前页数，从 1 开始  | `1` |
 | limit | number  | 否 | 10 | 每页数目，最大不能超过 50，默认为 10  | `10` |
 | success | boolean  | 否 | - | 根据是否操作成功进行筛选  | `true` |
 | action | string  | 否 | - | 根据操作类型进行筛选：<br>- `CreateUser`: 创建用户<br>- `UpdateUser`: 修改用户信息<br>- `DeleteUser`: 删除用户<br>- `UpdateUserIdentifier`: 修改用户唯一标志符<br>- `ChangeUserDepartment`: 修改用户部门<br>- `CreateDepartment`: 创建部门<br>- `UpdateDepartment`: 修改部门信息<br>- `DeleteDepartment`: 删除部门<br>- `MoveDepartment`: 移动部门<br>- `UpdateDepartmentLeader`: 同步部门负责人<br>- `CreateGroup`: 创建分组<br>- `UpdateGroup`: 修改分组<br>- `DeleteGroup`: 删除分组<br>- `Updateless`: 无更新<br>      | `CreateUser` |
 | objectType | string  | 否 | - | 操作对象类型:<br>- `department`: 部门<br>- `user`: 用户<br>      | `DEPARTMENT` |


<!-- 暂时不显示示例代码 -->
<!-- ## 示例代码
```ts
import { ManagementClient } from 'authing-node-sdk';
// 在 Node.js 中引用：
// const { ManagementClient } = require('authing-node-sdk');

const managementClient = new ManagementClient({
  accessKeyId: 'AUTHING_USERPOOL_ID',
  accessKeySecret: 'AUTHING_USERPOOL_SECRET',
});

(async () => {
  const result = await managementClient.listSyncJobLogs({

    syncJobId: 1000,

    page: 1,

    limit: 10,

    success: true,

    action: 'CreateUser',

    objectType: 'DEPARTMENT',
 });
})();
```
 -->


## 请求响应

类型： `TriggerSyncTaskRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |
| data | <a href="#TriggerSyncTaskDataDto">TriggerSyncTaskDataDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "requestId": "934108e5-9fbf-4d24-8da1-c330328abd6c",
  "data": {
    "syncJobId": 1
  }
}
```

## 数据结构


### <a id="TriggerSyncTaskDataDto"></a> TriggerSyncTaskDataDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| syncJobId | number | 是 | 此次执行同步任务的同步作业 ID   |  `1` |


