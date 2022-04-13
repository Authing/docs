# Integrate ABAC permission model into your application system

<LastUpdated/>

Earlier we introduced what is attribute-based access control (ABAC), and then this document introduces how to quickly integrate the ABAC permission model into your system based on Approw. In the last section, we introduced how to integrate the RBAC permission model. I believe you have realized that the RBAC permission model is static, which means there is no dynamic attributes such as environment and object properties involved. So it is difficult to achieve scenarios of the following Access control:

- When the department of a document is the same as the department of the user, the user can access the document;
- When the user is the owner of a document and the status of the document is draft, the user can edit the document;
- Persons from Department A are prohibited from accessing System B before nine o'clock in the morning;
- It is forbidden to access system A as an administrator in places other than NewYork;

## The Main Component of ABAC

In ABAC, whether an operation is allowed is determined based on the dynamic calculation of the object, resource, operation and environment information.

- Object: The object is the user who is currently requesting access to the resource. User attributes include ID, personal resources, roles, department and organization memberships, etc.;
- Resources: Resources are assets or objects (such as files, data, servers, and even APIs) that the current user wants to access. Resource attributes include file creation date, file owner, file name and type, data sensitivity, etc.;
- Operation: The operation is the operation that the user tries to perform on the resource. Common operations include "read", "write", "edit", "copy" and "delete";
- Environment: The environment is the context of each access request. Environmental attributes include the time and location of the access attempt, the object's device, communication protocol and encryption strength, etc.

## How ABAC make decision

During the execution of ABAC's decision statement, the decision engine will dynamically calculate the decision result based on the defined decision statement, combined with attributes such as objects, resources, operations, and environment.

Whenever an access request occurs, the ABAC decision-making system will analyze whether the attribute value matches the established policy. If there is a matching policy, the access request will be allowed.

For example, the policy "When a document belongs to the same department as the user's department, the user can access this document" will be matched by the following attributes:

- The department of the object (user) = the department of the resource;
- Resource = "document";
- Operation = "Access";

The policy "Prohibit people in department A from accessing system B before nine o'clock in the morning;" will be matched by the following attributes:

- Object's department = A department;
- Resource = "B System";
- Operation = "Access";
- Environment = "The time is 9 AM".

## Specify restrictions when authorizing resources in Approw

When we authorize resources, we can specify restrictions. For example, in the following example, we have added a restriction: the current requesting user is required to pass MFA authentication.

![](~@imagesZhCn/guides/access-control/Xnip2021-02-25_14-18-01.png)

In addition to the MFA authentication attribute, you can also obtain the following attributes in the context of Approw's policy engine:

- User object attributes: such as gender, organization, group, role, whether the email is verified, whether the phone number is verified, user defined data, whether the user has passed MFA authentication, the user's last MFA authentication time, etc.
- Environmental attributes: client IP, client UA, client browser, request source country, request source state/province, request source city, etc.;
- Resource attributes: resource creation time, resource owner, resource tag, etc.;

You can compose flexible policy authorization statements based on these attributes.

