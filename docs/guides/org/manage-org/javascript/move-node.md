!!!include(common/init-java-mngmt-sdk.md)!!!

使用 `OrgManagementClient` 的 `moveNode` 移动节点：

> 需要指定所移动节点的新父节点（TRAGET_NODE_ID）。

```javascript
await managementClient.org.moveNode("ORGID", "NODEID", "TRAGET_NODE_ID")
```
