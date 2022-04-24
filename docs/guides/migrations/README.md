# 迁移用户到 {{$localeConfig.brandName}}

<LastUpdated/>

如果你有原有用户系统中的用户需要导入到 {{$localeConfig.brandName}}，请务必阅读此部分的指引。

如果你想以不停机的形式平稳迁移用户到 {{$localeConfig.brandName}}，你需要使用自定义数据库功能，编写相对应的数据库脚本。用户第一次认证时会使用你配置的自定义数据脚本认证用户，认证成功之后会将其迁移到 {{$localeConfig.brandName}} 数据库；用户第二次认证的时候，会使用 {{$localeConfig.brandName}} 数据库进行检验。当所有用户都至少认证一次的时候，代表迁移过程完成。详情请见[惰性迁移用户到 {{$localeConfig.brandName}}](/guides/database-connection/lazy-migration.md)。

如果你希望用自己的数据库存储用户数据，不想把用户数据暴露给 {{$localeConfig.brandName}}，可以[完全使用自定义数据库保存用户数据](/guides/database-connection/custom-user-store.md)。

你也可以选择一次性将用户全部导入到 {{$localeConfig.brandName}}，我们提供了 API & SDK 帮助你快速编写导入脚本，详情请见[使用 SDK 导入用户](./use-api.md)。在此过程中，你还需要先确认一个问题：能否获取到用户的明文密码？如果你能够获取到，直接使用明文密码创建新用户即可；如果不能，你需要先[编写自定义密码函数](/guides/migrations/custom-password-script/)，这样当用户在 {{$localeConfig.brandName}} 中进行登录的时候，会使用你编写的自定义密码加密、验证函数，用户之前的密码依旧能够生效，不需要要求用户重置自己的密码。

如果你属于内部员工的使用场景（[EIAM](/concepts/ciam-and-eiam.md)），还可以从[企业微信](https://work.weixin.qq.com/)、[钉钉](https://oa.dingtalk.com)、[LDAP Server](https://www.openldap.org/)、[Windows 本地的 Active Directory](https://en.wikipedia.org/wiki/Active_Directory) 等第三方企业身份源导入组织机构和用户目录，[详情请见此](./import-from-third-party-identity-provider/README.md)。
