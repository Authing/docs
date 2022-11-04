!!!include(common/init-java-mngmt-sdk.md)!!!

使用 `ManagementClient` 的 `listDepartmentMembers` 方法获取部门的成员列表：

```java
ListDepartmentMembersDto listDepartmentMembersDto = new ListDepartmentMembersDto();
listDepartmentMembersDto.setOrganizationCode("steamory");
listDepartmentMembersDto.setDepartmentId("AUTHING_DEP_ID");
listDepartmentMembersDto.setSortBy("JoinDepartmentAt");
listDepartmentMembersDto.setOrderBy("Asc");
UserPaginatedRespDto userPaginatedRespDto = client.listDepartmentMembers(listDepartmentMembersDto);
```