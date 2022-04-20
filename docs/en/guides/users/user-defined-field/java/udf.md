!!!include(common/init-java-auth-sdk.md)!!!

首先使用用户的 token 初始化 SDK：

```java
authenticationClient.setAccessToken("ID_TOKEN");
```

设置自定义字段：

```java
List<UserDefinedData> list = authenticationClient.setUdv('school', '华中科技大学').execute();
```

获取该用户最新的自定义数据：

```java
List<UserDefinedData> list = authenticationClient.listUdv().execute();
```