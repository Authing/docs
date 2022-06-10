!!!include(en/common/init-java-mngmt-sdk.md)!!!

Use `OrgManagementClient` 的 `listChildren` 获取子节点列表：

```javascript
// 子节点列表
const children = await managementClient.org.listChildren("ORGID", "NODEID");
```
