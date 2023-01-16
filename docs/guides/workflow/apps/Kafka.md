


 卡夫卡
 [#](#kafka "永久链接")
=====================================



[卡夫卡](https://kafka.apache.org/) 
 是一个开源的分布式事件流平台，可用于高性能数据管道、流分析、数据集成和任务关键型应用程序。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/kafka/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*发送消息



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 该工作流允许您使用卡夫卡节点每分钟向Kafka中的主题发送有关ISS位置的更新。您还可以找到
 [工作流](https://n8n.io/workflows/750) 
 此示例使用工作流使用以下节点。
-
 [Cron]（/integrations/builtin/core-nodes/n8n-nodes-base.Cron/）
 -
 [HTTP请求]（/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/）
 -
 [Set]（/integrations/builtin/core nodes/n8n nodes base.Set/）
 -
 Kafka




 最终的工作流应如下图所示。
 



![具有Kafka节点的工作流](https://d33wubrfki0l68.cloudfront.net/1d442b58cb1b0b6206f04a60e7fbaf7935469c91/f7778/_images/integrations/builtin/app-nodes/kafka/workflow.png)



### 
 1. Cron节点
 [#](#1-cron-node "永久链接")



 Cron节点将每分钟触发一次工作流。
 


1. 单击
 ***添加Cron时间***
 .
2. 从
 ***模式***
 下拉列表。
3. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到Cron节点被配置为每分钟触发一次工作流。
 



![使用Cron节点每分钟触发一次工作流](https://d33wubrfki0l68.cloudfront.net/8e372807c849eafbeeab33ae33598455374fa054/4e4ed/_images/integrations/builtin/app-nodes/kafka/cron_node.png)



### 
 2. HTTP请求节点（GET）
 [#](#2-http-request-node-get "永久链接")



 此节点将向API发出GET请求
 `https://api.wheretheiss.at/v1/satellites/25544/positions` 
 以获取国际空间站的位置。此信息将传递到工作流中的下一个节点。
 


1. 输入
 `https://api.wheretheiss.at/v1/satellites/25544/positions` 
 在
 ***网址***
 领域
2. 单击
 ***添加参数***
 中的按钮
 ***查询参数***
 部分
3. 输入
 `时间戳`
 在
 ***姓名***
 领域
4. 单击
 ***价值***
 字段并单击
 ***添加表达式***
 .
5. 输入以下表达式：
 `｛｛Date.now（）｝｝`
 。此表达式将返回当前时间戳。
6. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您将注意到节点向API发出GET请求，并返回有关ISS位置的信息。
 



![使用HTTP请求节点获取有关ISS位置的信息](https://d33wubrfki0l68.cloudfront.net/2ce05ea7df660c16ef2de40961de491a01979b68/807c5/_images/integrations/builtin/app-nodes/kafka/httprequest_node.png)



### 
 3. 设置节点
 [#](#3-集-节点 "永久链接")



 我们将使用Set节点来确保只有在该节点中设置的数据才能传递给工作流中的下一个节点。
 


1. 单击
 ***添加值***
 并从下拉列表中选择“字符串”。
2. 输入
 `名称`
 在
 ***姓名***
 领域
3. 单击
 ***价值***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 部分：节点>HTTP请求>输出数据>JSON>0>名称。还可以添加以下表达式：
 `｛｛$node[“HTTP请求”].json[“0”][“名称”]｝｝`
 .
5. 单击
 ***添加值***
 并从下拉列表中选择“字符串”。
6. 输入
 `纬度`
 在
 ***姓名***
 领域
7. 单击
 ***价值***
 字段并单击
 ***添加表达式***
 .
8. 在
 ***变量选择器***
 部分：节点>HTTP请求>输出数据>JSON>0>纬度。还可以添加以下表达式：
 `｛｛$node[“HTTP请求”].json[“0”][“纬度”]｝｝`
 .
9. 单击
 ***添加值***
 并从下拉列表中选择“字符串”。
10. 输入
 `经度`
 在
 ***姓名***
 领域
11. 单击
 ***价值***
 字段并单击
 ***添加表达式***
 .
12. 在
 ***变量选择器***
 部分：节点>HTTP请求>输出数据>JSON>0>经度。还可以添加以下表达式：
 `｛｛$node[“HTTP请求”].json[“0”][“经度”]｝｝`
 .
13. 单击
 ***添加值***
 并从下拉列表中选择“字符串”。
14. 输入
 `时间戳`
 在
 ***姓名***
 领域
15. 单击
 ***价值***
 字段并单击
 ***添加表达式***
 .
16. 在
 ***变量选择器***
 部分：节点>HTTP请求>输出数据>JSON>0>timestamp。还可以添加以下表达式：
 `｛｛$node[“HTTP请求”].json[“0”][“时间戳”]｝｝`
 .
17. 切换
 ***仅保留集合***
 到
 `真值`
 。我们将此选项设置为true，以确保只有在此节点中设置的数据才能传递到工作流中的下一个节点。
18. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点使用来自上一个节点的数据，并返回我们为工作流设置的数据。
 



![使用Set节点设置数据](https://d33wubrfki0l68.cloudfront.net/29c64719d7f00ecdd55b0ad74026e90c1804ab83/d3337/_images/integrations/builtin/app-nodes/kafka/set_node.png)



### 
 4. Kafka节点
 [#](#4-kafka节点 "永久链接")



 此节点将数据从上一个节点发送到
 `iss位置`
 卡夫卡的主题。如果您在Kafka中创建了一个具有不同名称的主题，则可以使用该主题名称。
 


1. 首先 have to enter credentials for the Kafka node. You can find out how to do that
 [here](/integrations/builtin/credentials/kafka/) 
 .
2. Enter the name of the topic in the
 ***Topic***
 field.
3. Click on
 ***Execute Node***
 to run the node.



 In the screenshot below, you will notice that the node sends the data from the previous node to the
 `iss-position` 
 topic in Kafka.
 



![Using the Kafka node to send the data to a topic](https://d33wubrfki0l68.cloudfront.net/bf5afc638127dafd416eaa1ba33d2b614d342dca/4198b/_images/integrations/builtin/app-nodes/kafka/kafka_node.png)





 Activate workflow for production
 



 This example workflow uses the Cron node, which is a Trigger node. You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the Cron node.
 





