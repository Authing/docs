


 MQTT公司公司
 [#](#mqtt "永久链接")
===================================



[MQTT](https://mqtt.org) 
 是一个开放的OASIS和ISO标准轻量级发布订阅网络协议，用于在设备之间传输消息。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/mqtt/）
 .
 




 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您使用MQTT节点每分钟向MQTT中的主题发送ISS的位置更新。您还可以找到
 [工作流](https://n8n.io/workflows/1069) 
 此示例使用工作流使用以下节点。
-
 [Cron]（/integrations/builtin/core-nodes/n8n-nodes-base.Cron/）
 -
 [HTTP请求]（/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/）
 -
 [Set]（/integrations/builtin/core nodes/n8n nodes base.Set/）
 -
 MQTT




 最终的工作流应如下图所示。
 



![具有MQTT节点的工作流](https://d33wubrfki0l68.cloudfront.net/71945286b61440a752a986be90e679a726126cbc/51124/_images/integrations/builtin/app-nodes/mqtt/workflow.png)



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
 



![使用Cron节点每分钟触发一次工作流](https://d33wubrfki0l68.cloudfront.net/30fb39ed391dd509f74eb0af79da7a7f4d05e3f0/7d468/_images/integrations/builtin/app-nodes/mqtt/cron_node.png)



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
 



![使用HTTP请求节点获取有关ISS位置的信息](https://d33wubrfki0l68.cloudfront.net/3dcf7f5b1cc0e4d75b7d646fa5c1f8b79e7af854/6236d/_images/integrations/builtin/app-nodes/mqtt/httprequest_node.png)



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
 部分：当前节点>输入数据>JSON>0>名称。还可以添加以下表达式：
 `｛｛$json[“0”][“name”]｝｝`
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
 部分：当前节点>输入数据>JSON>0>纬度。还可以添加以下表达式：
 `｛｛$json[“0”][“纬度”]｝｝`
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
 部分：当前节点>输入数据>JSON>0>经度。还可以添加以下表达式：
 `｛｛$json[“0”][“经度”]｝｝`
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
 部分：当前节点>输入数据>JSON>0>timestamp。还可以添加以下表达式：
 `｛｛$json[“0”][“timestamp”]｝｝`
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
 



![使用Set节点设置数据](https://d33wubrfki0l68.cloudfront.net/d5071c5de4b83721d159eed47e259cded240b4fc/7b17e/_images/integrations/builtin/app-nodes/mqtt/set_node.png)



### 
 4. MQTT节点
 [#](#4-qtt-node "永久链接")



 此节点将数据从上一个节点发送到
 `iss位置`
 MQTT中的主题。如果您在MQTT中创建了具有不同名称的主题，则可以使用该主题名称。
 


1. 首先，您必须输入MQTT节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/mqtt/）
 .
2. 在
 ***主题***
 领域
3. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到节点将数据从上一个节点发送到
 `iss位置tion` 
 topic in MQTT.
 



![Using the MQTT node to send the data to a topic](https://d33wubrfki0l68.cloudfront.net/6aca6b751a73d38578de23e72c6d7b4862579cba/607db/_images/integrations/builtin/app-nodes/mqtt/mqtt_node.png)





 Activate workflow for production
 



 This example workflow uses the Cron node, which is a Trigger node. You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the Cron node.
 





