!!!include(common/init-js-mngmt-sdk.md)!!!

使用 `OrgManagementClient` 的 `addMembers` 方法往节点中添加成员：

```javascript
const { totalCount, list } = await managementClient.org.addMembers("NODE_ID", ["USER_ID"])
```