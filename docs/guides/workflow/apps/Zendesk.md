


 Zendesk公司公司
 [#](#zendesk "永久链接")
=========================================



[Zendesk](https://www.zendesk.com/) 
 是一个支持票务系统，旨在帮助跟踪、确定优先级和解决客户支持交互。Zendesk支持不仅仅是一个帮助台，它通过任何渠道提供个性化、响应式的支持，帮助培养客户关系。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/zendesk/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*票证
	+创建票据
	+删除票据
	+拿到一张票
	+获取所有门票
	+恢复暂停的票证
	+更新票据
*票据字段
	+获取票据字段
	+获取所有系统和自定义票据字段
*用户
	+创建用户
	+删除用户
	+获取用户
	+获取所有用户
	+获取用户的组织
	+获取与用户相关的数据
	+搜索用户
	+更新用户
*组织
	+创建组织
	+删除组织
	+计数组织
	+获取组织
	+获取所有组织
	+获取与组织相关的数据
	+更新组织



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您在Zendesk中创建票据。您还可以找到
 [工作流](https://n8n.io/workflows/496) 
 在网站上。此示例使用工作流将使用以下两个节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Zendesk




 最终的工作流应如下图所示。
 



![具有Zendesk节点的工作流](https://d33wubrfki0l68.cloudfront.net/76a4bd71958b0f0c4ce4173a868aa877986b4a4e/ebb4c/_images/integrations/builtin/app-nodes/zendesk/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. Zendesk节点
 [#](#2-zendesk-node "永久链接")


1. 首先，您必须输入Zendesk节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/zendesk/）
 .
2. 在
 *说明*
 领域
3. 单击
 *执行节点*
 以运行工作流。




