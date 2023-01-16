


 Microsoft待办事项
 [#](#microsoft将执行 "永久链接")
=========================================================



[Microsoft待办事项](https://todo.microsoft.com) 
 是一个基于云的任务管理应用程序。它允许用户从智能手机、平板电脑和计算机管理任务。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/microsoft/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*链接的资源
	+创建
	+删除
	+获取
	+全部获取（Get All）
	+更新
*列表
	+创建
	+删除
	+获取
	+全部获取（Get All）
	+更新
*任务
	+创建
	+删除
	+获取
	+全部获取（Get All）
	+更新



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您在Microsoft待办事项中创建、更新和获取任务
 [工作流](https://n8n.io/workflows/1114) 
 此示例使用工作流将使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Microsoft待办事项




 最终的工作流应如下图所示。
 



![具有Microsoft待办事项节点的工作流](https://d33wubrfki0l68.cloudfront.net/117c591df28098ccfbc8beb9c7f82cb02efb9ad0/69938/_images/integrations/builtin/app-nodes/microsofttodo/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. Microsoft待办事项节点（创建：任务）
 [#](#2-microsoft-to-do-node-create-task "永久链接")



 此节点将创建具有重要性级别的任务
 `高（H）`
 在“任务”列表中。您可以选择不同的列表和重要性级别。
 


1. 首先，您必须输入Microsoft待办事项节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/microsoft/）
 .
2. 从
 ***操作***
 下拉列表。
3. 从
 ***列表ID***
 下拉列表。
4. 在
 ***主题***
 领域
5. 单击
 ***添加字段***
 并从下拉列表中选择“重要性”。
6. 从
 ***重要性***
 下拉列表。
7. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点在Microsoft To Do中创建了一个新任务。
 



![使用Microsoft待办事项节点创建任务](https://d33wubrfki0l68.cloudfront.net/4d0aa90e38f7e45a2964b55c18108e4f308dac1c/64322/_images/integrations/builtin/app-nodes/microsofttodo/microsofttodo_node.png)



### 
 3. Microsoft To Do1节点（更新：任务）
 [#](#3-microsoft-to-do1-node-update-task "永久链接")



 此节点将更新我们在上一节点中创建的任务的状态。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***操作***
 下拉列表。
3. 单击
 ***列表ID***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 部分：节点>Microsoft待办事项>参数>taskListId。还可以添加以下表达式：
 `｛｛$node[“Microsoft To Do”].parameter[“taskListId”]｝｝`
 .
5. 单击
 ***任务ID***
 字段并单击
 ***添加表达式***
 .
6. 在
 ***变量选择器***
 部分：当前节点>输入>JSON>id。您还可以添加以下表达式：
 `｛｛$json[“id”]｝｝`
 .
7. 单击
 ***添加字段***
 按钮，然后从下拉列表中选择“状态”。
8. 从
 ***状态***
 下拉列表。
9. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点更新了我们在上一个节点中创建的任务的状态。
 



![使用Microsoft待办事项节点更新任务的状态](https://d33wubrfki0l68.cloudfront.net/89019bcf5d60451632d124e297ca71a1484e5905/f0587/_images/integrations/builtin/app-nodes/microsofttodo/microsofttodo1_node.png)



### 
 4. Microsoft To Do2节点（get:task）
 [#](#4-microsoft-to-do2-node-get-ask "永久链接")



 此节点将获取我们先前创建的任务。
 


1. 选择在上一个节点中输入的凭据。
2. 单击
 ***列表ID***
 字段并单击
 ***添加表达式***
 .
3. 在
 ***变量选择器***
 部分：节点>Microsoft待办事项>参数>taskListId。还可以添加以下表达式：
 `｛｛$node[“Microsoft To Do”].parameter[“taskListId”]｝｝`
 .
4. 单击
 ***任务ID***
 字段并单击
 ***添加表达式***
 .
5. 在
 ***变量选择器***
 部分：当前节点>输入>JSON>id。您还可以添加以下表达式：
 `｛｛$json[“id”]｝｝`
 .
6. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您会注意到节点获取了我们之前创建的任务的信息。
 



![使用Microsoft待办事项节点检索任务信息](https://d33wubrfki0l68.cloudfront.net/27bbc7ba297f27907d15a3ce7afa6b7868ab116b/4c324/_images/integrations/builtin/app-nodes/microsofttodo/microsofttodo2_node.png)





