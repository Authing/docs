


 桨
 [#](#paddle "永久链接")
=======================================



[桨](https://www.paddle.com/) 
 是软件和SaaS公司运行和发展业务的一体式SaaS商务平台。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/pard/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*优惠券
	+创建优惠券。
	+获取所有优惠券。
	+更新优惠券。
*付款
	+获得所有付款。
	+重新安排付款。
*计划
	+制定计划。
	+获取所有计划。
*产品
	+获取所有产品。
*用户
	+获取所有用户



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您在桨上创建优惠券。您还可以找到
 [工作流](https://n8n.io/workflows/659) 
 此示例使用工作流将使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Paddle




 最终的工作流应如下图所示。
 



![带有“桨”节点的工作流](https://d33wubrfki0l68.cloudfront.net/a3bc6373e7561fe828adb06a4a0e24720cdb25d1/bdf3a/_images/integrations/builtin/app-nodes/paddle/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. 桨节点（创建：优惠券）
 [#](#2-addle-node-create-coon "永久链接")


1. 首先，您必须输入Paddle节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/pard/）
 .
2. 在
 ***折扣金额***
 领域
3. 单击
 ***添加字段***
 按钮，然后从下拉列表中选择“优惠券代码”。
4. 在
 ***优惠券代码***
 领域
5. 单击
 ***执行节点***
 以运行节点。



![使用“桨”节点创建优惠券](https://d33wubrfki0l68.cloudfront.net/1e865ff04f9e987bf3234ea3ea4998f174412cac/ce53f/_images/integrations/builtin/app-nodes/paddle/paddle_node.png)





