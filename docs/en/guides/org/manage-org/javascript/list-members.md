!!!include(en/common/init-java-mngmt-sdk.md)!!!

Use `OrgManagementClient` 的 `listMembers` 获取节点的成员列表：

```javascript
const { totalCount, list } = await managementClient.org.listMembers("NODE_ID");
```
