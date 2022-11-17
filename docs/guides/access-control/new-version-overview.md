# 新版权限管理

<LastUpdated/>

目前被业界广泛采用的有两种权限模型：基于角色的访问控制（Role-based access control，简称 RBAC）和基于属性的访问控制（Attribute-Based Access Control，简称 ABAC）。二者各有优劣：

* RBAC 模型构建起来更加简单，缺点在于无法做到对资源细粒度地授权（都是授权某一类资源而不是某一个具体的资源）。

* ABAC 模型构建相对比较复杂，学习成本比较高，优点在于细粒度和根据上下文动态执行。

下面是对两种模型的进一步介绍。

## RBAC

RBAC 指的是按照用户角色（Role）授权相关权限。这实现了更灵活的访问控制，相比直接授予用户权限，要更加简单、高效、可扩展。

##

* 你可以在 [权限空间](/guides/access-control/access-management-space.md) 了解对空间的基本信息和权限管理的介绍。

* 你可以在 [角色管理](/guides/access-control/role-management.md) 查看整个用户池下所有角色的列表，并点击各角色详情页了解相应角色的基本信息、权限管理及扩展字段。

* 你可以在 [常规资源权限](/guides/access-control/common-resources-access-management.md) 了解有哪些常规资源，查看这些常规资源的授权信息，编辑授权规则，以及查看所有常规资源的授权关系。

* 你可以在 [数据资源权限](/guides/access-control/data-resources-access-control.md) 了解不同结构的数据资源，以及如何通过打包策略将数据资源授权。



