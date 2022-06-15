# 创建用户

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

创建用户，邮箱、手机号、用户名必须包含其中一个

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 |
| ---- | ---- | ---- | ---- | ---- |
| status | string | 否 | Activated | 账户当前状态。 枚举值：`Deleted`,`Suspended`,`Resigned`,`Activated`,`Archived` |
| email | string | 否 |  | 邮箱。 示例值： `test@example.com` |
| passwordEncryptType | string | 否 | none | 加密类型。 枚举值：`sm2`,`rsa`,`none` |
| phone | string | 否 |  | 手机号。 示例值： `176xxxx6754` |
| phoneCountryCode | string | 否 |  | 手机区号。 示例值： `+86` |
| username | string | 否 |  | 用户名，用户池内唯一。 示例值： `bob` |
| name | string | 否 |  | 用户真实名称，不具备唯一性。 示例值： `张三` |
| nickname | string | 否 |  | 昵称。 示例值： `张三` |
| photo | string | 否 |  | 头像链接。 示例值： `https://files.authing.co/authing-console/default-user-avatar.png` |
| gender | string | 否 | U | 性别。 枚举值：`M`,`W`,`U` |
| emailVerified | boolean | 否 |  | 邮箱是否验证。 示例值： `true` |
| phoneVerified | boolean | 否 |  | 手机号是否验证。 示例值： `true` |
| birthdate | string | 否 |  | 出生日期。 示例值： `2022-06-15` |
| country | string | 否 |  | 所在国家。 示例值： `CN` |
| province | string | 否 |  | 所在省份。 示例值： `BJ` |
| city | string | 否 |  | 所在城市。 示例值： `BJ` |
| address | string | 否 |  | 所处地址。 示例值： `北京朝阳` |
| streetAddress | string | 否 |  | 所处街道地址。 示例值： `北京朝阳区 xxx 街道` |
| postalCode | string | 否 |  | 邮政编码号。 示例值： `438100` |
| externalId | string | 否 |  | 第三方外部 ID。 示例值： `10010` |
| departmentIds | string[] | 否 |  | 用户所属部门 ID 列表。 示例值： `["624d930c3xxxx5c08dd4986e","624d93102xxxx012f33cd2fe"]` |
| customData | object | 否 |  | 自定义数据，传入的对象中的 key 必须先在用户池定义相关自定义字段。 示例值： `{"school":"北京大学","age":22}` |
| password | string | 否 |  | 密码。可选加密方式进行加密，默认为未加密。 示例值： `oqw5bhVmlDwF5qqeVA645bICyMVfFaV3sf3ZTrk5Npcm5dTOmBVo1anyZ5JLfHAz/P45r0QTPo8xS1YdKxIrshx4Ju+g04s9SQqW30ebdVdqcOntIJGAXU6arrkPvfcRFV3ZVTwBdgdRWHMkr5sTcnGNYdgL67P9/jHnzltkLbY=` |
| tenantIds | string[] | 否 |  | 租户 ID。  |
| identities | <a href="#CreateIdentityDto">CreateIdentityDto[]</a> | 否 |  | 第三方身份源（建议调用绑定接口进行绑定）。 示例值： `{"extIdpId":"6076bacxxxxxxxxd80d993b5","provider":"wechat","type":"openid","userIdInIdp":"oj7Nq05R-RRaqak0_YlMLnnIwsvg"}` |
| options | <a href="#CreateUserOptionsDto">CreateUserOptionsDto</a> | 否 |  | 附加选项。  |


## 示例代码

```java
import cn.authing.sdk.java.dto.*;
import cn.authing.sdk.java.client.ManagementClient;
import cn.authing.sdk.java.model.ManagementClientOptions;

class ManagementClientTest {
    private static String ACCESS_KEY_ID = "AUTHING_USERPOOL_ID";
    private static String ACCESS_KEY_SECRET = "AUTHING_USERPOOL_SECRET";

    public static void main(String[] args) {
        ManagementClientOptions clientOptions = new ManagementClientOptions(ACCESS_KEY_ID, ACCESS_KEY_SECRET);
        ManagementClient managementClient = new ManagementClient(clientOptions);
    
        CreateUserReqDto request = new CreateUserReqDto();
        request.setStatus(CreateUserReqDto.status.ACTIVATED);
        request.setEmail("test@example.com");
        request.setPasswordEncryptType(CreateUserReqDto.passwordEncryptType.NONE);
        request.setPhone("176xxxx6754");
        request.setPhoneCountryCode("+86");
        request.setUsername("bob");
        request.setName("张三");
        request.setNickname("张三");
        request.setPhoto("https://files.authing.co/authing-console/default-user-avatar.png");
        request.setGender(CreateUserReqDto.gender.M);
        request.setEmailVerified(true);
        request.setPhoneVerified(true);
        request.setBirthdate("2022-06-15");
        request.setCountry("CN");
        request.setProvince("BJ");
        request.setCity("BJ");
        request.setAddress("北京朝阳");
        request.setStreetAddress("北京朝阳区 xxx 街道");
        request.setPostalCode("438100");
        request.setExternalId("10010");
        request.setDepartmentIds(new List<String>("624d930c3xxxx5c08dd4986e","624d93102xxxx012f33cd2fe",));
        request.setCustomData(new CreateUserReqDto.setSchool("北京大学",.setAge(age22,));
        request.setPassword("oqw5bhVmlDwF5qqeVA645bICyMVfFaV3sf3ZTrk5Npcm5dTOmBVo1anyZ5JLfHAz/P45r0QTPo8xS1YdKxIrshx4Ju+g04s9SQqW30ebdVdqcOntIJGAXU6arrkPvfcRFV3ZVTwBdgdRWHMkr5sTcnGNYdgL67P9/jHnzltkLbY=");
        request.setTenantIds(new List<String>());
            Identities= new List<CreateIdentityDto>(
                    new CreateIdentityDto().set

               request.setExtIdpId("6076bacxxxxxxxxd80d993b5");
      request.setProvider("wechat");
      request.setType("openid");
      request.setUserIdInIdp("oj7Nq05R-RRaqak0_YlMLnnIwsvg");
      
                  ),
            Options= new CreateUserOptionsDto(
                    request.setKeepPassword(false);
    request.setResetPasswordOnFirstLogin(false);
    request.setDepartmentIdType(CreateUserOptionsDto.departmentIdType.DEPARTMENT_ID);
        ),
        
        UserSingleRespDto response = managementClient.createUser(request);
        System.out.println(response);
    }
}
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
  "apiCode": 20001,
  "data": {
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
    "birthdate": "2022-06-15",
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
```

## 数据结构


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
| resetPasswordOnFirstLogin | boolean | 否 | 是否强制要求用户在第一次的时候重置密码。   |
| departmentIdType | string | 否 | 此次调用中使用的父部门 ID 的类型。 枚举值：`department_id`,`open_department_id`  |


### <a id="UserDto"></a> UserDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| userId | string | 是 | 用户 ID。 示例值： `6229ffaxxxxxxxxcade3e3d9`  |
| createdAt | string | 是 | 账号创建时间。   |
| status | string | 是 | 账户当前状态。 枚举值：`Deleted`,`Suspended`,`Resigned`,`Activated`,`Archived`  |
| email | string | 否 | 邮箱。 示例值： `test@example.com`  |
| phone | string | 否 | 手机号。 示例值： `176xxxx6754`  |
| phoneCountryCode | string | 否 | 手机区号。 示例值： `+86`  |
| username | string | 否 | 用户名，用户池内唯一。 示例值： `bob`  |
| name | string | 否 | 用户真实名称，不具备唯一性。 示例值： `张三`  |
| nickname | string | 否 | 昵称。 示例值： `张三`  |
| photo | string | 否 | 头像链接。 示例值： `https://files.authing.co/authing-console/default-user-avatar.png`  |
| loginsCount | number | 否 | 历史总登录次数。 示例值： `3`  |
| lastLogin | string | 否 | 上次登录时间。 示例值： `2022-04-10T20:24:00.000Z`  |
| lastIp | string | 否 | 上次登录 IP。 示例值： `127.0.0.1`  |
| gender | string | 是 | 性别。 枚举值：`M`,`W`,`U`  |
| emailVerified | boolean | 是 | 邮箱是否验证。 示例值： `true`  |
| phoneVerified | boolean | 是 | 手机号是否验证。 示例值： `true`  |
| birthdate | string | 否 | 出生日期。 示例值： `2022-06-15`  |
| country | string | 否 | 所在国家。 示例值： `CN`  |
| province | string | 否 | 所在省份。 示例值： `BJ`  |
| city | string | 否 | 所在城市。 示例值： `BJ`  |
| address | string | 否 | 所处地址。 示例值： `北京朝阳`  |
| streetAddress | string | 否 | 所处街道地址。 示例值： `北京朝阳区 xxx 街道`  |
| postalCode | string | 否 | 邮政编码号。 示例值： `438100`  |
| externalId | string | 否 | 第三方外部 ID。 示例值： `10010`  |
| departmentIds | array | 否 | 用户所属部门 ID 列表。 示例值： `["624d930c3xxxx5c08dd4986e","624d93102xxxx012f33cd2fe"]`  |
| identities | array | 否 | 外部身份源。嵌套类型：<a href="#IdentityDto">IdentityDto</a>。   |
| customData | object | 否 | 自定义数据，传入的对象中的 key 必须先在用户池定义相关自定义字段。 示例值： `[object Object]`  |


### <a id="IdentityDto"></a> IdentityDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| identityId | string | 是 | Identity ID。 示例值： `62299d8b866d2dab79a89dc4`  |
| extIdpId | string | 是 | 外部身份源的 ID。 示例值： `6076bacxxxxxxxxd80d993b5`  |
| provider | string | 是 | 外部身份源类型，如 lark, wechat。 示例值： `wechat`  |
| type | string | 是 | Identity 类型，如 unionid, openid, primary。 示例值： `openid`  |
| userIdInIdp | string | 是 | 在外部身份源的 id。 示例值： `oj7Nq05R-RRaqak0_YlMLnnIwsvg`  |


