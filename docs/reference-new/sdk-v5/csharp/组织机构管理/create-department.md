# 创建部门

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

创建部门

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| organizationCode | string | 是 | - | 组织 Code（organizationCode）。  | `steamory` |
| openDepartmentId | string | 否 | - | 自定义部门 ID，用于存储自定义的 ID。  | `ou_7dab8a3d3cdccxxxxxx777c7ad535d62` |
| name | string | 是 | - | 部门名称。  | `开发部` |
| description | string | 否 | - | 部门描述。  | `技术研发部门` |
| parentDepartmentId | string | 是 | - | 父部门 id。  | `6229c4deb3e4d8a20b6021ff` |
| code | string | 否 | - | 部门识别码。  | `6229c4deb3e4d8a20b6021ff` |
| isVirtualNode | boolean | 否 | - | 是否是虚拟部门。  |  |
| i18n | <a href="#I18nDto">I18nDto</a> | 否 | - | 多语言设置。  | `{"name":{"zh-CN":{"enabled":false,"value":"中文"},"en-US":{"enabled":false,"value":"English"}}}` |
| customData | object | 否 | - | 部门的扩展字段数据。  | `{"icon":"https://example.com/logo"}` |
| departmentIdType | string | 否 | department_id | 此次调用中使用的父部门 ID 的类型。 枚举值：`department_id`,`open_department_id` | `department_id` |


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
        
          DepartmentSingleRespDto  result = await managementClient.CreateDepartment
          (  new CreateDepartmentReqDto{                  OrganizationCode= "steamory" ,
                  OpenDepartmentId= "ou_7dab8a3d3cdccxxxxxx777c7ad535d62" ,
                  Name= "开发部" ,
                  Description= "技术研发部门" ,
                  ParentDepartmentId= "6229c4deb3e4d8a20b6021ff" ,
                  Code= "6229c4deb3e4d8a20b6021ff" ,
                  IsVirtualNode= false ,
                I18n= new I18nDto
                {
                        Name= new LangObject
                {
                        Zh-CN= new LangUnit
                {
                          Enabled= false ,
          Value= false ,
        },
        En-US= new LangUnit
                {
                          Enabled= false ,
          Value= false ,
        },
        },
        },
                  CustomData= new CreateDepartmentReqDto{    icon="https://example.com/logo",} ,
                  DepartmentIdType= CreateDepartmentReqDto.departmentIdType.DEPARTMENT_ID ,
            }
          );
        }
    }
}

```



## 请求响应

类型： `DepartmentSingleRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#DepartmentDto">DepartmentDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "apiCode": 20001,
  "data": {
    "organizationCode": "steamory",
    "departmentId": "60b49eb83fd80adb96f26e68",
    "createdAt": "2022-07-06T01:04:42.702Z",
    "openDepartmentId": "ou_7dab8a3d3cdccxxxxxx777c7ad535d62",
    "name": "开发部",
    "leaderUserIds": "[\"60b49eb83fd80adb96f26e68\"]",
    "description": "技术研发部门",
    "parentDepartmentId": "6229c4deb3e4d8a20b6021ff",
    "code": "6229c4deb3e4d8a20b6021ff",
    "membersCount": 11,
    "hasChildren": true,
    "i18n": {
      "name": {
        "zh-CN": {
          "enabled": false,
          "value": "中文"
        },
        "en-US": {
          "enabled": false,
          "value": "English"
        }
      }
    },
    "customData": {
      "icon": "https://example.com/logo"
    }
  }
}
```

## 数据结构


### <a id="I18nDto"></a> I18nDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| name |  | 是 | 支持多语言的字段。嵌套类型：<a href="#LangObject">LangObject</a>。 示例值： `[object Object]`  |


### <a id="LangObject"></a> LangObject

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| zh-CN |  | 是 | 多语言的中文内容。嵌套类型：<a href="#LangUnit">LangUnit</a>。 示例值： `[object Object]`  |
| en-US |  | 是 | 多语言的英文内容。嵌套类型：<a href="#LangUnit">LangUnit</a>。 示例值： `[object Object]`  |


### <a id="LangUnit"></a> LangUnit

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| enabled | boolean | 是 | 是否已开启。若开启，且控制台选择该语言，则展示该内容。（默认关闭）。   |
| value | boolean | 是 | 多语言内容。   |


### <a id="DepartmentDto"></a> DepartmentDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| organizationCode | string | 是 | 组织 Code（organizationCode）。 示例值： `steamory`  |
| departmentId | string | 是 | 部门系统 ID（为 Authing 系统自动生成，不可修改）。 示例值： `60b49eb83fd80adb96f26e68`  |
| createdAt | string | 是 | 部门创建时间。 示例值： `2022-07-06T01:04:42.702Z`  |
| openDepartmentId | string | 否 | 自定义部门 ID，用于存储自定义的 ID。 示例值： `ou_7dab8a3d3cdccxxxxxx777c7ad535d62`  |
| name | string | 是 | 部门名称。 示例值： `开发部`  |
| leaderUserIds | array | 否 | 部门负责人 ID。 示例值： `["60b49eb83fd80adb96f26e68"]`  |
| description | string | 否 | 部门描述。 示例值： `技术研发部门`  |
| parentDepartmentId | string | 是 | 父部门 id。 示例值： `6229c4deb3e4d8a20b6021ff`  |
| code | string | 否 | 部门识别码。 示例值： `6229c4deb3e4d8a20b6021ff`  |
| membersCount | number | 是 | 部门人数（仅包含直属成员）。 示例值： `11`  |
| hasChildren | boolean | 是 | 是否包含子部门。 示例值： `true`  |
| isVirtualNode | boolean | 否 | 是否是虚拟部门。   |
| i18n |  | 否 | 多语言设置。嵌套类型：<a href="#I18nDto">I18nDto</a>。 示例值： `[object Object]`  |
| customData | object | 否 | 部门的扩展字段数据。 示例值： `[object Object]`  |


### <a id="I18nDto"></a> I18nDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| name |  | 是 | 支持多语言的字段。嵌套类型：<a href="#LangObject">LangObject</a>。 示例值： `[object Object]`  |


### <a id="LangObject"></a> LangObject

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| zh-CN |  | 是 | 多语言的中文内容。嵌套类型：<a href="#LangUnit">LangUnit</a>。 示例值： `[object Object]`  |
| en-US |  | 是 | 多语言的英文内容。嵌套类型：<a href="#LangUnit">LangUnit</a>。 示例值： `[object Object]`  |


### <a id="LangUnit"></a> LangUnit

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| enabled | boolean | 是 | 是否已开启。若开启，且控制台选择该语言，则展示该内容。（默认关闭）。   |
| value | boolean | 是 | 多语言内容。   |


