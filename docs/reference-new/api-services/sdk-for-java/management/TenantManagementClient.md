---
meta:
- name: description
  content: 管理租户信息
---

# 管理多租户

<LastUpdated/>


> 此模块可以进行租户管理和身份源连接管理等操作


## 创建租户

TenantManagementClient.create(param)

> 创建租户

#### 参数

- `param` \<CreateTenantParams\> 创建租户参数
- `param.name` \<String\> 租户名称
- `param.appIds` \<List\<String\>\> 应用 ID，支持关联多个应用，使用英文逗号分隔
- `param.logo` \<Integer\> 头像资源地址
- `param.description` \<Integer\> 租户描述

#### 示例

```java
CreateTenantParams createTenantParams = new CreateTenantParams("name","6192680363bc79f1dde954de","","description");
CreateTenantResponse execute = TenantManagementClient().create(createTenantParams).execute();
```

## 根据租户 ID 查询租户

TenantManagementClient().details(id)

> 根据租户 ID 查询租户

#### 参数

- `id` \<String\> 租户 ID

#### 示例

```java
TenantDetail execute = TenantManagementClient().details(createTenantResponse.getId()).execute();
```

## 获取租户列表

TenantManagementClient().list(page,limit)

> 获取租户列表

#### 参数

- `page` \<Integer\> 当前页
- `limit` \<Integer\> 每页显示的数量

#### 示例

```java
PaginatedTenants paginatedTenants = TenantManagementClient().list(page,limit).execute();
```

## 修改租户信息

TenantManagementClient().update(id,param)

> 修改租户信息

#### 参数

- `id` \<String\> 租户 Id
- `param.name` \<String\> 租户名称
- `param.appIds` \<List\<String\>\> 应用 ID，支持关联多个应用，使用英文逗号分隔
- `param.logo` \<Integer\> 头像资源地址
- `param.description` \<Integer\> 租户描述

#### 示例

```java
UpdateTenantParams updateTenantParams = new UpdateTenantParams("name","","","");
Boolean flag = TenantManagementClient().update(createTenantResponse.getId(), updateTenantParams).execute();
```

## 删除租户信息

TenantManagementClient().delete(id)

> 删除租户信息

#### 参数

- `id` \<String\> 租户 Id

#### 示例

```java
Boolean flag = TenantManagementClient().delete(id).execute();
```

## 配置租户品牌化

TenantManagementClient().config(id,param)

> 配置租户品牌化

#### 参数

- `id` \<String\> 租户 Id
- `param.css` \<String\> 自定义 CSS
- `param.ssoPageCustomizationSettings.autoRegisterThenLogin` \<Boolean\> 将注册和登录合并
- `param.ssoPageCustomizationSettings.hideForgetPassword` \<Boolean\> 隐藏忘记密码按钮
- `param.ssoPageCustomizationSettings.hideIdp` \<Boolean\> 隐藏企业身份源登录
- `param.ssoPageCustomizationSettings.hideSocialLogin` \<Boolean\> 隐藏社会化登录按钮

#### 示例

```java
SsoPageCustomizationSetting ssoPageCustomizationSetting = new SsoPageCustomizationSetting(true,true,true,true);
ConfigSsoPageCustomizationSetting configSsoPageCustomizationSetting = new ConfigSsoPageCustomizationSetting("css",ssoPageCustomizationSetting);
Boolean flag = TenantManagementClient().config(createTenantResponse.getId(),configSsoPageCustomizationSetting).execute();
```

## 租户添加成员

TenantManagementClient().addMembers(id,param)

> 租户添加成员

#### 参数

- `id` \<String\> 租户 Id
- `param.userIds` \<List\<String\>\> 用户 ID 集合

#### 示例

```java
List<String> userlist = new ArrayList<>();
userlist.add("61a716b97acf15daa58a354811");
UserTenantIdList userTenantIdList = new UserTenantIdList(userlist);
CreateTenantMemberResponse execute = TenantManagementClient().addMembers(createTenantResponse.getId(), userTenantIdList).execute();
```

## 更新租户成员

TenantManagementClient().updateTenantMember(tenantId, userId, updateTenantMemberParam)

> 更新租户成员

#### 参数

- `tenantId` \<String\> 租户 Id
- `userId` \<String\> 租户 Id
- `updateTenantMemberParam.isEnabled` 启用 / 停用 ，true - 启用，false - 停用


#### 示例

```java
UpdateTenantMemberParam updateTenantMemberParam = new UpdateTenantMemberParam(false);
CommonMessage execute = getClient().updateTenantMember("61cc416cf0eed8213a9a7ce3", "62022b04b193b371c98a1ea6", updateTenantMemberParam).execute();
```

## 租户移除成员

TenantManagementClient().removeMembers(id,userId)

> 租户移除成员

#### 参数

- `id` \<String\> 租户 Id
- `userId` \<String\> 用户 ID 

#### 示例

```java
Boolean flag = TenantManagementClient().removeMembers(id, userId).execute();
```

## 获取租户成员列表

TenantManagementClient().memeber(id,page,limit)

> 获取租户成员列表

#### 参数

- `id` \<String\> 租户 Id
- `page` \<Integer\> 当前页
- `limit` \<Integer\> 每页显示的数量

#### 示例

```java
 PaginatedTenants paginatedTenants = TenantManagementClient().memeber(id, 1, 10).execute();
```

## 创建身份源

TenantManagementClient().createExtIdp(param)

> 创建身份源

#### 参数

- `tenantId` \<String\> 租户 ID，如不填则创建个体型身份源
- `name` \<Integer\> 身份源名称
- `type` \<Integer\> 身份源类型
- `connections` \<List\<Connection\>\> 包含任意多个“连接对象”的数组

#### 示例

```java
List<Connection> connectionList = new ArrayList<>();
List<String> userMatchFieldsList = new ArrayList<>();
userMatchFieldsList.add("aa");
connectionList.add(new Connection("微信身份源连接", new Fields("cli_a1118cb96bf95013","d1cuu12MdgGKrcItRyD6TeJLNqoWjRW0"),"wechat11cfffcb666","wechat:pc",userMatchFieldsList));
CreateIdpParam createIdpParam = new CreateIdpParam(createTenantResponse.getId(),"微信身份源","wechat",connectionList);
CreateIdpResponse execute = TenantManagementClient().createExtIdp(createIdpParam).execute();
```

## 修改身份源

TenantManagementClient().updateExtIdp(id,param)

> 修改身份源

#### 参数

- `id` \<String\> 租户 ID，如不填则创建个体型身份源
- `param.name` \<Integer\> 身份源名称

#### 示例

```java
UpdateIdpParam updateIdpParam = new UpdateIdpParam("update微信身份源");
CreateIdpResponse createIdpResponse = TenantManagementClient().updateExtIdp(execute.getId(), updateIdpParam).execute();
```

## 删除身份源

TenantManagementClient().deleteExtIdp(id)

> 删除身份源

#### 参数

- `id` \<String\> 身份源 ID

#### 示例

```java
Boolean flag = TenantManagementClient().deleteExtIdp(execute.getId()).execute();
```

## 获取身份源详细信息

TenantManagementClient().extIdpDetail(id)

> 获取身份源详细信息

#### 参数

- `id` \<String\> 身份源 ID

#### 示例

```java
CreateIdpResponse createIdpResponse = TenantManagementClient().extIdpDetail(execute.getId()).execute();
```

## 获取身份源列表

TenantManagementClient().listExtIdp(id)

> 获取身份源列表

#### 参数

- `id` \<String\> 租户 ID

#### 示例

```java
List<CreateIdpResponse> createIdpResponseList = TenantManagementClient().listExtIdp(id).execute();
```

## 创建身份源连接

TenantManagementClient().createExtIdpConnection(param)

> 创建身份源连接

#### 参数

- `param.extIdpId` \<String\> 身份源 ID
- `param.type` \<String\> 连接类型
- `param.identifier` \<String\> 连接的唯一标识符
- `param.displayName` \<String\> 连接在登录页的显示名称
- `param.fields` \<Fields\> 连接的详细配置信息
- `param.tenantId` \<String\> 租户 ID
- `param.userMatchFields` \<List\<String\>\> 用户表自定义匹配字段

#### 示例

```java
List<String> strings = new ArrayList<>();
strings.add("ccc");
CreatIdpConnParam creatIdpConnParam = new CreatIdpConnParam("61c5857a75da5712ae7003d6", "wechat:pc", "ffff", "ffff", new Fields("fffff", "fffff"), "61c58562ac90c9ef103141da", strings);
CreateIdpConnResponse createIdpConnResponse = TenantManagementClient().createExtIdpConnection(creatIdpConnParam).execute();
```

## 更新身份源连接

TenantManagementClient().updateExtIdpConnection(id,param)

> 更新身份源连接

#### 参数

- `id` \<String\> 连接 ID
- `param.displayName` \<String\> 连接在登录页的显示名称
- `param.fields` \<Fields\> 连接的详细配置信息
- `param.tenantId` \<String\> 租户 ID
- `param.userMatchFields` \<List\<String\>\> 用户表自定义匹配字段

#### 示例

```java
List<String> strings = new ArrayList<>();
strings.add("hhhh");
UpdateIdpConnParm updateIdpConnParm = new UpdateIdpConnParm("hhh",new Fields("hhh","hhh"),strings,"61c58562ac90c9ef103141da");
Boolean flag = TenantManagementClient().updateExtIdpConnection("61c587090fff396177280f54", updateIdpConnParm).execute();
```

## 删除身份源连接

TenantManagementClient().deleteExtIdpConnection(id)

> 更新身份源连接

#### 参数

- `id` \<String\> 连接 ID

#### 示例

```java
Boolean flag = TenantManagementClient().deleteExtIdpConnection(id).execute();
```

## 检查连接唯一标识是否冲突

TenantManagementClient().checkExtIdpConnectionIdentifierUnique(param)

> 检查连接唯一标识是否冲突

#### 参数

- `param.identifier` \<String\> 待检查的标识符

#### 示例

```java
CheckExtIdpConnectionIdentifierUnique checkExtIdpConnectionIdentifierUnique = new CheckExtIdpConnectionIdentifierUnique("aaabbbbbbb");
CommonMessage commonMessage = getClient().checkExtIdpConnectionIdentifierUnique(checkExtIdpConnectionIdentifierUnique).execute();
```

## 开关身份源连接

TenantManagementClient().changeExtIdpConnectionState(id,param)

> 开关身份源连接

#### 参数

- `id` \<String\> 连接 ID
- `param.tenantId` \<String\> 租户 ID
- `param.enabled` \<Boolean\> 是否开关

#### 示例

```java
ConnState connState = new ConnState("61c58562ac90c9ef103141da",false);
CommonMessage execute = TenantManagementClient().changeExtIdpConnectionState("61c5857ab2ce3a662dfb3ed1",connState).execute();
```

## 批量开关身份源连接

TenantManagementClient().batchChangeExtIdpConnectionState(id,param)

> 批量开关身份源连接

#### 参数

- `id` \<String\> 连接 ID
- `param.tenantId` \<String\> 租户 ID
- `param.enabled` \<Boolean\> 是否开关

#### 示例

```java
ConnState connState = new ConnState("61c58562ac90c9ef103141da",true);
CommonMessage commonMessage = getClient().batchChangeExtIdpConnectionState("61c5857a75da5712ae7003d6",connState).execute();
```

## 设置租户管理员

TenantManagementClient().setTanentAdmin(tenantId,userIds)

> 设置租户管理员

#### 参数

- `tenantId` \<String\> 租户 ID
- `userIds` \<List\<String\>\> 用户 ID 集合

#### 示例

```java
List<String> list = new ArrayList<>();
list.add("62020b53840e620164700881");
UserTenantIdList userTenantIdList = new UserTenantIdList(list);
CommonMessage commonMessage = getClient().setTanentAdmin("61cc416cf0eed8213a9a7ce3", userTenantIdList).execute();
```

## 取消租户管理员

TenantManagementClient().setTanentAdmin(tenantId,userIds)

> 取消租户管理员

#### 参数

- `tenantId` \<String\> 租户 ID
- `userIds` \<List\<String\>\> 用户 ID 集合

#### 示例

```java
List<String> list = new ArrayList<>();
list.add("61d55aed37bacdf20c6aea00");
UserTenantIdList userTenantIdList = new UserTenantIdList(list);
CommonMessage commonMessage = getClient().deleteTanentAdmin("61cc416cf0eed8213a9a7ce3", "61d55aed37bacdf20c6aea00").execute();
```

## 授权业务资源

TenantManagementClient().authorizeResources(param)

> 授权业务资源

#### 参数

##### 请求头： 
  - `x-authing-userpool-id` \<String\> 用户池 ID
  - `x-authing-app-tenant-id` \<String\> 租户的 ID。如果是给租户下的用户、组织机构授权，此参数必填，初始化时设置
  - `Authorization` 用户池管理员或租户管理员的 Token，初始化时设置

##### 请求参数：
  - `param.namespace` \<String\> 权限分组
  - `param.AuthorizeResourcesParamItem` \<List\<AuthorizeResourcesParamItem\>\> 资源参数
  

#### 示例

```java
List<ResourceTenant> resourceTenantList = new ArrayList<>();
String code = "f1V97" ;
List<String> actions = new ArrayList<>();
actions.add("f1V97:read");
resourceTenantList.add(new ResourceTenant(code,actions,ResourceType.DATA));
AuthorizeResourcesParamItem authorizeResourcesParamItem = new AuthorizeResourcesParamItem(TargetTypeEnum.USER,Arrays.asList("62020b53840e620164700881"),resourceTenantList);
List<AuthorizeResourcesParamItem> list = new ArrayList<>();
list.add(authorizeResourcesParamItem);
AuthorizeResourcesParam authorizeResourcesParam = new AuthorizeResourcesParam("default",list);
CommonMessage commonMessage = getClient().authorizeResources(authorizeResourcesParam).execute();
```

## 撤销业务资源

TenantManagementClient().revokeAuthorizeResources(param)

> 撤销业务资源

#### 参数

##### 请求头：
  - `x-authing-userpool-id` \<String\> 用户池 ID
  - `x-authing-app-tenant-id` \<String\> 租户的 ID。如果是给租户下的用户、组织机构授权，此参数必填，初始化时设置
  - `Authorization` 用户池管理员或租户管理员的 Token，初始化时设置

##### 请求参数：
- `param.namespace` \<String\> 权限分组
- `param.AuthorizeResourcesParamItem` \<List\<AuthorizeResourcesParamItem\>\> 资源参数


#### 示例

```java
 List<ResourceTenant> resourceTenantList = new ArrayList<>();
String code = "f1V97" ;
List<String> actions = new ArrayList<>();
actions.add("f1V97:read");
resourceTenantList.add(new ResourceTenant(code,actions,ResourceType.DATA));
AuthorizeResourcesParamItem authorizeResourcesParamItem = new AuthorizeResourcesParamItem(TargetTypeEnum.USER,Arrays.asList("62020dbe4f55d2743f3c4e85"),resourceTenantList);
List<AuthorizeResourcesParamItem> list = new ArrayList<>();
list.add(authorizeResourcesParamItem);
AuthorizeResourcesParam authorizeResourcesParam = new AuthorizeResourcesParam("default",list);
CommonMessage commonMessage = getClient().revokeAuthorizeResources(authorizeResourcesParam).execute();
```

## 获取被授权的资源

TenantManagementClient().getAuthorizeResources(namespace,targetType,targetIdentifier,resourceType)

> 获取被授权的资源

#### 参数

##### 请求头：
- `x-authing-userpool-id` \<String\> 用户池 ID
- `x-authing-app-tenant-id` \<String\> 租户的 ID。如果是给租户下的用户、组织机构授权，此参数必填，初始化时设置
- `Authorization` 用户池管理员或租户管理员的 Token，初始化时设置

##### 请求参数：
- `namespace` \<String\> 权限分组的 code
- `targetType` \<String\> 目标对象类型，可选值为：USER: 用户  ROLE: 角色  GROUP: 分组  ORG: 组织机构部门
- `targetIdentifier` \<String\> 目标对象的唯一标志符： 如果是用户，为用户 ID；如果是角色，为角色 code；如果是分组，为分组 code；如果是组织机构部门，为部门 ID
- `resourceType` \<String\> 需要获取的资源列表。resource_type 可取值：DATA、API、MENU、UI、BUTTON

#### 示例

```java
GetAuthorizeResourcesParam getAuthorizeResourcesParam = new GetAuthorizeResourcesParam("default","USER","62020dbe4f55d2743f3c4e85","DATA");
RestfulResponse<UserPoolAdminGetTenantAdminResourceList> execute = getClient().getAuthorizeResources(getAuthorizeResourcesParam).execute();
```

## 获取被授权的资源（用户侧）

TenantManagementClient().getMeAuthorizeResources(namespace,tanentId,resourceType)

> 获取被授权的资源（用户侧）

#### 参数

##### 请求头：
- `x-authing-userpool-id` \<String\> 用户池 ID
- `Authorization` 用户的 Token，初始化时设置

##### 请求参数：
- `namespace` \<String\> 权限分组的 code
- `tanentId` \<String\> 租户 ID
- `resourceType` \<String\> 需要获取的资源列表。resource_type 可取值：DATA、API、MENU、UI、BUTTON

#### 示例

```java
UserPoolAdminGetTenantAdminResourceList execute = getClient().getMeAuthorizeResources("default", "61cc416cf0eed8213a9a7ce3", "DATA").execute();
```

## 批量获取被授权的资源

TenantManagementClient().getMeAuthorizeResources(batchGetAuthorizeResourcesParam)

> 批量获取被授权的资源

#### 参数

##### 请求头：
- `x-authing-userpool-id` \<String\> 用户池 ID
- `x-authing-app-tenant-id` \<String\> 租户的 ID。如果是给租户下的用户、组织机构授权，此参数必填，初始化时设置
- `Authorization` 用户池管理员或租户管理员的 Token，初始化时设置

##### 请求参数：
- `batchGetAuthorizeResourcesParam.namespace` \<String\> 权限分组的 code
- `batchGetAuthorizeResourcesParam。BatchGetAuthorizeResourcesParamItem` \<List\<BatchGetAuthorizeResourcesParamItem\>\> 批量资源授权参数
- `batchGetAuthorizeResourcesParam.resourceType` \<String\> 资源类型

#### 示例

```java
List<BatchGetAuthorizeResourcesParamItem> list = new ArrayList<>();
list.add(new BatchGetAuthorizeResourcesParamItem(TargetTypeEnum.USER,"62020dbe4f55d2743f3c4e85"));
BatchGetAuthorizeResourcesParam batchGetAuthorizeResourcesParam = new BatchGetAuthorizeResourcesParam("default",list,"DATA");
RestfulResponse<BatchGetAuthorizeResourcesList> execute = getClient().getAuthorizeResourcesBatch(batchGetAuthorizeResourcesParam).execute();
```













