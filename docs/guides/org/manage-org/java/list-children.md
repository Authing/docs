!!!include(common/init-java-mngmt-sdk.md)!!!

使用 `ManagementClient` 的 `listChildrenDepartments` 方法获取节点的子节点列表：

```java
ListChildrenDepartmentsDto listChildrenDepartmentsDto = new ListChildrenDepartmentsDto();
listChildrenDepartmentsDto.setDepartmentId("AUTHING_DEP_ID");
listChildrenDepartmentsDto.setOrganizationCode("steamory");
DepartmentPaginatedRespDto departmentPaginatedRespDto = client.listChildrenDepartments(listChildrenDepartmentsDto);
```