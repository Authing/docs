


 时钟同步（时钟同步（Clockify））
 [#](#clockify "永久链接")
===========================================



[时钟](https://clockify.me/) 
 是一个免费的时间跟踪器和时间表应用程序，用于跟踪项目的工作时间。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/clockify/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*项目
	+创建项目
	+删除项目
	+获取项目
	+获取所有项目
	+更新项目
*标签
	+创建标记
	+删除标记
	+获取所有标签
	+更新标记
*任务
	+创建任务
	+删除任务
	+获取任务
	+获取所有任务
	+更新任务
*时间输入
	+创建时间条目
	+删除时间条目
	+获取时间条目
	+更新时间条目



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您在Clockify中创建项目、标记和时间条目。它还允许您更新Clockify中的时间条目。您还可以找到
 [工作流](https://n8n.io/workflows/701) 
 此示例使用工作流将使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Clockify




 最终的工作流应如下图所示。
 



![具有Clockify节点的工作流](https://d33wubrfki0l68.cloudfront.net/702a4c646b595631bab8d16a73b28d40a836f0f1/8fd8c/_images/integrations/builtin/app-nodes/clockify/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. Clockify节点（创建：项目）
 [#](#2-clockify-node-create-project "永久链接")



 此节点将创建具有自定义颜色的私有项目。它还将在Clockify中为项目添加注释。
 


1. 首先，您必须输入Clockify节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/clockify/）
 .
2. 选择
 ***工作区ID***
 从下拉列表中选择。
3. 在
 ***项目名称***
 领域
4. 单击
 ***添加字段***
 并从下拉列表中选择“颜色”。
5. 从颜色选择器中选择颜色，或在
 ***颜色***
 领域
6. 单击
 ***添加字段***
 并从下拉列表中选择“Is Public”。
7. 切换
 ***是公共的***
 设置为false。
8. 单击
 ***添加字段***
 并从下拉列表中选择“备注”。
9. 在
 ***注释***
 领域
10. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您将注意到该节点创建了一个名为
 `n8n个文档`
 。此项目具有自定义颜色
 `#0000FF`
 和一张纸条
 `对于n8n文档`
 .
 



![使用Clockify节点创建项目](https://d33wubrfki0l68.cloudfront.net/250f920f1931baabe22ebf601cd3cc551ab3d95b/65e3c/_images/integrations/builtin/app-nodes/clockify/clockify_node.png)



### 
 3. Clockify1节点（创建：标记）
 [#](#3-clockify1-node-create-tag "永久链接")



 此节点将在Clockify中创建一个新标记。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***资源***
 下拉列表。
3. 选择
 ***工作区ID***
 从下拉列表中选择。
4. 在
 ***姓名***
 领域
5. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点创建了一个名为
 `文档`
 在Clockify的n8n工作区中。
 



![使用Clockify节点创建标记](https://d33wubrfki0l68.cloudfront.net/a18ecb40e881db59b573b0f3f145f39ec9d881cb/6698b/_images/integrations/builtin/app-nodes/clockify/clockify1_node.png)



### 
 4. Clockify2节点（创建：timeEntry）
 [#](#4-clockify2-node-create-timeentry "永久链接")



 此节点在Clockify中创建一个新的时间条目，并带有说明。它还将我们在上一步中创建的标记添加到时间条目中。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***资源***
 下拉列表。
3. 选择
 ***工作区ID***
 从下拉列表中选择。
4. 选择开始日期和时间
 ***开始***
 领域
5. 单击
 ***添加字段***
 并从下拉列表中选择“描述”。
6. 在
 ***说明***
 领域
7. 单击
 ***添加字段***
 并从下拉列表中选择“结束”。
8. 为
 ***完***
 领域
9. 单击
 ***添加字段***
 并从下拉列表中选择“标记ID”。
10. 从
 ***标记ID***
 下拉列表。
11. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您会注意到该节点创建了一个新的时间条目，并添加了在上一个节点中创建的标记。
 



![使用Clockify节点创建时间条目](https://d33wubrfki0l68.cloudfront.net/4ff5ab9e81a25176df624b495089aacab2c85aea/4ab24/_images/integrations/builtin/app-nodes/clockify/clockify2_node.png)



### 
 5. Clockify3节点（更新：timeEntry）
 [#](#5-clockify3-node-update-timeentry "永久链接")



 此节点将项目添加到Clockify节点创建的时间条目中。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***资源***
 下拉列表。
3. 从
 ***操作***
 下拉列表。
4. 选择
 ***工作区ID***
 从下拉列表中选择。
5. 单击
 ***时间条目ID***
 字段并单击
 ***添加表达式***
 .
6. 在
 ***变量选择器***
 部分：Nodes>Clockify2>Output Data>JSON>id。您还可以添加以下表达式：
 `｛｛$node[“Clockify2”].json[“id”]｝｝`
 .
7. 单击
 ***添加字段***
 并从下拉列表中选择“项目ID”t.
8. Click on the gears icon next to the
 ***Project ID***
 field and click on
 ***Add Expression***
 .
9. Select the following in the
 ***Variable Selector***
 section: Nodes > Clockify > Output Data > JSON > id. You can also add the following expression:
 `{{$node["Clockify"].json["id"]}}` 
 .
10. Click on
 ***Execute Node***
 to run the node.



 In the screenshot below, you will notice that the node has updated the time entry by adding the project ID we created in the Clockify node.
 



![Using the Clockify node to update the time entry](https://d33wubrfki0l68.cloudfront.net/62b73da997090849f838d4ed93f49aa6e1e199e5/97591/_images/integrations/builtin/app-nodes/clockify/clockify3_node.png)





