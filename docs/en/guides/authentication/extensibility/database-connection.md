# Authenticate users with custom database

<LastUpdated/>

The use of a custom database can meet the needs of the following scenarios:

- **Use your own database to save user data**: Use your own database to save user data. In this mode, Authing will not store any of your user information.
- **Inert migration users to Authing**: This mode of migrating users is called **Inert migration**, the principle of this mode is: At the beginning, all the original user data is in your database. When the user tries to log in at Authing for the first time, Authing will find and verify the user in your database through the custom database script you configured. If successful, the user will be migrated to Authing; when the user logs in for the second time, the Authing database will be used to verify it; when all users log in at least once, it means that the migration to the cloud is complete.

You can configure a custom database in the following ways: Go to the[Authing console](https://console.authing.cn/console/userpool) - **Connection** - **Custom Database ** to open a custom database connection. For details, see using a[Custom Database](/guides/database-connection/README.md).

![](~@imagesZhCn/guides/database-connection/Xnip2021-02-24_16-58-19.png)
