# 权限视图

权限视图：在权限视图中，以用户为维度去计算授权关系，在视图中可以查询到每个用户有哪些权限，策略中对应有哪些资源，以及对应的是哪个权限空间。

管理员可将权限视图用作权限审计。通过数据策略，资源关联到了用户上，不管这个用户归到哪个用户分组，或属于哪个角色，或属于哪个部门，最终都会以用户的维度来呈现用户最终的权限。

在权限视图中支持通过筛选字段生成新的权限视图，并支持另存为新视图及进行视图之间的切换。

![权限视图](./images/new-data-auth-view.png)
