# 创建同步任务

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

创建同步任务

## 请求参数

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:60px">默认值</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- | ---- | ---- | ---- | ---- | ---- |
| fieldMapping | <a href="#SyncTaskFieldMapping">SyncTaskFieldMapping[]</a> | 是 | - | 字段映射配置  |  |
| syncTaskTrigger | string | 是 | - | 同步任务触发类型：<br>- `manually`: 手动触发执行<br>- `timed`: 定时触发<br>- `automatic`: 根据事件自动触发<br>  | `manually` |
| syncTaskFlow | string | 是 | - | 同步任务数据流向：<br>- `upstream`: 作为上游，将数据同步到 Authing<br>- `downstream`: 作为下游，将 Authing 数据同步到此系统<br>      | `upstream` |
| clientConfig | <a href="#SyncTaskClientConfig">SyncTaskClientConfig</a> | 是 | - | 同步任务配置信息  |  |
| syncTaskType | string | 是 | - | 同步任务类型:<br>- `lark`: 飞书<br>- `lark-international`: 飞书国际版<br>- `wechatwork`: 企业微信<br>- `dingtalk`: 钉钉<br>- `active-directory`: Windows AD<br>- `ldap`: LDAP<br>- `italent`: 北森<br>- `maycur`: 每刻报销<br>- `moka`: Moka<br>- `fxiaoke`: 纷享销客<br>- `xiaoshouyi`: 销售易<br>- `kayang`: 嘉扬 HR<br>- `scim`: 自定义同步源<br>      | `lark` |
| syncTaskName | string | 是 | - | 同步任务名称  | `我的飞书同步任务` |
| organizationCode | string | 否 | - | 此同步任务绑定的组织机构。针对上游同步，需执行一次同步任务之后才会绑定组织机构；针对下游同步，创建同步任务的时候就需要设置。  | `steamory` |
| provisioningScope | <a href="#SyncTaskProvisioningScope">SyncTaskProvisioningScope</a> | 否 | - | 同步范围，**只针对下游同步任务有效**。为空表示同步整个组织机构。  |  |
| timedScheduler | <a href="#SyncTaskTimedScheduler">SyncTaskTimedScheduler</a> | 否 | - | 定时同步时间设置  |  |


<!-- 暂时不显示示例代码 -->
<!-- ## 示例代码
```java
import cn.authing.sdk.java.dto.*;
import cn.authing.sdk.java.client.ManagementClient;
import cn.authing.sdk.java.model.ManagementClientOptions;

class Test {
    private static String ACCESS_KEY_ID = "AUTHING_USERPOOL_ID";
    private static String ACCESS_KEY_SECRET = "AUTHING_USERPOOL_SECRET";

    public static void main(String[] args) {
        ManagementClientOptions clientOptions = new ManagementClientOptions(ACCESS_KEY_ID, ACCESS_KEY_SECRET);
        ManagementClient managementClient = new ManagementClient(clientOptions);
    
        CreateSyncTaskDto request = new CreateSyncTaskDto();
        request.setSyncTaskName("我的飞书同步任务");
        request.setSyncTaskType(CreateSyncTaskDto.syncTaskType.LARK);
            ClientConfig= new SyncTaskClientConfig(
                        LarkConfig= new SyncTaskLarkClientConfig(
                    request.setApp_id("");
    request.setApp_secret("");
    request.setEncrypt_key("");
    request.setVerification_token("");
        ),
        LarkInternationalConfig= new SyncTaskLarkClientConfig(
                    request.setApp_id("");
    request.setApp_secret("");
    request.setEncrypt_key("");
    request.setVerification_token("");
        ),
        WechatworkConfig= new SyncTaskWechatworkClientConfig(
                    request.setCorpID("");
    request.setSecret("");
    request.setToken("");
    request.setEncodingAESKey("");
    request.setAgentUrl("");
        ),
        DingtalkConfig= new SyncTaskDingtalkClientConfig(
                    request.setCorpId("");
    request.setAppKey("");
    request.setAppSecret("");
    request.setAes_key("");
    request.setToken("");
        ),
        MokaConfig= new SyncTaskMokaClientConfig(
                    request.setUserName("");
    request.setEntCode("");
    request.setApiCode_employee("");
    request.setApiCode_department("");
    request.setPrivateKey("");
        ),
        ScimConfig= new SyncTaskScimClientConfig(
                    request.setOrg_url("");
    request.setUser_url("");
    request.setToken("");
    request.setRoot_department_id("");
    request.setParent_department("");
    request.setDepartment("");
        ),
        ActiveDirectoryConfig= new SyncTaskActiveDirectoryClientConfig(
                    request.setSyncIdentityProviderCode("");
    request.setTicket_url("");
        ),
        LdapConfig= new SyncTaskLdapClientConfig(
                    request.setUrl("");
    request.setBindDn("");
    request.setBindCredentials("");
    request.setUsersBaseDn("");
    request.setGroupsBaseDn("");
    request.setUserQueryCriteria("(|(objectclass=orgnizationPerson)(objectclass=person))");
    request.setDepartmentQueryCriteria("(|(objectClass=organization)(objectClass=organizationalunit)(objectClass=domain))");
        ),
        ItalentConfig= new SyncTaskItalentClientConfig(
                    request.setTenant_id("");
    request.setApp_key("");
    request.setApp_secret("");
        ),
        MaycurConfig= new SyncTaskMaycurClientConfig(
                    request.setApp_code("");
    request.setApp_secret("");
    request.setEndpoint("");
        ),
        FxiaokeConfig= new SyncTaskFxiaokeClientConfig(
                    request.setAppId("");
    request.setAppSecret("");
    request.setPermanentCode("");
    request.setCurrentOpenUserId("");
        ),
        XiaoshouyiConfig= new SyncTaskXiaoshouyiClientConfig(
                    request.setClient_id("");
    request.setClient_secret("");
    request.setUsername("");
    request.setPassword("");
        ),
        KayangConfig= new SyncTaskKayangClientConfig(
                    request.setEndpoint("");
    request.setAccount("");
    request.setPassword("");
        ),
        ),
        request.setSyncTaskFlow(CreateSyncTaskDto.syncTaskFlow.UPSTREAM);
        request.setSyncTaskTrigger(CreateSyncTaskDto.syncTaskTrigger.MANUALLY);
        request.setOrganizationCode("steamory");
            ProvisioningScope= new SyncTaskProvisioningScope(
                    request.setAll(true);
    request.setIncludeNewUsers(false);
        ),
            FieldMapping= new List<SyncTaskFieldMapping>(
                    new SyncTaskFieldMapping().set

               request.setExpression("mobile");
      request.setTargetKey("phone");
      
                  ),
            TimedScheduler= new SyncTaskTimedScheduler(
                    request.setCycle(SyncTaskTimedScheduler.cycle.DAYS);
    request.setStartTime(1664249726701);
        ),
        
        SyncTaskPaginatedRespDto response = managementClient.createSyncTask(request);
        System.out.println(response);
    }
}
```
 -->


## 请求响应

类型： `SyncTaskPaginatedRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |
| data | <a href="#SyncTaskPagingDto">SyncTaskPagingDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "requestId": "934108e5-9fbf-4d24-8da1-c330328abd6c",
  "data": {
    "list": {
      "syncTaskId": 1000,
      "createdAt": "2022-07-03T02:20:30.000Z",
      "updatedAt": "2022-07-03T02:20:30.000Z",
      "syncTaskName": "我的飞书同步任务",
      "syncTaskType": "lark",
      "syncFlow": "upstream",
      "syncTrigger": "manually",
      "lastSyncRate": 80,
      "lastSyncStatus": "success",
      "lastSyncTime": "2022-07-03T02:20:30.000Z",
      "organizationCode": "steamory",
      "provisioningScope": {
        "all": true,
        "includeNewUsers": true
      },
      "fieldMapping": {
        "expression": "mobile",
        "targetKey": "phone"
      },
      "timedScheduler": {
        "cycle": "days",
        "startTime": 1664249726701
      }
    }
  }
}
```

## 数据结构


### <a id="SyncTaskClientConfig"></a> SyncTaskClientConfig

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| larkConfig |  | 否 | 飞书同步任务配置 嵌套类型：<a href="#SyncTaskLarkClientConfig">SyncTaskLarkClientConfig</a>。  |  |
| larkInternationalConfig |  | 否 | 飞书(国际版)同步任务配置 嵌套类型：<a href="#SyncTaskLarkClientConfig">SyncTaskLarkClientConfig</a>。  |  |
| wechatworkConfig |  | 否 | 企业微信同步任务配置 嵌套类型：<a href="#SyncTaskWechatworkClientConfig">SyncTaskWechatworkClientConfig</a>。  |  |
| dingtalkConfig |  | 否 | 钉钉同步任务配置 嵌套类型：<a href="#SyncTaskDingtalkClientConfig">SyncTaskDingtalkClientConfig</a>。  |  |
| mokaConfig |  | 否 | Moka 同步任务配置 嵌套类型：<a href="#SyncTaskMokaClientConfig">SyncTaskMokaClientConfig</a>。  |  |
| scimConfig |  | 否 | 自定义同步源同步任务配置 嵌套类型：<a href="#SyncTaskScimClientConfig">SyncTaskScimClientConfig</a>。  |  |
| activeDirectoryConfig |  | 否 | Windows AD 同步任务配置 嵌套类型：<a href="#SyncTaskActiveDirectoryClientConfig">SyncTaskActiveDirectoryClientConfig</a>。  |  |
| ldapConfig |  | 否 | LDAP 同步任务配置 嵌套类型：<a href="#SyncTaskLdapClientConfig">SyncTaskLdapClientConfig</a>。  |  |
| italentConfig |  | 否 | 北森同步任务配置 嵌套类型：<a href="#SyncTaskItalentClientConfig">SyncTaskItalentClientConfig</a>。  |  |
| maycurConfig |  | 否 | 每刻报销同步任务配置 嵌套类型：<a href="#SyncTaskMaycurClientConfig">SyncTaskMaycurClientConfig</a>。  |  |
| fxiaokeConfig |  | 否 | 纷享销客同步任务配置 嵌套类型：<a href="#SyncTaskFxiaokeClientConfig">SyncTaskFxiaokeClientConfig</a>。  |  |
| xiaoshouyiConfig |  | 否 | 销售易同步任务配置 嵌套类型：<a href="#SyncTaskXiaoshouyiClientConfig">SyncTaskXiaoshouyiClientConfig</a>。  |  |
| kayangConfig |  | 否 | 嘉扬同步任务配置 嵌套类型：<a href="#SyncTaskKayangClientConfig">SyncTaskKayangClientConfig</a>。  |  |


### <a id="SyncTaskLarkClientConfig"></a> SyncTaskLarkClientConfig

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| app_id | string | 是 | 飞书应用 App ID   |  |
| app_secret | string | 是 | 飞书应用 App Secret   |  |
| encrypt_key | string | 否 | 飞书事件订阅的 Encrypt Key，可以在飞书开放平台应用详情的「事件订阅」页面获取。如果你需要开启实时同步，此参数必填。   |  |
| verification_token | string | 否 | 飞书事件订阅的 Verification Token，可以在飞书开放平台应用详情的「事件订阅」页面获取。如果你需要开启实时同步，此参数必填。   |  |


### <a id="SyncTaskWechatworkClientConfig"></a> SyncTaskWechatworkClientConfig

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| corpID | string | 是 | 企业 ID（CorpId）   |  |
| secret | string | 是 | 企业微信通讯录密钥 Secret   |  |
| token | string | 否 | 通讯录事件同步 Token   |  |
| encodingAESKey | string | 否 | 通讯录事件同步 EncodingAESKey   |  |
| agentUrl | string | 否 | 代理地址   |  |


### <a id="SyncTaskDingtalkClientConfig"></a> SyncTaskDingtalkClientConfig

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| corpId | string | 是 | 企业 ID（CorpId）   |  |
| appKey | string | 是 | 钉钉应用的 AppKey   |  |
| appSecret | string | 是 | 钉钉应用的 AppSecret   |  |
| aes_key | string | 否 | 加密 aes_key   |  |
| token | string | 否 | 签名 token   |  |


### <a id="SyncTaskMokaClientConfig"></a> SyncTaskMokaClientConfig

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| userName | string | 是 | User Name   |  |
| entCode | string | 是 | Ent Code   |  |
| apiCode_employee | string | 是 | Api Code Employee   |  |
| apiCode_department | string | 是 | Api Code Department   |  |
| privateKey | string | 是 | Private Key   |  |


### <a id="SyncTaskScimClientConfig"></a> SyncTaskScimClientConfig

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| org_url | string | 否 | Group Url   |  |
| user_url | string | 是 | User Url   |  |
| token | string | 是 | Token   |  |
| root_department_id | string | 否 | Root Department Id   |  |
| parent_department | string | 否 | Parent Department   |  |
| department | string | 否 | Department   |  |


### <a id="SyncTaskActiveDirectoryClientConfig"></a> SyncTaskActiveDirectoryClientConfig

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| syncIdentityProviderCode | string | 否 | 身份源唯一标志   |  |
| ticket_url | string | 否 | Provisioning Ticket Url   |  |


### <a id="SyncTaskLdapClientConfig"></a> SyncTaskLdapClientConfig

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| url | string | 是 | LDAP 链接   |  |
| bindDn | string | 是 | Bind DN   |  |
| bindCredentials | string | 是 | Bind DN 密码   |  |
| usersBaseDn | string | 是 | Users Base DN   |  |
| groupsBaseDn | string | 是 | Groups Base Dn   |  |
| userQueryCriteria | string | 是 | 用户查询条件   |  `(|(objectclass=orgnizationPerson)(objectclass=person))` |
| departmentQueryCriteria | string | 是 | 部门查询条件   |  `(|(objectClass=organization)(objectClass=organizationalunit)(objectClass=domain))` |


### <a id="SyncTaskItalentClientConfig"></a> SyncTaskItalentClientConfig

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| tenant_id | string | 是 | Tenant Id   |  |
| app_key | string | 是 | App Key   |  |
| app_secret | string | 是 | App Secret   |  |


### <a id="SyncTaskMaycurClientConfig"></a> SyncTaskMaycurClientConfig

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| app_code | string | 是 | App Code   |  |
| app_secret | string | 是 | App Secret   |  |
| endpoint | string | 是 | 登录域名   |  |


### <a id="SyncTaskFxiaokeClientConfig"></a> SyncTaskFxiaokeClientConfig

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| appId | string | 是 | App Id   |  |
| appSecret | string | 是 | App Secret   |  |
| permanentCode | string | 是 | Permanent Code   |  |
| currentOpenUserId | string | 是 | Current Open User Id   |  |


### <a id="SyncTaskXiaoshouyiClientConfig"></a> SyncTaskXiaoshouyiClientConfig

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| client_id | string | 是 | 销售易应用的 ClientId   |  |
| client_secret | string | 是 | 销售易应用的 ClientSecret   |  |
| username | string | 是 | 销售易应用的 UserName   |  |
| password | string | 是 | 销售易应用的 Password   |  |


### <a id="SyncTaskKayangClientConfig"></a> SyncTaskKayangClientConfig

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| endpoint | string | 是 | Endpoint   |  |
| account | string | 是 | Account   |  |
| password | string | 是 | Password   |  |


### <a id="SyncTaskProvisioningScope"></a> SyncTaskProvisioningScope

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| all | boolean | 是 | 是否同步所选组织机构下的所有用户和部门   |  `true` |
| includeNewUsers | boolean | 是 | 是否包含新增的用户   |  |


### <a id="SyncTaskFieldMapping"></a> SyncTaskFieldMapping

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| expression | string | 是 | 源字段   |  `mobile` |
| targetKey | string | 是 | 转换后的字段   |  `phone` |


### <a id="SyncTaskTimedScheduler"></a> SyncTaskTimedScheduler

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| cycle | string | 是 | 定时周期：<br>- `month`: 每个月执行一次<br>- `week`: 每周执行一次<br>- `days`: 每天执行一次<br>- `sixHours`: 每六小时执行一次<br>- `twoHours`: 每两小时执行一次<br>       | month |
| startTime | number | 是 | 开始时间   |  `1664249726701` |


### <a id="SyncTaskPagingDto"></a> SyncTaskPagingDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| totalCount | number | 是 | 记录总数   |  |
| list | array | 是 | 数据列表 嵌套类型：<a href="#SyncTaskDto">SyncTaskDto</a>。  |  |


### <a id="SyncTaskDto"></a> SyncTaskDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| syncTaskId | number | 是 | 同步任务 ID   |  `1000` |
| createdAt | string | 是 | 创建时间   |  `2022-07-03T02:20:30.000Z` |
| updatedAt | string | 是 | 更新时间   |  `2022-07-03T02:20:30.000Z` |
| syncTaskName | string | 是 | 同步任务名称   |  `我的飞书同步任务` |
| syncTaskType | string | 是 | 同步任务类型:<br>- `lark`: 飞书<br>- `lark-international`: 飞书国际版<br>- `wechatwork`: 企业微信<br>- `dingtalk`: 钉钉<br>- `active-directory`: Windows AD<br>- `ldap`: LDAP<br>- `italent`: 北森<br>- `maycur`: 每刻报销<br>- `moka`: Moka<br>- `fxiaoke`: 纷享销客<br>- `xiaoshouyi`: 销售易<br>- `kayang`: 嘉扬 HR<br>- `scim`: 自定义同步源<br>       | lark |
| syncFlow | string | 是 | 同步任务数据流向：<br>- `upstream`: 作为上游，将数据同步到 Authing<br>- `downstream`: 作为下游，将 Authing 数据同步到此系统<br>       | upstream |
| syncTrigger | string | 是 | 同步任务触发类型：<br>- `manually`: 手动触发执行<br>- `timed`: 定时触发<br>- `automatic`: 根据事件自动触发<br>   | manually |
| lastSyncMessage | boolean | 否 | 最近一次同步错误信息   |  |
| lastSyncRate | number | 否 | 最近一次同步进度   |  `80` |
| lastSyncStatus | string | 否 | 最近一次同步状态:<br>- `free`: 空闲状态，从未执行<br>- `pending`: 等待系统执行<br>- `onProgress`: 正在执行<br>- `success`: 成功<br>- `failed`: 失败<br>       | free |
| lastSyncTime | string | 否 | 最近一次同步时间   |  `2022-07-03T02:20:30.000Z` |
| organizationCode | string | 否 | 此同步任务绑定的组织机构。针对上游同步，需执行一次同步任务之后才会绑定组织机构；针对下游同步，创建同步任务的时候就需要设置。   |  `steamory` |
| provisioningScope |  | 否 | 同步范围，**只针对下游同步任务有效**。为空表示同步整个组织机构。 嵌套类型：<a href="#SyncTaskProvisioningScope">SyncTaskProvisioningScope</a>。  |  |
| fieldMapping | array | 是 | 字段映射配置 嵌套类型：<a href="#SyncTaskFieldMapping">SyncTaskFieldMapping</a>。  |  |
| timedScheduler |  | 否 | 定时同步时间设置 嵌套类型：<a href="#SyncTaskTimedScheduler">SyncTaskTimedScheduler</a>。  |  |


### <a id="SyncTaskProvisioningScope"></a> SyncTaskProvisioningScope

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| all | boolean | 是 | 是否同步所选组织机构下的所有用户和部门   |  `true` |
| includeNewUsers | boolean | 是 | 是否包含新增的用户   |  |


### <a id="SyncTaskFieldMapping"></a> SyncTaskFieldMapping

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| expression | string | 是 | 源字段   |  `mobile` |
| targetKey | string | 是 | 转换后的字段   |  `phone` |


### <a id="SyncTaskTimedScheduler"></a> SyncTaskTimedScheduler

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| cycle | string | 是 | 定时周期：<br>- `month`: 每个月执行一次<br>- `week`: 每周执行一次<br>- `days`: 每天执行一次<br>- `sixHours`: 每六小时执行一次<br>- `twoHours`: 每两小时执行一次<br>       | month |
| startTime | number | 是 | 开始时间   |  `1664249726701` |


