


 Google:OAuth2通用
 [#](#google-oauth2-generic "永久链接")
======================================================================



 本文档包含创建用于的通用OAuth2 Google凭据的说明
 [自定义操作]（/integrations/customoperations/）
 .
 



 先决条件
 [#](#先决条件 "永久链接")
-----------------------------------------------------


*[谷歌云](https://cloud.google.com/) 
 解释
*[谷歌云平台项目](https://developers.google.com/workspace/marketplace/create-gcp-project)
*如果您以前没有在Google Cloud项目中使用OAuth，您需要
 [配置OAuth同意屏幕](https://developers.google.com/workspace/guides/configure-oauth-consent) 
 .
*如果使用Google Perspective：
 [请求API访问](https://developers.perspectiveapi.com/s/docs-get-started)
*如果使用谷歌广告：
 [开发者令牌](https://developers.google.com/google-ads/api/docs/first-call/dev-token)



 设置OAuth
 [#](#设置oauth "永久链接")
---------------------------------------------------


### 
 在n8n中创建新凭据
 [#](#create-a-new-credential-in-n8n "永久链接")


1. 遵循以下步骤
 [创建凭据]（/credentials/add edit credentials/）
 。如果您通过选择
 **创建新**
 在节点的凭据下拉列表中，n8n自动为该节点创建正确的凭据类型。如果您选择
 **凭据>新建**
 ，必须浏览凭据类型。为创建凭据
 [自定义API调用]（/integrations/customoperations/）
 选择
 **Google OAuth2 API**
 。这允许您创建通用凭据，然后设置其作用域。
2. 注意
 **OAuth重定向URL**
 从节点凭据模式。在下一节中，您将需要这个。
 




 查看屏幕截图
 

![OAuth回调URL](https://d33wubrfki0l68.cloudfront.net/e90a7bd8b893989753236dd7295f66949c6f8061/a8646/_images/integrations/builtin/credentials/google/oauth_callback.png)
3. 您必须提供此凭据的作用域。请参阅
 [范围]（#范围）
 了解更多信息。


### 
 在Google Cloud中设置OAuth
 [#](#在谷歌云 "永久链接"中设置oauth)


1. 转到
 [谷歌云控制台](https://console.cloud.google.com/apis/credentials) 
 并确保你在你想要使用的项目中。
 




 查看屏幕截图
 

![谷歌项目下拉列表](https://d33wubrfki0l68.cloudfront.net/d207228efb04155a874f3bfc1ce498e326d661ae/2c109/_images/integrations/builtin/credentials/google/check-google-project.png)
2. 选择
 **+CREATE CREDENTIALS>OAuth客户端ID**
 . .
 




 查看屏幕截图
 

![创建凭据](https://d33wubrfki0l68.cloudfront.net/92f61682057ce67f058920ce75b9c24e43634371/5c749/_images/integrations/builtin/credentials/google/create-credentials.png)
3. 在
 **应用程序类型**
 下拉列表，选择
 **Web应用程序**
 .谷歌自动生成一个名称。
4. 低于
 **授权重定向URI**
 选择
 **+添加URI**
 。粘贴上一步骤中的OAuth重定向URL。
 




 查看屏幕截图
 

![Web应用程序](https://d33wubrfki0l68.cloudfront.net/5a9247cbc29455e495705ba0ef4d40a653bf122e/7ce92/_images/integrations/builtin/credentials/google/application-web-application.png)
5. 选择
 **创建**
 .
6. 启用您要使用的每个Google服务API：
	1. 访问您的
	 [谷歌云控制台-库](https://console.cloud.google.com/apis/library) 
	 。确保您的项目正确。
	2. 搜索并选择要启用的API。例如，对于Gmail节点，搜索并启用Gmail API。
	3. 选择
	 **启用**
	 .


### 
 创建并测试您的连接
 [#](#创建并测试您的连接 "永久链接")



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



 以下视频演示了上述步骤：
 







 范围
 [#](#scopes "永久链接")
---------------------------------------



 许多谷歌服务都有多种可能的访问范围。作用域限制了用户可以执行的操作。请参阅
 [Google API的OAuth 2.0范围](https://developers.google.com/identity/protocols/oauth2/scopes) 
 获取所有服务的作用域列表。
 



 n8n不支持所有作用域。创建通用GoogleOAuth2API凭据时，可以从列表中输入范围。如果您输入了n8n尚未支持的范围，它将无法工作。
 




 支持的作用域
 


| 
 服务
  | 
 可用作用域
  |
| --- | --- |
| 
 Gmail
  | 
 https://www.googleapis.com/auth/gmail.labels
 
 https://www.googleapis.com/auth/gmail.addons.current.action.compose
 
 https://www.googleapis.com/auth/gmail.addons.current.message.action
 
 https://mail.google.com/
 
 https://www.googleapis.com/auth/gmail.modify
 
 https://www.googleapis.com/auth/gmail.compose
  |
| 
 谷歌广告
  | 
 https://www.googleapis.com/auth/adwords
  |
| 
 谷歌分析
  | 
 https://www.googleapis.com/auth/analytics
 
 https://www.googleapis.com/auth/analytics.readonly
  |
| 
 谷歌大查询
  | 
 https://www.googleapis.com/auth/bigquery
  |
| 
 谷歌图书
  | 
 https://www.googleapis.com/auth/books
  |
| 
 谷歌日历
  | 
 https://www.googleapis.com/auth/calendar
 
 https://www.googleapis.com/auth/calendar.events
  |
| 
 谷歌云自然语言
  | 
 https://www.googleapis.com/auth/cloud-language
 
 https://www.googleapis.com/auth/cloud-platform
  |
| 
 谷歌云存储
  | 
 https://www.googleapis.com/auth/cloud-platform
 
 https://www.googleapis.com/auth/cloud-platform.read-only
 
 https://www.googleapis.com/auth/devstorage.full\_控制
 
 https://www.googleapis.com/auth/devstorage.read\_仅
 
 https://www.googleapis.com/auth/devstorage.read\_写入
  |
| 
 谷歌联系人
  | 
 https://www.googleapis.com/auth/contacts
  |
| 
 Google Docs
  | 
 https://www.googleapis.com/auth/documents
 
 https://www.googleapis.com/auth/drive
 
 https://www.googleapis.com/auth/drive.file
  |
| 
 Google Drive
  | 
 https://www.googleapis.com/auth/drive
 
 https://www.googleapis.com/auth/drive.appdata
 
 https://www.googleapis.com/auth/drive.photos.readonly
  |
| 
 Google Firebase Cloud Firestore
  | 
 https://www.googleapis.com/auth/datastore
 
 https://www.googleapis.com/auth/firebase
  |
| 
 Google Firebase Realtime Database
  | 
 https://www.googleapis.com/auth/userinfo.email
 
 https://www.googleapis.com/auth/firebase.database
 
 https://www.googleapis.com/auth/firebase
  |
| 
 Google Perspective
  | 
 https://www.googleapis.com/auth/userinfo.email
  |
| 
 Google Sheets
  | 
 https://www.googleapis.com/auth/drive.file
 
 https://www.googleapis.com/auth/spreadsheets
  |
| 
 Google Slide
  | 
 https://www.googleapis.com/auth/drive.file
 
 https://www.googleapis.com/auth/presentations
  |
| 
 Google Tasks
  | 
 https://www.googleapis.com/auth/tasks
  |
| 
 Google Translate
  | 
 https://www.googleapis.com/auth/cloud-translation
  |
| 
 GSuite Admin
  | 
 https://www.googleapis.com/auth/admin.directory.group
 
 https://www.googleapis.com/auth/admin.directory.user
 
 https://www.googleapis.com/auth/admin.directory.domain.readonly
 
 https://www.googleapis.com/auth/admin.directory.userschema.readonly
  |




 Troubleshooting
 [#](#troubleshooting "Permanent link")
---------------------------------------------------------


### 
 Google hasn't verified this app
 [#](#google-hasnt-verified-this-app "Permanent link")



 If using the OAuth authentication method, you might see the warning
 **Google hasn't verified this app** 
 . To avoid this, you can create OAuth credentials from the same account you want to authenticate. However, if you're using credentials that were generated by another account (by a developer or another third party), do the following in Google Cloud:
 


1. Select
 **Advanced** 
 .
2. Select
 **Go to CREDENTIALS\_NAME (unsafe)** 
 .
 `CREDENTIALS_NAME` 
 is the name of the credentials created by the third party.
3. Grant the requested permissions.




