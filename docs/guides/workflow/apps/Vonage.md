


 沃尼奇
 [#](#vonage "永久链接")
=======================================



[体积](https://vonage.com/) 
 提供统一的通信、联络中心和可编程通信API。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/vonage/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*短信
	+发送



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您使用Vonage节点通过短信发送每日天气更新。您还可以找到
 [工作流](https://n8n.io/workflows/723) 
 此示例使用工作流使用以下节点。
 


*[调度触发器]（/integrations/builtin/core nodes/n8n nodes base.schedumetrigger/）
*[OpenWeatherMap]（/integrations/builtin/app nodes/n8n nodes-base.OpenWeatherMap/）
*Vonage公司



 最终的工作流应如下图所示。
 



![具有Vonage节点的工作流](https://d33wubrfki0l68.cloudfront.net/7ad5c8dca79d367b48ee7bc839d1f4e2b2a1d31e/2f005/_images/integrations/builtin/app-nodes/vonage/workflow.png)



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
 



![每天上午9点使用Cron节点触发工作流](https://d33wubrfki0l68.cloudfront.net/6062487ec5b148ffced43524433339ec231a17da/54835/_images/integrations/builtin/app-nodes/vonage/cron_node.png)



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
 



![使用OpenWeatherMap节点获取柏林的天气更新](https://d33wubrfki0l68.cloudfront.net/915ca4ee207b5cd03c63be2a627c2952e79c95ee/65fd0/_images/integrations/builtin/app-nodes/vonage/openweathermap_node.png)



### 
 3. Vonage节点（发送：sms）
 [#](#3-vonage-nodesensed-sms "永久链接")



 此节点将发送一条包含上一节点发送的天气更新的SMS。
 


1. 首先，您必须输入Vonage节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/vonage/）
 .
2. 在
 ***发件人***
 领域
3. 在
 ***收件人***
 字段。
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



 在下面的屏幕截图中，您会注意到该节点向我们在天气更新中指定的电话号码发送了一条短信，这是由上一个节点发送的。
 



![使用Vonage节点通过短信发送天气更新](https://d33wubrfki0l68.cloudfront.net/2d44fc030905666f81ccbd5b321b496dc24b90fa/f2855/_images/integrations/builtin/app-nodes/vonage/vonage_node.png)





