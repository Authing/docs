!!!include(en/common/init-java-mngmt-sdk.md)!!!

Use `OrgManagementClient` 的 `moveNode` 方法移动节点：

> 需要指定所移动节点的新父节点（targetParentId）。

```java
Org org = managementClient.org().moveNode("orgId", "nodeId", "targetParentId").execute();
```
