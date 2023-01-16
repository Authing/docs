


 推压器
 [#](#pushover "永久链接")
===========================================



[推覆](https://www.pushover.net/) 
 是一种简单的推送通知服务，可轻松集成到web应用程序、网络监视器、外壳脚本、服务器以及需要向Android、iPhone、iPad和桌面发送警报的任何其他内容中。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/pushover/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*消息
	+推



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您使用推压器节点通过推送通知发送每日天气更新。您还可以找到
 [工作流](https://n8n.io/workflows/740) 
 此示例使用工作流使用以下节点。
-
 [Cron]（/integrations/builtin/core-nodes/n8n-nodes-base.Cron/）
 -
 [OpenWeatherMap]（/integrations/builtin/app nodes/n8n nodes-base.OpenWeatherMap/）
 -
 Pushover




 最终的工作流应如下图所示。
 



![具有Pushover节点的工作流](https://d33wubrfki0l68.cloudfront.net/5c32370a66c7c1d130f194730d6a30c95214f902/e6a3c/_images/integrations/builtin/app-nodes/pushover/workflow.png)



### 
 1. Cron节点
 [#](#1-cron-node "永久链接")



 Cron节点将在每天上午9点触发工作流。
 


1. 单击
 ***添加Cron时间***
 .
2. 将小时数设置为
 ***小时***
 字段。
3. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到Cron节点被配置为每天上午9点触发工作流。
 



![每天上午9点使用Cron节点触发工作流](https://d33wubrfki0l68.cloudfront.net/915655b2216b1f7d63b8e8950869da576c4d10a6/c4ea6/_images/integrations/builtin/app-nodes/pushover/cron_node.png)



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
 



![使用OpenWeatherMap节点获取柏林的天气更新](https://d33wubrfki0l68.cloudfront.net/28cb7d723c3b953a83f5b06b768acd5fb9e94f83/3e728/_images/integrations/builtin/app-nodes/pushover/openweathermap_node.png)



### 
 3. Pushover节点（推送：消息）
 [#](#3推送-模式推送-消息 "永久链接")



 此节点将发送一个推送通知，其中包含上一个节点发送的天气更新。
 


1. 首先，您必须输入Pushover节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/pushover/）
 .
2. 在
 ***用户密钥***
 领域您可以从
 [推覆式仪表板](https://www.pushover.net/) 
 .
3. 单击
 ***消息***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***表达式***
 字段：
 `嘿！室外温度为{{$node[“OpenWeatherMap”].json[“main”][“temp”]}°C。`
 .
5. 从
 ***优先级***
 下拉列表。这将触发声音、振动，并根据用户的设备设置显示警报。
6. 单击
 ***添加字段***
 并从下拉列表中选择“标题”。
7. 输入
 `今天的天气`
 在
 ***标题***
 领域
8. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到节点向设备发送带有天气更新的推送通知。
 



![使用Pushover节点通过推送通知发送天气更新](https://d33wubrfki0l68.cloudfront.net/9c2acd6d691ffec983f98dfb8e5e707648e01890/f6e00/_images/integrations/builtin/app-nodes/pushover/pushover_node.png)





