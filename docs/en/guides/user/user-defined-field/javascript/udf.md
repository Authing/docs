!!!include(common/init-js-auth-sdk.md)!!!

首先使用用户的 token 初始化 SDK：

```java
authenticationClient.setToken("ID_TOKEN");
```

设置自定义字段：

```java
const list = authenticationClient.setUdv('school', '华中科技大学');
```

获取该用户最新的自定义数据：

```java
const list = authenticationClient.listUdv();
```