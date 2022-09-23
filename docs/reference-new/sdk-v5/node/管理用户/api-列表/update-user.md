# 修改用户资料

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

通过用户 ID，修改用户资料，邮箱、手机号、用户名、externalId 用户池内唯一，此接口将以管理员身份修改用户资料因此不需要进行手机号验证码检验等安全检测。

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| userId | string | 是 | - | 用户 ID。   | `6229ffaxxxxxxxxcade3e3d9` |
| phoneCountryCode | string | 否 | - | 手机区号，中国大陆手机号可不填。Authing 短信服务暂不内置支持国际手机号，你需要在 Authing 控制台配置对应的国际短信服务。完整的手机区号列表可参阅 https://en.wikipedia.org/wiki/List_of_country_calling_codes。。   | `+86` |
| name | string | 否 | - | 用户真实名称，不具备唯一性。   | `张三` |
| nickname | string | 否 | - | 昵称。   | `张三` |
| photo | string | 否 | - | 头像链接。   | `https://files.authing.co/authing-console/default-user-avatar.png` |
| externalId | string | 否 | - | 第三方外部 ID。   | `10010` |
| status | string | 否 | Activated | 账户当前状态。  枚举值：`Suspended`,`Resigned`,`Activated`,`Archived`,`Deactivated` | `Activated` |
| emailVerified | boolean | 否 | - | 邮箱是否验证。   | `true` |
| phoneVerified | boolean | 否 | - | 手机号是否验证。   | `true` |
| birthdate | string | 否 | - | 出生日期。   | `2022-06-03` |
| country | string | 否 | - | 所在国家。   | `CN` |
| province | string | 否 | - | 所在省份。   | `BJ` |
| city | string | 否 | - | 所在城市。   | `BJ` |
| address | string | 否 | - | 所处地址。   | `北京朝阳` |
| streetAddress | string | 否 | - | 所处街道地址。   | `北京朝阳区 xxx 街道` |
| postalCode | string | 否 | - | 邮政编码号。   | `438100` |
| gender | string | 否 | U | 性别。  枚举值：`M`,`F`,`U` | `M` |
| username | string | 否 | - | 用户名，用户池内唯一。   | `bob` |
| passwordEncryptType | string | 否 | none | 密码加密类型，支持 sm2 和 rsa。  枚举值：`sm2`,`rsa`,`none` | `none` |
| email | string | 否 | - | 邮箱，不区分大小写。   | `test@example.com` |
| phone | string | 否 | - | 手机号，不带区号。如果是国外手机号，请在 phoneCountryCode 参数中指定区号。。   | `188xxxx8888` |
| password | string | 否 | - | 密码。可选加密方式进行加密，通过 passwordEncryptType 参数进行加密方法选择，默认为未加密。   | `oqw5bhVmlDwF5qqeVA645bICyMVfFaV3sf3ZTrk5Npcm5dTOmBVo1anyZ5JLfHAz/P45r0QTPo8xS1YdKxIrshx4Ju+g04s9SQqW30ebdVdqcOntIJGAXU6arrkPvfcRFV3ZVTwBdgdRWHMkr5sTcnGNYdgL67P9/jHnzltkLbY=` |
| customData | object | 否 | - | 自定义数据，传入的对象中的 key 必须先在用户池定义相关自定义字段。   | `{"school":"北京大学","age":22}` |
| options | <a href="#UpdateUserOptionsDto">UpdateUserOptionsDto</a> | 否 | - | 可选参数。   |  |


## 示例代码

```ts
import { ManagementClient } from 'authing-node-sdk';
// 在 Node.js 中引用：
// const { ManagementClient } = require('authing-node-sdk');

const managementClient = new ManagementClient({
  accessKeyId: 'AUTHING_USERPOOL_ID',
  accessKeySecret: 'AUTHING_USERPOOL_SECRET',
});

(async () => {
  const result = await managementClient.updateUser({
    userId: '6229ffaxxxxxxxxcade3e3d9',
    phoneCountryCode: '+86',
    name: '张三',
    nickname: '张三',
    photo: 'https://files.authing.co/authing-console/default-user-avatar.png',
    externalId: '10010',
    status: 'Activated',
    emailVerified: true,
    phoneVerified: true,
    birthdate: '2022-06-03',
    country: 'CN',
    province: 'BJ',
    city: 'BJ',
    address: '北京朝阳',
    streetAddress: '北京朝阳区 xxx 街道',
    postalCode: '438100',
    gender: 'M',
    username: 'bob',
    passwordEncryptType: 'none',
    email: 'test@example.com',
    phone: '188xxxx8888',
    password: 'oqw5bhVmlDwF5qqeVA645bICyMVfFaV3sf3ZTrk5Npcm5dTOmBVo1anyZ5JLfHAz/P45r0QTPo8xS1YdKxIrshx4Ju+g04s9SQqW30ebdVdqcOntIJGAXU6arrkPvfcRFV3ZVTwBdgdRWHMkr5sTcnGNYdgL67P9/jHnzltkLbY=',
    customData: {
			"school":	"北京大学",
			"age":	22
		},
    options: {
          userIdType: 'user_id',
        resetPasswordOnNextLogin: false,
        autoGeneratePassword: false,
        sendPasswordResetedNotification: {
          sendDefaultEmailNotification: false,
        sendDefaultPhoneNotification: false,
        inputSendEmailNotification: 'test@example.com',
        inputSendPhoneNotification: '183xxxx1234',
        appId: 'appid1',
    },
    },
 });
})();
```



## 请求响应

类型： `UserSingleRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#UserDto">UserDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "data": {
    "userId": "6229ffaxxxxxxxxcade3e3d9",
    "createdAt": "2022-07-03T02:20:30.000Z",
    "updatedAt": "2022-07-03T02:20:30.000Z",
    "status": "Activated",
    "email": "test@example.com",
    "phone": "188xxxx8888",
    "phoneCountryCode": "+86",
    "username": "bob",
    "name": "张三",
    "nickname": "张三",
    "photo": "https://files.authing.co/authing-console/default-user-avatar.png",
    "loginsCount": 3,
    "lastLogin": "2022-07-03T02:20:30.000Z",
    "lastIp": "127.0.0.1",
    "gender": "M",
    "emailVerified": true,
    "phoneVerified": true,
    "passwordLastSetAt": "2022-07-03T02:20:30.000Z",
    "birthdate": "2022-06-03",
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
      "userIdInIdp": "oj7Nq05R-RRaqak0_YlMLnnIwsvg",
      "originConnIds": "[\"605492ac41xxxxe0362f0707\"]"
    },
    "customData": {
      "school": "北京大学",
      "age": 22
    },
    "statusChangedAt": "2022-07-03T02:20:30.000Z"
  }
}
```

## 数据结构


### <a id="UpdateUserOptionsDto"></a> UpdateUserOptionsDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| userIdType | string | 否 | 用户 ID 类型，可以指定为用户 ID、手机号、邮箱、用户名和 externalId。。 枚举值：`user_id`,`external_id`,`phone`,`email`,`username`  |
| resetPasswordOnNextLogin | boolean | 否 | 下次登录要求重置密码。   |
| autoGeneratePassword | boolean | 否 | 是否自动生成密码。   |
| sendPasswordResetedNotification |  | 否 | 重置密码发送邮件和手机号选项。嵌套类型：<a href="#SendResetPasswordNotificationDto">SendResetPasswordNotificationDto</a>。 示例值： `{"sendDefaultEmailNotification":false,"sendDefaultPhoneNotification":false,"inputSendEmailNotification":"test@example.com","inputSendPhoneNotification":"136xxxx1234","appId":"app1"}`  |


### <a id="SendResetPasswordNotificationDto"></a> SendResetPasswordNotificationDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| sendDefaultEmailNotification | boolean | 否 | 重置密码之后，是否发送用户默认邮件通知。   |
| sendDefaultPhoneNotification | boolean | 否 | 重置密码之后，是否发送用户默认短信通知。   |
| inputSendEmailNotification | string | 否 | 当用户密码修改之后，输入发送邮箱。 示例值： `test@example.com`  |
| inputSendPhoneNotification | string | 否 | 当用户密码修改之后，输入发送手机号。 示例值： `183xxxx1234`  |
| appId | string | 否 | 发送登录地址时，指定的应用 id，会将此应用的登录地址发送给用户的邮箱或者手机号。默认为用户池应用面板的登录地址。。 示例值： `appid1`  |


### <a id="UserDto"></a> UserDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| userId | string | 是 | 用户 ID。 示例值： `6229ffaxxxxxxxxcade3e3d9`  |
| createdAt | string | 是 | 账号创建时间。 示例值： `2022-07-03T02:20:30.000Z`  |
| updatedAt | string | 是 | 账号更新时间。 示例值： `2022-07-03T02:20:30.000Z`  |
| status | string | 是 | 账户当前状态。 枚举值：`Suspended`,`Resigned`,`Activated`,`Archived`,`Deactivated`  |
| email | string | 否 | 邮箱，不区分大小写。 示例值： `test@example.com`  |
| phone | string | 否 | 手机号，不带区号。如果是国外手机号，请在 phoneCountryCode 参数中指定区号。。 示例值： `188xxxx8888`  |
| phoneCountryCode | string | 否 | 手机区号，中国大陆手机号可不填。Authing 短信服务暂不内置支持国际手机号，你需要在 Authing 控制台配置对应的国际短信服务。完整的手机区号列表可参阅 https://en.wikipedia.org/wiki/List_of_country_calling_codes。。 示例值： `+86`  |
| username | string | 否 | 用户名，用户池内唯一。 示例值： `bob`  |
| name | string | 否 | 用户真实名称，不具备唯一性。 示例值： `张三`  |
| nickname | string | 否 | 昵称。 示例值： `张三`  |
| photo | string | 否 | 头像链接。 示例值： `https://files.authing.co/authing-console/default-user-avatar.png`  |
| loginsCount | number | 否 | 历史总登录次数。 示例值： `3`  |
| lastLogin | string | 否 | 上次登录时间。 示例值： `2022-07-03T02:20:30.000Z`  |
| lastIp | string | 否 | 上次登录 IP。 示例值： `127.0.0.1`  |
| gender | string | 是 | 性别。 枚举值：`M`,`F`,`U`  |
| emailVerified | boolean | 是 | 邮箱是否验证。 示例值： `true`  |
| phoneVerified | boolean | 是 | 手机号是否验证。 示例值： `true`  |
| passwordLastSetAt | string | 否 | 用户上次密码修改时间。 示例值： `2022-07-03T02:20:30.000Z`  |
| birthdate | string | 否 | 出生日期。 示例值： `2022-06-03`  |
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
| customData | object | 否 | 用户的扩展字段数据。 示例值： `{"school":"北京大学","age":22}`  |
| statusChangedAt | string | 否 | 用户状态上次修改时间。 示例值： `2022-07-03T02:20:30.000Z`  |


### <a id="IdentityDto"></a> IdentityDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| identityId | string | 是 | 身份源 ID。 示例值： `62299d8b866d2dab79a89dc4`  |
| extIdpId | string | 是 | 身份源连接 ID。 示例值： `6076bacxxxxxxxxd80d993b5`  |
| provider | string | 是 | 外部身份源类型：
- `wechat`: 微信
- `qq`: QQ
- `wechatwork`: 企业微信
- `dingtalk`: 钉钉
- `weibo`: 微博
- `github`: GitHub
- `alipay`: 支付宝
- `baidu`: 百度
- `lark`: 飞书
- `welink`: Welink
- `yidun`: 网易易盾
- `qingcloud`: 青云
- `google`: Google
- `gitlab`: GitLab
- `gitee`: Gitee
- `twitter`: Twitter
- `facebook`: Facebook
- `slack`: Slack
- `linkedin`: Linkedin
- `instagram`: Instagram
- `oidc`: OIDC 型企业身份源
- `oauth2`: OAuth2 型企业身份源
- `saml`: SAML 型企业身份源
- `ldap`: LDAP 型企业身份源
- `ad`: AD 型企业身份源
- `cas`: CAS 型企业身份源
- `azure-ad`: Azure AD 型企业身份源
    。 枚举值：`oidc`,`oauth2`,`saml`,`ldap`,`ad`,`cas`,`azure-ad`,`wechat`,`google`,`qq`,`wechatwork`,`dingtalk`,`weibo`,`github`,`alipay`,`apple`,`baidu`,`lark`,`gitlab`,`twitter`,`facebook`,`slack`,`linkedin`,`yidun`,`qingcloud`,`gitee`,`instagram`,`welink`  |
| type | string | 是 | Identity 类型，如 unionid, openid, primary。 示例值： `openid`  |
| userIdInIdp | string | 是 | 在外部身份源中的 ID。 示例值： `oj7Nq05R-RRaqak0_YlMLnnIwsvg`  |
| originConnIds | array | 是 | 身份来自的身份源连接 ID 列表。 示例值： `["605492ac41xxxxe0362f0707"]`  |


