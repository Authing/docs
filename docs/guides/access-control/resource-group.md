---
{ meta: [{ name: 'description', content: '使用权限分组管理权限资源' }] }
---

# 使用权限分组管理权限资源

<LastUpdated/>

权限分组可以理解为权限的命名空间，不同权限分组中的角色和资源相互独立，即使同名也不会冲突。

![](~@imagesZhCn/guides/access-control/Xnip2021-02-25_20-58-50.png)

## 创建权限分组

在**权限管理**的权限分组菜单中点击添加按钮：
![](~@imagesZhCn/guides/access-control/Xnip2021-02-25_21-22-41.png)

在弹窗中填入分组名和分组标识符，标识符用于后期鉴权时作为唯一标识识别权限组。

![](~@imagesZhCn/guides/access-control/Xnip2021-02-25_21-24-56.png)

在创建的权限分组中就可以使用前面介绍的 ABAC 或 RBAC 权限模型对权限资源独立管理了。

## 如何使用权限分组判断权限

```javascript
import { ManagementClient } from 'authing-js-sdk'

const managementClient = new ManagementClient({
  userPoolId: 'YOUR_USERPOOL_ID',
  secret: 'YOUR_USERPOOL_SECRET',
})
const { totalCount, list } = await managementClient.acl.isAllowed(
  'USER_ID',
  '资源',
  '操作',
  '权限分组标识符'
)
```

## 权限分组与应用的关系

在每个应用创建时，{{$localeConfig.brandName}} 都会为你创建一个权限分组。自动创建的权限分组名为应用名，标识符为应用 ID，且不可修改。{{$localeConfig.brandName}} 也会为每个用户池创建一个默认权限分组，当你的权限资源比较简单，不需要在应用层面隔离管理时，可以直接使用默认权限分组。当你的某个应用比较复杂，存在冲突的角色或资源时，就可以通过自己手动创建权限分组来隔离管理权限资源。
