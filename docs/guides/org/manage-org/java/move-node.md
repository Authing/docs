!!!include(common/init-java-mngmt-sdk.md)!!!

**仍**使用 `ManagementClient` 的 `updateDepartment` 方法移动部门：

> 需要指定所移动节点的新父节点（ParentDepartmentId）。

```java
UpdateDepartmentReqDto updateDepartmentReqDto = new UpdateDepartmentReqDto();
        updateDepartmentReqDto.setOrganizationCode("steamory");
        updateDepartmentReqDto.setDepartmentId("AUTHING_DEP_ID");
        updateDepartmentReqDto.setParentDepartmentId("AUTHING_DEP_ID");
        DepartmentSingleRespDto departmentSingleRespDto = client.updateDepartment(updateDepartmentReqDto);
```