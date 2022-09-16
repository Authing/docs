---
meta:
  - name: description
    content: 管理日志统计信息
---

# 管理日志统计信息

<LastUpdated/>


> 主要用于管理日志统计信息， 你可以查看用户操作日志、查看审计日志


## 查看用户操作日志

```csharp
managementClient.Statistics.listUserActions(LogsPageParam options)
```
> 查看用户操作日志

#### 参数

- `param` \<LogsPageParam\> 管理日志统计信息分页查询参数。
- `param.ClientIp` \<string\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
- `param.OperationNames` \<List\<string\>\> 操作名称的集合
- `param.UserIds` \<List\<string\>\> 用户唯一标识的集合
- `param.Page` \<int\> 分页，获取第几页，默认从 1 开始。
- `param.Limit` \<int\> 每页条目数量，默认为 10 个。

#### 示例

```csharp
 var option = new LogsPageParam(){
   ClientIp = "127.0.0.1",
   OperationNames = "OperationNames"
   UserIds = new List<string>(){
     "id"
   }
 };
 var result = await managementClient.Statistics.listUserActions(new LogsPageParam(){});
```

## 查看审计日志

```csharp
var result = await managementClient.Statistics.listAuditLogs(AuditLogPageParam options);
```
> 查看审计日志

#### 参数

- `param` \<AuditLogPageParam\>
- `param.ClientIp` \<string\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
- `param.OperationNames` \<List\<string\>\> 操作名称的集合
- `param.OperatorArns` \<List\<string\>\> 操作人的 arn 集合
- `param.Page` \<int\> 分页，获取第几页，默认从 1 开始。
- `param.Limit` \<int\> 每页条目数量，默认为 10 个。

#### 示例

```csharp
var result = await managementClient.Statistics.listAuditLogs(new AuditLogPageParam(){ClientIp = "127.0.0.1"});
```

