!!!include(common/init-java-mngmt-sdk.md)!!!

使用 `OrgManagementClient` 的 `addMembers` 方法往节点中添加成员：

```java
Node node = managementClient.org().addMembers("nodeId", Arrays.asList("userId")).execute();
```