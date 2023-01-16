


 雨滴
 [#](#雨滴 "永久链接")
===========================================



[雨滴](https://raindrop.io) 
 是一个书签工具，允许您组织书签。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credential/rainpe/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*书签
	+创建
	+删除
	+获取
	+全部获取（Get All）
	+更新
*集合
	+创建
	+删除
	+获取
	+全部获取（Get All）
	+更新
*标签
	+删除
	+全部获取（Get All）
*用户
	+获取



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您创建集合，并在Rainbrop中创建、更新和获取书签。您还可以找到
 [工作流](https://n8n.io/workflows/959) 
 此示例使用工作流使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 雨滴




 最终的工作流应如下图所示。
 



![具有Rainbrop节点的工作流](https://d33wubrfki0l68.cloudfront.net/fa36b749ec4ccf6f16b5cebda7b62f5513a66529/52c97/_images/integrations/builtin/app-nodes/raindrop/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下“开始”节点存在。
 


### 
 2. 雨滴节点（创建：集合）
 [#](#2-雨滴-节点-创建集合 "永久链接")



 此节点将在Rainbrop中创建一个新集合。
 


1. 首先，您必须输入Rainbrop节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credential/rainpe/）
 .
2. 从
 ***操作***
 下拉列表。
3. 在
 ***标题***
 领域
4. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您会注意到该节点创建了一个标题为
 `n8n个文档`
 .
 



![使用雨滴节点创建新集合](https://d33wubrfki0l68.cloudfront.net/ab295d62e4a6e79e4554386c9a5a328c8228db1f/a9275/_images/integrations/builtin/app-nodes/raindrop/raindrop_node.png)



### 
 3. 雨滴1节点（创建：书签）
 [#](#3-雨滴1-node-create-bookmark "永久链接")



 此节点将创建一个新书签，并将其添加到我们在上一个节点中创建的集合中。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***资源***
 下拉列表。
3. 从
 ***操作***
 下拉列表。
4. 单击
 ***集合***
 字段并单击
 ***添加表达式***
 .
5. 在
 ***变量选择器***
 部分：当前节点>输入数据>JSON>\_id。还可以添加以下表达式：
 `｛｛$json[“_id”]｝｝`
 .
6. 输入
 `https://docs.n8n.io` 
 在
 ***链接***
 领域
7. 单击
 ***添加字段***
 并从下拉列表中选择“标题”。
8. 输入
 `文档`
 在
 ***标题***
 领域
9. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您会注意到节点创建了一个带有标题的新书签
 `文档`
 .
 



![使用雨滴节点创建新书签](https://d33wubrfki0l68.cloudfront.net/61ee2bea84e769f5cfcdc9b93e41dc72885a0fe6/0c5a4/_images/integrations/builtin/app-nodes/raindrop/raindrop1_node.png)



### 
 4. Raindrop2节点（更新：书签）
 [#](#4-rainp2-node-update-mark "永久链接")



 此节点将更新我们在上一个节点中创建的书签。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***资源***
 下拉列表。
3. 从
 ***操作***
 下拉列表。
4. 单击
 ***书签ID***
 字段并单击
 ***添加表达式***
 .
5. 在
 ***变量选择器***
 部分：当前节点>输入数据>JSON>\_id。还可以添加以下表达式：
 `｛｛$json[“_id”]｝｝`
 .
6. 单击
 ***添加字段***
 并从下拉列表中选择“标题”。
7. 输入
 `n8n文档`
 在
 ***标题***
 领域
8. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您将注意到节点更新了我们在上一个节点中创建的书签的标题。
 



![使用雨滴节点更新书签](https://d33wubrfki0l68.cloudfront.net/4550da64d05e819c666e774ef89b83e37b373bb0/bfdb1/_images/integrations/builtin/app-nodes/raindrop/raindrop2_node.png)



### 
 5. Raindrop3节点（获取：书签）
 [#](#5-雨滴3-node-get-bookmark "永久链接")



 此节点将返回有关我们先前创建的书签的信息。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***资源***
 下拉列表。
3. 单击
 ***书签ID***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 部分：当前节点>输入数据>JSON>\_id。还可以添加以下表达式：
 `｛｛$json[“_id”]｝｝`
 .
5. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您会注意到节点返回了我们之前创建的书签上的信息。
 



![使用雨滴节点获取书签](https://d33wubrfki0l68.cloudfront.net/ebe95561d424abd9a5f6c8f9e9fdb438ca792fac/35dba/_images/integrations/builtin/app-nodes/raindrop/raindrop3_node.png)





