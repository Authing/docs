!!!include(en/common/init-java-mngmt-sdk.md)!!!

Use `OrgManagementClient` 的 `removeMembers` 方法移除节点的成员：

```java
Node node = managementClient.org().removeMembers("nodeId", Arrays.asList("userId")).execute();
```
