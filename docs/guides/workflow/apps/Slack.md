


 松弛的
 [#](#slack "永久链接")
=====================================



[松弛](https://slack.com) 
 是一个商业通信平台，提供许多IRC风格的功能，包括持久聊天室（频道）、私人群组和直接消息。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credential/slack/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*渠道
	+存档对话。
	+关闭直接消息或多人直接消息。
	+启动基于公共或私人频道的对话
	+获取有关频道的信息。
	+获取松弛的团队中的所有频道。
	+获取对话的消息和事件历史记录。
	+邀请用户加入频道
	+加入现有对话。
	+从频道中删除用户。
	+留下对话。
	+列出对话的成员。
	+打开或恢复直接消息或多人直接消息。
	+重命名对话。
	+获取发布到频道的消息线索
	+设置对话的目的。
	+设置对话的主题。
	+取消对话存档。
*文件
	+获取文件信息
	+获取和筛选团队文件。
	+创建或上载现有文件。
*消息
	+删除邮件
	+获取邮件的永久链接
	+将消息发布到频道
	+在频道中向用户发布临时消息
	+更新消息
*反应
	+向消息添加反应
	+获取消息的反应
	+删除消息的反应
*星形
	+向项目添加星号。
	+从项目中删除星号。
	+获取所有已禁用用户的星星。
*用户
	+获取有关用户的信息
	+获取用户列表
	+获取用户的联机状态
*用户组
	+创建用户组
	+禁用用户组
	+启用用户组
	+获取所有用户组
	+更新用户组
*用户配置文件
	+获取用户的个人资料
	+更新用户的配置文件



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您创建频道、邀请用户加入频道、发布消息以及将文件上载到频道。您还可以找到
 [工作流](https://n8n.io/workflows/811) 
 在n8n.io上此示例使用工作流使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Slack
 -
 [HTTP请求]（/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/）




 最终的工作流应如下图所示。
 



![具有Slack节点的工作流](https://d33wubrfki0l68.cloudfront.net/5e7a693f10922e32ef6d21c2d2ab1388b6b46ab3/1190d/_images/integrations/builtin/app-nodes/slack/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下“开始”节点存在。
 


### 
 2. 松弛节点（创建：通道）
 [#](#2-slack-node-create-channel "永久链接")



 此节点将在Slack工作区中创建一个新频道。此操作需要
 `频道：管理`
 范围将此范围添加到
 ***Bot令牌作用域***
 有关松弛的部分。您可以参考
 [常见问题解答]（#how-到-add-oauth-scopes-to-slack-app）
 了解如何添加作用域。
 


1. 从
 ***身份验证***
 下拉列表。
2. 您必须输入Slack节点的凭据。您可以了解如何为此节点输入凭据
 [此处]（/integrations/builtin/credential/slack/）
 .
3. 从
 ***资源***
 下拉列表。
4. 在
 ***渠道***
 领域
5. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到节点在Slack中创建了一个新频道。
 



![使用Slack节点创建频道](https://d33wubrfki0l68.cloudfront.net/513de91c1fe47a84f7a72ab0298b8716c50e7197/887c2/_images/integrations/builtin/app-nodes/slack/slack_node.png)



### 
 3. Slack1节点（邀请：频道）
 [#](#3-slack1-node-invite-channel "永久链接")



 此节点将邀请成员加入我们在上一个节点中创建的频道。此操作需要
 `频道：读取`
 范围。将此范围添加到
 ***Bot令牌作用域***
 有关松弛的部分。
 


1. 从
 ***身份验证***
 下拉列表。
2. 选择在上一个节点中输入的凭据。
3. 从
 ***资源***
 下拉列表。
4. 从
 ***操作***
 下拉列表。
5. 单击
 ***渠道***
 现场点击
 ***添加表达式***
 .
6. 在
 ***变量选择器***
 部分：Nodes>Slack>Output Data>JSON>id。您还可以添加以下表达式：
 `｛｛$node[“Slack”].json[“id”]｝｝`
 .
7. 从
 ***用户ID***
 下拉列表。您在此字段中选择的用户将添加到频道中。
8. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点邀请用户访问我们使用上一个节点创建的频道。
 



![使用Slack节点邀请用户加入频道](https://d33wubrfki0l68.cloudfront.net/38068adb203447c165a86a2dcabfadd76f470079/66e05/_images/integrations/builtin/app-nodes/slack/slack1_node.png)



### 
 4. Slack2节点（发布：消息）
 [#](#4-slack2-node-post-message "永久链接")



 此节点将在频道中发布带有附件的消息。
 


1. 从
 ***身份验证***
 下拉列表。
2. 选择在上一个节点中输入的凭据。
3. 单击
 ***渠道***
 现场点击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 部分：Nodes>Slack>Output Data>JSON>id。您还可以添加以下表达式：
 `｛｛$node[“Slack”].json[“id”]｝｝`
 .
5. 在
 ***文本***
 领域
6. 切换
 ***作为用户***
 to
 `真值`
 。此选项允许 you to post a message as a bot.
7. Click on the
 ***Add attachment***
 button.
8. Select 'Image URL' from the
 ***Add attachment item***
 dropdown list.
9. Enter the URL of an image in the
 ***Image URL***
 field.
10. Select 'Title' from the
 ***Add attachment item***
 dropdown list.
11. Enter a title in the
 ***Title***
 field.
12. Click on
 ***Execute Node***
 to run the node.



 In the screenshot below, you will notice that node sends a message with an attachment to the channel that we created in the previous node.
 



![Using the Slack node to send a message with an attachment to a channel](https://d33wubrfki0l68.cloudfront.net/713d729e0975994323a05f63877280ddcd3a8f18/87b29/_images/integrations/builtin/app-nodes/slack/slack2_node.png)



### 
 5. HTTP Request node (GET)
 [#](#5-http-request-node-get "Permanent link")



 This node will fetch a file from a URL. You can also use the
 [Read Binary File](/integrations/builtin/core-nodes/n8n-nodes-base.readbinaryfile/) 
 node to read a file from the path you specify.
 


1. Enter the URL of a file in the
 ***URL***
 field.
2. Select 'File' from the
 ***Response Format***
 dropdown list.
3. Click on
 ***Execute Node***
 to run the node.



 In the screenshot below, you will notice that the HTTP Request node fetches the file from the URL. This file gets passed on as binary data to the next node in the workflow.
 



![Using the HTTP Request node to fetch a file from a URL](https://d33wubrfki0l68.cloudfront.net/685b2b50edfb83b758b5f22d9f1a8a5633c701af/d8088/_images/integrations/builtin/app-nodes/slack/httprequest_node.png)



### 
 6. Slack3 node (upload: file)
 [#](#6-slack3-node-upload-file "Permanent link")



 This node will upload the file that we got from the previous node to a channel we specify.
 


1. Select 'Access Token' from the
 ***Authentication***
 dropdown list.
2. Select the credentials that you entered in the previous Slack node.
3. Select 'File' from
 ***Resource***
 dropdown list.
4. Select 'Upload' from the
 ***Operation***
 dropdown list.
5. Toggle
 ***Binary Data***
 to true.
6. Click on
 ***Add options***
 and select 'Channels'.
7. Select the channel from the
 ***Channels***
 dropdown list.
8. Click on
 ***Execute Node***
 to run the node.



 In the screenshot below, you will notice that the node uploads the file to the channel that we created earlier.
 



![Using the Slack node to upload a file to a channel](https://d33wubrfki0l68.cloudfront.net/c350967c536a30f9b18d619841b9ddefd9a08651/cf373/_images/integrations/builtin/app-nodes/slack/slack3_node.png)




 FAQs
 [#](#faqs "Permanent link")
-----------------------------------


### 
 How to create a private channel?
 [#](#how-to-create-a-private-channel "Permanent link")



 To create a private channel, follow the steps mentioned below.
1. Select 'Channel' from the
 ***Resource***
 dropdown list.
2. Select 'Create' from the
 ***Operation***
 dropdown list.
3. Click on the
 ***Add Field***
 button.
4. Toggle
 ***Is Private***
 to
 `true` 
 .
 


### 
 How to add OAuth Scopes to a Slack app?
 [#](#how-to-add-oauth-scopes-to-a-slack-app "Permanent link")



 Your app needs appropriate scopes and permissions to perform actions. For example, if you want to create a new channel, your app requires the
 `channel:manage` 
 scope. To add scopes and permissions, follow the steps mentioned below.
1. Navigate to the
 [Slack App dashboard](https://api.slack.com/apps) 
 page and select your app.
2. Click on 'OAuth & Permissions' under the
 ***Feature***
 section on the left sidebar.
3. Scroll down to the
 ***Scopes***
 section.
4. If you're building a bot, click on
 ***Add an OAuth Scope***
 under the
 ***Bot Token Scopes***
 .
5. Select the permissions you want to give to your bot from the dropdown list.
6. If you want the app to access user data and act on behalf of users that authorize them, add scopes under the
 ***User Token Scopes***
 .
7. When you add new scopes, Slack will ask you to reinstall the app. Click on 'reinstall your app' on the top of the page and reinstall the app.
 



 You can refer to the official documentation on
 [Scopes and permissions](https://api.slack.com/scopes) 
 to learn more.
 




