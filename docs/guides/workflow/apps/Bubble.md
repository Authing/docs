


 泡
 [#](#bubble "永久链接")
=======================================



[气泡](https://www.bubble.io/) 
 允许您为桌面和移动web浏览器创建交互式多用户应用程序。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credential/bubble/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*对象
	+创建
	+删除
	+获取
	+全部获取（Get All）
	+更新



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您从气泡创建、更新和获取对象。您还可以找到
 [工作流](https://n8n.io/workflows/1041) 
 此示例使用工作流将使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Bubble




 最终的工作流应如下图所示。
 



![具有气泡节点的工作流](https://d33wubrfki0l68.cloudfront.net/e264024e60c24f7af4e2db10c0d3c238f2132e46/b928a/_images/integrations/builtin/app-nodes/bubble/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. 气泡节点（创建：对象）
 [#](#2-bubble-node-create-object "永久链接")



 此节点将创建类型为
 `文档`
 在Bubble中。如果要创建具有不同类型的对象，请改用该类型。
 


1. 首先，您必须输入Bubble节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credential/bubble/）
 .
2. 从
 ***操作***
 下拉列表。
3. 输入
 `文档`
 在
 ***类型名称***
 字段。
4. 单击
 ***添加属性***
 按钮
5. 输入
 `名称`
 在
 ***密钥***
 领域如果使用的是其他类型，请输入该类型中存在的字段名。
6. 输入
 `气泡图`
 在
 ***价值***
 领域
7. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点创建了一个类型为
 `文档`
 在Bubble中。
 



![使用气泡节点创建新对象](https://d33wubrfki0l68.cloudfront.net/49a2fb8a18f100142ec4542b1667141df16d3e76/779ab/_images/integrations/builtin/app-nodes/bubble/bubble_node.png)



### 
 3. Bubble1节点（更新：对象）
 [#](#3-bloope1-node-update-object "永久链接")



 此节点将更新我们使用上一个节点创建的对象。
 


1. 选择在上一个Bubble节点中输入的凭据。
2. 从
 ***操作***
 下拉列表。
3. 单击
 ***类型名称***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 部分：节点>气泡>参数>类型名称。还可以添加以下表达式：
 `｛｛$node[“Bubble”].parameter[“typeName”]｝｝`
 .
5. 单击
 ***对象ID***
 字段并单击
 ***添加表达式***
 .
6. 在
 ***变量选择器***
 部分：当前节点>输入数据>JSON>id。您还可以添加以下表达式：
 `｛｛$json[“id”]｝｝`
 .
7. 单击
 ***添加属性***
 按钮
8. 输入
 `名称`
 在
 ***密钥***
 字段。如果使用的是其他类型，请输入该类型中存在的字段名。
9. 输入
 `气泡节点`
 在
 ***价值***
 领域
10. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您将注意到节点更新了先前创建的对象的信息。
 



![使用气泡节点更新对象的信息](https://d33wubrfki0l68.cloudfront.net/ef5320d6e1e53a702092aa9aa3d7088dfeb39177/5ae94/_images/integrations/builtin/app-nodes/bubble/bubble1_node.png)



### 
 4. Bubble2节点（get:object）
 [#](#4-ubble2-node-get-object "永久链接")



 此节点将检索我们先前创建的对象的信息。
 


1. 选择在上一个Bubble节点中输入的凭据。
2. 单击
 ***类型名称***
 字段并单击
 ***添加表达式***
 .
3. 在
 ***变量选择器***
 部分：节点>气泡>参数>类型名称。还可以添加以下表达式：
 `｛｛$node[“Bubble”].parameter[“typeName”]｝｝`
 .
4. 单击
 ***对象ID***
 字段并单击
 ***添加表达式***
 .
5. 在
 ***变量选择器***
 section:Nodes>Bubble>Output Data>JSON>id。您还可以添加以下表达式：
 `｛｛$node[“Bubble”].json[“id”]｝｝`
 .
6. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您会注意到节点检索了我们之前创建的对象的信息。
 



![使用Bubble节点检索对象的信息](https://d33wubrfki0l68.cloudfront.net/44b4d871f0acd3d7c06bb0510b8e2fcb3e151881/c6fc6/_images/integrations/builtin/app-nodes/bubble/bubble2_node.png)





