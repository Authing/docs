---
meta:
- name: description
  content: 管理应用
---

# 管理应用

<LastUpdated/>

> 此模块主要用来管理应用相关操作。

请使用以下方式使用该模块：

```java
ManagementClient managementClient = new ManagementClient(userPoolId, userPoolSecret);
```

## 创建应用

managementClient.application().create(param)

> 在用户池中创建一个应用

#### 参数

- `param` \<CreateAppParams\> 应用相关参数
- `param.name` \<String\> 应用名称
- `param.identifier` \<String\> 应用认证地址
- `param.redirectUris` \<List\<String\>\> 应用回调链接
- `param.logo` \<String\> 应用 logo，可选参数。

#### 示例

```java
CreateAppParams params = new CreateAppParams("APP_NAME", "Identifier", Arrays.asList("www.xxxxx.com"));
Application app = managementClient.application().create(params).execute();
```

## 删除应用

managementClient.application().delete(param)

> 在用户池中删除一个应用

#### 参数

- `appId` \<String\> 应用 ID

#### 示例

```java
Boolean deleted = managementClient.application().delete(APP_ID).execute();
```

## 获取应用列表

managementClient.application().list(params)

> 获取应用列表相关信息

#### 参数

- `page` \<Integer\> 分页序号，默认为 `1`。
- `limit` \<Integer\> 每页返回的个数，默认为 `10`。

#### 示例

```java
List<Application> result = managementClient.application().list(1, 2).execute();
```

## 获取应用详情

> 获取应用详情信息

managementClient.application().findById(id)

#### 参数

- `id` \<String\> 应用 id

#### 示例

```java
Application application = managementClient.application().findById(APP_ID).execute();
```

## 获取资源列表

managementClient.application().listResources(params)

> 获取所有资源。

#### 参数

- `params` \<ListResourcesParams\>
- `params.appId` \<String\> 应用 ID
- `params.type` \<String\> 资源类型，可选值为 `DATA`、`API`、`MENU`、`UI`、`BUTTON`。
- `params.page` \<String\> 分页，获取第几页，默认从 1 开始。
- `params.limit` \<String\> 每页条目数量，默认为 10 个。

#### 示例

```java
ListResourcesParams params = new ListResourcesParams(APP_ID);
params.setLimit(1);
params.setPage(1);
managementClient.application().listResources(params);
```

## 创建资源

managementClient.application().createResource(appId, param)

> 创建一个资源。

#### 参数

- `appId` \<String\> 应用 ID
- `param` \<ResourceOptionsParams\> 资源信息对象
- `param.code` \<String\> 资源标识符，不可使用值 `userpool`、`user`、`application`、`role`、`group`、`org`、`*`、`api`、`resource-namespace`、`custom-resource`
- `param.type` \<ResourceType\> 枚举 资源类型，可选值为 `DATA`、`API`、`MENU`、`UI`、`BUTTON`。
- `param.actions` \<List\<IAction\>\> 资源操作对象数组。其中 name 为操作名称，填写一个**动词**，description
  为操作描述，填写描述信息。
  - `IAction`: `name` \<String\> 操作名称，`description` \<String\> 描述信息。
- `param.description` \<String\> 资源描述信息

#### 示例

```java
IResourceResponse res = managementClient
            .application()
            .createResource(APP_ID, new ResourceOptionsParams("resoureCode", ResourceType.DATA,
                Arrays.asList(new IAction("name1"), new IAction("name1"))))
            .execute();
```

## 通过 appId 和 资源 code 获取资源

managementClient.application().findResourceByCode(code, appId)

> 通过 appId 和 资源 code 获取一个资源。

#### 参数

- `code` \<String\> 资源 Code
- `appId` \<String\> 应用 ID


#### 示例

```java
IResourceResponse res = managementClient.application().findResourceByCode("code", "appId").execute();
```


## 更新资源

managementClient.application().updateResource(appId, param)

> 更新一个资源。

#### 参数

- `appId` \<String\> 应用 ID
- `param` \<ResourceOptionsParams\> 资源信息对象
- `param.code` \<String\> 资源标识符
- `param.namespace` \<String\> 资源所在的权限分组标识
- `param.type` \<String\> 资源类型，可选值为 `DATA`、`API`、`MENU`、`UI`、`BUTTON`。
- `param.actions` \<List\<IAction\>\> 资源操作对象数组。其中 name 为操作名称，填写一个**动词**，description
  为操作描述，填写描述信息。
  - `IAction`：`name` \<String\> 操作名称  `description` \<String\> 描述信息
- `param.description` \<String\> 资源描述信息

#### 示例

```java
ResourceOptionsParams params = 
        new ResourceOptionsParams("code", ResourceType.API, Arrays.asList(new IAction("name")),description);
IResourceResponse updateRes = managementClient
        .application()
        .updateResource("appId", params)
        .execute();
```

## 删除资源

managementClient.application().deleteResource(appId, code)

> 删除一个资源。

#### 参数

- `appId` \<String\> 应用 ID
- `code` \<String\> 资源标识符

#### 示例

```java
Boolean deleted = managementClient
        .application()
        .deleteResource(APP_ID, CODE)
        .execute();
```

## 获取应用访问控制策略

managementClient.application().getAccessPolicies(appId, param)

> 获取一个应用的访问控制策略。

#### 参数

- `appId` \<String\> 应用 ID
- `param` \<PageOptions\> 传入配置
- `param.page` \<String\> 分页，获取第几页，默认从 1 开始。
- `param.limit` \<String\> 每页条目数量，默认为 10 个。

#### 示例

```java
Pagination<IApplicationAccessPolicies> res = managementClient.application()().getAccessPolicies(APP_ID).execute();
```

## 启用应用访问控制策略

managementClient.application().enableAccessPolicy(appId, param)

> 启用一个应用的访问控制策略。

#### 参数

- `appId` \<String\> 应用 ID
- `param` \<IAccessPolicyParams\> 传入配置
- `param.targetType` \<String\> 主体类型，可选值为 `USER`、`ROLE`、`GROUP`、`ORG`。
- `param.targetIdentifiers` \<String\> 主体标识符，可以为用户 ID、角色标识符、分组标识符、组织机构节点标识符。
- `param.namespace` \<String\> 当 targetType 为 `ROLE`、`GROUP`、`ORG` 时，填写其所在的权限分组标识符。
- `param.inheritByChildren` \<Boolean\> 当 `targetType` 为 `ORG` 时，用于指定组织机构的子节点是否继承该策略。

#### 示例

```java
IAccessPolicyParams params = new IAccessPolicyParams(TargetTypeEnum.GROUP, Arrays.asList("xxxxx", "xxxxx"));
Boolean enabled = managementClient.application().enableAccessPolicy(APP_ID, params).execute();
```

## 停用应用访问控制策略

managementClient.application().disableAccessPolicy(appId, param)

> 停用一个应用的访问控制策略。

#### 参数

- `appId` \<String\> 应用 ID
- `param` \<IAccessPolicyParams\> 传入配置
- `param.targetType` \<String\> 主体类型，可选值为 `USER`、`ROLE`、`GROUP`、`ORG`。
- `param.targetIdentifiers` \<String\> 主体标识符，可以为用户 ID、角色标识符、分组标识符、组织机构节点标识符。
- `param.namespace` \<String\> 当 targetType 为 `ROLE`、`GROUP`、`ORG` 时，填写其所在的权限分组标识符。
- `param.inheritByChildren` \<Boolean\> 当 `targetType` 为 `ORG` 时，用于指定组织机构的子节点是否继承该策略。

#### 示例

```java
IAccessPolicyParams params = new IAccessPolicyParams(TargetTypeEnum.GROUP, Arrays.asList("xxxxx", "xxxxx"));
Boolean disabled = managementClient.application().disableAccessPolicy(APP_ID,params).execute();
```

## 删除应用访问控制策略

managementClient.application().deleteAccessPolicy(appId, param)

> 删除一个应用的访问控制策略。

#### 参数

- `appId` \<String\> 应用 ID
- `param` \<IAccessPolicyParams\> 传入配置
- `param.targetType` \<String\> 主体类型，可选值为 `USER`、`ROLE`、`GROUP`、`ORG`。
- `param.targetIdentifiers` \<String\> 主体标识符，可以为用户 ID、角色标识符、分组标识符、组织机构节点标识符。
- `param.namespace` \<String\> 当 targetType 为 `ROLE`、`GROUP`、`ORG` 时，填写其所在的权限分组标识符。
- `param.inheritByChildren` \<Boolean\> 当 `targetType` 为 `ORG` 时，用于指定组织机构的子节点是否继承该策略。

#### 示例

```java
IAccessPolicyParams params = new IAccessPolicyParams(TargetTypeEnum.GROUP, Arrays.asList("xxxxx", "xxxxx"));
Boolean deleted = managementClient.application().deleteAccessPolicy(APP_ID, params).execute();
```

## 配置「允许主体（用户、角色、分组、组织机构节点）访问应用」的控制策略

managementClient.application().allowAccess(appId, param)

> 配置「允许主体（用户、角色、分组、组织机构节点）访问应用」的控制策略。

#### 参数

- `appId` \<String\> 应用 ID
- `param` \<IAccessPolicyParams\> 传入配置
- `param.targetType` \<String\> 主体类型，可选值为 `USER`、`ROLE`、`GROUP`、`ORG`。
- `param.targetIdentifiers` \<String\> 主体标识符，可以为用户 ID、角色标识符、分组标识符、组织机构节点标识符。
- `param.namespace` \<String\> 当 targetType 为 `ROLE`、`GROUP`、`ORG` 时，填写其所在的权限分组标识符。
- `param.inheritByChildren` \<Boolean\> 当 `targetType` 为 `ORG` 时，用于指定组织机构的子节点是否继承该策略。

#### 示例

```java
IAccessPolicyParams params = new IAccessPolicyParams(TargetTypeEnum.GROUP,Arrays.asList("1", "2", "3"));
Boolean res = managementClient.application().allowAccess(APP_ID, params).execute();
```

## 配置「拒绝主体（用户、角色、分组、组织机构节点）访问应用」的控制策略

managementClient.application().denyAccess(appId, param)

> 配置「拒绝主体（用户、角色、分组、组织机构节点）访问应用」的控制策略。

#### 参数

- `appId` \<String\> 应用 ID
- `param` \<DenyAccessParams\> 传入配置
- `param.targetType` \<String\> 主体类型，可选值为 `USER`、`ROLE`、`GROUP`、`ORG`。
- `param.targetIdentifiers` \<String\> 主体标识符，可以为用户 ID、角色标识符、分组标识符、组织机构节点标识符。
- `param.namespace` \<String\> 当 targetType 为 `ROLE`、`GROUP`、`ORG` 时，填写其所在的权限分组标识符。
- `param.inheritByChildren` \<Boolean\> 当 `targetType` 为 `ORG` 时，用于指定组织机构的子节点是否继承该策略。

#### 示例

```java
Boolean res = managementClient
        .application()
        .denyAccess(APP_ID,new DenyAccessParams(TargetTypeEnum.GROUP, Arrays.asList("1", "2", "3"))
        .execute();
```

## 更改默认应用访问策略

managementClient.application().updateDefaultAccessPolicy(appId, defaultStrategy)

> 修改默认应用访问策略：默认拒绝所有用户访问应用、默认允许所有用户访问应用

#### 参数

- `appId` \<String\> 应用 ID
- `defaultStrategy` \<DefaultStrategy\> 默认应用访问策略，可选值为 `ALLOW_ALL`、`DENY_ALL`，含义为默认允许所有用户访问、拒绝所有用户访问。

#### 示例

```java
Application app = managementClient.application().updateDefaultAccessPolicy(APP_ID, DefaultStrategy.DENY_ALL).execute();
```

## 在应用下创建角色

managementClient.application().createRole(appId, param)

> 创建角色，可以指定不同的权限分组。

#### 参数

- `appId` \<String\> 应用 ID
- `param` \<CreateRoleParams\>
- `param.code` \<String\> 角色唯一标志符
- `param.description` \<String\> 描述

#### 示例

```java
Role role = managementClient
      .application()
      .createRole(APP_ID, new CreateRoleParams(TestUtils.createRandomString(6)))
      .execute();
```

## 删除应用下的角色

managementClient.application().deleteRole(appId, code)

> 删除角色

#### 参数

- `appId` \<String\> 应用 ID
- `code` \<String\> 角色唯一标志符

#### 示例

```java
managementClient.application()
                .deleteRole(APP_ID, role.getCode())
                .execute();
```

## 批量删除应用下的角色

managementClient.application().deleteRoles(appId, codes)

> 批量删除应用下的角色

- `appId` \<String\> 应用 ID
- `codes` \<List\<String\>\> 角色唯一标志符集合

#### 示例

```java
managementClient.application()
                .deleteRoles(APP_ID, Arrays.asList("id_1", "id_2"))
                .execute();
```

## 修改应用下的角色

managementClient.application().updateRole(code, param)

> 修改角色

#### 参数

- `appId` \<String\> 应用 ID
- `param` \<UpdateRoleParams\>
- `param.code` \<String\> 角色唯一标志符
- `param.description` \<String\> 描述信息
- `param.newCode` \<String\> 新的唯一标志符

#### 示例

```java
Role updateRole = managementClient.application()
          .updateRole(APP_ID, new UpdateRoleParams(ROLE_CODE, "description"))
          .execute();
```

## 获取应用下的角色详情

managementClient.application().findRole(appId, code)

> 获取应用下的角色详情。

#### 参数

- `appId` \<String\> 应用 ID
- `code` \<String\> 角色唯一标志符

#### 示例

```java
Role findRole = managementClient.application().findRole(APP_ID, role.getCode()).execute();
```

## 获取应用下的角色列表

managementClient.application().getRoles(appId, param)

> 获取应用下的角色列表。

#### 参数

- `appId` \<String\> 应用 ID
- `param` \<PageOptions\>
- `param.page` \<Integer\> 页码数，默认值：`1`。
- `param.limit` \<Integer\> 每页个数，默认值：`10`。

#### 示例

```java
PaginatedRoles roleList = managementClient
                .application()
                .getRoles(APP_ID)
                .execute();
```

## 获取应用下角色的用户列表

managementClient.application().getUsersByRoleCode(appId, code)

> 获取应用下角色的用户列表。

#### 参数

- `appId` \<String\> 应用 ID
- `code` \<String\> 角色唯一标志符

#### 示例

```java
PaginatedUsers users = managementClient.application().getUsersByRoleCode(APP_ID, CODE).execute();
```

## 应用下的角色添加用户

managementClient.application().addUsersToRole(appId, code, userIds)

> 应用下的角色添加用户。

#### 参数

- `appId` \<String\> 应用 ID
- `code` \<String\> 角色唯一标志符
- `userIds` \<List\<String\>\> 用户 ID 列表

#### 示例

```java
managementClient.application()
              .addUsersToRole(APP_ID, CODE, Arrays.asList("USER_ID_1", "USER_ID_2"))
              .execute();
```

## 应用下的角色移除用户

managementClient.application().removeUsersFromRole(appId, code, userIds)

> 应用下的角色移除用户。

#### 参数

- `appId` \<String\> 应用 ID
- `code` \<String\> 角色唯一标志符
- `userIds` \<List\<String\>\> 用户 ID 列表

#### 示例

```java
managementClient.application()
              .removeUsersFromRole(APP_ID, CODE, Arrays.asList("USER_ID_1", "USER_ID_2"))
              .execute();
```

## 获取应用下角色被授权的所有资源列表

managementClient.application().listAuthorizedResourcesByRole(appId, code, resourceType)

> 获取应用下角色被授权的所有资源列表。

#### 参数

- `appId` \<String\> 应用 ID
- `code` \<String\> 角色 code
- `resourceType` \<ResourceType\> 可选，资源类型，默认会返回所有有权限的资源，现有资源类型如下：
    - `DATA`：数据类型；
    - `API`：API 类型数据；
    - `MENU`：菜单类型数据；
    - `BUTTON`：按钮类型数据。

#### 示例

```java
PaginatedAuthorizedResources res =
          managementClient.application().listAuthorizedResourcesByRole(APP_ID, CODE, ResourceType.DATA).execute();
```

## 创建注册协议

managementClient.application().createAgreement(appId, options)

> 创建一个注册协议

#### 参数

- `appId` \<String\> 应用 ID
- `options` \<AgreementParams\> 注册协议配置
  - `options.title` \<String\> 协议标题，可以包含 HTML A 标签。
  - `options.required` \<Boolean\> 是否必须勾选同意才允许注册，默认为 `true`。
  - `options.lang` \<String\> 协议标题语言，可选 `zh-CN`， `en-US`，默认为 `zh-CN`，在托管登录页面中会根据界面语言展示协议。

#### 示例

```java
AgreementParams params = new AgreementParams(TITLE);
AgreementDetail agreement = managementClient.application().createAgreement(APP_ID, params).execute();
```

#### 示例数据

```json
{
  "userPoolId": "607543c19f711c9b91fa9400",
  "appId": "607543c1ec30828efb065adb",
  "title": "I agreement this <a href=\"https://example.com/policy\" target=\"_blank\">policy</a>",
  "lang": "zh-CN",
  "required": true,
  "order": 6,
  "id": 148
}
```

## 修改注册协议

managementClient.application().modifyAgreement(appId, agreementId, updates)

> 修改注册协议

#### 参数

- `appId` \<String\> 应用 ID
- `agreementId` \<String\> 协议 ID
- `updates` \<AgreementParams\> 要更新的数据
  - `options.title` \<String\> 协议标题，可以包含 HTML A 标签。
  - `options.required` \<Boolean\> 是否必须勾选同意才允许注册，默认为 `true`。
  - `options.lang` \<String\> 协议标题语言，可选 `zh-CN`，`en-US`，默认为 `zh-CN`，在托管登录页面中会根据界面语言展示协议。

#### 示例

```java
AgreementDetail res = managementClient
        .application()
        .modifyAgreement(APP_ID, agreement.getId(), new AgreementParams(TITLE))
        .execute();
```

#### 示例数据

```json
{
  "userPoolId": "607543c19f711c9b91fa9400",
  "appId": "607543c1ec30828efb065adb",
  "title": "I agreement this <a href=\"https://example.com/policy\" target=\"_blank\">policy</a>",
  "lang": "zh-CN",
  "required": true,
  "order": 6,
  "id": 148
}
```

## 获取注册协议列表

managementClient.application().listAgreement(appId)

> 获取注册协议列表

#### 参数

- `appId` \<String\> 应用 ID

#### 示例

```java
Pagination<AgreementDetail> listAgreement = managementClient
        .application()
        .listAgreement(APP_ID)
        .execute();
```

#### 示例数据

```json
[
  {
    "userPoolId": "607543c19f711c9b91fa9400",
    "appId": "607543c1ec30828efb065adb",
    "title": "I agreement this <a href=\"https://example.com/policy\" target=\"_blank\">policy</a>",
    "lang": "zh-CN",
    "required": true,
    "order": 6,
    "id": 148
  }
]
```

## 删除注册协议

managementClient.application().deleteAgreement(appId, agreementId, updates)

> 删除注册协议

#### 参数

- `appId` \<String\> 应用 ID
- `agreementId` \<String\> 协议 ID

#### 示例

```java
Boolean deleted = managementClient.application().deleteAgreement(APP_ID, AGREEMENT_ID).execute();
```

## 注册协议排序

managementClient.application().sortAgreement(appId, order)

> 注册协议排序

#### 参数

- `appId` \<String\> 应用 ID
- `order` \<List\<String\>\> 应用下所有协议的 ID 列表，按需要的顺序排列。

#### 示例

```java
List<String> list = Arrays.asList("id_1", "id_2");
Boolean res = managementClient.application().sortAgreement(APP_ID, list).execute();
```


## 查看已登录用户

managementClient.application().activeUsers(param)

> 查看应用下已登录用户

#### 参数

- `param` \<IActiveUsersParam\>
- `param.appId` \<String\> 应用 ID
- `param.page` \<Integer\> 分页序号，默认为 `1`。
- `param.limit` \<Integer\> 每页返回的个数，默认为 `10`。

#### 示例

```java
IActiveUsersParam param = new IActiveUsersParam(APP_ID);
Pagination<ActiveUser> pagination = managementClient.application().activeUsers(param).execute();
```

## 刷新应用密钥

managementClient.application().refreshApplicationSecret(appId)

> 刷新应用密钥

#### 参数

- `appId` \<String\> 应用 ID

#### 示例

```java
Application application = managementClient.application().refreshApplicationSecret(APP_ID).execute();
```
