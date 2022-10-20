# 获取/搜索用户列表

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />


此接口用于获取用户列表，支持模糊搜索，以及通过用户基础字段、用户自定义字段、用户所在部门、用户历史登录应用等维度筛选用户。

### 模糊搜素示例

模糊搜索默认会从 `phone`, `email`, `name`, `username`, `nickname` 五个字段对用户进行模糊搜索，你也可以通过设置 `options.fuzzySearchOn`
决定模糊匹配的字段范围：

```json
{
  "query": "北京",
  "options": {
    "fuzzySearchOn": [
      "address"
    ]
  }
}
```

### 高级搜索示例

你可以通过 `advancedFilter` 进行高级搜索，高级搜索支持通过用户的基础信息、自定义数据、所在部门、用户来源、登录应用、外部身份源信息等维度对用户进行筛选。
**且这些筛选条件可以任意组合。**

#### 筛选状态为禁用的用户

用户状态（`status`）为字符串类型，可选值为 `Activated` 和 `Suspended`： 

```json
{
  "advancedFilter": [
    {
      "field": "status",
      "operator": "EQUAL",
      "value": "Suspended"
    }
  ]
}
```

#### 筛选邮箱中包含 `@example.com` 的用户

用户邮箱（`email`）为字符串类型，可以进行模糊搜索：

```json
{
  "advancedFilter": [
    {
      "field": "email",
      "operator": "CONTAINS",
      "value": "@example.com"
    }
  ]
}
```

#### 根据用户的任意扩展字段进行搜索

```json
{
  "advancedFilter": [
    {
      "field": "some-custom-key",
      "operator": "EQUAL",
      "value": "some-value"
    }
  ]
}
```

#### 根据用户登录次数筛选

筛选登录次数大于 10 的用户：

```json
{
  "advancedFilter": [
    {
      "field": "loginsCount",
      "operator": "GREATER",
      "value": 10
    }
  ]
}
```

筛选登录次数在 10 - 100 次的用户：

```json
{
  "advancedFilter": [
    {
      "field": "loginsCount",
      "operator": "BETWEEN",
      "value": [10, 100]
    }
  ]
}
```

#### 根据用户上次登录时间进行筛选

筛选最近 7 天内登录过的用户：

```json
{
  "advancedFilter": [
    {
      "field": "lastLoginTime",
      "operator": "GREATER",
      "value": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    }
  ]
}
```

筛选在某一段时间内登录过的用户：

```json
{
  "advancedFilter": [
    {
      "field": "lastLoginTime",
      "operator": "BETWEEN",
      "value": [
        new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      ]
    }
  ]
}
```

#### 根据用户曾经登录过的应用筛选

筛选出曾经登录过应用 `appId1` 或者 `appId2` 的用户：

```json
{
  "advancedFilter": [
    {
      "field": "loggedInApps",
      "operator": "IN",
      "value": [
        "appId1",
        "appId2"
      ]
    }
  ]
}
```

#### 根据用户所在部门进行筛选

```json
{
  "advancedFilter": [
    {
      "field": "department",
      "operator": "IN",
      "value": [
        {
          "organizationCode": "steamory",
          "departmentId": "root",
          "departmentIdType": "department_id",
          "includeChildrenDepartments": true
        }
      ]
    }
  ]
}
```

  

## 请求参数

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:60px">默认值</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- | ---- | ---- | ---- | ---- | ---- |
| query | string | 否 | - | 模糊搜索关键字  | `test` |
| advancedFilter | <a href="#ListUsersAdvancedFilterItemDto">ListUsersAdvancedFilterItemDto[]</a> | 否 | - | 高级搜索  |  |
| options | <a href="#ListUsersOptionsDto">ListUsersOptionsDto</a> | 否 | - | 可选项  |  |


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
  const result = await managementClient.listUsers({
    query: 'test',
    advancedFilter: [{
            field: 'nickname',
          operator: 'EQUAL',
          value: test,
      }],
    options: {
          pagination: {
          page: 1,
        limit: 10,
    },
        sort: [{
            field: 'loginsCount',
          order: 'desc',
      }],
        fuzzySearchOn: phone,email,name,username,nickname,
        withCustomData: true,
        withIdentities: true,
        withDepartmentIds: true,
    },
 });
})();
```
 -->


## 请求响应

类型： `UserPaginatedRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |
| data | <a href="#UserPagingDto">UserPagingDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "requestId": "934108e5-9fbf-4d24-8da1-c330328abd6c",
  "data": {
    "list": {
      "userId": "6229ffaxxxxxxxxcade3e3d9",
      "createdAt": "2022-07-03T02:20:30.000Z",
      "updatedAt": "2022-07-03T02:20:30.000Z",
      "status": "Activated",
      "externalId": "10010",
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
      "company": "steamory",
      "browser": "Mozilla/5.0 (Linux; Android 10; V2001A; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/87.0.4280.141 Mobile Safari/537.36 VivoBrowser/10.2.10.0",
      "device": "iOS",
      "givenName": "三",
      "familyName": "张",
      "userSourceType": "register",
      "passwordSecurityLevel": 1,
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
}
```

## 数据结构


### <a id="ListUsersAdvancedFilterItemDto"></a> ListUsersAdvancedFilterItemDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| field | string | 是 | 高级搜索指定的用户字段：<br>- `id`: 用户 ID<br>- `phone`: 手机号   <br>- `email`: 邮箱<br>- `username`: 用户名<br>- `externalId`: 用户在外部系统的 ID<br>- `name`: 姓名<br>- `status`: 用户状态，可选值为 `Activated` 和 `Suspended`<br>- `gender`: 用户性别，可选值为 `M`（男性）、`F`（女性） 和 `U`（未知）<br>- `birthdate`: 出生日期<br>- `givenName`: 名<br>- `familyName`: 姓<br>- `preferredUsername`: Preferred Username<br>- `profile`: 个人资料<br>- `country`: 国家<br>- `province`: 省份<br>- `zoneinfo`: 时区<br>- `website`: 个人网站<br>- `address`: 地址<br>- `streetAddress`: 街道地址<br>- `company`: 公司<br>- `postalCode`: 邮政编码<br>- `formatted`: 格式化的地址<br>- `signedUp`: 注册时间<br>- `locale`: 语言信息<br>- `lastLoginTime`: 上次登录时间，为日期类型<br>- `loginsCount`: 登录次数，为数字类型<br>- `lastLoginApp`: 上次登录的应用 ID<br>- `userSource`: 用户来源，具体使用见示例<br>- `department`: 用户部门，具体使用见示例<br>- `loggedInApps`: 曾经登录过的应用，具体使用见示例<br>- `identity`: 用户外部身份源信息，具体使用见示例<br>- ... 其他自定义字段<br>   |  `nickname` |
| operator | string | 是 | 运算符，可选值为：<br>- `EQUAL`: 全等，适用于数字和字符串的全等匹配<br>- `NOT_EQUAL`: 不等于，适用于数字和字符串的匹配<br>- `CONTAINS`: 字符串包含<br>- `NOT_CONTAINS`: 字符串不包含<br>- `IS_NULL`: 为空<br>- `NOT_NULL`: 不为空<br>- `IN`: 为某个数组中的元素<br>- `GREATER`: 大于或等于，适用于数字、日期类型数据的比较<br>- `LESSER`: 小于或等于，适用于数字、日期类型数据的比较<br>- `BETWEEN`: 介于什么什么之间，适用于数字、日期类型数据的比较<br>       | EQUAL |
| value | object | 否 | 搜索值，不同的 `field` 对应的 `value` 类型可能不一样，详情见示例。   |  `test` |


### <a id="ListUsersOptionsDto"></a> ListUsersOptionsDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| pagination |  | 否 | 分页配置 嵌套类型：<a href="#PaginationDto">PaginationDto</a>。  |  `{"page":1,"limit":10}` |
| sort | array | 否 | 排序设置，可以设置多项按照多个字段进行排序 嵌套类型：<a href="#SortingDto">SortingDto</a>。  |  `[{"field":"createdAt","direction":"desc"},{"field":"loginsCount","direction":"desc"}]` |
| fuzzySearchOn | array | 否 | 模糊搜索匹配的用户字段，可选值为：<br>- `phone`: 用户手机号，不能包含手机号区号，默认包含<br>- `email`: 用户邮箱，默认包含<br>- `name`: 用户名称，默认包含<br>- `username`: 用户名，默认包含<br>- `nickname`: 用户昵称，默认包含<br>- `id`: 用户 ID<br>- `company`: 公司<br>- `givenName`: 名<br>- `familyName`: 姓<br>- `middleName`: 中间名<br>- `preferredUsername`: Preferred Username<br>- `profile`: 个人资料<br>- `website`: 个人网站<br>- `address`: 地址<br>- `formatted`: 格式化地址<br>- `streetAddress`: 街道地址<br>- `postalCode`: 邮编号码<br>   |  |
| withCustomData | boolean | 否 | 是否获取自定义数据   |  `true` |
| withIdentities | boolean | 否 | 是否获取 identities   |  `true` |
| withDepartmentIds | boolean | 否 | 是否获取部门 ID 列表   |  `true` |


### <a id="PaginationDto"></a> PaginationDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| page | number | 否 | 当前页数，从 1 开始   |  `1` |
| limit | number | 否 | 每页数目，最大不能超过 50，默认为 10   |  `10` |


### <a id="SortingDto"></a> SortingDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| field | string | 是 | 进行排序的字段，可选值为：<br>- `createdAt`: 创建时间<br>- `updatedAt`: 修改时间<br>- `email`: 邮箱<br>- `phone`: 手机号<br>- `username`: 用户名<br>- `externalId`: 外部 ID<br>- `status`: 用户状态<br>- `statusChangedAt`: 状态修改时间<br>- `passwordLastSetAt`: 密码修改时间<br>- `loginsCount`: 登录次数<br>- `gender`: 性别<br>- `lastLogin`: 上次登录时间<br>- `userSourceType`: 用户注册来源<br>- `lastMfaTime`: 上次 MFA 认证时间<br>- `passwordSecurityLevel`: 密码安全等级<br>- `phoneCountryCode`: 手机区号<br>- `lastIp`: 上次登录时使用的 IP<br>   | createdAt |
| order | string | 是 | 排序顺序：<br>- `desc`: 按照从大到小降序。<br>- `asc`: 按照从小到大升序。<br>       | desc |


### <a id="UserPagingDto"></a> UserPagingDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| totalCount | number | 是 | 记录总数   |  |
| list | array | 是 | 数据列表 嵌套类型：<a href="#UserDto">UserDto</a>。  |  |


### <a id="UserDto"></a> UserDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| userId | string | 是 | 用户唯一标志，可以是用户 ID、用户名、邮箱、手机号、外部 ID、在外部身份源的 ID。   |  `6229ffaxxxxxxxxcade3e3d9` |
| createdAt | string | 是 | 创建时间   |  `2022-07-03T02:20:30.000Z` |
| updatedAt | string | 是 | 更新时间   |  `2022-07-03T02:20:30.000Z` |
| status | string | 是 | 账户当前状态   | Suspended |
| externalId | string | 否 | 第三方外部 ID   |  `10010` |
| email | string | 否 | 邮箱，不区分大小写   |  `test@example.com` |
| phone | string | 否 | 手机号，不带区号。如果是国外手机号，请在 phoneCountryCode 参数中指定区号。   |  `188xxxx8888` |
| phoneCountryCode | string | 否 | 手机区号，中国大陆手机号可不填。Authing 短信服务暂不内置支持国际手机号，你需要在 Authing 控制台配置对应的国际短信服务。完整的手机区号列表可参阅 https://en.wikipedia.org/wiki/List_of_country_calling_codes。   |  `+86` |
| username | string | 否 | 用户名，用户池内唯一   |  `bob` |
| name | string | 否 | 用户真实名称，不具备唯一性   |  `张三` |
| nickname | string | 否 | 昵称   |  `张三` |
| photo | string | 否 | 头像链接   |  `https://files.authing.co/authing-console/default-user-avatar.png` |
| loginsCount | number | 否 | 历史总登录次数   |  `3` |
| lastLogin | string | 否 | 上次登录时间   |  `2022-07-03T02:20:30.000Z` |
| lastIp | string | 否 | 上次登录 IP   |  `127.0.0.1` |
| gender | string | 是 | 性别:<br>- `M`: 男性，`male`<br>- `F`: 女性，`female`<br>- `U`: 未知，`unknown`<br>     | M |
| emailVerified | boolean | 是 | 邮箱是否验证   |  `true` |
| phoneVerified | boolean | 是 | 手机号是否验证   |  `true` |
| passwordLastSetAt | string | 否 | 用户上次密码修改时间   |  `2022-07-03T02:20:30.000Z` |
| birthdate | string | 否 | 出生日期   |  `2022-06-03` |
| country | string | 否 | 所在国家   |  `CN` |
| province | string | 否 | 所在省份   |  `BJ` |
| city | string | 否 | 所在城市   |  `BJ` |
| address | string | 否 | 所处地址   |  `北京朝阳` |
| streetAddress | string | 否 | 所处街道地址   |  `北京朝阳区 xxx 街道` |
| postalCode | string | 否 | 邮政编码号   |  `438100` |
| company | string | 否 | 所在公司   |  `steamory` |
| browser | string | 否 | 最近一次登录时使用的浏览器 UA   |  `Mozilla/5.0 (Linux; Android 10; V2001A; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/87.0.4280.141 Mobile Safari/537.36 VivoBrowser/10.2.10.0` |
| device | string | 否 | 最近一次登录时使用的设备   |  `iOS` |
| givenName | string | 否 | 名   |  `三` |
| familyName | string | 否 | 姓   |  `张` |
| middleName | string | 否 | 中间名   |  |
| profile | string | 否 | Preferred Username   |  |
| preferredUsername | string | 否 | Preferred Username   |  |
| website | string | 否 | 用户个人网页   |  |
| zoneinfo | string | 否 | 用户时区信息   |  |
| locale | string | 否 | Locale   |  |
| formatted | string | 否 | 标准的完整地址   |  |
| region | string | 否 | 用户所在区域   |  |
| userSourceType | string | 是 | 来源类型:<br>- `excel`: 通过 excel 导入<br>- `register`: 用户自主注册<br>- `adminCreated`: 管理员后台手动创建（包含使用管理 API 创建用户 ）<br>- `syncTask`: 同步中心的同步任务  <br>   | excel |
| userSourceId | string | 否 | 应用 ID 或者同步任务 ID   |  |
| lastLoginApp | string | 否 | 用户上次登录的应用 ID   |  |
| mainDepartmentId | string | 否 | 用户主部门 ID   |  |
| lastMfaTime | string | 否 | 用户上次进行 MFA 认证的时间   |  |
| passwordSecurityLevel | number | 否 | 用户密码安全强度等级   |  `1` |
| resetPasswordOnNextLogin | boolean | 否 | 下次登录要求重置密码   |  |
| departmentIds | array | 否 | 用户所属部门 ID 列表   |  `["624d930c3xxxx5c08dd4986e","624d93102xxxx012f33cd2fe"]` |
| identities | array | 否 | 外部身份源 嵌套类型：<a href="#IdentityDto">IdentityDto</a>。  |  |
| customData | object | 否 | 用户的扩展字段数据   |  `{"school":"北京大学","age":22}` |
| statusChangedAt | string | 否 | 用户状态上次修改时间   |  `2022-07-03T02:20:30.000Z` |


### <a id="IdentityDto"></a> IdentityDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| identityId | string | 是 | 身份源 ID   |  `62299d8b866d2dab79a89dc4` |
| extIdpId | string | 是 | 身份源连接 ID   |  `6076bacxxxxxxxxd80d993b5` |
| provider | string | 是 | 外部身份源类型：<br>- `wechat`: 微信<br>- `qq`: QQ<br>- `wechatwork`: 企业微信<br>- `dingtalk`: 钉钉<br>- `weibo`: 微博<br>- `github`: GitHub<br>- `alipay`: 支付宝<br>- `baidu`: 百度<br>- `lark`: 飞书<br>- `welink`: Welink<br>- `yidun`: 网易易盾<br>- `qingcloud`: 青云<br>- `google`: Google<br>- `gitlab`: GitLab<br>- `gitee`: Gitee<br>- `twitter`: Twitter<br>- `facebook`: Facebook<br>- `slack`: Slack<br>- `linkedin`: Linkedin<br>- `instagram`: Instagram<br>- `oidc`: OIDC 型企业身份源<br>- `oauth2`: OAuth2 型企业身份源<br>- `saml`: SAML 型企业身份源<br>- `ldap`: LDAP 型企业身份源<br>- `ad`: AD 型企业身份源<br>- `cas`: CAS 型企业身份源<br>- `azure-ad`: Azure AD 型企业身份源<br>       | oidc |
| type | string | 是 | Identity 类型，如 unionid, openid, primary   |  `openid` |
| userIdInIdp | string | 是 | 在外部身份源中的 ID   |  `oj7Nq05R-RRaqak0_YlMLnnIwsvg` |
| originConnIds | array | 是 | 身份来自的身份源连接 ID 列表   |  `["605492ac41xxxxe0362f0707"]` |


