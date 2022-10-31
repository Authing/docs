# 私有化部署

<LastUpdated/>

私有化部署的场景，域名为客户自己的域名，用来加密密码的公钥也是每个客户特有的，所以在调用 Authing.start() **之前**，需要先调用:

```swift
Authing.setOnPremiseInfo(_ host: String, _ publicKey: String)
```

* *host* 是私有化域名，如：mycompany.com
* *publicKey* 是私有化版本的公钥

如果不清楚上述配置，请联系 [Authing 售后服务人员](csm@authing.cn)。