


 OpenWeather地图
 [#](#openweathermap "永久链接")
=======================================================



[打开天气图](https://openweathermap.org/) 
 是一种提供天气数据的在线服务。它提供当前天气数据、预报和历史数据。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credential/openweathermap/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*返回当前天气数据
*返回未来5天的天气数据



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您获取城市的当前天气数据。您还可以找到
 [工作流](https://n8n.io/workflows/460) 
 在网站上。此示例使用工作流将使用以下两个节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 OpenWeather地图




 最终的工作流应如下图所示。
 



![具有OpenWeatherMap节点的工作流](https://d33wubrfki0l68.cloudfront.net/f035015857caf4df9d8c7014879cbe106e725b25/20f30/_images/integrations/builtin/app-nodes/openweathermap/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. OpenWeatherMap节点
 [#](#2-openweathermap-node "永久链接")


1. 首先，您必须输入OpenWeatherMap节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credential/openweathermap/）
 .
2. 在
 *城市*
 领域
3. 单击
 *执行节点*
 以运行工作流。




