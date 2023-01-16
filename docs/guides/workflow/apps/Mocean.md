


 莫钦语
 [#](#mocean "永久链接")
=======================================



[墨琴](https://www.moceanapi.com/) 
 使发送和接收SMS变得容易。它还具有语音API，允许您进行出站和入站呼叫。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/mocean/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*短信
	+发送短信/语音信息
*语音
	+发送短信/语音信息



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您使用Moean节点发送SMS。您还可以找到
 [工作流](https://n8n.io/workflows/667) 
 此示例使用工作流将使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 莫钦语




 最终的工作流应如下图所示。
 



![具有Moean节点的工作流](https://d33wubrfki0l68.cloudfront.net/a96b6bac156c4585bc109df155791c00516ae401/c6181/_images/integrations/builtin/app-nodes/mocean/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. Moean节点
 [#](#2-mocean-node "永久链接")


1. 首先，您必须输入Moean节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/mocean/）
 .
2. 在
 ***发件人***
 领域
3. 在
 ***收件人***
 领域
4. 在
 ***消息***
 领域
5. 单击
 ***执行节点***
 以运行节点。



![使用Moean节点发送SMS](https://d33wubrfki0l68.cloudfront.net/33a64b8409fb8d83515b6e8cf28508c5042dc8fb/0316d/_images/integrations/builtin/app-nodes/mocean/mocean_node.png)





