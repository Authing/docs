


 推切（推切（Pushcut））
 [#](#pushcut "永久链接")
=========================================



[推切](https://pushcut.io) 
 是一款适用于iOS的应用程序，允许您创建智能通知以启动快捷方式、URL和在线自动化。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/pushcut/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*通知
	+发送通知



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您使用Pushcut节点通过推送通知发送每日天气更新。您还可以找到
 [工作流](https://n8n.io/workflows/843) 
 此示例使用工作流使用以下节点。
-
 [Cron]（/integrations/builtin/core-nodes/n8n-nodes-base.Cron/）
 -
 [OpenWeatherMap]（/integrations/builtin/app nodes/n8n nodes-base.OpenWeatherMap/）
 -
 Pushcut




 最终的工作流应如下图所示。
 



![具有Pushcut节点的工作流](https://d33wubrfki0l68.cloudfront.net/77f4faf25fbc1c7b16f5a2c3817661b749d452f0/13f6c/_images/integrations/builtin/app-nodes/pushcut/workflow.png)



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
 



![每天上午9点使用Cron节点触发工作流](https://d33wubrfki0l68.cloudfront.net/92067738fc90e68f5cdc7886d54ea74a8115636f/1d6e1/_images/integrations/builtin/app-nodes/pushcut/cron_node.png)



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
 字段。
3. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您会注意到节点返回了有关柏林当前天气的数据。
 



![使用OpenWeatherMap节点获取柏林的天气更新](https://d33wubrfki0l68.cloudfront.net/c34870ff425bc9890ae5f5a83e1adf7db6406f6b/f6ec8/_images/integrations/builtin/app-nodes/pushcut/openweathermap_node.png)



### 
 3. Pushcut节点（发送：通知）
 [#](#3-推送-节点敏感通知 "永久链接")



 此节点将发送一个推送通知，其中包含上一个节点发送的天气更新。
 


1. 首先，您必须输入Pushcut节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/pushcut/）
 .
2. 从
 ***通知名称***
 下拉列表。
3. 单击
 ***添加字段***
 并从下拉列表中选择“标题”。
4. 输入
 `今天的天气更新`
 在
 ***标题***
 领域
5. 单击
 ***添加字段***
 并从下拉列表中选择“文本”。
6. 单击
 ***文本***
 字段并单击
 ***添加表达式***
 .
7. 在
 ***表达式***
 字段：
 `嘿！室外温度为{{$node[“OpenWeatherMap”].json[“main”][“temp”]}°C。`
 .
8. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您会注意到节点会向您的设备发送一个带有天气更新的推送通知。
 



![使用Pushcut节点通过推送通知发送天气更新](https://d33wubrfki0l68.cloudfront.net/0f47901b9379283faaad165fe2fe79dd33ede79c/e078a/_images/integrations/builtin/app-nodes/pushcut/pushcut_node.png)





 激活生产工作流
 



 此示例工作流使用Cron节点，即Trigger节点。您需要保存工作流，然后单击屏幕右上方的“激活”切换以激活工作流。然后将根据Cron节点中的设置触发工作流。
 





