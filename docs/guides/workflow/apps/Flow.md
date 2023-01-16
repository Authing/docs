


 流
 [#](#flow "永久链接")
===================================



[流量](https://www.getflow.com/) 
 是面向团队的现代任务和项目管理软件。它汇集了任务、项目、时间表和对话，并与许多工具集成。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/flow/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*任务
	+创建新任务
	+更新任务
	+获取任务
	+获取所有任务



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您获取流中的所有任务。您还可以找到
 [工作流](https://n8n.io/workflows/506) 
 在网站上。此示例使用工作流将使用以下两个节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Flow




 最终的工作流应如下图所示。
 



![具有Flow节点的工作流](https://d33wubrfki0l68.cloudfront.net/0ab8738d1f11434af196df95b13dade77a098494/43084/_images/integrations/builtin/app-nodes/flow/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. 流程节点
 [#](#2-flow-node "永久链接")


1. 首先，您必须输入Flow节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/flow/）
 .
2. 从
 *操作*
 下拉列表。
3. 切换
 *全部返回*
 滑块设置为真。
4. 单击
 *执行节点*
 以运行工作流。




