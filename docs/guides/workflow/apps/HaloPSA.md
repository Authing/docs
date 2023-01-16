


 卤代PSA
 [#](#halopsa "永久链接")
=========================================



[卤代PSA](https://halopsa.com/) 
 是一个直观的PSA软件。标准化您的流程，让客户成为每次谈话的中心。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/halopsa/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*客户
	+创建客户端
	+删除客户端
	+获取客户端
	+获取所有客户端
	+更新客户端
*现场
	+创建网站
	+删除网站
	+获取站点
	+获取所有网站
	+更新网站
*票证
	+创建票据
	+删除票据
	+拿到一张票
	+获取所有门票
	+更新票据
*用户
	+创建用户
	+删除用户
	+获取用户
	+获取所有用户
	+更新用户



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您在卤代PSA中创建客户端。此示例工作流使用以下节点。
-
 [Start]（/integrations/builtin/c或e nodes/n8n nodes base.Start/）
 -
 HaloPSA




![具有Harvest节点的工作流](https://d33wubrfki0l68.cloudfront.net/7db72cc3fd12ac3a76d0fe26865577e6b3f457c7/b3035/_images/integrations/builtin/app-nodes/halopsa/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. HaloPSA节点（资源：客户端）
 [#](#2-halopsa-node-resource-client "永久链接")



 此节点将在HaloPSA中创建一个新客户端。
 


1. 首先，您必须输入HaloPSA节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/halopsa/）
 .
2. 在
 ***资源***
 领域
3. 在
 ***操作***
 领域
4. 在
 ***姓名***
 领域
5. 添加其他字段，如
 ***重要人物***
 or
 ***网站***
 通过单击
 ***添加字段***
 .



 在下面的屏幕截图中，您可以看到节点如何在HaloPSA中创建新客户端。
 



![使用HaloPSA节点创建客户端](https://d33wubrfki0l68.cloudfront.net/ccf953c94f810a83166384938704a0fcc4ca5636/e9e08/_images/integrations/builtin/app-nodes/halopsa/halopsa-client-create.png)





