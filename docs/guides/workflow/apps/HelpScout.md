


 帮助Scout
 [#](#help scout "永久链接")
===============================================



[帮助童子军](https://www.helpscout.com/) 
 是一款帮助台软件，它为客户服务专业人员提供基于电子邮件的客户支持平台、知识库工具和可嵌入的搜索/联系小部件。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/helpscout/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*对话
	+创建新对话
	+删除对话
	+获取对话
	+获取所有对话
*客户
	+创建新客户
	+获取客户
	+获取所有客户
	+获取客户属性定义
	+更新客户
*邮箱
	+获取邮箱数据
	+获取所有邮箱
*线程
	+创建新的聊天线程
	+获取所有聊天线程



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您从帮助Scout获取所有邮箱。您还可以找到
 [工作流](https://n8n.io/workflows/567) 
 在网站上。此示例使用工作流将使用以下两个节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Help Scout




 最终的工作流应如下图所示。
 



![具有Help Scout节点的工作流](https://d33wubrfki0l68.cloudfront.net/5595c63a36b49d04ac646fb256e093db92f85f51/8b6a1/_images/integrations/builtin/app-nodes/helpscout/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. 帮助Scout节点
 [#](#2-help-scout-node "永久链接")


1. 首先，您必须输入Help Scout节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/helpscout/）
 .
2. 从
 *资源*
 下拉列表。
3. 从
 *操作*
 下拉列表。
4. 单击
 *执行节点*
 以运行工作流。




