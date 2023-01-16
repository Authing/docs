


 Google:服务帐户
 [#](#google服务帐户 "永久链接")
========================================================================



 使用服务帐户比OAuth2更复杂。开始之前：
 


*检查节点是否
 [兼容]（/integrations/builtin/credentials/google/#compatible节点）
 使用服务帐户。
*确保您需要使用服务帐户。对于大多数用例，OAuth2是一个更好的选项。
*阅读Google文档
 [创建和管理服务帐户](https://cloud.google.com/iam/docs/creating-managing-service-账户s) 
 .



 先决条件
 [#](#先决条件 "永久链接")
-----------------------------------------------------


*[谷歌云](https://cloud.google.com/) 
 account
*[谷歌云平台项目](https://developers.google.com/workspace/marketplace/create-gcp-project)



 设置服务帐户
 [#](#设置服务帐户 "永久链接")
-----------------------------------------------------------------------


### 
 在n8n中创建新凭据
 [#](#create-a-new-credential-in-n8n "永久链接")


1. 遵循以下步骤
 [创建凭据]（/credentials/add edit credentials/）
 .
 




 通用和特定凭据
 



 如果通过选择
 **创建新**
 在节点的凭据下拉列表中，n8n自动为该节点创建正确的凭据类型。如果您选择
 **凭据>新建**
 ，必须浏览凭据类型：
 



	*要使用n8n支持的资源和操作与特定服务连接，请选择该服务。例如，要创建用于Gmail节点的凭据，请搜索
	 `Gmail（Gmail）`
	 .
	*为创建凭据
	 [自定义API调用]（/integrations/customoperations/）
	 选择
	 **谷歌API**
	 .
2. 注意
 **私钥**
 从节点凭据模式。在下一节中，您将需要这个。


### 
 在Google Cloud中设置服务帐户
 [#](#在谷歌云 "永久链接"中设置服务帐户)



 在您的
 [谷歌云控制台](https://console.cloud.google.com) 
 仪表板：
 


1. 选择汉堡菜单
 **>API和服务>凭据**
 .谷歌将您带到
 **凭据**
 第页。
 




 查看屏幕截图
 

![访问API和服务的凭据页面](https://d33wubrfki0l68.cloudfront.net/8f7e0eb5899371a240d205c5d086460d7e352f49/3d5b6/_images/integrations/builtin/credentials/google/service-account-api-services-credentials.png)
2. 选择
 **+CREATE CREDENTIALS>服务帐户**
 .
 




 查看屏幕截图
 

![访问API和服务的凭据页面](https://d33wubrfki0l68.cloudfront.net/47d1ce2983ec8f294dd4fdbc9900e4cd204c06b2/11e7f/_images/integrations/builtin/credentials/google/service-account-create-credentials.png)
3. 在中输入名称
 **服务帐户名称**
 ，以及中的ID
 **服务帐户ID**
 。请参阅
 [创建服务帐户](https://cloud.google.com/iam/docs/creating-managing-service-accounts?hl=en#creating) 
 了解更多信息。
4. 选择
 **创建并继续**
 .
5. 根据您的用例，您可能希望
 **选择角色**
 和
 **授予用户访问此服务帐户的权限**
 使用相应的部分。
6. 选择
 **已完成**
 .
7. 在
 **服务帐户**
 第节。打开
 **键**
 选项卡。
8. 选择
 **添加密钥>创建新密钥**
 .
 




 查看屏幕截图
 

![创建新密钥](https://d33wubrfki0l68.cloudfront.net/7c0b9b212060832c2741ea13c657260afcc68787/bb481/_images/integrations/builtin/credentials/google/service-account-create-key.png)
9. 在出现的模式中，选择
 **JSON**
 ，然后选择
 **创建**
 .Google将文件保存到您的计算机。
10. 启用您要使用的每个Google服务API：
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
 


1. 在
 **服务帐户电子邮件**
 字段，输入与新服务帐户关联的电子邮件（您可以在
 **详细信息**
 Google Cloud中的选项卡）。
2. 输入
 **私钥**
 从下载的JSON文件中。如果运行的n8n版本早于0.156.0：请替换
 `\n（n）`
 在JSON文件中添加新行。
3. **可选**
 ：单击切换以启用
 [**模拟用户**](https://developers.google.com/identity/protocols/oauth2/service-account#delegatingauthority)
 并输入电子邮件。
4. **保存**
 您的凭据。



 以下视频演示了上述步骤。
 







 故障排除
 [#](# "永久链接"疑难解答)
---------------------------------------------------------


### 
 服务帐户无法访问Google Drive文件
 [#](#服务帐户无法访问谷歌驱动器文件 "永久链接")



 服务帐户无法访问未与其关联用户电子邮件共享的Google Drive文件和文件夹。
 


1. 访问您的
 [谷歌云控制台](https://console.cloud.google.com) 
 并复制您的服务帐户电子邮件。
2. 访问您的
 [谷歌硬盘](https://drive.google.com) 
 然后转到指定的文件或文件夹。
3. 右键单击文件或文件夹并选择
 **份额**
 .
4. 将您的服务帐户电子邮件粘贴到
 **添加人员和组**
 .
5. 选择
 **编辑**
 用于读写访问或
 **查看器**
 只读访问。




