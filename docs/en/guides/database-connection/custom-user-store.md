# Use a custom database to save user data

<LastUpdated/>

<!-- ::: hint-warning
只有**企业版**用户能够Use 连接自定义数据库功能，详情请见 [https://authing.cn/pricing](https://authing.cn/pricing)。如果你想试用，请联系 176-0250-2507 或 xuziqiang@authing.cn。
::: -->

## Migration process

When using this mode, user data is always stored in your database, and Authing will never save your user data. In order for the system to work properly, you need to implement scripts for user add, delete, modify, and check.

## Script configuration

You need to write scripts on [Authing console](https://console.authing.cn/console/userpool)，**database connection** - **customize database** for **Login**、**Search user**、**Create user**、**Update user**、**elete user**、**Get user list**、**Validata password**：

- [Login](./configuration/#compile-database-operation-script)
- [Search user](./configuration/#compile-database-operation-script)
- [Create user](./configuration/#compile-database-operation-script)
- [Update user](./configuration/#compile-database-operation-script)
- [Delete user](./configuration/#compile-database-operation-script)
- [Get user list](./configuration/#compile-database-operation-script)
- [Validata password](./configuration/#compile-database-operation-script)
