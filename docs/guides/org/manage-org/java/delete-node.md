!!!include(common/init-java-mngmt-sdk.md)!!!

使用 `OrgManagementClient` 的 `deleteNode` 方法删除节点：

```java
CommonMessage commonMessage = managementClient.org().deleteNode(new DeleteNodeParam("orgId", "nodeId")).execute();
```