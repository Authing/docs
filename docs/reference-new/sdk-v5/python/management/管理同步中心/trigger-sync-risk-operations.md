# 执行同步风险操作

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

执行同步风险操作

## 请求参数

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:60px">默认值</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- | ---- | ---- | ---- | ---- | ---- |
| syncRiskOperationIds | number[] | 是 | - | 同步任务风险操作 ID  | `[1,2]` |


<!-- 暂时不显示示例代码 -->
<!-- ## 示例代码
```py
from authing import ManagementClient

management_client = ManagementClient(
    access_key_id="AUTHING_USERPOOL_ID",
    access_key_secret="AUTHING_USERPOOL_SECRET",
)

data = management_client.trigger_sync_risk_operations(
     sync_risk_operation_ids: [1,2],
  
)
```
 -->


## 请求响应

类型： `TriggerSyncRiskOperationsRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |
| data | <a href="#TriggerSyncRiskOperationsDataDto">TriggerSyncRiskOperationsDataDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "requestId": "934108e5-9fbf-4d24-8da1-c330328abd6c",
  "data": {
    "successList": "[1,2]",
    "faildList": "[3,4]"
  }
}
```

## 数据结构


### <a id="TriggerSyncRiskOperationsDataDto"></a> TriggerSyncRiskOperationsDataDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| successList | array | 是 | 成功执行的风险操作任务   |  `[1,2]` |
| faildList | array | 是 | 执行失败的风险操作任务   |  `[3,4]` |


