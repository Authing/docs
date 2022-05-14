# Best Practices

<LastUpdated/>

1. We recommend that after the user completes the authentication and is migrated to the Authing's database, and mark the user as migrated in the original database.
2. Please do not encode database connection information forcibly, you can use [Database connection information](../../connections/custom-db/config-custom-db-connection.md) and [Environment variable](../../advanced/env.md) to manage such constant data. We will encrypt and store this kind of information in the database, but for performance reasons, the source code you upload will not be encrypted.
