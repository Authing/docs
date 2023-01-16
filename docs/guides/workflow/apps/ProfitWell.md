


 ProfitWell公司公司
 [#](#profitwell "永久链接")
===============================================



[ProfitWell](https://www.profitwell.com/) 
 提供实时订阅财务指标。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credential/profitwell/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*公司
	+获取您公司的ProfitWell帐户设置
*公制
	+检索当前月或上一个月按天细分的财务指标



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您每月向Mattermost频道发送财务指标。您还可以找到
 [工作流](https://n8n.io/workflows/798) 
 此示例使用工作流使用以下节点。
-
 [Cron]（/integrations/builtin/core-nodes/n8n-nodes-base.Cron/）
 -
 ProfitWell
 -
 [Matermost]（/integrations/builtin/app nodes/n8n nodes-base.Mattermost/）




 最终的工作流应如下图所示。
 



![具有ProfitWell节点的工作流](https://d3.3wubrfki0l68.cloudfront.net/fa4.f2.5.4fc84937a73844594f680b3a9cf3f709ba/1.da72/_images/integrations/builtin/app-nodes/profitwell/workflow.png)



### 
 1. Cron节点
 [#](#1-cron-node "永久链接")



 Cron节点将在每个月的第一天上午9点触发工作流。
 


1. 单击
 ***添加Cron时间***
 .
2. 从
 ***模式***
 下拉列表。
3. 将小时数设置为
 ***小时***
 领域
4. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到Cron节点被配置为在每个月的第一天上午9点触发工作流。
 



![使用Cron节点每月触发工作流](https://d33wubrfki0l68.cloudfront.net/7e8938a0ea898d9d4790f0a027695e25e9e2835c/54a06/_images/integrations/builtin/app-nodes/profitwell/cron_node.png)



### 
 2. ProfitWell节点（获取：metric）
 [#](#2-配置文件-节点-度量 "永久链接")



 此节点将返回月度财务指标。
 


1. 首先，您必须输入ProfitWell节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credential/profitwell/）
 .
2. 从
 ***类型***
 下拉列表。
3. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点每月返回财务指标。
 



![使用ProfitWell节点获取月度财务指标](https://d33wubrfki0l68.cloudfront.net/0eb5b8994afd4263020742177aacdc944fb1f65a/7d65b/_images/integrations/builtin/app-nodes/profitwell/profitwell_node.png)



### 
 3. 最底层节点（post:message）
 [#](#3-mattermost-node-post-message "永久链接")



 此节点将发送一条消息，其中包含我们从Mattermost的“每月指标”频道中的上一个节点获得的指标。如果您有不同的频道，请改用该频道。
 


1. 首先，您必须输入Mattermost节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credential/mattermost/）
 .
2. 从
 ***通道ID***
 下拉列表。
3. 单击
 ***消息***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***表达式***
 字段：
 


|  |  |
| --- | --- |
| 

```
1
2
3
4
5
```

 | 

```
活动客户：｛{$node[“ProfitWell”].json[“Active_Customers”]}｝
跟踪客户：｛{$node[“ProfitWell”].json[“active_trialing_Customers”]}｝
新客户：｛{$node[“ProfitWell”].json[“New_Customers”]}｝
增长率：｛{$node[“ProfitWell”].json[“Growth_Rate”]}｝
经常性收入：｛｛$node[“ProfitWell”].json[“Recurring_Revenue”]}｝

```

 |
5. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点发送了一条消息，其中包含我们从上一个节点获得的度量。
 



![使用Mattermost节点发送带有度量的消息](https://d33wubrfki0l68.cloudfront.net/7b055d2d73f04dde88c5883154796b18e4383830/8700e/_images/integrations/builtin/app-nodes/profitwell/mattermost_node.png)





 激活生产工作流
 



 此示例工作流使用Cron节点，即Trigger节点。您需要保存工作流，然后单击屏幕右上方的“激活”切换以激活工作流。然后将根据Cron节点中的设置触发工作流。
 





