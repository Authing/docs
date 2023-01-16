


 Sentry.io公司公司
 [#](#sentryio "永久链接")
============================================



[哨兵.io](https://sentry.io) 
 是一种帮助您实时监控和修复崩溃的服务。Sentry的平台帮助每个开发人员诊断、修复和优化代码的性能。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credential/sentryio/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*事件
	+按ID获取事件
	+获取所有事件
*问题
	+删除问题
	+按ID获取问题
	+获取所有问题
	+更新问题
*项目
	+创建新项目
	+删除项目
	+按ID获取项目
	+获取所有项目
	+更新项目
*释放
	+创建版本
	+删除发布
	+按版本标识符获取版本
	+获取所有版本
	+更新版本
*组织
	+创建组织
	+通过slug获得组织
	+获取所有组织
	+更新组织
*团队
	+创建新团队
	+删除团队
	+各取所需
	+获取所有团队
	+更新团队



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您创建版本并使用Sentry.io节点获取所有版本。您还可以找到
 [工作流](https://n8n.io/workflows/643) 
 此示例使用工作流将使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Sentry.io




 最终的工作流应如下图所示。
 



![带有Sentry.io节点的工作流](https://d33wubrfki0l68.cloudfront.net/beb626696360a19a4b96e2b364acd932a39380f0/ff3c7/_images/integrations/builtin/app-nodes/sentryio/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. Sentry.io节点（创建：发布）
 [#](#2-条目io-node-create-release "永久链接")


1. 首先，您必须输入Sentry.io节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credential/sentryio/）
 .
2. 从
 ***资源***
 下拉列表。
3. 从
 ***操作***
 下拉列表。
4. 从
 ***组织Slug***
 下拉列表。
5. 在
 ***版本***
 领域
6. 在
 ***网址***
 领域
7. 从中选择项目
 ***项目***
 下拉列表。
8. 单击
 ***执行节点***
 以运行节点。



![使用Sentry.io节点创建版本](https://d33wubrfki0l68.cloudfront.net/4c152956477d6b40ad7c9ba267bedf72a65221d7/f0e93/_images/integrations/builtin/app-nodes/sentryio/sentry.io_node.png)



### 
 2. Sentry.io节点（getAll:release）
 [#](#2-入口-节点-安装-释放 "永久链接")


1. 选择在上一个Sentry.io节点中输入的凭据。
2. 从
 ***资源***
 下拉列表。
3. 从
 ***操作***
 下拉列表。
4. 从
 ***组织Slug***
 下拉列表。
5. 切换
 ***全部返回***
 为真。
6. 单击
 ***执行节点***
 以运行节点。



![使用Sentry.io节点获取所有版本](https://d33wubrfki0l68.cloudfront.net/a064be78bb33327fde4be7fec50cabe0fc5157dd/bc1c2/_images/integrations/builtin/app-nodes/sentryio/sentry.io1_node.png)





