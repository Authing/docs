# 设置自定义字段的值

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

给用户、角色或部门设置自定义字段的值，如果存在则更新，不存在则创建。

## 请求参数

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:60px">默认值</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- | ---- | ---- | ---- | ---- | ---- |
| list | <a href="#SetCustomDataDto">SetCustomDataDto[]</a> | 是 | - | 自定义数据列表 数组长度限制：50。 |  |
| targetIdentifier | string | 是 | - | 目标对象的唯一标志符：<br>- 如果是用户，为用户的 ID，如 `6343b98b7cfxxx9366e9b7c`<br>- 如果是角色，为角色的 code，如 `admin`<br>- 如果是分组，为分组的 code，如 `developer`<br>- 如果是部门，为部门的 ID，如 `6343bafc019xxxx889206c4c`<br>          | `userId1` |
| targetType | string | 是 | - | 目标对象类型：<br>- `USER`: 用户<br>- `ROLE`: 角色<br>- `GROUP`: 分组<br>- `DEPARTMENT`: 部门<br>      | `USER` |
| namespace | string | 否 | - | 所属权限分组的 code，当 target_type 为角色的时候需要填写，否则可以忽略  | `default` |


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
  const result = await managementClient.setCustomData({
    targetType: 'USER',
    targetIdentifier: 'userId1',
    namespace: 'default',
    list: [{
            key: 'school',
          value: 'pku',
      }],
 });
})();
```
 -->


## 请求响应

类型： `IsSuccessRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |
| data | <a href="#IsSuccessDto">IsSuccessDto</a> | 操作是否成功 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "requestId": "934108e5-9fbf-4d24-8da1-c330328abd6c",
  "data": {
    "success": true
  }
}
```

## 数据结构


### <a id="SetCustomDataDto"></a> SetCustomDataDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| key | string | 是 | 字段 key，不能和内置字段的 key 冲突   |  `school` |
| value | string | 是 | 自定义数据，可以为任意类型，但是必须和创建时定义的自定义字段类型匹配，否则将设置失败   |  `pku` |


### <a id="IsSuccessDto"></a> IsSuccessDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| success | boolean | 是 | 操作是否成功   |  `true` |


