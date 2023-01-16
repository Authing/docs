


 Twilio公司公司
 [#](#twilio "永久链接")
=======================================



[推利奥](https://www.twilio.com/) 
 是一家云通信平台即服务公司。Twilio允许软件开发人员使用其web服务API以编程方式拨打和接听电话、发送和接收文本消息以及执行其他通信功能。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credential/twilio/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*短信
	+发送短信/彩信/WhatsApp消息



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您从Twilio号码向指定的电话号码发送SMS或Whatsapp消息。您还可以找到
 [工作流](https://n8n.io/workflows/401) 
 在网站上。此示例使用工作流将使用以下两个节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Twilio




 最终的工作流应如下图所示。
 



![具有Twilio节点的工作流](https://d33wubrfki0l68.cloudfront.net/c029f774961ba049fb1d180b16264b06351064a3/559eb/_images/integrations/builtin/app-nodes/twilio/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. Twilio节点
 [#](#2-twilio-node "永久链接")


1. 首先，您必须输入Twilio节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credential/twilio/）
 .
2. 在
 *发件人*
 领域
3. 在
 *收件人*
 领域
4. 如果您想发送Whatsapp消息，请切换
 *至Whatsapp*
 按钮
5. 在
 *消息*
 领域
6. 单击
 *执行节点*
 以运行工作流。




