#### 获取企业微信开发配置

1. 获取企业 ID （CorpId）

点击**我的企业**一级菜单，你可以在**企业信息**页面的最底部找到企业 ID（**CorpId**）：

![](https://cdn.authing.cn/blog/20201019221428.png)

2. 开启「通讯录同步」API 接口同步

点击**管理工具**一级菜单，选择**通讯录同步**：

![](https://cdn.authing.cn/blog/20201019221456.png)

点击「开启 API  接口同步」

![](https://cdn.authing.cn/blog/20201019221602.png)

3. 获取「通讯录同步」开发 Secret

![](https://cdn.authing.cn/blog/20201019221611.png)

4. 设置接收事件服务器

点击**重新获取**随机生成 Token 和 EncodingAESKey（你也可以选择自己生成）。

![](https://cdn.authing.cn/blog/20201019221634.png)

URL 需要填入满足以下格式的链接:

```
https://core.authing.cn/connections/enterprise/wechatwork/<YOUR_USERPOOL_ID>/<YOUR_WECHATWORK_CORPID>/callback
```

将 YOUR_USERPOOL_ID 替换为用户池 ID , YOUR_WECHATWORK_CORPID 替换为企业微信的企业 ID（CorpId），例如：

```
https://core.authing.cn/connections/enterprise/wechatwork/59f86b4832eb28071bdd9214/ww736adab7f131153d/callback
```

此时点击保存会出现「openapi回调地址请求不通过」的错误提示：

![](https://cdn.authing.cn/blog/20201019221705.png)

这是正常情况，因为我们还没有将企业微信开发配置填入 {{$localeConfig.brandName}} ，详情见下文。

#### 配置企业微信通讯录

将以下信息填入到表格中：
1. 企业 ID （CorpId）
2. 企业通讯录密钥 Secret
3. 通讯录事件同步 Token 
4. 通讯录事件同步 EncodingAESKey

![](https://cdn.authing.cn/blog/20201019221723.png)

#### 初次同步

点击 **从企业微信导入**。

![](https://cdn.authing.cn/blog/20201019221744.png)

#### 增量同步

> 开启通讯录 API 事件同步，能让你在企业微信中做的任何修改（包括员工的增删改查、部门的增删改查、移动成员部门等）同步到 {{$localeConfig.brandName}} 的组织机构中。

> 如果你不需要此功能，可以跳过这一步。

回到设置接收事件服务器页面，点击保存，这时候应该能够看到成功提示。

![](https://cdn.authing.cn/blog/20201019221810.png)

之后你在企业微信做的操作就会同步到 {{$localeConfig.brandName}} 中了！