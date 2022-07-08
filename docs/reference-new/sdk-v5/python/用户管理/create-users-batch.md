# 批量创建用户

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

此接口将以管理员身份批量创建用户，不需要进行手机号验证码检验等安全检测。用户的手机号、邮箱、用户名、externalId 用户池内唯一。

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| list | <a href="#CreateUserInfoDto">CreateUserInfoDto[]</a> | 是 | - | 用户列表。  |  |
| options | <a href="#CreateUserOptionsDto">CreateUserOptionsDto</a> | 否 | - | 可选参数。  |  |


## 示例代码

```py
from authing import ManagementClient

management_client = ManagementClient(
    access_key_id="AUTHING_USERPOOL_ID",
    access_key_secret="AUTHING_USERPOOL_SECRET",
)

data = management_client.create_users_batch(
     list: [{
           status: "Activated",
         email: "test@example.com",
         password_encrypt_type: "none",
         phone: "176xxxx6754",
         phone_country_code: "+86",
         username: "bob",
         name: "张三",
         nickname: "张三",
         photo: "https://files.authing.co/authing-console/default-user-avatar.png",
         gender: "M",
         email_verified: true,
         phone_verified: true,
         birthdate: "2022-07-08",
         country: "CN",
         province: "BJ",
         city: "BJ",
         address: "北京朝阳",
         street_address: "北京朝阳区 xxx 街道",
         postal_code: "438100",
         external_id: "10010",
         department_ids: ["624d930c3xxxx5c08dd4986e","624d93102xxxx012f33cd2fe"],
         custom_data: {
			"school":	"北京大学",
			"age":	22
		},
         password: "oqw5bhVmlDwF5qqeVA645bICyMVfFaV3sf3ZTrk5Npcm5dTOmBVo1anyZ5JLfHAz/P45r0QTPo8xS1YdKxIrshx4Ju+g04s9SQqW30ebdVdqcOntIJGAXU6arrkPvfcRFV3ZVTwBdgdRWHMkr5sTcnGNYdgL67P9/jHnzltkLbY=",
         reset_password_on_fisrt_login: false,
         tenant_ids: "undefined",
         identities: [{
           ext_idp_id: "6076bacxxxxxxxxd80d993b5",
         provider: "wechat",
         type: "openid",
         user_id_in_idp: "oj7Nq05R-RRaqak0_YlMLnnIwsvg",
      }],
      }],
     options: {
         keep_password: false,
       auto_generate_password: false,
       reset_password_on_first_login: false,
       department_id_type: "department_id",
       send_notification: {
         send_email_notification: false,
       send_phone_notification: false,
       app_id: "appid1",
    },
    },
  
)
```



## 请求响应

类型： `UserListRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | array | 用户列表 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "apiCode": 20001,
  "data": {
    "userId": "6229ffaxxxxxxxxcade3e3d9",
    "createdAt": "2022-07-08T12:56:15.061Z",
    "status": "Activated",
    "email": "test@example.com",
    "phone": "176xxxx6754",
    "phoneCountryCode": "+86",
    "username": "bob",
    "name": "张三",
    "nickname": "张三",
    "photo": "https://files.authing.co/authing-console/default-user-avatar.png",
    "loginsCount": 3,
    "lastLogin": "2022-04-10T12:24:00.000Z",
    "lastIp": "127.0.0.1",
    "gender": "M",
    "emailVerified": true,
    "phoneVerified": true,
    "passwordLastSetAt": "2022-07-08T12:56:15.061Z",
    "birthdate": "2022-07-08",
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
    },
    "statusChangedAt": "2022-07-08T12:56:16.793Z"
  }
}
```

## 数据结构


### <a id="CreateUserInfoDto"></a> CreateUserInfoDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| status | string | 否 | 账户当前状态。 枚举值：`Suspended`,`Resigned`,`Activated`,`Archived`  |
| email | string | 否 | 邮箱。 示例值： `test@example.com`  |
| passwordEncryptType | string | 否 | 密码加密类型，支持 sm2 和 rsa。 枚举值：`sm2`,`rsa`,`none`  |
| phone | string | 否 | 手机号。 示例值： `176xxxx6754`  |
| phoneCountryCode | string | 否 | 手机区号。 示例值： `+86`  |
| username | string | 否 | 用户名，用户池内唯一。 示例值： `bob`  |
| name | string | 否 | 用户真实名称，不具备唯一性。 示例值： `张三`  |
| nickname | string | 否 | 昵称。 示例值： `张三`  |
| photo | string | 否 | 头像链接。 示例值： `https://files.authing.co/authing-console/default-user-avatar.png`  |
| gender | string | 否 | 性别。 枚举值：`M`,`W`,`U`  |
| emailVerified | boolean | 否 | 邮箱是否验证。 示例值： `true`  |
| phoneVerified | boolean | 否 | 手机号是否验证。 示例值： `true`  |
| birthdate | string | 否 | 出生日期。 示例值： `2022-07-08`  |
| country | string | 否 | 所在国家。 示例值： `CN`  |
| province | string | 否 | 所在省份。 示例值： `BJ`  |
| city | string | 否 | 所在城市。 示例值： `BJ`  |
| address | string | 否 | 所处地址。 示例值： `北京朝阳`  |
| streetAddress | string | 否 | 所处街道地址。 示例值： `北京朝阳区 xxx 街道`  |
| postalCode | string | 否 | 邮政编码号。 示例值： `438100`  |
| externalId | string | 否 | 第三方外部 ID。 示例值： `10010`  |
| departmentIds | array | 否 | 用户所属部门 ID 列表。 示例值： `["624d930c3xxxx5c08dd4986e","624d93102xxxx012f33cd2fe"]`  |
| customData | object | 否 | 自定义数据，传入的对象中的 key 必须先在用户池定义相关自定义字段。 示例值： `[object Object]`  |
| password | string | 否 | 密码。可选加密方式进行加密，通过 passwordEncryptType 参数进行加密方法选择，默认为未加密。 示例值： `oqw5bhVmlDwF5qqeVA645bICyMVfFaV3sf3ZTrk5Npcm5dTOmBVo1anyZ5JLfHAz/P45r0QTPo8xS1YdKxIrshx4Ju+g04s9SQqW30ebdVdqcOntIJGAXU6arrkPvfcRFV3ZVTwBdgdRWHMkr5sTcnGNYdgL67P9/jHnzltkLbY=`  |
| resetPasswordOnFisrtLogin | boolean | 否 | 是否首次登录时重新设置密码。 示例值： `false`  |
| tenantIds | array | 否 | 租户 ID。   |
| identities | array | 否 | 第三方身份源（建议调用绑定接口进行绑定）。嵌套类型：<a href="#CreateIdentityDto">CreateIdentityDto</a>。 示例值： `[object Object]`  |


### <a id="CreateIdentityDto"></a> CreateIdentityDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| extIdpId | string | 是 | 外部身份源的 ID。 示例值： `6076bacxxxxxxxxd80d993b5`  |
| provider | string | 是 | 外部身份源类型，如 lark, wechat。 示例值： `wechat`  |
| type | string | 是 | Identity 类型，如 unionid, openid, primary。 示例值： `openid`  |
| userIdInIdp | string | 是 | 在外部身份源的 id。 示例值： `oj7Nq05R-RRaqak0_YlMLnnIwsvg`  |


### <a id="CreateUserOptionsDto"></a> CreateUserOptionsDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| keepPassword | boolean | 否 | 该参数一般在迁移旧有用户数据到 Authing 的时候会设置。开启这个开关，password 字段会直接写入 Authing 数据库，Authing 不会再次加密此字段。如果你的密码不是明文存储，你应该保持开启，并编写密码函数计算。。   |
| autoGeneratePassword | boolean | 否 | 是否自动生成密码。   |
| resetPasswordOnFirstLogin | boolean | 否 | 是否强制要求用户在第一次的时候重置密码。   |
| departmentIdType | string | 否 | 此次调用中使用的父部门 ID 的类型。 枚举值：`department_id`,`open_department_id`  |
| sendNotification |  | 否 | 重置密码发送邮件和手机号选项。嵌套类型：<a href="#SendCreateAccountNotificationDto">SendCreateAccountNotificationDto</a>。 示例值： `[object Object]`  |


### <a id="SendCreateAccountNotificationDto"></a> SendCreateAccountNotificationDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| sendEmailNotification | boolean | 否 | 创建账号之后，是否发送邮件通知。   |
| sendPhoneNotification | boolean | 否 | 创建账号之后，是否发送短信通知。   |
| appId | string | 否 | 发送登录地址时，指定的应用 id，会将此应用的登录地址发送给用户的邮箱或者手机号。默认为用户池应用面板的登录地址。。 示例值： `appid1`  |


### <a id="UserDto"></a> UserDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| userId | string | 是 | 用户 ID。 示例值： `6229ffaxxxxxxxxcade3e3d9`  |
| createdAt | string | 是 | 账号创建时间。 示例值： `2022-07-08T12:56:15.061Z`  |
| status | string | 是 | 账户当前状态。 枚举值：`Suspended`,`Resigned`,`Activated`,`Archived`  |
| email | string | 否 | 邮箱。 示例值： `test@example.com`  |
| phone | string | 否 | 手机号。 示例值： `176xxxx6754`  |
| phoneCountryCode | string | 否 | 手机区号。 示例值： `+86`  |
| username | string | 否 | 用户名，用户池内唯一。 示例值： `bob`  |
| name | string | 否 | 用户真实名称，不具备唯一性。 示例值： `张三`  |
| nickname | string | 否 | 昵称。 示例值： `张三`  |
| photo | string | 否 | 头像链接。 示例值： `https://files.authing.co/authing-console/default-user-avatar.png`  |
| loginsCount | number | 否 | 历史总登录次数。 示例值： `3`  |
| lastLogin | string | 否 | 上次登录时间。 示例值： `2022-04-10T12:24:00.000Z`  |
| lastIp | string | 否 | 上次登录 IP。 示例值： `127.0.0.1`  |
| gender | string | 是 | 性别。 枚举值：`M`,`W`,`U`  |
| emailVerified | boolean | 是 | 邮箱是否验证。 示例值： `true`  |
| phoneVerified | boolean | 是 | 手机号是否验证。 示例值： `true`  |
| passwordLastSetAt | string | 否 | 用户上次密码修改时间。 示例值： `2022-07-08T12:56:15.061Z`  |
| birthdate | string | 否 | 出生日期。 示例值： `2022-07-08`  |
| country | string | 否 | 所在国家。 示例值： `CN`  |
| province | string | 否 | 所在省份。 示例值： `BJ`  |
| city | string | 否 | 所在城市。 示例值： `BJ`  |
| address | string | 否 | 所处地址。 示例值： `北京朝阳`  |
| streetAddress | string | 否 | 所处街道地址。 示例值： `北京朝阳区 xxx 街道`  |
| postalCode | string | 否 | 邮政编码号。 示例值： `438100`  |
| externalId | string | 否 | 第三方外部 ID。 示例值： `10010`  |
| resetPasswordOnNextLogin | boolean | 否 | 下次登录要求重置密码。   |
| departmentIds | array | 否 | 用户所属部门 ID 列表。 示例值： `["624d930c3xxxx5c08dd4986e","624d93102xxxx012f33cd2fe"]`  |
| identities | array | 否 | 外部身份源。嵌套类型：<a href="#IdentityDto">IdentityDto</a>。   |
| customData | object | 否 | 用户的扩展字段数据。 示例值： `[object Object]`  |
| statusChangedAt | string | 否 | 用户状态上次修改时间。 示例值： `2022-07-08T12:56:16.793Z`  |


### <a id="IdentityDto"></a> IdentityDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| identityId | string | 是 | Identity ID。 示例值： `62299d8b866d2dab79a89dc4`  |
| extIdpId | string | 是 | 外部身份源的 ID。 示例值： `6076bacxxxxxxxxd80d993b5`  |
| provider | string | 是 | 外部身份源类型，如 lark, wechat。 示例值： `wechat`  |
| type | string | 是 | Identity 类型，如 unionid, openid, primary。 示例值： `openid`  |
| userIdInIdp | string | 是 | 在外部身份源的 id。 示例值： `oj7Nq05R-RRaqak0_YlMLnnIwsvg`  |


