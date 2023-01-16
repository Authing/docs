


 AMQP发件人
 [#](#amqp sender "永久链接")
=================================================



[AMQP](https://www.amqp.org/) 
 是面向消息中间件的开放标准应用层协议。AMQP的定义特征是消息定向、排队、路由、可靠性和安全性。此节点支持AMQP 1.0兼容的消息代理。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credential/amqp/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*发送消息



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您每分钟向
 [活动MQ](https://activemq.apache.org/) 
 使用AMQP Sender节点排队。您还可以找到
 [工作流](https://n8n.io/workflows/762) 
 此示例使用工作流使用以下节点。
 


*[调度触发器]（/integrations/builtin/core nodes/n8n nodes base.schedumetrigger/）
*[HTTP请求]（/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/）
*[Set]（/integrations/builtin/core nodes/n8n nodes base.Set/）
*AMQP发件人



 最终的工作流应如下图所示。
 



![具有AMQP Sender节点的工作流](https://d33wubrfki0l68.cloudfront.net/6625163df9054fd329bfb0f00514e3fabf676ebe/16231/_images/integrations/builtin/app-nodes/amqp/workflow.png)



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
 



![使用Cron节点每分钟触发一次工作流](https://d33wubrfki0l68.cloudfront.net/766b3d6f40ddcf357aa99e2c4c62db7c412b4ced/0fc66/_images/integrations/builtin/app-nodes/amqp/cron_node.png)



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
 



![使用HTTP请求节点获取有关ISS位置的信息](https://d33wubrfki0l68.cloudfront.net/f11f4ef837f1445b8d21a66cd6a295dce85bded6/a37bc/_images/integrations/builtin/app-nodes/amqp/httprequest_node.png)



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
 



![使用Set节点设置数据](https://d33wubrfki0l68.cloudfront.net/59bf6c59b60c4407262496cc55ee2b7437491c9a/a3813/_images/integrations/builtin/app-nodes/amqp/set_node.png)



### 
 4. AMQP Sender节点
 [#](#4-amqpsenser-node "永久链接")



 此节点将数据从上一个节点发送到
 `iss位置tion` 
 queue in ActiveMQ. If you have created a queue with a different name in ActiveMQ, you can use that queue instead.
 


1. First of all, you'll have to enter credentials for the AMQP Sender node. You can find out how to do that
 [here](/integrations/builtin/credentials/amqp/) 
 .
2. Enter the name of the queue or topic in the
 ***Queue / Topic***
 field.
3. Click on
 ***Execute Node***
 to run the node.



 In the screenshot below, you will notice that the node sends the data from the previous node to the
 `iss-position` 
 queue in ActiveMQ.
 



![Using the AMQP Sender node to send the data to a queue](https://d33wubrfki0l68.cloudfront.net/63af41db909448517524ea0b7be9911f6d31d72a/23ace/_images/integrations/builtin/app-nodes/amqp/amqpsender_node.png)





 Activate workflow for production
 



 This example workflow uses the Cron node, which is a Trigger node. You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the Cron node.
 





