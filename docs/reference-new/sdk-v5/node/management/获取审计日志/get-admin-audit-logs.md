# 获取管理员操作日志

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

可以选择请求 ID、客户端 IP、操作类型、资源类型、管理员用户 ID、请求是否成功、开始时间戳、结束时间戳、分页来获取管理员操作日志接口

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| requestId | string | 否 | - | 请求 ID。   | `xxx` |
| clientIp | string | 否 | - | 客户端 IP。   | `xxx` |
| operationType | string | 否 | - | 操作类型。   | `create` |
| resourceType | string | 否 | - | 资源类型。   | `user` |
| userId | string | 否 | - | 管理员用户 ID。   | `xxx` |
| success | boolean | 否 | - | 请求是否成功。   | `true` |
| start | number | 否 | - | 开始时间戳。   | `11` |
| end | number | 否 | - | 结束时间戳。   | `111` |
| pagination | <a href="#ListWebhooksDto">ListWebhooksDto</a> | 否 | - | 分页。   |  |


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
  const result = await managementClient.getAdminAuditLogs({
    requestId: 'xxx',
    clientIp: 'xxx',
    operationType: 'create',
    resourceType: 'user',
    userId: 'xxx',
    success: true,
    start: 11,
    end: 111,
    pagination: {
          page: 1,
        limit: 10,
    },
 });
})();
```



## 请求响应

类型： `AdminAuditLogRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |
| data | <a href="#AdminAuditLogRespData">AdminAuditLogRespData</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "requestId": "934108e5-9fbf-4d24-8da1-c330328abd6c",
  "data": {
    "totalCount": 1,
    "list": {
      "adminUserId": "xxx",
      "adminUserAvatar": "https://files.authing.co/authing-console/default-app-logo.png",
      "adminUserDisplayName": "张三",
      "clientIp": "127.0.0.1",
      "operationType": "create",
      "resourceType": "user",
      "eventDetail": "修改了集成应用「Discourse」",
      "operationParam": "{\"ext\":{\"_dontFinishNotYet\":true,\"_appName\":\"Discourse\"},\"protocol\":\"oidc\",\"isAsa\":false,\"name\":\"Discourse\",\"oidcConfig\":{\"grant_types\":[\"authorization_code\",\"password\",\"refresh_token\"],\"response_types\":[\"code\"],\"id_token_signed_response_alg\":\"RS256\",\"token_endpoint_auth_method\":\"client_secret_post\",\"introspection_endpoint_auth_method\":\"client_secret_post\",\"revocation_endpoint_auth_method\":\"client\"}",
      "success": true,
      "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
      "parsedUserAgent": {
        "device": "Desktop",
        "browser": "Chrome",
        "os": "Windows"
      },
      "geoip": {
        "location": {
          "lon": 116.3889,
          "lat": 39.9288
        },
        "country_name": "China",
        "country_code2": "CN",
        "country_code3": "CN",
        "region_name": "Beijing",
        "region_code": "BJ",
        "city_name": "Beijing",
        "continent_code": "AS",
        "timezone": "Asia/Shanghai"
      },
      "timestamp": "2022-09-20T08:55:00.188+0800",
      "requestId": "b63b9772-384c-4f2d-981b-01d1feed964d"
    }
  }
}
```

## 数据结构


### <a id="ListWebhooksDto"></a> ListWebhooksDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| page | number | 否 | 当前页数，从 1 开始。  |  `1` |
| limit | number | 否 | 每页数目，最大不能超过 50，默认为 10。  |  `10` |


### <a id="AdminAuditLogRespData"></a> AdminAuditLogRespData

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| totalCount | number | 是 | 记录总数。  |  `1` |
| list | array | 是 | 返回列表。嵌套类型：<a href="#AdminAuditLogDto">AdminAuditLogDto</a>。  |  |


### <a id="AdminAuditLogDto"></a> AdminAuditLogDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| adminUserId | string | 是 | 管理员的用户 ID。  |  `xxx` |
| adminUserAvatar | string | 是 | 管理员用户头像。  |  `https://files.authing.co/authing-console/default-app-logo.png` |
| adminUserDisplayName | string | 是 | 管理员用户显示名称，按照以下用户字段顺序进行展示：nickname > username > name > givenName > familyName -> email -> phone -> id。  |  `张三` |
| clientIp | string | 否 | 客户端 IP，可根据登录时的客户端 IP 进行筛选。默认不传获取所有登录 IP 的登录历史。。  |  `127.0.0.1` |
| operationType | string | 是 | 操作类型：<br>- `create`: 创建<br>- `delete`: 删除<br>- `import`: 导入<br>- `export`: 导出<br>- `update`: 修改<br>- `refresh`: 刷新<br>- `sync`: 同步<br>- `invite`: 邀请<br>- `resign`: 离职<br>- `recover`: 恢复<br>- `disable`: 禁用<br>- `userEnable`: 启用<br>    。  | 可选枚举值：`all`,`create`,`delete`,`import`,`export`,`update`,`refresh`,`sync`,`invite`,`resign`,`recover`,`disable`,`userEnable`,`activate`,`deactivate` |
| resourceType | string | 是 | 事件类型：<br>- `user`: 用户<br>- `userpool`: 用户池<br>- `tenant`: 租户<br>- `userLoginState`: 用户登录态<br>- `userAccountState`: 用户账号状态<br>- `userGroup`: 用户分组<br>- `fieldEncryptState`: 字段加密状态<br>- `syncTask`: 同步任务<br>- `socialConnection`: 社会化身份源<br>- `enterpriseConnection`: 社会化身份源<br>- `customDatabase`: 自定义数据库<br>- `org`: 组织机构<br>- `cooperator`: 协作管理员<br>- `application`: 应用<br>- `resourceNamespace`: 权限分组<br>- `resource`: 资源<br>- `role`: 角色<br>- `roleAssign`: 角色授权<br>- `policy`: 策略<br>    。  | 可选枚举值：`all`,`user`,`userpool`,`tenant`,`userLoginState`,`userAccountState`,`userGroup`,`fieldEncryptState`,`syncTask`,`socialConnection`,`enterpriseConnection`,`customDatabase`,`org`,`cooperator`,`application`,`resourceNamespace`,`resource`,`role`,`roleAssign`,`policy` |
| eventDetail | string | 否 | 事件详情。  |  `修改了集成应用「Discourse」` |
| operationParam | string | 否 | 具体的操作参数。  |  `{"ext":{"_dontFinishNotYet":true,"_appName":"Discourse"},"protocol":"oidc","isAsa":false,"name":"Discourse","oidcConfig":{"grant_types":["authorization_code","password","refresh_token"],"response_types":["code"],"id_token_signed_response_alg":"RS256","token_endpoint_auth_method":"client_secret_post","introspection_endpoint_auth_method":"client_secret_post","revocation_endpoint_auth_method":"client"}` |
| originValue | string | 否 | 原始值。  |  |
| targetValue | string | 否 | 新值。  |  |
| success | boolean | 是 | 是否成功。  |  `true` |
| userAgent | string | 是 | User Agent。  |  `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36` |
| parsedUserAgent |  | 是 | 解析过后的 User Agent。嵌套类型：<a href="#ParsedUserAgent">ParsedUserAgent</a>。  |  |
| geoip |  | 是 | 地理位置。嵌套类型：<a href="#GeoIp">GeoIp</a>。  |  |
| timestamp | string | 是 | 时间。  |  `2022-09-20T08:55:00.188+0800` |
| requestId | string | 是 | 请求 ID。  |  `b63b9772-384c-4f2d-981b-01d1feed964d` |


### <a id="ParsedUserAgent"></a> ParsedUserAgent

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| device | string | 是 | 使用的设备类型。  |  `Desktop` |
| browser | string | 是 | 浏览器名称。  |  `Chrome` |
| os | string | 是 | 操作系统。  |  `Windows` |


### <a id="GeoIp"></a> GeoIp

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| location |  | 是 | 地理位置。嵌套类型：<a href="#GeoIpLocation">GeoIpLocation</a>。  |  |
| country_name | string | 是 | Country Name。  |  `China` |
| country_code2 | string | 是 | Country Code 2。  |  `CN` |
| country_code3 | string | 是 | Country Code 3。  |  `CN` |
| region_name | string | 是 | Region Name。  |  `Beijing` |
| region_code | string | 是 | Region Code。  |  `BJ` |
| city_name | string | 是 | 城市名称。  |  `Beijing` |
| continent_code | string | 是 | Continent Code。  |  `AS` |
| timezone | string | 是 | 时区。  |  `Asia/Shanghai` |


### <a id="GeoIpLocation"></a> GeoIpLocation

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| lon | number | 是 | 经度。  |  `116.3889` |
| lat | number | 是 | 纬度。  |  `39.9288` |


