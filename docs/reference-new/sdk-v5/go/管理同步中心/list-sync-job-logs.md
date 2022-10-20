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
| syncJobId | number  | 是 | - | 同步作业 ID。  | `1000` |
| page | number  | 否 | 1 | 当前页数，从 1 开始。  | `1` |
| limit | number  | 否 | 10 | 每页数目，最大不能超过 50，默认为 10。  | `10` |
| success | boolean  | 否 | - | 根据是否操作成功进行筛选。  | `true` |
| action | string  | 否 | - | 根据操作类型进行筛选：
- `CreateUser`: 创建用户
- `UpdateUser`: 修改用户信息
- `DeleteUser`: 删除用户
- `UpdateUserIdentifier`: 修改用户唯一标志符
- `ChangeUserDepartment`: 修改用户部门
- `CreateDepartment`: 创建部门
- `UpdateDepartment`: 修改部门信息
- `DeleteDepartment`: 删除部门
- `MoveDepartment`: 移动部门
- `UpdateDepartmentLeader`: 同步部门负责人
- `CreateGroup`: 创建分组
- `UpdateGroup`: 修改分组
- `DeleteGroup`: 删除分组
- `Updateless`: 无更新
    。 枚举值：`CreateUser`,`UpdateUser`,`DeleteUser`,`UpdateUserIdentifier`,`ChangeUserDepartment`,`CreateDepartment`,`UpdateDepartment`,`DeleteDepartment`,`MoveDepartment`,`UpdateDepartmentLeader`,`CreateGroup`,`UpdateGroup`,`DeleteGroup`,`Updateless` | `CreateUser` |
| objectType | string  | 否 | - | 操作对象类型:
- `department`: 部门
- `user`: 用户
    。 枚举值：`DEPARTMENT`,`USER` | `DEPARTMENT` |


## 示例代码

```go
package main

import (
    "github.com/Authing/authing-golang-sdk/management"
    "github.com/Authing/authing-golang-sdk/dto"

    "fmt"
)

func main() {
    options := management.ClientOptions {
        AccessKeyId:     "AUTHING_USERPOOL_ID",
        AccessKeySecret: "AUTHING_USERPOOL_SECRET",
    }

    client, err := management.NewClient(&options)
    if err != nil {
        // The exception needs to be handled by the developer.
    }

    response := client.listSyncJobLogs(
    
     
        syncJobId: 1000        , 
        page: 1        , 
        limit: 10        , 
        success: true        , 
        action: "CreateUser"        , 
        objectType: "DEPARTMENT"        
  )
}
```



## 请求响应

类型： `TriggerSyncTaskRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#TriggerSyncTaskDataDto">TriggerSyncTaskDataDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "data": {
    "syncJobId": 1
  }
}
```

## 数据结构


### <a id="TriggerSyncTaskDataDto"></a> TriggerSyncTaskDataDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| syncJobId | number | 是 | 此次执行同步任务的同步作业 ID。  |  `1` |


