


 Pager任务
 [#](#pagerduty "永久链接")
=============================================



[Pager任务]（页面职责）(https://www.pagerduty.com/) 
 是一家云计算公司，为IT部门提供SaaS事件响应平台。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/pagerduty/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*事件
	+创建事件
	+获取事件
	+获取所有事件
	+更新事件
*事件说明
	+创建事件记录
	+获取所有事件记录
*日志条目
	+获取日志条目
	+获取所有日志条目
*用户
	+获取用户



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您创建、更新和获取PagerDuty上的事件。您还可以找到
 [工作流](https://n8n.io/workflows/411) 
 此示例使用工作流将使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 PagerDuty




 最终的工作流应如下图所示。
 



![具有PagerDuty节点的工作流](https://d33wubrfki0l68.cloudfront.net/068ccc64497e1aa3038dda8d827e5b28b25fd699/80741/_images/integrations/builtin/app-nodes/pagerduty/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. PagerDuty节点（创建：偶发事件）
 [#](#2-第二页-任务-节点-创建事件 "永久链接")


1. 首先，您必须输入PagerDuty节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/pagerduty/）
 .
2. 在
 ***标题***
 领域
3. 选择
 ***服务ID***
 从下拉列表中选择。
4. 在
 ***电子邮件***
 领域
5. 单击
 ***执行节点***
 以运行节点。



![使用PagerDuty节点创建事件](https://d33wubrfki0l68.cloudfront.net/85ff6e8c9092fd9015aa0b6a7d108cece6f61f1f/8cb6c/_images/integrations/builtin/app-nodes/pagerduty/pagerduty_node.png)



### 
 3. PagerDuty1节点（更新：偶发事件）
 [#](#3-pagerduty1-node-update-evention "永久链接")


1. 选择在上一个节点中输入的凭据。
2. 从
 ***操作***
 下拉列表。
3. 单击
 ***事件ID***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 部分：Nodes>PagerDuty>Output Data>JSON>id。您还可以添加以下表达式：
 `｛｛$node[“PagerDuty”].json[“id”]｝｝`
 .
5. 单击
 ***电子邮件***
 字段并单击
 ***添加表达式***
 .
6. 在
 ***变量选择器***
 部分：节点>PagerDuty>参数>电子邮件。还可以添加以下表达式：
 `｛｛$node[“PagerDuty”].prarameter[“email”]｝｝`
 .
7. 单击
 ***添加字段***
 按钮并单击
 ***标题***
 .
8. 在
 ***标题***
 领域
9. 单击
 ***执行节点***
 以运行节点。



![使用PagerDuty节点更新事件](https://d33wubrfki0l68.cloudfront.net/eddf65ce0ec142d46311967de2a3fcddc927e0c8/35723/_images/integrations/builtin/app-nodes/pagerduty/pagerduty1_node.png)



### 
 4. PagerDuty2节点（get:incident）
 [#](#4-pagerduty2-node-get-incident "永久链接")


1. 选择在上一个节点中输入的凭据。
2. 从
 ***操作***
 下拉列表。
3. 单击
 ***事件ID***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 部分：Nodes>PagerDuty>Output Data>JSON>id。您还可以添加以下表达式：
 `｛｛$node[“PagerDuty”].json[“id”]｝｝`
 .
5. 单击
 ***执行节点***
 以运行节点。



![使用PagerDuty节点获取事件](https://d33wubrfki0l68.cloudfront.net/582935cb4fde9f51a424c9d8974a706f354791db/ef4b0/_images/integrations/builtin/app-nodes/pagerduty/pagerduty2_node.png)





