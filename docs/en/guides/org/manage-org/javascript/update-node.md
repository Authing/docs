!!!include(en/common/init-java-mngmt-sdk.md)!!!

Use `OrgManagementClient` 的 `updateNode` 修改节点信息：

```javascript
await managementClient.org.updateNode("NDOEID", {
  name: "新的节点名称"
});
```
