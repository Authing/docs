!!!include(common/init-java-mngmt-sdk.md)!!!

使用 `ManagementClient` 的 `createDepartment` 方法添加部门：

> 需要指定父节点的 ID（ParentDepartmentId）。如果该部门上级是根组织，则通过 OrganizationCode 调用 getOrganization 方法获取；如果部门上级是别的部门，则通过 getDepartment 方法获取。

```java
GetOrganizationDto getOrganizationDto = new GetOrganizationDto();
getOrganizationDto.setOrganizationCode("code");
OrganizationSingleRespDto organization = client.getOrganization(getOrganizationDto);
System.out.println(JsonUtils.serialize(organization));

CreateDepartmentReqDto createDepartmentReqDto = new CreateDepartmentReqDto();
createDepartmentReqDto.setParentDepartmentId("AUTHING_DEP_ID");
createDepartmentReqDto.setName("开发部");
createDepartmentReqDto.setOrganizationCode("steamory");
DepartmentSingleRespDto department = client.createDepartment(createDepartmentReqDto);
```