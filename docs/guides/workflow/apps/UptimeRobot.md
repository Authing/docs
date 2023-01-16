


 Uptime机器人
 [#](#uptimerobot "永久链接")
=================================================



〔Uptime机器人〕(https://uptimerobot.com/) 
 是正常运行时间监视服务。它每5分钟监控一次您的网站。您可以设置HTTP/S、ping、端口、关键字或心跳监视器，并获取电子邮件、电话、Telegram、Slack、Twitter等的通知。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/uptimerobot/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*帐户
	+获取帐户详细信息
*警报联系人
	+创建警报联系人
	+删除通知联系人
	+获取警报联系人
	+获取所有警报联系人
	+更新警报联系人
*维护窗口
	+创建维护窗口
	+删除维护窗口
	+获取维护窗口
	+获取所有维护窗口
	+更新维护窗口
*监视器
	+创建监视器
	+删除监视器
	+获取监视器
	+获取所有监视器
	+重置监视器
	+更新监视器
*公共状态页
	+创建公共状态页
	+删除公共状态页
	+获取公共状态页
	+获取所有公共状态页



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您使用UptimeRobot节点创建、更新和获取监视器。您还可以找到
 [工作流](https://n8n.io/workflows/1112) 
 此示例使用工作流使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 UptimeRobot




 最终的工作流应如下图所示。
 



![具有UptimeRobot节点的工作流](https://d33wubrfki0l68.cloudfront.net/ba7550429b2a6801cd11b689e390329f30e07b6c/5f5e3/_images/integrations/builtin/app-nodes/uptimerobot/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. UptimeRobot节点（创建：监视器）
 [#](#2-uptimerobot-node-create-monitor "永久链接")



 此节点将创建类型为
 `HTTP（S）`
 .
 


1. 首先，您必须输入OpenWeatherMap节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credential/openweathermap/）
 .
2. 从
 ***资源***
 下拉列表。
3. 从
 ***操作***
 下拉列表。
4. 输入
 `n8n`
 在
 ***友好名称***
 领域
5. 从
 ***类型***
 下拉列表。
6. 输入
 `https://n8n.io` 
 在
 ***网址***
 领域
7. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您会注意到节点返回了有关柏林当前天气的数据。
 



![使用OpenWeatherMap节点获取柏林的天气更新](https://d33wubrfki0l68.cloudfront.net/69da2bc396a25073060373a39f04d18a554443b1/3c96a/_images/integrations/builtin/app-nodes/uptimerobot/uptimerobot_node.png)



### 
 3. UptimeRobot节点（更新：监视器）
 [#](#3-uptimerobot-node-update-monitor "永久链接")



 此节点将更新我们在上一个节点中创建的监视器。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***资源***
 下拉列表。
3. 从
 ***操作***
 下拉列表。
4. 单击
 ***身份证号码***
 字段并单击
 ***添加表达式***
 .
5. 在
 ***变量选择器***
 部分：当前节点>输入数据>JSON>id。您还可以添加以下表达式：
 `｛｛$json[“id”]｝｝`
 .
6. 单击
 ***添加字段***
 并从下拉列表中选择“友好名称”。
7. 输入
 `n8n网站`
 在
 ***友好名称***
 领域
8. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点更新了我们在上一个节点中创建的监视器的友好名称。
 



![使用UptimeRobot节点更新监视器](https://d33wubrfki0l68.cloudfront.net/1bb1c95c5ea599c97cefd954e938d8587ddcf050/13b08/_images/integrations/builtin/app-nodes/uptimerobot/uptimerobot1_node.png)



### 
 4. UptimeRobot节点（获取：监视器）
 [#](#4-uptimerobot-node-get-monitor "永久链接")



 此节点将获取我们在上一个节点中创建的监控器的信息。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***资源***
 下拉列表。
3. 从
 ***操作***
 下拉列表。
4. 单击
 ***身份证号码***
 字段并单击
 ***添加表达式***
 .
5. 在
 ***变量选择器***
 部分：当前节点>输入数据>JSON>id。您还可以添加以下表达式：
 `｛｛$json[“id”]｝｝`
 .
6. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您会注意到节点返回了我们之前创建的监视器的信息。
 



![使用UptimeRobot节点检索监视器的信息](https://d33wubrfki0l68.cloudfront.net/3f947d3fe1fa5fb4acddf5ac17e1bb356e13d3ac/fe1fc/_images/integrations/builtin/app-nodes/uptimerobot/uptimerobot2_node.png)





