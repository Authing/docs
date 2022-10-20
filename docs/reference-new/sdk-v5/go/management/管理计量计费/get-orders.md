# 获取订单列表

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

获取当前用户池订单列表

## 请求参数

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:60px">默认值</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- | ---- | ---- | ---- | ---- | ---- |
 | page | number  | 否 | 1 | 当前页数，从 1 开始  | `1` |
 | limit | number  | 否 | 10 | 每页数目，最大不能超过 50，默认为 10  | `10` |


<!-- 暂时不显示示例代码 -->
<!-- ## 示例代码
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

    response := client.getOrders(
    
     
        page: 1        , 
        limit: 10        
  )
}
```
 -->


## 请求响应

类型： `CostGetOrdersRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |
| data | <a href="#GetOrdersRes">GetOrdersRes</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "requestId": "934108e5-9fbf-4d24-8da1-c330328abd6c",
  "data": {
    "list": {
      "orderNo": "202209251234224",
      "status": "1：未支付，2：已支付，3：已完成，4：已取消，5：已过期",
      "orderType": "New：新购，Upgrade：升级，Renew：续费，Overdue_Correct：逾期纠正，Overflowed_Correct：逾量纠正"
    }
  }
}
```

## 数据结构


### <a id="GetOrdersRes"></a> GetOrdersRes

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| totalCount | string | 是 | 总数   |  |
| list | array | 是 | 响应数据 嵌套类型：<a href="#OrderItem">OrderItem</a>。  |  |


### <a id="OrderItem"></a> OrderItem

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| orderNo | string | 是 | 订单号   |  `202209251234224` |
| goodsName | string | 是 | 套餐包名中文   |  |
| goodsNameEn | string | 是 | 套餐包名英文   |  |
| goodsUnitPrice | string | 是 | 单价   |  |
| quantity | string | 是 | 数量   |  |
| actualAmount | string | 是 | 实际金额   |  |
| status | string | 是 | 订单状态   |  `1：未支付，2：已支付，3：已完成，4：已取消，5：已过期` |
| orderType | string | 是 | 订单类型   |  `New：新购，Upgrade：升级，Renew：续费，Overdue_Correct：逾期纠正，Overflowed_Correct：逾量纠正` |
| createTime | string | 是 | 创建时间   |  |
| source | string | 是 | Licence：license 订单，Offline：线下交易，Eadmin：后台开通，SelfHelp：自助下单，Cdkey：Cdkey 活动兑换   |  |


