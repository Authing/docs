


 Microsoft Outlook
 [#](#microsoft outlook "永久链接")
=============================================================



[Microsoft Outlook](https://outlook.live.com/) 
 是Microsoft的个人信息管理软件系统。Microsoft Outlook是一个电子邮件客户端，包括日历、任务管理、联系人管理、笔记、日志记录和web浏览。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/microsoft/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*草稿
	+创建新的电子邮件草稿
	+删除草稿
	+获取单个草稿
	+发送现有草稿邮件
	+更新草稿
*文件夹
	+在用户邮箱的根文件夹中创建新邮件文件夹
	+删除文件夹
	+获取单个文件夹的详细信息
	+获取登录用户根文件夹下的所有文件夹
	+列出文件夹下的所有子文件夹
*文件夹消息
	+获取文件夹中的所有邮件
*消息
	+删除邮件
	+获取单个消息
	+获取登录用户邮箱中的所有邮件
	+获取邮件的MIME内容
	+移动邮件
	+创建邮件回复
	+发送消息
	+更新消息
*邮件附件
	+向邮件添加附件
	+下载附件内容
	+从邮件中获取附件
	+获取所有邮件附件



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您使用Microsoft Outlook节点创建、添加附件和发送草稿。您还可以找到
 [工作流](https://n8n.io/workflows/867) 
 此示例使用工作流使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Microsoft Outlook
 -
 [HTTP请求]（/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/）




 最终的工作流应如下图所示。
 



![具有Microsoft Outlook节点的工作流](https://d三3wubrfki0l68.cloudfront.net/14.0d33ea401e19304f532.4eb58c730e10b018e5c/529b3/_images/integrations/builtin/app-nodes/microsoftoutlook/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. Microsoft Outlook节点（创建：草稿）
 [#](#2-microsoft-outlook-node-create-draft "永久链接")



 此节点将创建一封草稿邮件，稍后将在工作流中使用Microsoft Outlook节点发送该邮件。
 


1. 首先，您必须输入Microsoft Outlook节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/microsoft/）
 .
2. 从
 ***资源***
 下拉列表。
3. 在
 ***主题***
 领域
4. 在
 ***正文内容***
 领域
 


|  |  |
| --- | --- |
| 

```
1
2
3
4
```

 | 

```
<h1>来自n8n的您好</h1>
<p>我们正在使用<a href=“https://n8n.io“>n8n</a></p>
<p>最佳</p>
<p>发件人</p>

```

 |
5. 单击
 ***添加字段***
 并从下拉列表中选择“正文内容类型”。
6. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您会注意到节点创建了一个主题为的新草稿
 `来自n8n的您好
 和HTML正文内容。
 



![使用Microsoft Outlook节点创建草稿](https://d33wubrfki0l68.cloudfront.net/5d6b07b12cc52d9d90477595f919cced5e9e273e/cd381/_images/integrations/builtin/app-nodes/microsoftoutlook/microsoftoutlook_node.png)



### 
 3. HTTP请求节点（GET）
 [#](#3-http-request-node-get "永久链接")



 此节点将从URL获取n8n的徽标。我们将把这个文件附加到我们之前创建的消息草稿中。如果要附加其他文件，请输入该文件的URL。
 


1. 输入
 `https://n8n.io/n8n-logo.png` 
 在
 ***网址***
 领域
2. 从
 ***响应格式***
 下拉列表。
3. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您将注意到节点返回n8n徽标。我们将把这个文件附加到使用上一个节点创建的消息草稿中。
 



![使用HTTP请求获取文件](https://d33wubrfki0l68.cloudfront.net/ad75c5d2efb4afb725b52d36d3d5e5a45b86bdf6/1a731/_images/integrations/builtin/app-nodes/microsoftoutlook/httprequest_node.png)



### 
 4. Microsoft Outlook1节点（添加：messageAttachment）
 [#](#4-microsoft-outlook1-node-add-messageageattachment "永久链接")



 此节点将将从上一个节点接收到的文件附加到使用Microsoft Outlook节点创建的drat消息。
 


1. 选择在上一个Microsoft Outlook节点中输入的凭据。
2. 从
 ***资源***
 下拉列表。
3. 单击
 ***消息ID***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 部分：节点>Microsoft Outlook>输出数据>JSON>id。您还可以添加以下表达式：
 `｛｛$node[“Microsoft Outlook”].json[“id”]｝｝`
 .
5. 单击
 ***添加字段***
 按钮
6. 输入
 `n8n.png`
 在
 ***文件名***
 字段。
7. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点将文件附加到我们使用Microsoft Outlook节点创建的草稿邮件中。
 



![使用Microsoft Outlook节点向草稿邮件添加附件](https://d33wubrfki0l68.cloudfront.net/116de4ae9863695e14c2c9412f42c0ac30915d6a/504ac/_images/integrations/builtin/app-nodes/microsoftoutlook/microsoftoutlook1_node.png)



### 
 5. Microsoft Outlook2节点（发送：草稿）
 [#](#5-microsoft-outlook2-node-sensed-draft "永久链接")



 此节点将发送我们使用Microsoft Outlook创建的草稿消息ook node to a recipient.
 


1. Select the credentials that you entered in the previous node.
2. Select 'Draft' from the
 ***Resource***
 dropdown list.
3. Select 'Send' from the
 ***Operation***
 dropdown list.
4. Click on the gears icon next to the
 ***Message ID***
 field and click on
 ***Add Expression***
 .
5. Select the following in the
 ***Variable Selector***
 section: Nodes > Microsoft Outlook > Output Data > JSON > id. You can also add the following expression:
 `{{$node["Microsoft Outlook"].json["id"]}}` 
 .
6. Click on the
 ***Add Field***
 button.
7. Enter the recipient's email address in the
 ***Recipients***
 field.
8. Click on
 ***Execute Node***
 to run the node.



 In the screenshot below, you will notice that the node sends the draft message that we created using the Microsoft Outlook node to a recipient.
 



![Using the Microsoft Outlook node to send a draft](https://d33wubrfki0l68.cloudfront.net/66fb254e416afbab68d2ef49172e9abb7f5f3a50/056c4/_images/integrations/builtin/app-nodes/microsoftoutlook/microsoftoutlook2_node.png)





