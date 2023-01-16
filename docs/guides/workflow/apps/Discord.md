


 不一致
 [#](#discharge "永久链接")
=========================================



[不和](https://discord.com/) 
 是一个面向团体的语音、视频和文本通信平台。不一致允许用户使用webhook以编程方式发送消息。
 




 资格证书
 



 Discord节点不需要身份验证，但您必须访问频道的设置才能使用webhook。您可以了解如何在Discord中创建webhook
 [此处]（/integrations/builtin/credential/discharge/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*在Discord频道中发送消息



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您使用webhook向Discord频道发送消息。您还可以找到
 [工作流](https://n8n.io/workflows/410) 
 在本网站上。此示例使用工作流将使用以下两个节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Discord




 最终的工作流应如下图所示。
 



![具有Discord节点的工作流](https://d33wubrfki0l68.cloudfront.net/a035405f114437afe14f2cdd41948580e8b68fbc/fc680/_images/integrations/builtin/app-nodes/discord/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. 不协调节点
 [#](#2节点 "永久链接")


1. 首先，您必须为Discord节点创建一个webhook。你可以知道怎么做
 [此处]（/integrations/builtin/credential/discharge/）
 .
2. 将webhook粘贴到
 **Webhook URL**
 领域
3. 在
 **文本**
 领域
4. 单击
 **执行节点**
 以运行工作流。



![使用Discord节点向Discord频道发送消息](https://d33wubrfki0l68.cloudfront.net/47caa55867fe50a1f416b33f4d8c54dbdb5c3066/1b404/_images/integrations/builtin/app-nodes/discord/discord_node.png)





