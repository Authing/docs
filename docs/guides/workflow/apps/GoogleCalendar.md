


 谷歌日历
 [#](#google日历 "永久链接")
=========================================================



[谷歌日历](https://www.google.com/calendar/) 
 是谷歌开发的时间管理和日程安排日历服务。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/google/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*日历
	+如果日历中有可用的时间段
*事件
	+将事件添加到日历
	+删除事件
	+检索事件
	+从日历中检索所有事件
	+更新事件



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您将事件添加到Google日历。您还可以找到
 [工作流](https://n8n.io/workflows/427) 
 在网站上。此示例使用工作流使用以下两个节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 谷歌日历




 最终的工作流应如下图所示。
 



![具有Google日历节点的工作流](https://d33wubrfki0l68.cloudfront.net/776eec1efc5791e4643e11211122d79265fd5af9/6462c/_images/integrations/builtin/app-nodes/googlecalendar/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. 谷歌日历节点
 [#](#2-谷歌-日历-代码 "永久链接")


1. 首先，您必须输入Google日历节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/google/）
 .
2. 选择
 *日历*
 从用户日历列表的下拉列表中选择。
3. 在
 *开始*
 领域
4. 在
 *完*
 领域
5. 单击
 *执行节点*
 以运行工作流。




