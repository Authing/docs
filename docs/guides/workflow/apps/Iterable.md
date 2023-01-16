


 可迭代的
 [#](#iterable "永久链接")
===========================================



[可重复](https://iterable.com/) 
 是一个跨渠道平台，允许营销人员创建、优化和衡量整个客户旅程中的每一次互动。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/iterable/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*事件
	+记录用户执行的操作
*用户
	+创建/更新用户
	+删除用户
	+获取用户
*用户列表
	+将用户添加到列表
	+从列表中删除用户



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您从可迭代的创建、更新和获取用户。您还可以找到
 [工作流](https://n8n.io/workflows/813) 
 此示例使用工作流将使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Iterable




 最终的工作流应如下图所示。
 



![具有Iterable节点的工作流](https://d33wubrfki0l68.cloudfront.net/0446ebfc168b6fd91bf111d28682308533a7dcb4/0ff71/_images/integrations/builtin/app-nodes/iterable/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. 可重复节点（upsert:user）
 [#](#2-iterable-node-upsert-user "永久链接")



 此节点将在Iterable中创建一个新用户。
 


1. 首先，您必须输入Iterable节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/iterable/）
 .
2. 在
 ***标识符***
 领域
3. 在
 ***价值***
 领域
4. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您将注意到该节点在Iterable中创建了一个新用户。
 



![使用Iterable节点创建用户](https://d33wubrfki0l68.cloudfront.net/9efe90ba7791d2ed13952d0a9a5a51192e074457/5bc68/_images/integrations/builtin/app-nodes/iterable/iterable_node.png)



### 
 3. Iterable1节点（upsert:user）
 [#](#3-iterable1-node-upsert-user "永久链接")



 此节点将更新我们在上一个节点中创建的用户的信息。
 


1. 选择在上一个节点中输入的凭据。
2. 在
 ***标识符***
 领域
3. 单击
 ***价值***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 部分：节点>可重复>参数>值。还可以添加以下表达式：
 `｛｛$node[“Iterable”].prarameter[“value”]｝｝`
 .
5. 单击
 ***添加字段***
 按钮并选择
 ***数据字段***
 .
6. 单击
 ***添加数据字段***
 按钮
7. 输入
 `名称`
 在
 ***密钥***
 领域
8. 在
 ***价值***
 领域
9. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点更新了我们在上一个节点中创建的用户的信息。
 



![使用Iterable节点更新用户信息](https://d33wubrfki0l68.cloudfront.net/e4ac8fd466a3b259d4f0b1310f11d1905b09d51e/6a42a/_images/integrations/builtin/app-nodes/iterable/iterable1_node.png)



### 
 4. Iterable2节点（get:user）
 [#](#4-iterable2-node-get-user "永久链接")



 该节点将获取我们使用Iterable节点创建的用户的信息。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***操作***
 下拉列表。
3. 单击
 ***价值***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 部分：节点>可重复>参数>值。还可以添加以下表达式：
 `｛｛$node[“Iterable”].prarameter[“value”]｝｝`
 .
5. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您会注意到节点获取了我们使用Iterable节点创建的用户的信息。
 



![使用Iterable节点获取用户信息](https://d33wubrfki0l68.cloudfront.net/72f0f4e65120f26666beb108afc7f3f8c6683630/2bc15/_images/integrations/builtin/app-nodes/iterable/iterable2_node.png)





