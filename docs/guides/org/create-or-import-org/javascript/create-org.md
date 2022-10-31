!!!include(common/init-java-mngmt-sdk.md)!!!

使用 `ManagementClient` 的 `org` 方法获取 `OrgManagement` 对象，然后用该对象调用 `create` 方法创建组织机构：

```javascript
const org = await managementClient.org.create('北京某某公司', '北京某某公司有限公司', 'example');
```
