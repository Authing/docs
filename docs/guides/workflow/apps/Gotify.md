


 Gotify公司公司
 [#](#gotify "永久链接")
=======================================



[确认](https://gotify.net/) 
 是用于发送和接收消息的服务器。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/gotify/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*消息
	+创建
	+删除
	+全部获取（Get All）



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您使用Gotify节点通过消息发送每日天气更新。您还可以找到
 [工作流](https://n8n.io/workflows/774) 
 此示例使用工作流使用以下节点。
-
 [Cron]（/integrations/builtin/core-nodes/n8n-nodes-base.Cron/）
 -
 [OpenWeatherMap]（/integrations/builtin/app nodes/n8n nodes-base.OpenWeatherMap/）
 -
 Gotify




 最终的工作流应如下图所示。
 



![具有Gotify节点的工作流](https://d33wubrfki0l68.cloudfront.net/7c0cb3f251fbea2f9762cb5be0c98ad72255c21a/40d25/_images/integrations/builtin/app-nodes/gotify/workflow.png)



### 
 1. Cron节点
 [#](#1-cron-node "永久链接")



 Cron节点将在每天上午9点触发工作流。
 


1. 单击
 ***添加Cron时间***
 .
2. 将小时数设置为
 ***小时***
 领域
3. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到Cron节点被配置为每天上午9点触发工作流。
 



![每天上午9点使用Cron节点触发工作流](https://d33wubrfki0l68.cloudfront.net/c41e6aefcad5fcfeb4efde6bee1322450b7a8c43/8449e/_images/integrations/builtin/app-nodes/gotify/cron_node.png)



### 
 2. OpenWeatherMap节点（当前天气）
 [#](#2-openweathermap-node-current-weater "永久链接")



 此节点将返回有关柏林当前天气的数据。要获取您所在城市的天气更新，您可以输入城市的名称。
 


1. 首先，您必须输入OpenWeatherMap节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credential/openweathermap/）
 .
2. 输入
 `柏林`
 在
 ***城市***
 领域
3. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您会注意到节点返回了有关柏林当前天气的数据。
 



![使用OpenWeatherMap节点获取柏林的天气更新](https://d33wubrfki0l68.cloudfront.net/71bd923f278977bb4ffd598d77bd1b3697a7ae9c/05daf/_images/integrations/builtin/app-nodes/gotify/openweathermap_node.png)



### 
 3. Gotify节点（创建：消息）
 [#](#3-getify-node-create-message "永久链接")



 此节点将发送带有天气更新的消息。
 


1. 首先，您必须输入Gotify节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/gotify/）
 .
2. 单击
 ***消息***
 字段并单击
 ***添加表达式***
 .
3. 在
 ***表达式***
 字段：
 `嘿！室外温度为{{$node[“OpenWeatherMap”].json[“main”][“temp”]}°C。`
 .
4. 单击
 ***添加字段***
 并从下拉列表中选择“标题”。
5. 输入
 `今天的天气更新`
 在
 ***标题***
 领域
6. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您会注意到节点发送了一条带有天气更新的消息。
 



![使用Gotify节点通过消息发送天气更新](https://d33wubrfki0l68.cloudfront.net/bdf23407cbaf1a80f67caadfdc22826b383eceb2/d1bfb/_images/integrations/builtin/app-nodes/gotify/gotify_node.png)





 激活生产工作流
 



 此示例工作流使用Cron节点，即Trigger节点。您需要保存工作流，然后单击屏幕右上方的“激活”切换以激活工作流。然后将根据Cron节点中的设置触发工作流。
 





