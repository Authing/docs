


 消息鸟
 [#](#messagebird "永久链接")
=================================================



[消息鸟](https://www.messagebird.com/) 
 是一个将企业与其全球客户连接起来的云通信平台。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/messagebird/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*短信
	+发送短信（SMS）
*余额
	+获取余额



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您使用消息鸟发送短信。您还可以找到
 [工作流](https://n8n.io/workflows/455) 
 在网站上。此示例使用工作流将使用以下两个节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 MessageBird




 最终的工作流应如下图所示。
 



![具有MessageBird节点的工作流](https://d33wubrfki0l68.cloudfront.net/8bd85ed98f341a8f3fb48836dacea142c5efb479/b906a/_images/integrations/builtin/app-nodes/messagebird/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. MessageBird节点
 [#](#2-messagebird-node "永久链接")


1. 首先，您必须输入MessageBird节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/messagebird/）
 .
2. 在
 *发件人*
 领域
3. 在
 *收件人*
 领域
4. 在
 *消息*
 领域
5. 单击
 *执行节点*
 以运行工作流。




