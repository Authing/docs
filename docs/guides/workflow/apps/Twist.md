


 扭曲
 [#](#扭转 "永久链接")
=====================================



[扭曲](https://twist.com) 
 是一款沟通应用程序，可帮助团队平衡专注工作与协作对话。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credential/twist/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*渠道
	+存档频道
	+启动基于公共或私人频道的对话
	+删除频道
	+获取有关频道的信息
	+获取所有频道
	+取消存档频道
	+更新频道
*注释
	+为线程创建新注释
	+删除注释
	+获取有关评论的信息
	+获取所有评论
	+更新评论
*消息对话
	+在对话中创建消息
	+删除对话中的邮件
	+在对话中获取消息
	+获取对话中的所有消息
	+更新对话中的消息
*线程
	+在通道中创建新线程
	+删除线程
	+获取有关线程的信息
	+获取所有线程
	+更新线程



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您创建和更新频道以及在扭曲上发送消息。您还可以找到
 [工作流](https://n8n.io/workflows/826) 
 此示例使用工作流将使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Twist




 最终的工作流应如下图所示。
 



![具有“扭曲”节点的工作流](https://d3.3wubrfki0l68.cloudfront.net/43c436965b1b75aa640b84ddc72f7545ce46c24d/7415c/_images/integrations/builtin/app-nodes/twist/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. 扭曲节点（创建：通道）
 [#](#2-twist-node-create-channel "永久链接")



 此节点将创建一个通道
 `n8n个文档`
 并将用户添加到频道。
1. 首先，您必须输入Twist节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credential/twist/）
 .
 


1. 从
 ***资源***
 下拉列表。
2. 从
 ***工作区ID***
 下拉列表。
3. 输入
 `n8n个文档`
 在
 ***姓名***
 字段。如果要创建具有不同名称的频道，请输入该名称。
4. 单击
 ***添加字段***
 并从下拉列表中选择“用户ID”。
5. 从
 ***用户ID***
 下拉列表。您选择的用户将添加到频道中。
6. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点创建了一个名为
 `n8n个文档`
 ，并将用户添加到频道。
 



![使用“扭曲”节点创建通道](https://d33wubrfki0l68.cloudfront.net/e2388c00ef4f735550688652330384547315ea7f/24a1b/_images/integrations/builtin/app-nodes/twist/twist_node.png)



### 
 3. Twist1节点（更新：通道）
 [#](#3-twist1-node-update-channel "永久链接")



 此节点将更新我们在上一个节点中创建的通道的描述。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***资源***
 下拉列表。
3. 从
 ***操作***
 下拉列表。
4. 单击
 ***通道ID***
 字段并单击
 ***添加表达式***
 .
5. 在
 ***变量选择器***
 section:Nodes>Twist>Output Data>JSON>id。您还可以添加以下表达式：
 `｛｛$node[“Twist”].json[“id”]｝｝`
 .
6. 单击
 ***添加字段***
 并从下拉列表中选择“描述”。
7. 在
 ***说明***
 领域
8. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点向我们在上一个节点中创建的频道添加了一个描述。
 



![使用“扭曲”节点更新通道的描述](https://d33wubrfki0l68.cloudfront.net/b63dcadf3885b828b017ac59895c049c69ed74c0/38205/_images/integrations/builtin/app-nodes/twist/twist1_node.png)



### 
 4. Twist2节点（创建：messageConversation）
 [#](#4-twist2-node-create-messageconversion "永久链接")



 此节点将向Twist上的常规对话发送消息。消息包含导航到
 `https://docs.n8n.io` 
 .
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***工作区ID***
 下拉列表。
3. 从
 ***对话ID***
 下拉列表。如果要向其他会话发送消息，请选择该会话。
4. 单击
 ***通道ID***
 字段并单击
 ***添加表达式***
 .
5. 在
 ***内容***
 字段：
 


|  |  |
| --- | --- |
| 

```
1
2
3
```

 | 

```
嘿[Harshil]（扭转-mention://475370)!
您已添加到｛{$node[“Twist”].json[“name”]}｝频道。
单击下面的按钮可快速导航到文档网站。

```

 |



 上面的消息提到了用户
 `Harshil`
 。若要提及工作区中的用户，您需要使用其用户ID。请参阅
 [常见问题解答]（#where-can-i-get-the-user-id）
 了解如何获取用户ID。
6. 单击
 ***添加选项***
 并从下拉列表中选择“操作”。
7. 单击
 ***添加操作***
 按钮。
8. 从
 ***行动***
 下拉列表。
9. 输入
 `文档网站`
 在
 ***按钮文本***
 领域
10. 从
 ***类型***
 下拉列表。
11. 输入
 `https://docs.n8n.io` 
 在
 ***网址***
 字段。
12. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您将注意到节点向General conversation and mentions the user.
 



![Using the Twist node to send a message](https://d33wubrfki0l68.cloudfront.net/8683890444d2e8f3b78020aaff03ec6acc83188a/01fcc/_images/integrations/builtin/app-nodes/twist/twist2_node.png)




 FAQs
 [#](#faqs "Permanent link")
-----------------------------------


### 
 Where can I get the User ID?
 [#](#where-can-i-get-the-user-id "Permanent link")



 To get the User ID for a user follow the steps mentioned below
1. Click on the
 ***Team***
 tab.
2. Click on a user's avatar.
3. Copy the string of characters located after
 `/u/` 
 in your Twist URL. This string is the User ID. For example, if the URL is
 `https://twist.com/a/4qw45/people/u/475370` 
 the User ID will be
 `475370` 
 .
 




