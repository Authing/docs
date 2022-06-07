# 获取分组成员列表

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

获取分组成员列表

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 |
| ---- | ---- | ---- | ---- | ---- |
| code  string  | 是 |  | 分组 code。 示例值： `developer` |
| page  number  | 否 | 1 | 当前页数，从 1 开始。 示例值： `1` |
| limit  number  | 否 | 10 | 每页数目，最大不能超过 50，默认为 10。 示例值： `10` |
| withCustomData  boolean  | 否 | false | 是否获取自定义数据。 示例值： `true` |
| withIdentities  boolean  | 否 | false | 是否获取 identities。 示例值： `true` |
| withDepartmentIds  boolean  | 否 | false | 是否获取部门 ID 列表。 示例值： `true` |


## 示例代码

```py
from authing import ManagementClient

management_client = ManagementClient(
    access_key_id="AUTHING_USERPOOL_ID",
    access_key_secret="AUTHING_USERPOOL_SECRET",
)

data = management_client.list_group_members(
  
      code: "developer",
  
      page: 1,
  
      limit: 10,
  
      with_custom_data: true,
  
      with_identities: true,
  
      with_department_ids: true,
  
)
```



## 请求响应

类型： `UserPaginatedRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#UserPagingDto">UserPagingDto</a> | 响应数据 |



示例结果：

```js
{
  "statusCode": 200,
  "message": "操作成功",
  "apiCode": 20001,
  "data": {
    "list": {
      "userId": "6229ffaxxxxxxxxcade3e3d9",
      "status": "Activated",
      "email": "test@example.com",
      "phone": "176xxxx6754",
      "phoneCountryCode": "+86",
      "username": "bob",
      "name": "张三",
      "nickname": "张三",
      "photo": "https://files.authing.co/authing-console/default-user-avatar.png",
      "loginsCount": 3,
      "lastLogin": "2022-04-10T20:24:00.000Z",
      "lastIp": "127.0.0.1",
      "gender": "M",
      "emailVerified": true,
      "phoneVerified": true,
      "birthdate": "2022-06-01",
      "country": "CN",
      "province": "BJ",
      "city": "BJ",
      "address": "北京朝阳",
      "streetAddress": "北京朝阳区 xxx 街道",
      "postalCode": "438100",
      "externalId": "10010",
      "departmentIds": "[\"624d930c3xxxx5c08dd4986e\",\"624d93102xxxx012f33cd2fe\"]",
      "identities": {
        "identityId": "62299d8b866d2dab79a89dc4",
        "extIdpId": "6076bacxxxxxxxxd80d993b5",
        "provider": "wechat",
        "type": "openid",
        "userIdInIdp": "oj7Nq05R-RRaqak0_YlMLnnIwsvg"
      },
      "customData": {
        "school": "北京大学",
        "age": 22
      }
    }
  }
}
```

## 数据结构


### <a id="UserPagingDto"></a> UserPagingDto

| 名称 | 类型 | 必填 |默认值| 描述 |
| ---- |  ---- | ---- | --- | ---- |
| totalCount | number | 是 |  | 记录总数。   |
| list | array | 是 |  | 数据列表。嵌套类型：<a href="#UserDto">UserDto</a>。   |


### <a id="UserDto"></a> UserDto

| 名称 | 类型 | 必填 |默认值| 描述 |
| ---- |  ---- | ---- | --- | ---- |
| userId | string | 是 |  | 用户 ID。 示例值： `6229ffaxxxxxxxxcade3e3d9`  |
| createdAt | string | 是 |  | 账号创建时间。   |
| status | string | 是 |  | 账户当前状态。 枚举值：`Deleted`,`Suspended`,`Resigned`,`Activated`,`Archived`  |
| email | string | 否 |  | 邮箱。 示例值： `test@example.com`  |
| phone | string | 否 |  | 手机号。 示例值： `176xxxx6754`  |
| phoneCountryCode | string | 否 |  | 手机区号。 示例值： `+86`  |
| username | string | 否 |  | 用户名，用户池内唯一。 示例值： `bob`  |
| name | string | 否 |  | 用户真实名称，不具备唯一性。 示例值： `张三`  |
| nickname | string | 否 |  | 昵称。 示例值： `张三`  |
| photo | string | 否 |  | 头像链接。 示例值： `https://files.authing.co/authing-console/default-user-avatar.png`  |
| loginsCount | number | 否 |  | 历史总登录次数。 示例值： `3`  |
| lastLogin | string | 否 |  | 上次登录时间。 示例值： `2022-04-10T20:24:00.000Z`  |
| lastIp | string | 否 |  | 上次登录 IP。 示例值： `127.0.0.1`  |
| gender | string | 是 |  | 性别。 枚举值：`M`,`W`,`U`  |
| emailVerified | boolean | 是 |  | 邮箱是否验证。 示例值： `true`  |
| phoneVerified | boolean | 是 |  | 手机号是否验证。 示例值： `true`  |
| birthdate | string | 否 |  | 出生日期。 示例值： `2022-06-01`  |
| country | string | 否 |  | 所在国家。 示例值： `CN`  |
| province | string | 否 |  | 所在省份。 示例值： `BJ`  |
| city | string | 否 |  | 所在城市。 示例值： `BJ`  |
| address | string | 否 |  | 所处地址。 示例值： `北京朝阳`  |
| streetAddress | string | 否 |  | 所处街道地址。 示例值： `北京朝阳区 xxx 街道`  |
| postalCode | string | 否 |  | 邮政编码号。 示例值： `438100`  |
| externalId | string | 否 |  | 第三方外部 ID。 示例值： `10010`  |
| departmentIds | array | 否 |  | 用户所属部门 ID 列表。 示例值： `["624d930c3xxxx5c08dd4986e","624d93102xxxx012f33cd2fe"]`  |
| identities | array | 否 |  | 外部身份源。嵌套类型：<a href="#IdentityDto">IdentityDto</a>。   |
| customData | object | 否 |  | 自定义数据，传入的对象中的 key 必须先在用户池定义相关自定义字段。 示例值： `[object Object]`  |


### <a id="IdentityDto"></a> IdentityDto

| 名称 | 类型 | 必填 |默认值| 描述 |
| ---- |  ---- | ---- | --- | ---- |
| identityId | string | 是 |  | Identity ID。 示例值： `62299d8b866d2dab79a89dc4`  |
| extIdpId | string | 是 |  | 外部身份源的 ID。 示例值： `6076bacxxxxxxxxd80d993b5`  |
| provider | string | 是 |  | 外部身份源类型，如 lark, wechat。 示例值： `wechat`  |
| type | string | 是 |  | Identity 类型，如 unionid, openid, primary。 示例值： `openid`  |
| userIdInIdp | string | 是 |  | 在外部身份源的 id。 示例值： `oj7Nq05R-RRaqak0_YlMLnnIwsvg`  |


