!!!include(en/common/init-java-mngmt-sdk.md)!!!

Use `OrgManagementClient` 的 `listChildren` 方法获取节点的子节点列表：

```java
List<Node> nodes = managementClient.org().listChildren("orgId", "nodeId").execute();
```
