# 获取所有权益

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

获取当前用户池所有权益

## 请求参数

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:60px">默认值</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- | ---- | ---- | ---- | ---- | ---- |


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
  const result = await managementClient.getAllRightsItems({
 });
})();
```
 -->


## 请求响应

类型： `CostGetAllRightItemRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |
| data | <a href="#RightItemRes">RightItemRes</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "requestId": "934108e5-9fbf-4d24-8da1-c330328abd6c",
  "data": {
    "rightsItems": {
      "rightsModelCode": "SocialConnections",
      "rightsModelName": "SocialConnections",
      "dataType": "1：数量类型，2：数字只读，不做计量，3：断言类型，4：字符串只读",
      "dataValue": "0"
    }
  }
}
```

## 数据结构


### <a id="RightItemRes"></a> RightItemRes

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| rightsItems | array | 是 | 响应数据 嵌套类型：<a href="#RightItemDto">RightItemDto</a>。  |  |


### <a id="RightItemDto"></a> RightItemDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| rightsModelCode | string | 是 | 权益编码   |  `SocialConnections` |
| rightsModelName | string | 是 | 权益名称   |  `SocialConnections` |
| dataType | string | 是 | 权益数据类型   |  `1：数量类型，2：数字只读，不做计量，3：断言类型，4：字符串只读` |
| dataValue | string | 是 | 权益值   |  `0` |


