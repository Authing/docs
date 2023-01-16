


 条纹
 [#](#条纹 "永久链接")
=======================================



[条纹](https://stripe.com/) 
 为电子商务网站和移动应用程序提供支付处理软件和应用程序编程接口。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credential/stripe/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*余额
	+获得平衡
*费用
	+创建费用
	+收取费用
	+获取所有费用
	+更新费用
*优惠券
	+创建优惠券
	+获取所有优惠券
*客户
	+创建客户
	+删除客户
	+获取客户
	+获取所有客户
	+更新客户
*客户卡
	+添加客户卡
	+获取客户卡
	+删除客户卡
*来源
	+创建源
	+删除源
	+获取来源
*令牌
	+创建令牌



 实例
 [#](#示例 "永久链接")
-----------------------------------------



 此工作流允许您创建新客户、创建卡令牌，并将此令牌与该客户的卡相关联。此示例使用工作流将使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 条纹




 最终的工作流应如下图所示。
 



![具有Stripe节点的工作流](https://d33wubrfki0l68.cloudfront.net/f3b5d3baa8edf19782560ee90e9d21b7087bbafe/e6f79/_images/integrations/builtin/app-nodes/stripe/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. 条带节点
 [#](#2-三节点 "永久链接")


1. 首先输入Stripe API凭据。你可以学习如何创建
 [此处]（/integrations/builtin/credential/stripe/）
 .
2. 填写以下剩余参数：
	***资源**
	 ：选择要使用的实体，
	 **客户**
	 在此示例中。
	***操作**
	 ：选择要执行的操作，
	 **创建**
	 在此示例中。
	***姓名**
	 ：输入客户名称。
	***其他字段**
	 ：提供更多详细信息，可用选项包括：地址、描述、电子邮件、元数据和发货。
	***类型**
	 ：要创建的令牌类型，
	 **卡令牌**
	 默认情况下。



![条纹节点](https://d33wubrfki0l68.cloudfront.net/25f5d7512c7d7ae7c570838acfb4bb6169d61f6c/0ff98/_images/integrations/builtin/app-nodes/stripe/stripe_node.png)



### 
 3. Stripe1节点
 [#](#3-tripe1-node "永久链接")


1. 首先输入与第一个节点相同的Stripe API凭据。
2. 填写以下剩余参数：
	***资源**
	 ：选择要使用的实体，
	 **令牌**
	 在此示例中。
	***操作**
	 ：选择要执行的操作，
	 **创建**
	 在此示例中。
	***类型**
	 ：要创建的令牌类型，
	 **卡令牌**
	 默认情况下。
	***卡号**
	 ：输入客户信用卡号。
	***CVC**
	 ：输入此卡的安全代码。
	***到期月份**
	 ：输入此卡的到期月份。
	***到期年份**
	 ：输入此卡的到期年份。



![Stripe1节点](https://d33wubrfki0l68.cloudfront.net/bccdc6eb673e1876202313ba9b63f063fe13acd7/e7c26/_images/integrations/builtin/app-nodes/stripe/stripe1_node.png)



### 
 4. Stripe2节点
 [#](#4-stripe2-node "永久链接")


1. 首先输入与上一个节点相同的Stripe API凭据。
2. 填写以下剩余参数：
	***资源**
	 ：选择要使用的实体，
	 **客户卡**
	 在此示例中。
	***操作**
	 ：选择要执行的操作，
	 **添加**
	 在此示例中。
	***客户ID**
	 ：输入第一个节点生成的客户ID。
	***卡令牌**
	 ：输入第二个节点生成的令牌。
	***类型**
	 ：要创建的令牌类型，
	 **卡令牌**
	 默认情况下。



![条纹2节点](https://d33wubrfki0l68.cloudfront.net/f647f87550810538e647a03cc135d5d7c7234e31/a2c82/_images/integrations/builtin/app-nodes/stripe/stripe2_node.png)





