---
meta:
  - name: description
    content: 管理租户信息
---

# 管理多租户

<LastUpdated/>

此模块可以进行租户管理和身份源连接管理等操作。

请使用以下方式使用该模块：

```csharp
managementClient.tenant.List // 获取用户池下的租户列表
managementClient.tenant.Details // 获取租户详情
managementClient.tenant.Create // 创建租户
managementClient.tenant.Update // 修改租户
managementClient.tenant.Delete // 删除租户
managementClient.tenant.Config // 配置租户品牌化
managementClient.tenant.Members //获取租户成员列表
managementClient.tenant.AddMembers // 添加租户成员
managementClient.tenant.RemoveMembers //移除租户成员
managementClient.tenant.ListExtIdp //  获取身份源列表
managementClient.tenant.ExtIdpDetail //获取身份源详细信息
managementClient.tenant.CreateExtIdp //  创建身份源
managementClient.tenant.UpdateExtIdp //更新身份源配置
managementClient.tenant.DeleteExtIdp // 删除身份源
managementClient.tenant.UpdateExtIdpConnection //更新身份源连接
managementClient.tenant.DeleteExtIdpConnection // 删除身份源连接
managementClient.tenant.CheckExtIdpConnectionIdentifierUnique //检查连接唯一标识是否冲突
managementClient.tenant.ChangeExtIdpConnectionState // 开关身份源连接
managementClient.tenant.BatchChangeExtIdpConnectionState // 批量开关身份源连接
```

## 获取用户池下的租户列表
>获取用户池下租户列表。

```csharp
managementClient.tenant.list( int page = 1,int limit = 10)
```


#### 参数

| 参数         | 类型   | 必填 | 描述                                                         |
| ------------ | ------ | ---- | ------------------------------------------------------------ |
| page  | int | 否   | 分页参数，页数。                                             |
| limit | int | 否   | 分页参数，每页显示个数。当参数 limit = -1 时，将返回所有数据 |

#### 示例

```csharp
var tenants = await managementClient.tenant.List();
```

```csharp
var tenants = await managementClient.tenant.List(1, 10);
```


## 根据 ID 查询租户详情
> 根据 ID 查询租户详情
```csharp
managementClient.tenant.Details(string tenantId)
```

#### 参数

| 参数     | 类型   | 必填 | 描述    |
| -------- | ------ | ---- | ------- |
| tenantId | string | 是   | 租户 ID |

#### 示例

```csharp
var tenant = await managementClient.tenant.Details("租户 ID");
```

## 创建租户
>创建租户

```csharp
managementClient.tenant.Create(CreateTenantOption option)
```

#### 参数

| 参数                | 类型   | 必填 | 描述                                        |
| ------------------- | ------ | ---- | ------------------------------------------- |
| options.Name        | string | 是   | 租户名称                                    |
| options.AppIds      | string | 是   | 应用 ID，支持关联多个应用，使用英文逗号分隔 |
| options.Logo        | string | 否   | 头像资源地址，通过图片上传接口中的 url 值   |
| options.Description | string | 否   | 租户描述                                    |

#### 示例

```csharp
var option = new CreateTenantOption(){
  Name = "搜索",
  AppIds = "619b64e4ccc0467dcba00920"
};
var tenant = await managementClient.tenant.Create(option);
```


## 修改租户
>修改租户

```csharp
managementClient.tenant.Update(string tenantId, CreateTenantOption option);
```

#### 参数

| 参数                | 类型   | 必填 | 描述                                        |
| ------------------- | ------ | ---- | ------------------------------------------- |
| tenantId            | string | 是   | 租户 ID                                     |
| options.Name        | string | 否   | 租户名称                                    |
| options.AppIds      | string | 否   | 应用 ID，支持关联多个应用，使用英文逗号分隔 |
| options.Logo        | string | 否   | logo 图标地址，图片上传接口中的 url 值      |
| options.Description | string | 否   | 租户描述                                    |

#### 示例

```csharp
var option = new CreateTenantOption(){
  Name = "张三"
};
var tenant = await managementClient.tenant.Update("6194aeee9ccea057e89738f0",option);
```

## 删除租户
>删除租户

```csharp
managementClient.tenant.Delete(string tenantId)
```


#### 参数

| 参数     | 类型   | 必填 | 描述    |
| -------- | ------ | ---- | ------- |
| tenantId | string | 是   | 租户 ID |

#### 示例

```csharp
var tenant = await managementClient.tenant.Delete("6194c58fa1a910549fc62aa5");
```


## 配置租户品牌化
>配置租户品牌化

```csharp
managementClient.tenant.Config(string tenantId, ConfigTenantOption option)
```


#### 参数

| 参数                                               | 类型    | 必填 | 描述                                                |
| -------------------------------------------------- | ------- | ---- | --------------------------------------------------- |
| tenantId                                           | string  | 是   | 租户 ID                                             |
| options.Css                                        | string  | 否   | 自定义 CSS                                          |
| options.SsoPageCustomizationSettings               | object  | 否   | SsoPageCustomizationSettings 对象的内容包含以下参数 |
| SsoPageCustomizationSettings.AutoRegisterThenLogin | boolean | 否   | 将注册和登录合并                                    |
| SsoPageCustomizationSettings.HideForgetPassword    | boolean | 否   | 隐藏忘记密码按钮                                    |
| SsoPageCustomizationSettings.HideIdp               | boolean | 否   | 隐藏企业身份源登录                                  |
| SsoPageCustomizationSettings.HideSocialLogin       | boolean | 否   | 隐藏社会化登录按钮                                  |

#### 示例

```csharp
var tenant = await managementClient.tenant.Config("6194aeee9ccea057e89738f0");
```

## 获取租户成员列表

>获取租户成员列表

```csharp
managementClient.tenant.Members(string tenantId, TenantMembersOption option);
```


#### 参数

| 参数          | 类型   | 必填 | 描述                                                         |
| ------------- | ------ | ---- | ------------------------------------------------------------ |
| tenantId      | string | 是   | 租户 ID                                                      |
| options.Page  | int | 否   | 分页参数，页数。                                             |
| options.Limit | int | 否   | 分页参数，每页显示个数。当参数 limit = -1 时，将返回所有数据 |

#### 示例

```csharp
var tenant = await managementClient.tenant.Members("6194aeee9ccea057e89738f0");
```

```csharp
var option = new TenantMembersOption(){
  Page = 1,
  limit = 10,
};
var tenant = await managementClient.tenant.Members("6194aeee9ccea057e89738f0",option);
```

## 添加租户成员

>添加租户成员

```csharp
managementClient.tenant.AddMembers(string tenantId, string[] userIds);
```


#### 参数

| 参数          | 类型   | 必填 | 描述                                                         |
| ------------- | ------ | ---- | ------------------------------------------------------------ |
| tenantId      | string | 是   | 租户 ID                                                      |
| userIds | string[] | 否   | 用户 ID 表                      |

#### 示例

```csharp
var tenant = await managementClient.tenant.AddMembers("6194aeee9ccea057e89738f0");
```

```csharp
var userIds = new List<string>(){
  "userId1",
  "userId2"
};
var tenant = await managementClient.tenant.AddMembers("6194aeee9ccea057e89738f0",userIds);
```



## 删除租户成员

>删除租户成员

```csharp
managementClient.tenant.RemoveMembers(string tenantId, string userId)
```

#### 参数

| 参数     | 类型   | 必填 | 描述    |
| -------- | ------ | ---- | ------- |
| tenantId | string | 是   | 租户 ID |
| userId   | string | 是   | 用户 ID |

#### 示例

```csharp
await managementClient.tenant.RemoveMembers("619b64fd2cfccd07a8296839","619b07ab229e3bfa98e94ee2");
```

## 获取身份源列表
>获取身份源列表

```csharp
managementClient.tenant.ListExtIdp(string tenantId)
```

#### 参数

| 参数     | 类型   | 描述    |
| -------- | ------ | ------- |
| tenantId | string | 租户 ID |

#### 示例

```csharp
var result = await managementClient.tenant.ListExtIdp("619b07312d6b99e1af7d8e4e");
```

## 获取身份源详细信息

>获取身份源详细信息

```csharp
managementClient.tenant.ExtIdpDetail(string extIdpId)
```


#### 参数

| 参数     | 类型   | 描述      |
| -------- | ------ | --------- |
| extIdpId | string | 身份源 ID |

#### 示例

```csharp
var result = await managementClient.tenant.ExtIdpDetail("619b33a00412723ba777eabf");
```


## 创建身份源
>创建身份源

```csharp
managementClient.tenant.CreateExtIdp(CreateExtIdpOption option)
```


#### 参数

| 参数        | 类型         | 必填 | 描述                                         |
| ----------- | ------------ | ---- | -------------------------------------------- |
| option.TenantId    | string       | 否   | 租户 ID，如不填则创建个体型身份源            |
| option.Name        | string       | 是   | 身份源名称                                   |
| option.Type        | string       | 是   | 身份源类型，可选值如下：<br />wechat 微信    |
| option.Connections | ExtIdpConnDetailInput[] | 是   | 包含任意多个 “连接对象” 的数组，详见下方说明 |

- 连接对象：表示属于该身份源的连接，来自同一身份源的不同连接之间的身份信息可以互通

| 参数            | 类型         | 必填 | 描述                                                         |
| --------------- | ------------ | ---- | ------------------------------------------------------------ |
| Connections.Type            | string       | 是   | 连接类型，可选值如下：<br />wechat:pc 微信 PC 端网页扫码登录<br />wechat:mobile 原生 APP 内部调用微信登录<br />wechat:webpage-authorization 微信浏览器内部网页授权登录<br />wechatmp-qrcode 接收微信公众号扫码、关注事件，自动创建用户<br />wechat:miniprogram:default 用户自主开发小程序内部登录<br />wechat:miniprogram:qrconnect 『Authing 小登录』扫码登录<br />wechat:miniprogram:app-launch 原生 APP 拉起小登录 |
| Connections.Identifier      | string       | 是   | 连接的唯一标识符                                             |
| Connections.DisplayName     | string       | 是   | 连接在登录页的显示名称                                       |
| Connections.Fields          | object       | 是   | 连接的详细配置信息                                           |
| Connections.UserMatchFields | string[] | 否   | 用户表自定义匹配字段（只供前端使用）                         |
| Connections.Logo            | string       | 否   | 连接的 logo                                                  |

#### 示例

```csharp
var option = new CreateExtIdpOption(){
      TenantId = "619b07312d6b99e1af7d8e4e",
      Name = "飞书身份源",
      type = "lark",
      Connections = new List<ExtIdpConnDetailInput>(){
      Type: "lark-internal",
      Identifier = "feishusdk",
      DisplayName: = "飞书身份源连接",
      Fields = new Dictionary<string, object>() {
          { "clientSecret", "d1cuu12KrcItRyD6T" },
          { "clientID", "d1cuu12KrcItRyD6T"  },
          {"displayName","飞书身份源连接1" },
      },
      UserMatchFields = new List<string>(){"ss"}
     }
};
var result = await managementClient.tenant.createExtIdp(option);
```




## 更新身份源

> 更新身份源

```csharp
managementClient.tenant.UpdateExtIdp(string extIdpId, UpdateExtIdpOption option);
```


#### 参数

| 参数         | 类型   | 必填 | 描述       |
| ------------ | ------ | ---- | ---------- |
| extIdpId     | string | 是   | 身份源 ID  |
| options.Name | string | 是   | 身份源名称 |

#### 示例

```csharp
var option = new UpdateExtIdpOption(){
  Name = "飞书身份源"
}
var result =  await managementClient.tenant.UpdateExtIdp("619b399e812c47c972900129",option);
```



## 删除身份源
>在某个已有身份源下创建新连接

```csharp
managementClient.tenant.DeleteExtIdp(string extIdpId)
```

#### 参数

| 参数     | 类型   | 必填 | 描述      |
| -------- | ------ | ---- | --------- |
| extIdpId | string | 是   | 身份源 ID |

#### 示例

```csharp
var result =  await managementClient.tenant.DeleteExtIdp("619b399e812c47c972900129");
```



## 创建身份源连接
>创建身份源连接

```csharp
managementClient.tenant.CreateExtIdpConnection(CreateExtIdpConnectionOption option)
```


#### 参数

| 参数            | 类型         | 必填 | 描述                                 |
| --------------- | ------------ | ---- | ------------------------------------ |
| option.ExtIdpId        | string       | 是   | 所属身份源 ID                        |
| option.Type            | string       | 是   | 连接类型                             |
| option.Identifier      | string       | 是   | 连接的唯一标识符                     |
| option.DisplayName     | string       | 是   | 连接在登录页的显示名称               |
| option.Fields          | object       | 是   | 连接的详细配置信息                   |
| option.UserMatchFields | string array | 否   | 用户表自定义匹配字段（只供前端使用） |
| option.Logo            | string       | 否   | 连接的 logo                          |

#### 示例

```csharp
var option1 = new CreateExtIdpConnectionOption()
    {
        ExtIdpId = "619c917f534a3b8ad988a209",
        Type = "wechatmp-qrcode",
        Identifier = "wechatc2",
        DisplayName = "微信身份源连接1",
        Fields = new Dictionary<string, object>() {
            { "clientSecret", "d1cuu12KrcItRyD6T" },
            { "clientID", "d1cuu12KrcItRyD6T"  },
            {"displayName","飞书身份源连接1" },
        },
        UserMatchFields = new List<string>(){"ss"}
    };
var result = await managementClient.tenant.CreateExtIdpConnection(option)
```




## 更新身份源连接

>更新身份源连接

```csharp
managementClient.tenant.UpdateExtIdpConnection(string extIdpConnectionId, UpdateExtIdpConnectionOption option)
```


#### 参数

| 参数                    | 类型         | 必填 | 描述                                 |
| ----------------------- | ------------ | ---- | ------------------------------------ |
| extIdpConnectionId      | string       | 是   | 身份源连接 ID                        |
| options.DisplayName     | string       | 是   | 连接在登录页的显示名称               |
| options.Fields          | object       | 是   | 连接的详细配置信息                   |
| options.UserMatchFields | string array | 否   | 用户表自定义匹配字段（只供前端使用） |
| options.Logo            | string       | 否   | 连接的 logo                          |


#### 示例

```csharp
var option = new UpdateExtIdpConnectionOption(){
      DisplayName = "微信身份源连接2",
      Fields = new Dictionary<string, object>() {
            { "clientSecret", "d1cuu12KrcItRyD6T" },
            { "clientID", "d1cuu12KrcItRyD6T"  },
            {"displayName","飞书身份源连接1" },
        },
      UserMatchFields = new List<string>(){"ss"}
    };
var result =  await managementClient.tenant.UpdateExtIdpConnection("619c9490d7b1cec02bf982f6",option);
```



## 删除身份源连接

>删除身份源连接

```csharp
managementClient.tenant.DeleteExtIdpConnection(string extIdpConnectionId)
```


#### 参数

| 参数               | 类型   | 必填 | 描述          |
| ------------------ | ------ | ---- | ------------- |
| extIdpConnectionId | string | 是   | 身份源连接 ID |

#### 示例

```csharp
var result = await managementClient.tenant.DeleteExtIdpConnection("619c9490d7b1cec02bf982f6");
```




## 检查连接唯一标识是否已存在
> 检查连接唯一标识是已存在

```csharp
managementClient.tenant.CheckExtIdpConnectionIdentifierUnique(string identifier)
```


#### 参数

| 参数       | 类型   | 必填 | 描述           |
| ---------- | ------ | ---- | -------------- |
| identifier | string | 是   | 待检查的标识符 |

#### 示例

```csharp
var result = await managementClient.tenant.CheckExtIdpConnectionIdentifierUnique("wechatc4");
```



## 开关身份源连接

>开关身份源连接

```csharp
managementClient.tenant.ChangeExtIdpConnectionState(string extIdpConnectionId, ChangeExtIdpConnectionStateOption option)
```


#### 参数

| 参数               | 类型    | 必填 | 描述                      |
| ------------------ | ------- | ---- | ------------------------- |
| extIdpConnectionId | string  | 是   | 身份源连接 ID             |
| option.AppId              | string  | 否   | 应用 ID，应用开关场景必填 |
| option.TenantId           | string  | 否   | 租户 ID，租户开关场景必填 |
| option.Enabled            | boolean | 是   | 是否开启                  |

#### 示例

```csharp
var option =  new ChangeExtIdpConnectionStateOption(){
    TenantId = "619b64fd2cfccd07a8296839",
    Enabled = true
};
var result = await managementClient.tenant.ChangeExtIdpConnectionState("619cc337075fdb26f5fdbfa2", option);
```




## 批量开关身份源连接

>批量开关身份源连接

```csharp
managementClient.tenant.BatchChangeExtIdpConnectionState(string extIdpId, ChangeExtIdpConnectionStateOption option)
```


#### 参数

| 参数     | 类型    | 必填 | 描述                      |
| -------- | ------- | ---- | ------------------------- |
| extIdpId | string  | 是   | 身份源 ID                 |
| option.AppId    | string  | 否   | 应用 ID，应用开关场景必填 |
| option.TenantId | string  | 否   | 租户 ID，租户开关场景必填 |
| option.Enabled  | boolean | 是   | 是否开启                  |

#### 示例

```csharp
var option = new ChangeExtIdpConnectionStateOption()
  {
    TenantId: "619b64fd2cfccd07a8296839",
    Enabled: true
  };
var result = await managementClient.tenant.BatchChangeExtIdpConnectionState("619c917f534a3b8ad988a209", option);
```

