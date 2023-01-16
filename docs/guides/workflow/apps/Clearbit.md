


 Clearbit（清除位）（清除位）
 [#](#clearbit "永久链接")
===========================================



[清除位](https://clearbit.com/) 
 提供功能强大的产品和数据API，如联系人丰富、潜在客户开发、财务合规等，以帮助企业发展。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/clearbit/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*公司
	+自动完成公司名称并检索徽标和域
	+基于电子邮件或域查找个人和公司数据
*人员
	+基于电子邮件或域查找个人和公司数据



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您使用Clearbit中的电子邮件查找人员。您还可以找到
 [工作流](https://n8n.io/workflows/484) 
 在网站上。此示例使用工作流将使用以下两个节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Clearbit




 最终的工作流应如下图所示。
 



![具有Clearbit节点的工作流](https://d33wubrfki0l68.cloudfront.net/6690012a4e688be4663b55a3ae41ce3771f5bf46/0c74d/_images/integrations/builtin/app-nodes/clearbit/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. Clearbit节点
 [#](#2-清除节点 "永久链接")


1. 首先，您必须输入Clearbit节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/clearbit/）
 .
2. 从
 *资源*
 下拉列表。
3. 在
 *电子邮件*
 领域
4. 单击
 *执行节点*
 以运行工作流。




