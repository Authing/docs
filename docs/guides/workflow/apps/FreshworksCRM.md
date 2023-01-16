


 Freshworks CRM
 [#](#freshworks crm "永久链接")
=======================================================



[Freshworks CRM](https://www.freshworks.com/freshsales-crm/) 
 是一种基于云的客户关系管理（CRM）解决方案，可帮助企业管理与现有和潜在客户的交互。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/freshworkscrm/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*帐户
	+创建帐户
	+删除帐户
	+检索帐户
	+检索所有帐户
	+更新帐户
*任命
	+创建约会
	+删除约会
	+检索约会
	+检索所有约会
	+更新约会
*联系人
	+创建联系人
	+删除联系人
	+检索联系人
	+检索所有联系人
	+更新联系人
*交易
	+创建交易
	+删除交易
	+收回交易
	+检索所有交易
	+更新交易
*注释
	+创建注释
	+删除注释
	+更新备注
*销售活动
	+检索销售活动
	+检索所有销售活动
*任务
	+创建任务
	+删除任务
	+检索任务
	+检索所有任务
	+更新任务



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您获取Freshworks CRM中尚未联系的所有联系人。此示例使用工作流将使用以下两个节点：
 


*[Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
*Freshworks CRM



 最终的工作流应如下图所示。
 



![具有Freshworks CRM节点的工作流](https://d33wubrfki0l68.cloudfront.net/801606153d0ff6aeca1899bf165935411be15ab7/e00cd/_images/integrations/builtin/app-nodes/freshworkscrm/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. Freshworks CRM节点
 [#](#2-freshworks-crm-node "永久链接")


1. 首先输入Freshworks CRM节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/freshworkscrm/）
 .
2. 选择
 **联系人**
 来自
 *资源*
 下拉列表。
3. 选择
 **全部获取**
 来自
 *操作*
 下拉列表。
4. 选择
 **从未联系过**
 来自
 *视图*
 下拉列表。
5. 单击
 **执行节点**
 以运行工作流。



![Freshworks CRM节点](https://d33wubrfki0l68.cloudfront.net/3d7d802ebc17c99c6a5fd821488aac623e911633/43a60/_images/integrations/builtin/app-nodes/freshworkscrm/freshworkscrm_node.png)





