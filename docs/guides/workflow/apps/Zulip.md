


 祖利普
 [#](#zulip "永久链接")
=====================================



[祖利普](https://zulipchat.com/) 
 是一个开源聊天和协作软件。在祖利普中，通信发生在流中（就像IRC中的通道）。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credential/zulip/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*消息
	+删除邮件
	+获取消息
	+发送私人消息
	+将消息发送到流
	+更新消息
	+上载文件
*流
	+创建流。
	+删除流。
	+获取所有流。
	+获取订阅流。
	+更新流。
*用户
	+创建用户。
	+停用用户。
	+获取用户。
	+获取所有用户。
	+更新用户。



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您在Zulip上发送私人消息。您还可以找到
 [工作流](https://n8n.io/workflows/498) 
 在网站上。此示例使用工作流将使用以下两个节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Zulip




 最终的工作流应如下图所示。
 



![具有Zulip节点的工作流](https://d33wubrfki0l68.cloudfront.net/c4fa383a77c1ed387c08eb22367fe070d653de4e/cf161/_images/integrations/builtin/app-nodes/zulip/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. Zulip节点
 [#](#2-zulip-node "永久链接")


1. 首先，您必须输入Zulip节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credential/zulip/）
 .
2. 从
 *收件人*
 下拉列表。
3. 在
 *内容*
 领域
4. 单击
 *执行节点*
 以运行工作流。




