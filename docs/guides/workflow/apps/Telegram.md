


 电报
 [#](#电报 "永久链接")
===========================================



[电报](https://telegram.org) 
 是一种基于云的即时消息和IP语音服务。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credential/telegraph/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*聊天
	+获取有关聊天的最新信息。
	+离开组、超级组或频道。
	+获取聊天成员。
	+设置聊天的描述。
	+设置聊天的标题。
*回调
	+发送从内联键盘发送的回调查询的答案。
	+发送从内联bot发送的回调查询的答案。
*文件
	+获取文件。
*消息
	+删除聊天信息
	+编辑文本消息
	+固定聊天消息
	+发送动画文件
	+发送音频文件
	+发送聊天动作
	+发送文档
	+发送位置
	+将一组照片或视频发送到相册
	+发送短信
	+发送照片
	+发送贴纸
	+发送视频
	+取消固定聊天消息



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您每天通过Telegram机器人向指定的聊天ID发送鸡尾酒配方
 [工作流](https://n8n.io/workflows/781) 
 此示例使用工作流使用以下节点。
 


*[调度触发器]（/integrations/builtin/core nodes/n8n nodes base.schedumetrigger/）
*[HTTP请求]（/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/）
*电报



 最终的工作流应如下图所示。
 



![带有Telegram节点的工作流](https://d33wubrfki0l68.cloudfront.net/5fb848b749a86d1c75f61f9480b957d6f6f17580/7d31a/_images/integrations/builtin/app-nodes/telegram/workflow.png)



### 
 1. Cron节点
 [#](#1-cron-node "永久链接")



 Cron节点将在每天晚上8点触发工作流。
 


1. 单击
 ***添加Cron时间***
 .
2. 将小时设置为
 `20` 
 在
 ***小时***
 字段。
3. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到Cron节点被配置为每天晚上8点触发工作流。
 



![每天晚上8点使用Cron节点触发工作流](https://d33wubrfki0l68.cloudfront.net/ccf93ca23aa2c27637b60684906ec3280eb67af8/1eadd/_images/integrations/builtin/app-nodes/telegram/cron_node.png)



### 
 2. HTTP请求节点（GET）
 [#](#2-http-request-node-get "永久链接")



 此节点将向API发出GET请求
 `https://www.thecocktaildb.com/api/json/v1/1/random.php` 
 随便拿一杯鸡尾酒。此信息将传递到工作流中的下一个节点。
 


1. 输入
 `https://www.thecocktaildb.com/api/json/v1/1/random.php` 
 在
 ***网址***
 字段。
2. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您将注意到节点向API发出GET请求，并返回有关随机鸡尾酒的信息。
 



![使用HTTP请求节点获取有关随机鸡尾酒的信息](https://d33wubrfki0l68.cloudfront.net/6f813311b4837ccfbc078c8c0153ef8b54d29782/5033e/_images/integrations/builtin/app-nodes/telegram/httprequest_node.png)



### 
 3. 电报节点（sendPhoto:message）
 [#](#3电报-节点敏感照片-消息 "永久链接")



 该节点将在Telegram上发送一条消息，其中包含我们从上一节点获得的鸡尾酒的图像和配方。
 


1. 首先，您必须输入Telegram节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credential/telegraph/）
 .
2. 从
 ***操作***
 下拉列表。
3. 在
 ***聊天ID***
 领域请参阅
 [常见问题解答]（#how-do-i-get-a-chat-id）
 了解如何获取聊天ID。
4. 单击
 ***照片***
 字段并单击
 ***添加表达式***
 .
5. 在
 ***变量选择器***
 部分：节点>HTTP请求>输出数据>JSON>饮料>[项：0]>strDrinkThumb。还可以添加以下表达式：
 `｛｛$node[“HTTP请求”].json[“饮料”][0][“strDrinkThumb”]｝｝`
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
 部分：节点>HTTP请求>输出数据>JSON>饮料>[item:0]>strInstructions。还可以添加以下表达式：
 `｛｛$node[“HTTP请求”].json[“饮料”][0][“strInstructions”]}｝`
 .
9. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您会注意到节点在Telegram上发送了一条消息，其中包含鸡尾酒的图像和配方。
 



![使用Telegram节点发送带有鸡尾酒图像和指示的消息](https://d33wubrfki0l68.cloudfront.net/2942bf29fb49a9e04e4335f16813afe30f3bf856/1f080/_images/integrations/builtin/app-nodes/telegram/telegram_node.png)





 激活生产工作流
 



 此示例工作流使用Cron节点，即Trigger节点。您需要保存工作流，然后单击屏幕右上方的“激活”切换以激活工作流。然后将根据Cron节点中的设置触发工作流。
 




 常见问题解答
 [#](#faqs "永久链接")
-----------------------------------


### 
 如何每秒发送超过30条消息？
 [#](#how-can-i-sensed more-than-30-mesages-per second "永久链接")



 Telegram API具有
 [限制](https://core.telegram.org/bots/faq#broadcasting-对用户）
 每秒仅发送30条消息。按照以下步骤发送超过30条消息：
1. 批拆分节点：使用
 [批量拆分]（/integrations/builtin/core nodes/n8n nodes base.splitinbatches/）
 节点最多可获取30个聊天ID from your database.
2. Telegram node: Connect the Telegram node with the Split In Batches node. Use the
 ***Expression Editor***
 to select the Chat IDs from the Split in Batches node.
3. Code node: Connect the
 [Code](/integrations/builtin/core-nodes/n8n-nodes-base.code/) 
 node with the Telegram node. Use the Code node to wait for a few seconds before fetching the next batch of chat IDs. Connect this node with the Split In Batches node.
 



 You can also use this
 [workflow](https://n8n.io/workflows/772) 
 .
 


### 
 How do I add a bot to a Telegram channel?
 [#](#how-do-i-add-a-bot-to-a-telegram-channel "Permanent link")


1. In the Telegram app, access the target channel and tap on the channel name.
2. Make sure that the channel name is labeled as "public channel".
3. Tap on
 ***Administrators***
 and then on
 ***Add Admin***
 .
4. Search for the username of the bot and select it.
5. Tap on the checkmark on the top-right corner to add the bot to the channel.


### 
 How do I get the Chat ID?
 [#](#how-do-i-get-the-chat-id "Permanent link")



 There are two ways to get the Chat ID in Telegram.
 


* Using the
 [Telegram Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.telegramtrigger/) 
 node: On successful execution, the Telegram Trigger node returns a Chat ID. You can use the Telegram Trigger node in your workflow to get a Chat ID.
* Using the
 `@RawDataBot` 
 : The
 `@RawDataBot` 
 returns the raw data of the chat with a Chat ID. Invite the
 `@RawDataBot` 
 to your channel/group, and upon joining, it will output a Chat ID along with other information. Be sure to remove the
 `@RawDataBot` 
 from your group/channel afterwards.




