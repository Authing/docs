!!!include(common/init-java-mngmt-sdk.md)!!!

使用 `OrgManagementClient` 的 `updateNode` 修改节点信息：

```javascript
await managementClient.org.updateNode("NDOEID", {
   name: '新的节点名称'
})
```