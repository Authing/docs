


 Google:OAuth2单一服务
 [#](#google-oauth2-single-service "永久链接")
====================================================================================



 本文档包含为单个服务创建Google凭据的说明。它们还可以作为
 [视频]（#视频）
 .
 



 设置OAuth
 [#](#设置oauth "永久链接")
---------------------------------------------------



 你需要一个
 [谷歌云平台项目](https://developers.google.com/workspace/marketplace/create-gcp-project) 
 对于这些步骤。
 



 在Google Cloud中：
 


1. 转到
 [谷歌云控制台| API和服务](https://console.cloud.google.com/apis/credentials) 
 并确保你在你想要使用的项目中。
 




 查看屏幕截图
 

![谷歌项目下拉列表](https://d33wubrfki0l68.cloudfront.net/d207228efb04155a874f3bfc1ce498e326d661ae/2c109/_images/integrations/builtin/credentials/google/check-google-project.png)
2. **可选：**
 如果您以前没有在Google Cloud项目中使用OAuth，您需要
 [配置OAuth同意屏幕](https://developers.google.com/workspace/guides/configure-oauth-consent) 
 。展开以下详细步骤以获取更多指导。
 




 查看详细步骤
 

	1. 选择
	 **OAuth同意屏幕**
	 .
	2. 用于
	 **用户类型**
	 选择
	 **内部**
	 .
	3. 选择
	 **创建**
	 .
	4. 输入基本信息：
	 **应用程序名称**
	 ,
	 **用户支持电子邮件**
	 ，以及
	 **电子邮件地址**
	 字段
	 **开发商联系信息**
	 .
	5. 添加授权域：选择
	 **+添加域**
	 进来
	 `n8n.cloud`
	 如果使用的是n8n的云服务，或者如果您是自托管，则使用n8n实例的域。
	6. 选择
	 **保存并继续**
	 去
	 **范围**
	 页
	7. 不需要设置任何范围。选择
	 **保存并继续**
	 再次转到
	 **摘要**
	 第页。
	8. 在
	 **摘要**
	 页面，查看信息，然后选择
	 **返回仪表板**
	 .
3. 选择
 **+CREATE CREDENTIALS>OAuth客户端ID**
 .
 




 查看屏幕截图
 

![创建凭据](https://d33wubrfki0l68.cloudfront.net/92f61682057ce67f058920ce75b9c24e43634371/5c749/_images/integrations/builtin/credentials/google/create-credentials.png)
4. 在
 **应用程序类型**
 下拉列表，选择
 **Web应用程序**
 .谷歌自动生成一个名称。
 




 查看屏幕截图
 

![Web应用程序](https://d33wubrfki0l68.cloudfront.net/5a9247cbc29455e495705ba0ef4d40a653bf122e/7ce92/_images/integrations/builtin/credentials/google/application-web-application.png)
5. 低于
 **授权重定向URI**
 选择
 **+添加URI**
 。从n8n粘贴OAuth重定向URL。
 




 查看屏幕截图
 

![OAuth回调URL](https://d33wubrfki0l68.cloudfront.net/e90a7bd8b893989753236dd7295f66949c6f8061/a8646/_images/integrations/builtin/credentials/google/oauth_callback.png)
![添加URI](https://d33wubrfki0l68.cloudfront.net/2769b96fd906a7967e0af91f79213af8673e2c1b/85a3d/_images/integrations/builtin/credentials/google/add-uri.png)
6. 选择
 **创建**
 .
7. 启用您要使用的每个Google服务API：
 


	1. 如果使用谷歌透视图或谷歌广告：
	 [请求API访问透视图](https://developers.perspectiveapi.com/s/docs-get-started) 
	 或
	 [广告开发者令牌](https://developers.google.com/google-ads/api/docs/first-call/dev-token) 
	 .
	2. 访问您的
	 [谷歌云控制台-库](https://console.cloud.google.com/apis/library) 
	 。确保您的项目正确。
	3. 搜索并选择要启用的API。例如，对于Gmail节点，搜索并启用Gmail API。
	4. 选择
	 **启用**
	 .



 在n8n中：
 


1. 输入新的
 **客户端ID**
 和
 **客户端密码**
 在凭据模式下从Google云控制台。
2. 选择
 **使用Google**登录
 完成您的Google身份验证。
3. **保存**
 您的新凭据。



 视频
 [#](#视频 "永久链接")
-------------------------------------







 故障排除
 [#](# "永久链接"疑难解答)
---------------------------------------------------------


### 
 谷歌尚未验证此应用
 [#](#google尚未验证此应用程序 "永久链接")



 如果使用OAuth身份验证方法，您可能会看到警告
 **谷歌尚未验证此应用**
 。为了避免这种情况，您可以从要进行身份验证的同一帐户创建OAuth凭据。但是，如果您使用的是由其他帐户（由开发人员或其他第三方）生成的凭据，请在Google Cloud中执行以下操作：
 


1. 选择
 **高级**
 .
2. 选择
 **转到CREDENTIALS\_NAME（不安全）**
 .
 `凭据名称`
 是第三方创建的凭据的名称。
3. 授予请求的权限。




