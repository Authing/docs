---
meta:
  - name: description
    content: User Account Management 
---

# User Account Management 

<LastUpdated/>

This chapter mainly introduces the operations of managing one single user, such as binding mailboxes, linking accounts, disabling accounts, etc. If you want to know how to manage user directory, please see [User Directory Management](../users/README.md).

User account management can be managed visually through the console, user personal center, or with the help of SDK & API. You can choose the method that suits you according to your business needs.

User account management can be divided into two methods: administrator operation and user self-service operation. User self-service operation needs to verify user identity through phone number verification code, MFA, etc., and administrator operation only needs to provide Management Token (if SDK is applied, only need to provide the [user pool secret](/guides/faqs/get-userpool-id-and-secret.md)).

The following content is in no particular order, you can choose the content you are interested in to read:

- [Understand the interpretation of all fields in the user profile](./user-profile.md);
- [Understand how the administrator creates an account](./create-user/);
- [Know how to manage user accounts](./manage-profile.md), such as modifying user information, binding MFA, etc.;<!-- - [了解如何给用户添加角色、分配权限](./role-and-permission.md)； -->
- [Know how to bind accounts](./bind-social-account.md);
- [Know how to manage user-defined data](/guides/users/user-defined-field/);
- [Know how to view the user's login history](./login-history.md);
- [Know how to check the user's geographic location](./geo.md);
- [Know how to enhance the security of user accounts](./security.md);
- [Know how to manage the user's login status](./login-state.md);
- [Learn how to control which apps users can access](./application-access.md).
