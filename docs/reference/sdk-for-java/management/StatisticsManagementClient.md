---
meta:
  - name: description
    content: 管理日志统计信息
---

# 管理日志统计信息

<LastUpdated/>


> 主要用于管理日志统计信息， 你可以查看用户操作日志、查看审计日志


## 查看用户操作日志

StatisticsManagementClient().listUserActions(param)

> 查看用户操作日志

#### 参数

- `param` \<LogsPageParam\> 管理日志统计信息分页查询参数。
- `param.clientIp` \<String\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
- `param.operationNames` \<List\<String\>\> 操作名称的集合
- `param.userIds` \<List\<String\>\> 用户唯一标识的集合
- `param.page` \<Integer\> 分页，获取第几页，默认从 1 开始。
- `param.limit` \<Integer\> 每页条目数量，默认为 10 个。

#### 示例

```java
PaginatedUserActionLog actionLog = managementClient
        .statistics()
        .listUserActions(new LogsPageParam(null, null, Arrays.asList(user.getId()), 1, 10)
        .execute();
```

## 查看审计日志

StatisticsManagementClient().listAuditLogs(param)

> 查看审计日志

#### 参数

- `param` \<AuditLogPageParam\>
- `param.clientIp` \<String\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
- `param.operationNames` \<List\<String\>\> 操作名称的集合
- `param.operatorArns` \<List\<String\>\> 操作人的 arn 集合
- `param.page` \<Integer\> 分页，获取第几页，默认从 1 开始。
- `param.limit` \<Integer\> 每页条目数量，默认为 10 个。

#### 示例

```java
PaginatedAuditLog auditLog = managementClient
        .statistics()
        .listAuditLogs(new AuditLogPageParam(null, null, Arrays.asList(user.getId()), 1, 10))
        .execute();
```

