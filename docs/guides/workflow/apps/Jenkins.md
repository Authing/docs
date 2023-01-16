


 詹金斯
 [#](#jenkins "永久链接")
=========================================



[詹金斯](https://www.jenkins.io/) 
 是一个开源自动化服务器，提供数百个插件来支持构建、部署和自动化任何项目。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/jenkins/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*生成
	+列出生成
*实例
	+取消安静状态
	+将詹金斯置于安静模式，无法启动任何构建，Jenkins已准备好关闭
	+在可能的环境中立即重新启动Jenkins
	+一旦没有作业在可能的环境中运行，请重新启动Jenkins
	+在没有作业运行时关闭
	+立即关闭Jenkins
*作业
	+复制特定作业
	+创建新作业
	+触发特定作业
	+触发特定作业



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您获取Jenkins中的构建列表。您还可以找到
 [工作流](https://n8n.io/workflows/454) 
 在网站上。此示例使用工作流将使用以下两个节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Jenkins




 最终的工作流应如下图所示。
 



![具有CircleCI节点的工作流](https://d33wubrfki0l68.cloudfront.net/f10c9555fc2b2cd2d4053bc2555a27f53866a98f/afe10/_images/integrations/builtin/app-nodes/jenkins/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. CircleCI节点
 [#](#2-环节点 "永久链接")


1. 首先，您必须输入Jenkins节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/jenkins/）
 .
2. 选择
 *内部版本*
 从
 *资源*
 字段。
3. *获取所有生成*
 未在中选择
 *运营*
 下拉列表。
4. 调整
 *深度*
 或通过单击添加可选参数
 *添加字段*
 按钮
5. 单击
 *执行节点*
 以运行工作流。




