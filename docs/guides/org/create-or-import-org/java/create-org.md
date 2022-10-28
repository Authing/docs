!!!include(common/init-java-mngmt-sdk.md)!!!

使用 `ManagementClient` 的 `org` 方法获取 `OrgManagement` 对象，然后用该对象调用 `create` 方法创建组织机构：

```java
Org org = managementClient.org().create(new CreateOrgParam("your org name", "your org code", "your org desc")).execute();
```