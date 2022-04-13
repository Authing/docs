---
meta:
  - name: description
    content: StatisticsManagementClient
---

# StatisticsManagementClient

<LastUpdated/>


> This client is used to manage statistics. It can list user actions and list audit logs


## List user's actions

StatisticsManagementClient().listUserActions(param)

> List user's actions

#### Parameters

- `param` \<LogsPageParam\> 
- `param.clientIp` \<String\> The real IP of the client. If you call this interface on the server side, be sure to set this parameter to the real IP of the end user.
- `param.operationNames` \<List\<String\>\> Operation names list
- `param.userIds` \<List\<String\>\> User Id list
- `param.page` \<Integer\> Page number, starting from 1. The default value is: `1`.
- `param.limit` \<Integer\> The number of users per page. The default value is: `10`.

#### Example

```java
PaginatedUserActionLog actionLog = managementClient.statistics()
        .listUserActions(new LogsPageParam(null, null, Arrays.asList("iserId"), 1, 10)
        .execute();
```

## List audit logs

StatisticsManagementClient().listAuditLogs(param)

> 查看审计日志

#### Parameters

- `param` \<AuditLogPageParam\>
- `param.clientIp` \<String\> The real IP of the client. If you call this interface on the server side, be sure to set this parameter to the real IP of the end user.
- `param.operationNames` \<List\<String\>\> Operation names list
- `param.operatorArns` \<List\<String\>\> Operation arn list
- `param.page` \<Integer\> Page number, starting from 1. The default value is: `1`.
- `param.limit` \<Integer\> The number of users per page. The default value is: `10`.

#### Example

```java
PaginatedAuditLog auditLog = managementClient.statistics()
        .listAuditLogs(new AuditLogPageParam(null, null, Arrays.asList("userId"), 1, 10))
        .execute();
```

