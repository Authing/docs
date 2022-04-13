# Organization Overview

<LastUpdated/>

With {{$localeConfig.brandName}}, [role-based access control（RBAC）](/guides/access-control/rbac.md) can be quickly implemented. RBAC refers to the authorization of the user's related permissions through the role (Role) of the user, which is more flexible, efficient, and scalable than directly granting user permissions. 

In real life, groups and roles are often nested hierarchically, in a tree-like structure. The most common ones are organizations, such as companies, schools, etc.

A common organizational structure is as follows:

* The first-level departments include product department, research and development department, operation department, and comprehensive management department
* There are second-level departments under the first-level department, such as product manager and designer in the product department.

<img src="~@imagesZhCn/guides/org/Lark20210302-193510.png" alt="drawing"/>


This is a typical tree structure where there is one and only one root node. Generally speaking, the root node is a company or an organization. Each node corresponds to a hierarchical department.


In {{$localeConfig.brandName}}, you can [import organizations from third-party user directories such as LDAP, Active Directory, etc](./create-or-import-org/README.md). We also provide [two ways to manage organizations, console and SDK](./manage-org/README.md). Therefore, you can easily [manage the member lifecycle](./staff-life-cycle-management/README.md) and you can also [use the LDAP protocol to open organizational data to the outside world](./ldap-user-directory/README.md).

