!!!include(common/init-java-mngmt-sdk.md)!!!

使用 `ManagementClient` 的 `updateDepartment` 方法修改部门：

```java
        UpdateDepartmentReqDto updateDepartmentReqDto = new UpdateDepartmentReqDto();
        updateDepartmentReqDto.setOrganizationCode("steamory");
        updateDepartmentReqDto.setDepartmentId("AUTHING_DEP_ID");
				// 修改部门名称
        updateDepartmentReqDto.setName("产品部");
        DepartmentSingleRespDto departmentSingleRespDto = client.updateDepartment(updateDepartmentReqDto);
```