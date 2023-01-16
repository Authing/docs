


 按钮
 [#](#按钮 "永久链接")
===============================================



[按钮](https://www.pushbullet.com/) 
 连接您的设备，并允许您在计算机上查看手机的通知、在设备之间传输链接和文件。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credential/pushullet/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*推
	+创建推送
	+删除推送
	+获取所有推送
	+更新推送



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您使用按钮节点通过推送通知发送每日天气更新。您还可以找到
 [工作流](https://n8n.io/workflows/740) 
 此示例使用工作流使用以下节点。
-
 [Cron]（/integrations/builtin/core-nodes/n8n-nodes-base.Cron/）
 -
 [OpenWeatherMap]（/integrations/builtin/app nodes/n8n nodes-base.OpenWeatherMap/）
 -
 Pushbullet




 最终的工作流应如下图所示。
 



![具有Pushbullet节点的工作流](https://d33wubrfki0l68.cloudfront.net/b17f3c720a3f70de40f3add06d99bda4110017ca/a62e5/_images/integrations/builtin/app-nodes/pushbullet/workflow.png)



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
 



![每天上午9点使用Cron节点触发工作流](https://d33wubrfki0l68.cloudfront.net/c4b95c438a750b91d11c2eea64108058b1a99072/6bf12/_images/integrations/builtin/app-nodes/pushbullet/cron_node.png)



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
 



![使用OpenWeatherMap节点获取柏林的天气更新](https://d33wubrfki0l68.cloudfront.net/7960d0a99756dbf091ca57417196eeda5faf0af1/5e6ce/_images/integrations/builtin/app-nodes/pushbullet/openweathermap_node.png)



### 
 3. Pushbullet节点（创建：push）
 [#](#3-pushbullet-node-create-push "永久链接")



 此节点将向默认设备发送带有天气更新的推送通知。如果要将其发送到特定设备，请从
 ***目标***
 下拉列表，并在
 ***价值***
 领域
 


1. 首先，您必须输入Pushbullet节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credential/pushullet/）
 .
2. 输入
 `今天的天气更新`
 在
 ***标题***
 领域
3. 单击
 ***阀体***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***表达式***
 字段：
 `嘿！室外温度为{{$node[“OpenWeatherMap”].json[“main”][“temp”]}°C。`
 .
5. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您会注意到该节点向默认设备发送了一个推送通知，其中包含天气更新。
 



![使用Pushbullet节点通过推送通知发送天气更新](https://d33wubrfki0l68.cloudfront.net/9466f33d21c89e60ab31b580bd3c3e984ae16a8d/1ed2f/_images/integrations/builtin/app-nodes/pushbullet/pushbullet_node.png)





