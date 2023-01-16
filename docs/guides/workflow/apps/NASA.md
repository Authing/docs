


 国家航空和航天局
 [#](#nasa "永久链接")
===================================



[美国国家航空航天局](https://nasa.gov/) 
 是美国联邦政府的一个独立机构，负责民用空间项目以及航空和空间研究。国家航空和航天局 API使应用程序开发人员可以访问NASA数据，包括图像。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/nasa/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*当天的天文学图片
	+获取当天的天文学图片
*小行星Neo Feed
	+根据小行星最接近地球的日期检索小行星列表
*小行星Neo查找
	+根据NASA SPK-ID查找小行星
*小行星Neo浏览
	+浏览整个小行星数据集
*DONKI日冕物质抛射
	+检索DONKI日冕物质抛射数据
*DONKI行星间激波
	+检索DONKI行星际激波数据
*DONKI太阳耀斑
	+检索DONKI太阳耀斑数据
*DONKI太阳能粒子
	+检索DONKI太阳高能粒子数据
*DONKI磁层顶穿越
	+检索DONKI磁层顶穿越的数据
*DONKI辐射带增强
	+检索DONKI辐射带增强数据
*DONKI高速流
	+检索DONKI高速流数据
*DONKI WSA+EnlilSimulation公司
	+检索DONKI WSA+EnlilSimulation数据
*DONKI通知
	+检索DONKI通知数据
*地球图像
	+检索地球图像
*地球资源
	+检索地球资源



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您每天将当天的天文图片发送到Telegram频道。您还可以找到
 [工作流](https://n8n.io/workflows/828) 
 此示例使用工作流使用以下节点。
-
 [Cron]（/integrations/builtin/core-nodes/n8n-nodes-base.Cron/）
 -
 NASA
 -
 [电报]（/integrations/builtin/app-nodes/n8n-nodes-base.tele电报/）




 最终的工作流应如下图所示。
 



![NASA节点的工作流程](https://d33wubrfki0l68.cloudfront.net/52dc8a82428ce550928e011384b59f09f56b57a7/95c2a/_images/integrations/builtin/app-nodes/nasa/workflow.png)



### 
 1. Cron节点
 [#](#1-cron-node "永久链接")



 Cron节点将在每天晚上8点触发工作流。
 


1. 单击
 ***添加Cron时间***
 .
2. 将小时数设置为20
 ***小时***
 领域
3. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到Cron节点被配置为每天晚上8点触发工作流。
 



![每天晚上8点使用Cron节点触发工作流](https://d33wubrfki0l68.cloudfront.net/cad245090dbe3352568557255101560a5451b900/3c0cf/_images/integrations/builtin/app-nodes/nasa/cron_node.png)



### 
 2. NASA节点（获取：astronomyPictureOfTheDay）
 [#](#2-nasa-node-getastronomy "永久链接"当天的图片)



 此节点将返回当天的天文图片。
 


1. 首先，您必须输入NASA节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/nasa/）
 .
2. 切换
 ***下载图像***
 到
 `错误`
 。通过将此选项设置为false，节点将不会返回二进制数据。
3. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您会注意到节点返回了当天的天文图片的数据。此数据将由工作流中的下一个节点使用。
 



![使用NASA节点获取当天的天文图片](https://d33wubrfki0l68.cloudfront.net/fc300effa04083f7833047c52662678dfd84cd42/d1a87/_images/integrations/builtin/app-nodes/nasa/nasa_node.png)



### 
 3. 电报节点（sendPhoto:message）
 [#](#3电报-节点敏感照片-消息 "永久链接")



 这个节点将把我们从上一个节点接收到的图片发送到一个频道。
 


1. 首先，您必须输入Telegram节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credential/telegraph/）
 .
2. 从
 ***操作***
 下拉列表。
3. 在
 ***聊天ID***
 领域
4. 单击
 ***照片***
 字段并单击
 ***添加表达式***
 .
5. 在
 ***变量选择器***
 部分：节点>NASA>输出数据>JSON>url。还可以添加以下表达式：
 `｛｛$node[“NASA”].json[“url”]｝｝`
 .
6. 单击
 ***添加字段***
 并从下拉列表中选择“标题”。
7. 单击
 ***标题***
 字段并单击
 ***添加表达式***
 .
8. 在
 ***变量选择器***
 部分：节点>NASA>输出数据>JSON>标题。还可以添加以下表达式：
 `｛{$node[“NASA”].json[“title”]}｝`
 .
9. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您会注意到节点将带有标题的图像发送到我们指定的频道。
 



![使用Telegram节点发送当天的天文图片](https://d33wubrfki0l68.cloudfront.net/45021a9ead9569bf1b1e949e7969694d95a08f81/da4d4/_images/integrations/builtin/app-nodes/nasa/telegram_node.png)





 激活生产工作流
 



 此示例工作流使用Cron节点，即Trigger节点。您需要保存工作流，然后单击屏幕右上方的“激活”切换以激活工作流。然后将根据Cron节点中的设置触发工作流。
 





