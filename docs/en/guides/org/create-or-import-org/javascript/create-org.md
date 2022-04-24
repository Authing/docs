!!!include(common/init-java-mngmt-sdk.md)!!!

使用 `OrgManagementClient` 的 `create` 方法创建组织机构：

```javascript
const org = await managementClient.org.create('北京非凡科技', '北京非凡科技有限公司', 'feifan');
```
