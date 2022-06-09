!!!include(en/common/init-java-mngmt-sdk.md)!!!

Use `OrgManagementClient` 的 `addMembers` 方法往节点中添加成员：

```javascript
const { totalCount, list } = await managementClient.org.addMembers("NODE_ID", [
  "USER_ID"
]);
```
