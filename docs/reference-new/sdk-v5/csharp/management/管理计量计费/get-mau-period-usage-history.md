# 获取 MAU 使用记录

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

获取当前用户池 MAU 使用记录

## 请求参数

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:60px">默认值</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- | ---- | ---- | ---- | ---- | ---- |
 | startTime | string  | 是 | - | 起始时间（年月日）  | `20220202` |
 | endTime | string  | 是 | - | 截止时间（年月日）  | `20220802` |


<!-- 暂时不显示示例代码 -->
<!-- ## 示例代码
```csharp

using Authing.CSharp.SDK.Models;
using Authing.CSharp.SDK.Services;
using Authing.CSharp.SDK.Utils;
using Authing.CSharp.SDK.UtilsImpl;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Example
{
    class Program
    {
      private static ManagementClientOptions options;
      private static string ACCESS_Key_ID = "AUTHING_USERPOOL_ID";
      private static string ACCESS_KEY_SECRET = "AUTHING_USERPOOL_SECRET";

      static void Main(string[] args)
      {
          MainAsync().GetAwaiter().GetResult();
      }

      private static async Task MainAsync()
      {
          options = new ManagementClientOptions()
          {
              AccessKeyId = ACCESS_Key_ID,
              AccessKeySecret = ACCESS_KEY_SECRET,
          };

          ManagementClient managementClient = new ManagementClient(options);
        
          CostGetMauPeriodUsageHistoryRespDto  result = await managementClient.GetMauPeriodUsageHistory
          (             
                startTime: "20220202", 
                endTime: "20220802"
          );
        }
    }
}

```
 -->


## 请求响应

类型： `CostGetMauPeriodUsageHistoryRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |
| data | <a href="#MauPeriodUsageHistory">MauPeriodUsageHistory</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "requestId": "934108e5-9fbf-4d24-8da1-c330328abd6c",
  "data": {
    "records": {
      "periodStartTime": "20210901",
      "periodEndTime": "20220901",
      "amount": "0",
      "current": "0"
    }
  }
}
```

## 数据结构


### <a id="MauPeriodUsageHistory"></a> MauPeriodUsageHistory

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| records | array | 是 | 响应数据 嵌套类型：<a href="#MauPeriodUsageHistoryDto">MauPeriodUsageHistoryDto</a>。  |  |


### <a id="MauPeriodUsageHistoryDto"></a> MauPeriodUsageHistoryDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| periodStartTime | string | 是 | 周期开始时间(年月日)   |  `20210901` |
| periodEndTime | string | 是 | 周期结束时间(年月日)   |  `20220901` |
| amount | string | 是 | 当前周期使用的 mau 总数量   |  `0` |
| current | string | 是 | 当前周期使用的 mau 数量   |  `0` |


