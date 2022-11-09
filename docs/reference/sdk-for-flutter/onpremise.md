# 私有化部署

<LastUpdated/>

私有化部署的场景，域名为客户自己的域名，用来加密密码的公钥也是每个客户特有的，在初始化之后，需要调用:

```swift
Authing.setOnPremiseInfo(String host, String publicKey)
```

* **host** 是[私有化域名](https://docs.authing.cn/v2/guides/customize/domain/customized-domain.html)，如：mycompany.com
* **publicKey** 是私有化版本的密码加密公钥

如果不清楚上述配置，请联系 <a href="mailto:csm@authing.cn">Authing 售后服务人员</a>。

