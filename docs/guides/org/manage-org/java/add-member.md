!!!include(common/init-java-mngmt-sdk.md)!!!

使用 `ManagementClient` 的 `addDepartmentMembers` 方法在部门中添加成员：

```java
AddDepartmentMembersReqDto addDepartmentMembersReqDto = new AddDepartmentMembersReqDto();
addDepartmentMembersReqDto.setOrganizationCode("steamory");
addDepartmentMembersReqDto.setDepartmentId("AUTHING_DEP_ID");
List<String> userIdList = new ArrayList<>();
userIdList.add("AUTHING_USERID");
addDepartmentMembersReqDto.setUserIds(userIdList);
IsSuccessRespDto isSuccessRespDto = client.addDepartmentMembers(addDepartmentMembersReqDto);
```

