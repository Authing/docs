


 Rocket.聊天
 [#](#rocketchat "永久链接")
================================================



[火箭.聊天](https://rocket.chat/) 
 是一个免费的开源团队聊天协作平台，允许用户跨设备安全地实时通信。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credential/rocketchat/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*聊天
	+将消息发布到频道或直接消息



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您向Rocket.聊天中的频道发布消息
 [工作流](https://n8n.io/workflows/462) 
 在网站上。此示例使用工作流将使用以下两个节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Rocket.Chat




 最终的工作流应如下图所示。
 



![使用Rocket.Chat节点的工作流](https://d33wubrfki0l68.cloudfront.net/f26f0cf6072fb6b8a03c3932a53d59a517051069/b7738/_images/integrations/builtin/app-nodes/rocketchat/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. Rocket.聊天节点
 [#](#2-火箭聊天-代码 "永久链接")


1. 首先，您必须输入Rocket.Chat节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credential/rocketchat/）
 .
2. 在
 *通道*
 字段。例如
 `#常规`
 .
3. 在
 *文本*
 字段。
4. 单击
 *执行节点*
 以运行工作流。




