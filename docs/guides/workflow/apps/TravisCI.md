


 特拉维斯CI
 [#](#travis ci "永久链接")
=============================================



[特拉维斯CI](https://travis-ci.com) 
 是一个托管的持续集成服务，用于构建和测试托管在GitHub和Bitbucket上的软件项目。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credential/travisci/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*生成
	+取消生成
	+获取生成
	+获取所有生成
	+重新启动生成
	+触发生成



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您使用特拉维斯CI节点触发生成。您还可以找到
 [工作流](https://n8n.io/workflows/658) 
 此示例使用工作流将使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Travis CI




 最终的工作流应如下图所示。
 



![具有Travis CI节点的工作流](https://d33wubrfki0l68.cloudfront.net/ba70c48ab61a3a2a277a1fc3331e4ae00dcf0ec4/040e2/_images/integrations/builtin/app-nodes/travisci/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. Travis CI节点（触发器：构建）
 [#](#2-travis-ci-node-trigger-build "永久链接")


1. 首先，您必须输入Travis CI节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credential/travisci/）
 .
2. 从
 ***操作***
 下拉列表。
3. 在
 ***液塞***
 中的字段
 `所有者名称/存储库名称`
 总体安排
4. 在
 ***分支机构***
 领域
5. 单击
 ***执行节点***
 以运行节点。



![使用Travis CI节点触发生成](https://d33wubrfki0l68.cloudfront.net/833a7496e6ce2e6fc71337ce7b73c4f3332da904/54610/_images/integrations/builtin/app-nodes/travisci/travisci_node.png)





