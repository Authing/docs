


 GitLab公司公司
 [#](#gitlab "永久链接")
=======================================



[GitLab](https://gitlab.com/) 
 是一个基于web的DevOps生命周期工具，提供Git存储库管理器，提供wiki、问题跟踪和持续集成/持续安装管道功能。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/gitlab/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*问题
	+创建新问题
	+针对问题创建新评论
	+编辑问题
	+获取单个问题的数据
	+锁定问题
*存储库
	+获取单个存储库的数据
	+返回存储库的问题
*释放
	+创建新版本
	+删除新版本
	+获取新版本
	+获取所有版本
	+更新新版本
*用户
	+返回用户的存储库



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您获取GitLab存储库的详细信息。您还可以找到
 [工作流](https://n8n.io/workflows/465) 
 在网站上。此示例使用工作流使用以下两个节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 GitLab




 最终的工作流应如下图所示。
 



![具有GitLab节点的工作流](https://d33wubrfki0l68.cloudfront.net/06558b4422f60435ccc5f55125769526cd4f9fcd/fd02c/_images/integrations/builtin/app-nodes/gitlab/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. GitLab节点
 [#](#2-gitlab-node "永久链接")


1. 首先，您必须输入GitLab节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/gitlab/）
 .
2. 从
 *资源*
 下拉列表。
3. 选择
 *操作*
 领域
4. 在
 *项目业主*
 领域
5. 在
 *项目名称*
 领域
6. 单击
 *执行节点*
 以运行工作流。




