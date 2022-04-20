# Privilege Management Overview

<LastUpdated/>

In the [previous part](../authentication/README.md)we have introduced authentication. Authentication refers to the process of authenticating the user's identity (such as using passwords, SMS codes, etc.). After successfully authenticating the user's identity, the next thing we need to do is **privilege management**

Privilege management generally means that users only can access their authorized resources according to the security rules or security policies set by the system.

There are two permission models that are widely used by everyone:[Role-based access control (RBAC) ](./choose-the-right-access-control-model.md#什么是基于角色的访问控制-rbac) and [Attribute-based access control (ABAC)](./choose-the-right-access-control-model.md#什么是基于属性的访问控制-abac). Both have their own advantages and disadvantages: the RBAC model is simpler to construct, but the disadvantage is that it is impossible to achieve fine-grained authorization of resources (both are to authorize a certain type of resource rather than a specific resource); ABAC model construction is relatively complicated, and the learning cost is higher. The advantage is that it is fine-grained and can be dynamically executed according to the context.

Next, you can learn how to[ choose a suitable permission model for your application system.](./choose-the-right-access-control-model.md)
