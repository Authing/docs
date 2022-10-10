# 如何获取 {{$localeConfig.brandName}} 服务器集群 IP 地址

<LastUpdated/>

如果你在使用 Authing 的[自定义数据库功能](/guides/database-connection/overview.md)，或者在公司内网使用 Authing 的服务，你可能需要将 Authing 服务器集群的 IP 加入到白名单中。

Authing 服务器集群对外的弹性 IP 地址可以通过以下接口获取：[https://core.authing.cn/api/v2/system/public-ips](https://core.authing.cn/api/v2/system/public-ips)。
