


 圆圈CI
 [#](#circleci "永久链接")
===========================================



[圆圈CI](https://circleci.com/) 
 是一个持续集成和交付平台，帮助团队更快地发布高质量代码。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/circleci/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*管道
	+获取管道
	+获取所有管道
	+触发管道



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您在圆圈CI中获取管道。您还可以找到
 [工作流](https://n8n.io/workflows/454) 
 在网站上。此示例使用工作流将使用以下两个节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 CircleCI




 最终的工作流应如下图所示。
 



![具有CircleCI节点的工作流](https://d33wubrfki0l68.cloudfront.net/9c9b3985328247e7a145c1de75eb6d785affaac5/25158/_images/integrations/builtin/app-nodes/circleci/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. CircleCI节点
 [#](#2-环节点 "永久链接")


1. 首先，您必须输入CircleCI节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/circleci/）
 .
2. 从
 *提供商*
 领域
3. 在
 *Slug项目*
 领域
4. 在CircleCI中输入要在
 *管道编号*
 领域
5. 单击
 *执行节点*
 以运行工作流。




