


 信号14
 [#](#sign14 "永久链接")
=======================================



[信号4](https://www.signl4.com/) 
 是由Derdack提供的即插即用云解决方案。一旦发生重大事件，它会自动在移动设备上通知团队。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/signl4/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*警报
	+发送警报
	+解决警报



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您在信号14上发送警报。您还可以找到
 [工作流](https://n8n.io/workflows/441) 
 在网站上。此示例使用工作流将使用以下两个节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 SIGNL4




 最终的工作流应如下图所示。
 



![具有SIGNL4节点的工作流](https://d33wubrfki0l68.cloudfront.net/dced445f08895f1a42a44b9e1ee1f14ba2a252c3/94278/_images/integrations/builtin/app-nodes/signl4/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. SIGNL4节点
 [#](#2-signl4-节点 "永久链接")


1. 首先，您必须输入SIGNL4节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/signl4/）
 .
2. 在
 *消息*
 领域
3. 单击
 *添加字段*
 按钮并选择“标题”。
4. 在
 *标题*
 领域
5. 单击
 *执行节点*
 以运行工作流。




