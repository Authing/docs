!!!include(common/init-java-mngmt-sdk.md)!!!

使用 `OrgManagementClient` 的 `addNode` 方法添加节点：

> 需要指定父节点的 ID（withParentNodeId）。

```java
AddNodeV2Param param = new AddNodeV2Param("组织机构 ID", "节点名称")
        .withParentNodeId("父节点 ID");
Node node = managementClient.org().addNode(param).execute();
```