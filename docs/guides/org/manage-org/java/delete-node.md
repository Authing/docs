!!!include(common/init-java-mngmt-sdk.md)!!!

使用 `ManagementClient` 的 `deleteDepartment` 方法删除节点：

```java
DeleteDepartmentReqDto deleteDepartmentReqDto = new DeleteDepartmentReqDto();
        deleteDepartmentReqDto.setDepartmentId("AUTHING_DEP_ID");
        IsSuccessRespDto isSuccessRespDto = client.deleteDepartment(deleteDepartmentReqDto);
```