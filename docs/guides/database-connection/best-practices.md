# 最佳实践

<LastUpdated/>

1. 我们推荐用户完成认证被迁移到 Authing 数据库之后，在原有数据库中标记此用户为已被迁移。
2. 不要硬编码数据库连接等信息，推荐使用[数据库连接信息](/guides/database-connection/configuration/#配置数据库连接信息)和[环境变量](/guides/database-connection/configuration/#配置数据库连接信息)管理此类常量数据。我们会在数据库中加密存储这类信息，但是出于性能考虑，不会加密存储你上传的源代码。
