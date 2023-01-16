


 Spontit公司
 [#](#spontit "永久链接")
=========================================



[赞助](https://www.spontit.com/) 
 允许您在不使用应用程序或网站的情况下发送推送通知。您可以创建不同的频道，并向特定的关注者发送推送通知。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/spontit/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*推
	+创建推送通知



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您使用Spontit节点通过推送通知发送每日天气更新。您还可以找到
 [工作流](https://n8n.io/workflows/796) 
 此示例使用工作流使用以下节点。
 


*[调度触发器]（/integrations/builtin/core nodes/n8n nodes base.schedumetrigger/）
*[OpenWeatherMap]（/integrations/builtin/app nodes/n8n nodes-base.OpenWeatherMap/）
*Spontit公司



 最终的工作流应如下图所示。
 



![具有Spontit节点的工作流](https://d33wubrfki0l68.cloudfront.net/b1cca7a2ca6d3c96c0fb933eef90c9f926ee12b8/32d18/_images/integrations/builtin/app-nodes/spontit/workflow.png)



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
 



![每天上午9点使用Cron节点触发工作流](https://d33wubrfki0l68.cloudfront.net/577cd6bf5e2e7484dcdf767043abea361e1b4f34/ea794/_images/integrations/builtin/app-nodes/spontit/cron_node.png)



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
 



![使用OpenWeatherMap节点获取柏林的天气更新](https://d33wubrfki0l68.cloudfront.net/52700c13f98afd8c1d9c8d53fb93ab97d185cca2/7d12c/_images/integrations/builtin/app-nodes/spontit/openweathermap_node.png)



### 
 3. Spontit节点（创建：推送）
 [#](#3-portit-node-create-push "永久链接")



 此节点将发送带有天气更新的推送通知。
 


1. 首先，您必须输入Spontit节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/spontit/）
 .
2. 单击
 ***添加字段***
 并从下拉列表中选择“标题”。
3. 输入
 `今天的天气更新`
 在
 ***标题***
 领域
4. 单击
 ***内容***
 字段并单击
 ***添加表达式***
 .
5. 在
 ***表达式***
 字段：
 `嘿！室外温度为{{$node[“OpenWeatherMap”].json[“main”][“temp”]}°C。`
 .
6. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您会注意到节点发送了一个带有天气更新的推送通知。
 



![使用Spontit节点通过推送通知发送天气更新](https://d33wubrfki0l68.cloudfront.net/569281dba2624b1ddf4818f5daad69d15fc0be35/e93e5/_images/integrations/builtin/app-nodes/spontit/spontit_node.png)





 激活生产工作流
 



 此示例工作流使用Cron节点，即Trigger节点。您需要保存工作流，然后单击屏幕右上方的“激活”切换以激活工作流。然后将根据Cron节点中的设置触发工作流。
 





