---
meta:
  - name: description
    content: 私有化部署
---

#  Private Cloud Deployment

<LastUpdated/>

You can deploy private cloud with {{$localeConfig.brandName}}（[Learn more](/guides/deployment/)), You need to provide the following information: 

- ACCOUNT_ID: 阿里云账号 ID， 在 **阿里云控制台右上角** 选择 **个人头像**，点击**安全设置**，在此页面可以获取到账号 ID。[详情请点击此](https://help.aliyun.com/document_detail/52984.html?spm=a2c4g.11186623.2.49.49772a364IfiEO#getAccountID)。

![](https://cdn.authing.cn/blog/image%20%28121%29.png)

<img src="https://cdn.authing.cn/blog/image%20%28155%29.png" height=400 style="display:block;margin: 0 auto;">

![](https://cdn.authing.cn/blog/image%20%28318%29.png)

- REGION: 地区，如 cn-beijing, cn-hangzhou。
- ACCESS_KEY_ID: 在 **阿里云控制台右上角** 选择 **个人头像**，点击 **AccessKey 管理**，在此页面可获得。

![](https://cdn.authing.cn/blog/image%20%28129%29.png)

- ACCESS_KEY_SECRET: 在 **阿里云控制台右上角** 选择 **个人头像**，**点击 AccessKey 管理**，在此页面可获得。
- TIMEOUT: upload pipeline function timeout time.
- RETRIES: upload pipeline maximum number of function retries.
