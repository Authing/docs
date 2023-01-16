


 Xero公司公司
 [#](#xero "永久链接")
===================================



 Xero为中小企业提供基于云的在线SaaS会计软件平台。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credential/xero/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*联系人
	+创建联系人
	+获取联系人
	+获取所有联系人
	+更新联系人
*发票
	+创建发票
	+获取发票
	+获取所有发票
	+更新发票



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您从Xero获得多达100张发票。您还可以找到
 [工作流](https://n8n.io/workflows/543) 
 在网站上。此示例使用工作流将使用以下两个节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Xero




 最终的工作流应如下图所示。
 



![具有Xero节点的工作流](https://d33wubrfki0l68.cloudfront.net/f287e171f973569319218044786fef0587c98686/aa41b/_images/integrations/builtin/app-nodes/xero/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. Xero节点
 [#](#2-exer-node "永久链接")


1. 首先，您必须输入Xero节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credential/xero/）
 .
2. 从
 *操作*
 下拉列表。
3. 选择要从中获取发票的组织
 *组织ID*
 下拉列表。
4. 单击
 *执行节点*
 以运行工作流。




