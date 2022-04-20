!!!include(common/init-java-mngmt-sdk.md)!!!

使用 `OrgManagementClient` 的 `removeMembers` 方法移除节点的成员：

```java
Node node = managementClient.org().removeMembers("nodeId", Arrays.asList("userId")).execute();
```