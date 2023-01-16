


 斯特拉瓦
 [#](#strava "永久链接")
=======================================



[斯特拉瓦](https://www.strava.com/) 
 是一种用于跟踪人类运动的互联网服务，它结合了社交网络功能。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/strava/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*活动
	+创建新活动
	+获取活动
	+获取所有活动
	+获取所有活动评论
	+获得所有活动荣誉
	+获得所有活动圈数
	+获取所有活动区域
	+更新活动



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您在斯特拉瓦中创建、更新和获取活动。您还可以找到
 [工作流](https://n8n.io/workflows/744) 
 此示例使用工作流将使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Strava




 最终的工作流应如下图所示。
 



![具有Strava节点的工作流](https://d33wubrfki0l68.cloudfront.net/9885d5bd3c1115d053368bbeb4255178e7229a8f/f7ee1/_images/integrations/builtin/app-nodes/strava/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. Strava节点（创建：活动）
 [#](#2-trava-node-create-activity "永久链接")



 此节点将创建名称为的活动
 `晨跑`
 在斯特拉瓦。要创建具有不同名称的活动，可以输入活动的名称。
 


1. 首先，您必须输入Strava节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/strava/）
 .
2. 输入
 `晨跑`
 在
 ***姓名***
 领域
3. 输入
 `运行`
 在
 ***类型***
 字段。
4. 在
 ***开始日期***
 领域
5. 设置
 ***已用时间（秒）***
 到
 `3600` 
 .
6. 单击
 ***添加字段***
 按钮，然后从下拉列表中选择“距离”。
7. 设置
 ***距离***
 到
 `1000` 
 Strava以米为单位测量距离。
8. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您会注意到节点创建了一个名为
 `晨跑`
 和类型
 `运行`
 .
 



![使用Strava节点创建活动](https://d33wubrfki0l68.cloudfront.net/4bb241d2335c9e207807a7d15cc9d93a27cab129/2d811/_images/integrations/builtin/app-nodes/strava/strava_node.png)



### 
 3. Strava1节点（更新：活动）
 [#](#3-trava1-node-update-activity "永久链接")



 此节点将更新我们在上一个节点中创建的活动。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***操作***
 下拉列表。
3. 单击
 ***活动ID***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 section:Nodes>Strava>Output Data>JSON>id。您还可以添加以下表达式：
 `｛｛$node[“Strava”].json[“id”]｝｝`
 .
5. 单击
 ***添加字段***
 按钮，然后从下拉列表中选择“描述”。
6. 在
 ***说明***
 字段。
7. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点向我们使用Strava节点创建的活动添加了一个描述。
 



![使用Strava节点更新活动](https://d33wubrfki0l68.cloudfront.net/396f87396e8676cf8f5c36b164762a37a9c4aa56/f4a3f/_images/integrations/builtin/app-nodes/strava/strava1_node.png)



### 
 4. Strava2节点（获取：活动）
 [#](#4-strava2-node-get-activity "永久链接")



 此节点返回我们使用Strava节点创建的活动的信息。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***操作***
 下拉列表。
3. 单击
 ***活动ID***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 section:Nodes>Strava>Output Data>JSON>id。您还可以添加以下表达式：
 `｛｛$node[“Strava”].json[“id”]｝｝`
 .
5. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点返回了我们在该节点中指定的活动的信息。
 



![使用Strava节点解决问题](https://d33wubrfki0l68.cloudfront.net/cc3789db2e52f2bfada7a02a27c4962addf508ee/1e454/_images/integrations/builtin/app-nodes/strava/strava2_node.png)





