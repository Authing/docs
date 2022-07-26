---
meta:
- name: description
  content: 管理应用
---



# 管理应用

<LastUpdated/>

```csharp
managementClient.Applications.Create(string name, string identifier, string redirectUris, string logo = null)
```
> 在用户池中创建一个应用

#### 参数

- `name` \<string\> 应用名称
- `identifier` \<string\> 应用认证地址
- `redirectUris` \<List\<string\>\> 应用回调链接
- `logo` \<string\> 应用 logo，可选参数。

#### 示例

```csharp
 managementClient.Applications.Create("APP_NAME", "Identifier","www.xxxxx.com"）;
```

## 删除应用

```csharp
 managementClient.Applications.Delete(string appId)
```
> 在用户池中删除一个应用

#### 参数

- `appId` \<string\> 应用 ID

#### 示例

```csharp
 managementClient.Applications.Delete("APP_ID");
```

## 获取应用列表
```csharp
 managementClient.Applications.List(int page = 1, int limit = 10)
```
> 获取应用列表相关信息

#### 参数

- `page` \<int\> 分页序号，默认为 1。
- `limit` \<int\> 每页返回的个数，默认为 10。

#### 示例

```csharp
 managementClient.Applications.list(1, 10);
```

## 获取应用详情

> 获取应用详情信息
```csharp
 managementClient.Applications.FindById(string id)
```
#### 参数

- `id` \<string\> 应用 id

#### 示例

```csharp
 managementClient.Applications.findById("APP_ID");
```

## 获取资源列表
```csharp
 managementClient.Applications.ListResource(string appId, ListResourceOption listResourceOption = nul)
```
> 获取所有资源。

#### 参数

- `params` \<ListResourceOption\>
- `params.AppId` \<string\> 应用 ID
- `params.Type` \<string\> 资源类型，可选值为 `DATA`、`API`、`MENU`、`UI`、`BUTTON`。
- `params.Page` \<string\> 分页，获取第几页，默认从 1 开始。
- `params.Limit` \<string\> 每页条目数量，默认为 10 个。

#### 示例

```csharp
 managementClient.Applications.listResources("APP_ID");
```

## 创建资源
```csharp
 managementClient.Applications.CreateResource(string appId, CreateResourceParam createResourceParam)
```
> 创建一个资源。

#### 参数

- `appId` \<string\> 应用 ID
- `param` \<CreateResourceParam\> 资源信息对象
- `param.Code` \<string\> 资源标识符
- `param.Type` \<ResourceType\> 枚举 资源类型，可选值为 `DATA`、`API`、`MENU`、`UI`、`BUTTON`。
- `param.Actions` \<List\<IAction\>\> 资源操作对象数组。其中 name 为操作名称，填写一个**动词**，description
  为操作描述，填写描述信息。
  - `IAction`: `name` \<string\> 操作名称，`description` \<string\> 描述信息。
- `param.Description` \<string\> 资源描述信息

#### 示例

```csharp
 managementClient.Applications.CreateResource("APP_ID");
```


## 更新资源
```csharp
 managementClient.Applications.UpdateResource(string appId, string code, UpdateResourceParam updateResourceParam)
```
> 更新一个资源。

#### 参数

- `appId` \<string\> 应用 ID
- `param` \<ResourceOptionsParams\> 资源信息对象
- `code` \<string\> 资源标识符
- `param.NameSpace` \<string\> 资源所在的权限分组标识
- `param.Type` \<string\> 资源类型，可选值为 `DATA`、`API`、`MENU`、`UI`、`BUTTON`。
- `param.Actions` \<List\<IAction\>\> 资源操作对象数组。其中 name 为操作名称，填写一个**动词**，description
  为操作描述，填写描述信息。
  - `IAction`：`name` \<string\> 操作名称  `description` \<string\> 描述信息
- `param.description` \<string\> 资源描述信息


## 删除资源
```csharp
 managementClient.Applications.DeleteResource(string appId, string code)
```
> 删除一个资源。

#### 参数

- `appId` \<string\> 应用 ID
- `code` \<string\> 资源标识符

#### 示例

```csharp
managementClient .Applications.DeleteResource("APP_ID", "CODE");
```


## 获取应用访问控制策略
```csharp
 managementClient.UpdateDefaultAccessPolicy(string appId, UpdateDefaultApplicationAccessPolicyParam updateDefaultApplicationAccessPolicyParam)
```

#### 参数

- `appId` \<string\> 应用 ID
- `option` \<updateDefaultApplicationAccessPolicyParam\> 
- `option.DefaultStrategy` \<DefaultStrategyEnum\> 

#### 示例

```csharp
managementClient .Applications.UpdateDefaultAccessPolicy("APP_ID");
```

## 创建角色
```csharp
 managementClient.CreateRole(
                string appId,
                string code,
                string description = nul)
```

#### 参数

- `appId` \<string\> 应用 ID
- `code` \<string\> string
- `description` \<string\> 描述

#### 示例

```csharp
managementClient.CreateRole("appId"，"code", "description");
```

## 删除角色
```csharp
 managementClient.DeleteRole(string appId, string code)
```

#### 参数

- `appId` \<string\> 应用 ID
- `code` \<string\> string

#### 示例

```csharp
managementClient.DeleteRole("appId");
```

## 批量删除角色
```csharp
 managementClient.DeleteRoles( string appId, IEnumerable<string> codeList)
```

#### 参数

- `appId` \<string\> 应用 ID
- `codeList` \<List\<string\>\> 角色唯一标志符列表

#### 示例

```csharp
managementClient.DeleteRole("appId");
```


## 修改角色
```csharp
 managementClient.UpdateRole( string appId, UpdateRoleOptions option)
```

#### 参数

- `appId` \<string\> 应用 ID
- `option` \<UpdateRoleOptions\> 参数
- `option.Code` \<string\> 角色唯一标志符
- `option.Description` \<string\> 描述
- `option.NewCode` \<string\> 新的角色唯一标志符
- `option.NameSpace` \<string\> 
#### 示例

```csharp
managementClient.UpdateRole("appId");
```

## 修改角色
```csharp
 managementClient.FindRole(
  string appId,
  string code)
```
> 已过时不建议使用
#### 参数

- `appId` \<string\> 应用 ID
- `code` \<string\> 角色唯一标志符
#### 示例

```csharp
managementClient.FindRole("appId","code");
```

## 修改角色
```csharp
 managementClient.GetRoles(string appId, int page = 1, int limit = 10)
```

#### 参数

- `appId` \<string\> 应用 ID
- `page` \<int\> 分页序号，默认为 1。
- `limit` \<int\> 每页返回的个数，默认为 10。 
#### 示例

```csharp
managementClient.GetRoles("appId",1，10);
```

## 添加用户
```csharp
 managementClient.AddUsersToRole(
  string appId,
  string code,
  IEnumerable<string> userIds)
```

#### 参数

- `appId` \<string\> 应用 ID
- `code` \<string\> 角色唯一标志符
- `userIds` \<List\<string\>\> 用户 ID 列表
#### 示例

```csharp
var list = new userIds(){}
managementClient.AddUsersToRole("appId","code",list);
```

## 移除用户
```csharp
 managementClient.RemoveUsersFromRole(
  string appId,
  string code,
  IEnumerable<string> userIds)
```

#### 参数

- `appId` \<string\> 应用 ID
- `code` \<string\> 角色唯一标志符
- `userIds` \<List\<string\>\> 用户 ID 列表
#### 示例

```csharp
var list = new userIds(){}
managementClient.RemoveUsersFromRole("appId","code",list);
```

## 获取角色被授权的所有资源
```csharp
 managementClient.ListAuthorizedResourcesByRole(
  string appId,
  string code,
  ResourceType resourceType = default)
```

#### 参数

- `appId` \<string\> 应用 ID
- `code` \<string\> 角色唯一标志符
- `resourceType` \<ResourceType>\> 资源类型
#### 示例

```csharp
managementClient.ListAuthorizedResourcesByRole("appId","code","DATA");
```
## 创建注册协议
```csharp
 managementClient.createAgreement(string appId, AgreementInput option)
```

#### 参数

- `appId` \<string\> 应用 ID
- `option` \<AgreementInput\> 
- `option.Title` \<string\> 
- `option.Required` \<bool\> 
- `option.Lang` \<LangEnum\> 
#### 示例

```csharp
var option = new AgreementInput(){}
managementClient.createAgreement("appId",option);
```

## 删除注册协议
```csharp
 managementClient.deleteAgreement(string appId, int agreementId)
```

#### 参数

- `appId` \<string\> 应用 ID
- `agreementId` \<int\>  协议 ID
#### 示例

```csharp
managementClient.deleteAgreement("appId",100);
```


## 修改注册协议
```csharp
 managementClient.modifyAgreement(string appId, int agreementId, AgreementInput agreement）
```

#### 参数

- `appId` \<string\> 应用 ID
- `agreementId` \<int\>  协议 ID
- `option` \<AgreementInput\> 
- `option.Title` \<string\> 
- `option.Required` \<bool\> 
- `option.Lang` \<LangEnum\> 
#### 示例

```csharp
var option = new AgreementInput(){}
managementClient.deleteAgreement("appId",100，option);
```

## 获取应用注册协议列表
```csharp
 managementClient.listAgreement(string appId, int agreementId, AgreementInput agreement）
```
#### 参数

- `appId` \<string\> 应用 ID
- `agreementId` \<int\>  协议 ID
- `option` \<AgreementInput\> 
- `option.Title` \<string\> 
- `option.Required` \<bool\> 
- `option.Lang` \<LangEnum\> 
#### 示例

```csharp
var option = new AgreementInput(){}
managementClient.listAgreement("appId",100，option);
```

## 对应用的注册协议排序
```csharp
 managementClient.sortAgreement(string appId, IEnumerable<int> order)
```
#### 参数

- `appId` \<string\> 应用 ID
- `order` \<List\<string\>\>应用下所有协议的 ID 列表，按需要的顺序排列

#### 示例

```csharp
var option = new list<int>(){}
managementClient.listAgreement("appId",option);
```

## 查看应用下已登录用户
```csharp
 managementClient.ActiveUsers(string appId, int page = 1, int limit = 10)
```
#### 参数
- `appId` \<string\> 应用 ID
- `page` \<int\> 分页序号，默认为 1。
- `limit` \<int\> 每页返回的个数，默认为 10。

#### 示例

```csharp
managementClient.ActiveUsers( "appId", 1, 10 );
```


## 刷新应用密钥
```csharp
 managementClient.RefreshApplicationSecret(string appId)
```
#### 参数
- `appId` \<string\> 应用 ID

#### 示例

```csharp
managementClient.RefreshApplicationSecret("appId")
```

## 更改应用类型
```csharp
 managementClient.ChangeApplicationType(string appId, ApplicationType type)
```
#### 参数
- `appId` \<string\> 应用 ID
- `type` \<ApplicationType\> 应用 ID

#### 示例

```csharp
managementClient.ChangeApplicationType("appId","INDIVIDUAL")
```

