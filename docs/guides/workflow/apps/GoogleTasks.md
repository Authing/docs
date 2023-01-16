


 工作表
 [#](#google任务 "永久链接")
===================================================



[谷歌任务](https://tasks.google.com) 
 是谷歌开发的任务管理服务。它跟踪您的日常任务，组织多个列表，并跟踪重要的截止日期。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/google/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*任务
	+将任务添加到任务列表
	+删除任务
	+检索任务
	+从任务列表中检索所有任务
	+更新任务



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您将任务添加到Google任务。您还可以找到
 [工作流](https://n8n.io/workflows/428) 
 在网站上。此示例使用工作流使用以下两个节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 工作表




 最终的工作流应如下图所示。
 



![具有Google任务节点的工作流](https://d33wubrfki0l68.cloudfront.net/a93e361d1966f7632f9dc9c4acfd4a4940616930/5898c/_images/integrations/builtin/app-nodes/googletasks/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. Google任务节点
 [#](#2-google-tasks-node "永久链接")


1. 首先，您必须输入Google任务节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/google/）
 .
2. 选择
 *任务列表*
 从需要添加新任务的用户任务列表的下拉列表中选择。
3. 在
 *标题*
 领域
4. 单击
 *执行节点*
 以运行工作流。




