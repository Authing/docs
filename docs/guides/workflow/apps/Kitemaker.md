


 风筝制造商
 [#](#kitemaker "永久链接")
=============================================



[风筝制造商](https://www.kitemaker.co/) 
 是为远程软件开发团队中的设计师、工程师和产品经理构建的协作工具。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credential/kitemaker/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*组织
	+检索登录用户组织的数据。
*空间
	+检索登录用户组织中所有空间的数据。
*用户
	+检索登录用户组织中所有用户的数据。
*工作项
	+创建
	+获取
	+全部获取（Get All）
	+更新



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您从风筝制造商创建、更新和获取工作项。您还可以找到
 [工作流](https://n8n.io/workflows/1048) 
 此示例使用工作流将使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Kitemaker




 最终的工作流应如下图所示。
 



![具有Kitemaker节点的工作流](https://d33wubrfki0l68.cloudfront.net/44bba2f0e852fd7d1847400dc3cc4fd4ea4e47a7/8f590/_images/integrations/builtin/app-nodes/kitemaker/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. Kitemaker节点（workItem:create）
 [#](#2-kitemaker-node-workitem-创建 "永久链接")



 此节点将在Kitemaker中创建一个工作项。
 


1. 首先，您必须输入Kitemaker节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credential/kitemaker/）
 .
2. 从
 ***操作***
 下拉列表。
3. 在
 ***标题***
 领域
4. 从
 ***状态ID***
 下拉列表。
5. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您将注意到该节点在Kitemaker中创建了一个新的工作项。
 



![使用Kitemaker节点创建新工作项](https://d33wubrfki0l68.cloudfront.net/f3b0d4d28a8bd0844602d8b9e2a94ca3be5449e5/8efbf/_images/integrations/builtin/app-nodes/kitemaker/kitemaker_node.png)



### 
 3. Kitemaker1节点（工作项：更新）
 [#](#3-kitemaker1-node-workitem-update "永久链接")



 此节点将更新我们使用上一个节点创建的项目的状态。
 


1. 选择在上一个Kitemaker节点中输入的凭据。
2. 从
 ***操作***
 下拉列表。
3. 单击
 ***工作项ID***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 部分：当前节点>输入数据>JSON>id。您还可以添加以下表达式：
 `｛｛$json[“id”]｝｝`
 .
5. 单击
 ***添加字段***
 按钮，然后从下拉列表中选择“状态ID”。
6. 从
 ***状态ID***
 下拉列表。
7. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到节点更新了先前创建的项目的状态。
 



![使用Kitemaker节点更新工作项](https://d33wubrfki0l68.cloudfront.net/f0485475df82c67b9803d39721fd9ac755a87bb9/2a69a/_images/integrations/builtin/app-nodes/kitemaker/kitemaker1_node.png)



### 
 4. Kitemaker2节点（workItem:get）
 [#](#4-kitemaker2-node-workitem-get "永久链接")



 此节点将检索有关先前创建的项的信息。
 


1. 选择在上一个Kitemaker节点中输入的凭据。
2. 单击
 ***工作项ID***
 字段并单击
 ***添加表达式***
 .
3. 在
 ***变量选择器***
 部分：当前节点>输入数据>JSON>id。您还可以添加以下表达式：
 `｛｛$json[“id”]｝｝`
 .
4. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点检索我们先前创建的工作项的信息。
 



![使用Kitemaker节点检索工作项的信息](https://d33wubrfki0l68.cloudfront.net/49fa05a314d68f8f7ca234163fd49471cf5f6028/db05e/_images/integrations/builtin/app-nodes/kitemaker/kitemaker2_node.png)





