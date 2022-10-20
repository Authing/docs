# 获取订单支付明细

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

获取当前用户池订单支付明细

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| orderNo | string  | 是 | - | 订单号。  | `2022080410062060e26f7fd6b9` |


## 示例代码

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
        
          CostGetOrderPayDetailRespDto  result = await managementClient.GetOrderPayDetail
          (             
                orderNo: "2022080410062060e26f7fd6b9"
          );
        }
    }
}

```



## 请求响应

类型： `CostGetOrderPayDetailRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |
| orderNo | string | 订单号 |
| channelOrderNo | string | 渠道订单号 |
| paidAmount | string | 渠道订单号 |
| paidTime | string | 支付时间 |
| paidAccountNo | string | 支付账号 |
| payStatus | string | 支付状态 |
| createTime | string | 创建时间 |
| payType | string | 支付方式 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "requestId": "934108e5-9fbf-4d24-8da1-c330328abd6c",
  "orderNo": "2022080911591337da0aae9660",
  "channelOrderNo": "Mock22e7ecfd-745d-46ad-b563-ef4db5719bfb",
  "paidAmount": "7.9",
  "paidTime": "2022-08-09 11:59:46",
  "paidAccountNo": "62bec1591aeb41ad3f1a6503",
  "payStatus": "3",
  "createTime": "2022-08-09 11:59:20",
  "payType": "Alipay"
}
```

## 数据结构


