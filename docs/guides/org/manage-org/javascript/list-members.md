!!!include(common/init-java-mngmt-sdk.md)!!!

使用 `OrgManagementClient` 的 `listMembers` 获取节点的成员列表：

```javascript
const { totalCount, list } = await managementClient.org.listMembers("NODE_ID");
```
