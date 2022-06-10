!!!include(en/common/init-java-mngmt-sdk.md)!!!

Use `OrgManagementClient` 的 `listMembers` 方法获取节点的成员列表：

```java
Node node = managementClient.org().listMembers(new NodeByIdWithMembersParam("nodeId")).execute();
```
