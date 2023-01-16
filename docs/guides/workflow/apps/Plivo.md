


 普利沃
 [#](#plivo "永久链接")
=====================================



[普林沃](https://www.plivo.com/) 
 是一家云通信平台服务公司，允许您以编程方式在应用程序中添加SMS、MMS和语音呼叫功能。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credential/plivo/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*呼叫
	+拨打语音电话
*毫米
	+发送彩信（仅限美国/加拿大）
*短信
	+发送短信。



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您使用普利沃节点通过短信发送每日天气更新。您还可以找到
 [工作流](https://n8n.io/workflows/1005) 
 此示例使用工作流使用以下节点。
-
 [Cron]（/integrations/builtin/core-nodes/n8n-nodes-base.Cron/）
 -
 [OpenWeatherMap]（/integrations/builtin/app nodes/n8n nodes-base.OpenWeatherMap/）
 -
 Plivo




 最终的工作流应如下图所示。
 



![具有Plivo节点的工作流](https://d33wubrfki0l68.cloudfront.net/7c8a000531f5fbf4380d3690d01ac312b4005e0d/5ce4a/_images/integrations/builtin/app-nodes/plivo/workflow.png)



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
 



![每天上午9点使用Cron节点触发工作流](https://d33wubrfki0l68.cloudfront.net/ff9449de217ea8ba516e810f689795bde2eea02a/c0d14/_images/integrations/builtin/app-nodes/plivo/cron_node.png)



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
 



![使用OpenWeatherMap节点获取柏林的天气更新](https://d33wubrfki0l68.cloudfront.net/ad4756cf6cbfd1e1a0650c99697c890093ae1c3b/b4404/_images/integrations/builtin/app-nodes/plivo/openweathermap_node.png)



### 
 3. Plivo节点（发送：sms）
 [#](#3-plivo-node-sensited sms "永久链接")



 此节点将发送一条包含上一节点发送的天气更新的SMS。
 


1. 首先，您必须输入Plivo节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credential/plivo/）
 .
2. 在
 ***发件人***
 领域
3. 在
 ***收件人***
 领域
4. 单击
 ***消息***
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



 在下面的截图中，您会注意到节点向我们在天气更新中指定的电话号码发送了一条短信。
 



![使用Plivo节点通过短信发送天气更新](https://d33wubrfki0l68.cloudfront.net/ccffe2756fc17f71ea2b48c601a888129e1d77ad/4faad/_images/integrations/builtin/app-nodes/plivo/plivo_node.png)





 激活生产工作流
 



 您需要保存工作流，然后单击屏幕右上方的“激活”切换以激活工作流。然后将根据Cron节点中的设置触发工作流。
 





