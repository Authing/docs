!!!include(common/init-java-mngmt-sdk.md)!!!

使用 `ManagementClient` 的 `createOrganization` 方法获取 `OrganizationSingleRespDto` 对象，创建组织机构：

```java
CreateOrganizationReqDto reqDto = new CreateOrganizationReqDto();
reqDto.setOrganizationName("蒸汽记忆");
reqDto.setOrganizationCode("steamory");
OrganizationSingleRespDto response = managementClient.createOrganization(reqDto);
System.out.println(JsonUtils.serialize(response));
```