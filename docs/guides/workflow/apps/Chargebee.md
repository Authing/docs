


 Chargebee公司公司
 [#](#chargebee "永久链接")
=============================================



[充电宝](https://www.chargebee.com/) 
 是基于订阅的SaaS和电子商务业务的计费平台。Chargebee与支付网关集成，使您能够自动化定期付款收集以及发票、税务、会计、电子邮件通知、SaaS指标和客户管理。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credential/chargebee/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*客户
	+创建客户
*发票
	+退回发票
	+获取发票PDF的URL
*订阅
	+取消订阅
	+删除订阅



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您在Chargebee中创建新客户。您还可以找到
 [工作流](https://n8n.io/workflows/483) 
 在网站上。此示例使用工作流将使用以下两个节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Chargebee




 最终的工作流应如下图所示。
 



![具有Chargebee节点的工作流](https://d33wubrfki0l68.cloudfront.net/693ad3455e3ed6e6eff82cb48a8f468d75d6a28d/e7dcf/_images/integrations/builtin/app-nodes/chargebee/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. Chargebee节点
 [#](#2-计费-节点 "永久链接")


1. 首先，您必须输入Chargebee节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credential/chargebee/）
 .
2. 从
 *资源*
 下拉列表。
3. 在
 *属性*
 部分，单击
 *添加属性*
 按钮并选择
 *名字*
 .
4. 在
 *名字*
 领域
5. 单击
 *添加属性*
 再次选择
 *姓氏*
 .
6. 在
 *姓氏*
 领域
7. 单击
 *执行节点*
 以运行工作流。




