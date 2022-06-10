!!!include(en/common/init-java-mngmt-sdk.md)!!!

Use `OrgManagementClient` 的 `create` 方法创建组织机构：

```javascript
const org = await managementClient.org.create(
  "北京非凡科技",
  "北京非凡科技有限公司",
  "feifan"
);
```
