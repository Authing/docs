!!!include(common/init-java-mngmt-sdk.md)!!!

使用 `OrgManagementClient` 的 `create` 方法创建组织机构：

```java
Org org = managementClient.org().create(new CreateOrgParam("name1", "org1", "desc1")).execute();
```