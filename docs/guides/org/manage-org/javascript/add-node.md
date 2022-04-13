!!!include(common/init-java-mngmt-sdk.md)!!!

使用 `OrgManagementClient` 的 `addNode` 方法添加节点：

```javascript
const org = await managementClient.org.create('北京非凡科技', '北京非凡科技有限公司', 'feifan');
const { id: orgId, rootNode } = org
const node = await managementClient.org.addNode(orgId, rootNode.id, { name: '运营部门' })
```
