# Migrate users to {{$localeConfig.brandName}}

<LastUpdated/>

If you have users from the original user system that need to be imported into {{$localeConfig.brandName}}, please be sure to read the guidelines in this section.

If you want to smoothly migrate users to {{$localeConfig.brandName}}, you need to use custom database functions and write corresponding database scripts. When the user authenticates for the first time, the user will be authenticated with the custom data script you configured. After the authentication is successful, it will be migrated to the {{$localeConfig.brandName}} database. When the user authenticates for the second time, the {{$localeConfig.brandName}}  database will be used for verification. When all users are authenticated at least once, the migration process is complete. For details, please refer to [Lasy migration of users to {{$localeConfig.brandName}}](/guides/database-connection/lazy-migration.md)。

If you want to store user data in your own database and don't want to expose user data to {{$localeConfig.brandName}}, you can [use a custom database to save user data](/guides/database-connection/custom-user-store.md).

You can also choose to import all users into {{$localeConfig.brandName}} at one time. We provide API & SDK to help you quickly write import scripts. For details, please refer to [ Importing users using SDK](./use-api.md). In this process, you also need to confirm a question first: Can you get the user's plaintext password? If you can get it, just use the plaintext password to create a new user. If not, you need to [write a customer password function](/guides/extensibility/custom-password-script) first, So that when the user logins in to {{$localeConfig.brandName}}, the custom password you write will be used for encryption and verification Function. The user’s previous password can still take effect without requiring the user to reset his password. 

If you belong to the usage scenario of internal employees（[EIAM](/concepts/ciam-and-eiam.md)）, you can also download from [LDAP Server](https://www.openldap.org/), [Windows local Active Directory](https://en.wikipedia.org/wiki/Active_Directory), etc. The third-party corporate identity source is imported into the organization and user directory. For details, please refer to [here](./import-from-third-party-identity-provider/README.md).
