# 获取同步风险操作列表

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

获取同步风险操作列表

## 请求参数

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:60px">默认值</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- | ---- | ---- | ---- | ---- | ---- |
 | syncTaskId | number  | 是 | - | 同步任务 ID  | `1000` |
 | page | number  | 否 | 1 | 当前页数，从 1 开始  | `1` |
 | limit | number  | 否 | 10 | 每页数目，最大不能超过 50，默认为 10  | `10` |
 | status | string[]  | 否 | - | 根据执行状态筛选 数组长度限制：50。 | `["SUCCESS","FAILED"]` |
 | objectType | string[]  | 否 | - | 根据操作对象类型，默认获取所有类型的记录：<br>- `department`: 部门<br>- `user`: 用户<br>      | `["DEPARTMENT","USER"]` |


<!-- 暂时不显示示例代码 -->
<!-- ## 示例代码
```java
import cn.authing.sdk.java.dto.*;
import cn.authing.sdk.java.client.ManagementClient;
import cn.authing.sdk.java.model.ManagementClientOptions;

class Test {
    private static String ACCESS_KEY_ID = "AUTHING_USERPOOL_ID";
    private static String ACCESS_KEY_SECRET = "AUTHING_USERPOOL_SECRET";

    public static void main(String[] args) {
        ManagementClientOptions clientOptions = new ManagementClientOptions(ACCESS_KEY_ID, ACCESS_KEY_SECRET);
        ManagementClient managementClient = new ManagementClient(clientOptions);
    
        
         
        request.setSyncTaskId(1000); 
        request.setPage(1); 
        request.setLimit(10); 
        request.setStatus("SUCCESS,FAILED"); 
        request.setObjectType("DEPARTMENT,USER");
        SyncRiskOperationPaginatedRespDto response = managementClient.listSyncRiskOperations(request);
        System.out.println(response);
    }
}
```
 -->


## 请求响应

类型： `SyncRiskOperationPaginatedRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |
| data | <a href="#SyncRiskOperationPagingDto">SyncRiskOperationPagingDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "requestId": "934108e5-9fbf-4d24-8da1-c330328abd6c",
  "data": {
    "list": {
      "syncRiskOperationId": 1,
      "syncTaskId": 1000,
      "createdAt": "2022-07-03T02:20:30.000Z",
      "updatedAt": "2022-07-03T02:20:30.000Z",
      "status": "SUCCESS",
      "objectType": "DEPARTMENT",
      "objectName": "张三",
      "objectId": "624cf96f7axxx7918478ee7"
    }
  }
}
```

## 数据结构


### <a id="SyncRiskOperationPagingDto"></a> SyncRiskOperationPagingDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| totalCount | number | 是 | 记录总数   |  |
| list | array | 是 | 数据列表 嵌套类型：<a href="#SyncRiskOperationDto">SyncRiskOperationDto</a>。  |  |


### <a id="SyncRiskOperationDto"></a> SyncRiskOperationDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| syncRiskOperationId | number | 是 | 同步任务风险操作 ID   |  `1` |
| syncTaskId | number | 是 | 同步任务 ID   |  `1000` |
| createdAt | string | 是 | 创建时间   |  `2022-07-03T02:20:30.000Z` |
| updatedAt | string | 是 | 更新时间   |  `2022-07-03T02:20:30.000Z` |
| status | string | 是 | 执行状态:<br>- `PENDING`: 待执行<br>- `SUCCESS`: 成功<br>- `FAILED`: 失败<br>- `CANCELED`: 已取消<br>- `EXECUTING`: 执行中<br>       | PENDING |
| level | number | 是 | 优先级，数字越小表示优先级越高。   |  |
| objectType | string | 是 | 操作对象类型:<br>- `department`: 部门<br>- `user`: 用户<br>       | DEPARTMENT |
| objectName | string | 是 | 操作对象（用户、分组、部门）名称   |  `张三` |
| objectId | string | 是 | 操作对象 ID   |  `624cf96f7axxx7918478ee7` |
| errMsg | string | 否 | 执行失败的错误信息   |  |


