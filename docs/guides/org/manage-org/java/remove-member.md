!!!include(common/init-java-mngmt-sdk.md)!!!

使用 `ManagementClient` 的 `removeDepartmentMembers` 方法移除部门中的成员：

```java
RemoveDepartmentMembersReqDto removeDepartmentMembersReqDto = new RemoveDepartmentMembersReqDto();
removeDepartmentMembersReqDto.setOrganizationCode("steamory");
removeDepartmentMembersReqDto.setDepartmentId("AUTHING_DEP_ID");
List<String> userIdList = new ArrayList<>();
userIdList.add("AUTHING_USERID)");
removeDepartmentMembersReqDto.setUserIds(userIdList);
IsSuccessRespDto isSuccessRespDto = client.removeDepartmentMembers(removeDepartmentMembersReqDto);
```

> 如果某用户仅属于一个部门，无法移除。