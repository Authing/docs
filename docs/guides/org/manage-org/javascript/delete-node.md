!!!include(common/init-js-mngmt-sdk.md)!!!

使用 `OrgManagementClient` 的 `deleteNode` 方法删除节点：

```javascript
const org = await managementClient.org.create('北京某某公司', '北京某某公司有限公司', 'example');
const { id: orgId, rootNode } = org
const node = await managementClient.org.deleteNode(orgId, rootNode.id)
```
