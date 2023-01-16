


 Oura公司公司
 [#](#oura "永久链接")
===================================



[乌拉](https://www.ouraring.com/) 
 是一款健康戒指和应用程序，可帮助您跟踪活动和睡眠。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credential/oura/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*个人资料
	+获取用户的个人信息。
*摘要
	+获取用户的活动摘要。
	+获取用户的准备情况摘要。
	+获取用户的睡眠摘要



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您从Oura获取活动摘要并将输出存储在Airtable中。您还可以找到
 [工作流](https://n8n.io/workflows/882) 
 此示例使用工作流使用以下节点。
-
 [Cron]（/integrations/builtin/core-nodes/n8n-nodes-base.Cron/）
 -
 Oura
 -
 [Set]（/integrations/builtin/core nodes/n8n nodes base.Set/）
 -
 [Airtable]（/integrations/builtin/app nodes/n8n nodes-base.Airtable/）




 最终的工作流应如下图所示。
 



![具有Oura节点的工作流](https://d33wubrfki0l68.cloudfront.net/7deec5770431649f6b75adc943a6356a9f2724e0/016a9/_images/integrations/builtin/app-nodes/oura/workflow.png)



### 
 1. Cron节点
 [#](#1-cron-node "永久链接")



 Cron节点将在每个周日上午9点触发工作流。
 


1. 单击
 ***添加Cron时间***
 .
2. 从
 ***模式***
 下拉列表。
3. 输入
 `9` 
 在
 ***小时***
 领域
4. 从
 ***工作日***
 下拉列表。
5. 单击
 ***执行节点***
 以运行节点。



![使用Cron节点每周触发一次工作流](https://d33wubrfki0l68.cloudfront.net/f46de64e90588cc399540c57f736c12e3659307b/c3025/_images/integrations/builtin/app-nodes/oura/cron_node.png)



### 
 2. Oura节点（getActivity:summary）
 [#](#2-oura-node-getactivity-summary "永久链接")



 此节点将返回一周的活动摘要。
 


1. 首先，您必须输入Oura节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credential/oura/）
 .
2. 从
 ***操作***
 下拉列表。
3. 切换
 ***全部返回***
 到
 `真值`
 .
4. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到节点返回活动摘要。
 



![使用Oura节点获取活动摘要](https://d33wubrfki0l68.cloudfront.net/aed7c4da74b03eab669a6b4b2a3740d448b46168/8aa27/_images/integrations/builtin/app-nodes/oura/oura_node.png)



### 
 3. 设置节点
 [#](#3-集-节点 "永久链接")



 我们将使用Set节点来确保只有在该节点中设置的数据才能传递给工作流中的下一个节点。
 


1. 单击
 ***添加值***
 并从下拉列表中选择“字符串”。
2. 输入
 `日期`
 在
 ***姓名***
 领域
3. 单击
 ***价值***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 部分：当前节点>输入数据>JSON>summary\date。还可以添加以下表达式：
 `｛｛$json[“summary_date”]｝｝`
 .
5. 单击
 ***添加值***
 并从下拉列表中选择“字符串”。
6. 输入
 `步骤`
 在
 ***姓名***
 领域
7. 单击
 ***价值***
 字段并单击
 ***添加表达式***
 .
8. 在
 ***变量选择器***
 部分：当前节点>输入数据>JSON>步骤。还可以添加以下表达式：
 `｛｛$json[“步骤”]｝｝`
 .
9. 单击
 ***添加值***
 并从下拉列表中选择“字符串”。
10. 输入
 `活动分数`
 在
 ***姓名***
 领域
11. 单击
 ***价值***
 字段并单击
 ***添加表达式***
 .
12. 在
 ***变量选择器***
 部分：当前节点>输入数据>JSON>分数。还可以添加以下表达式：
 `｛｛$json[“分数”]｝｝`
 .
13. 切换
 ***仅保留集合***
 到
 `真值`
 。我们将此选项设置为true，以确保只有在此节点中设置的数据才能传递到工作流中的下一个节点。
14. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点使用来自上一个节点的数据，并返回我们为工作流设置的数据。
 



![使用Set节点设置数据](https://d33wubrfki0l68.cloudfront.net/495d1fca8934902d6caea20ada3031cd3bddf391/dc9e1/_images/integrations/builtin/app-nodes/oura/set_node.png)




 4. Airtable节点（追加）
 [#](#4-airtable-node-append "永久链接")
--------------------------------------------------------------------------



 此节点将把我们在上一个节点中设置的数据附加到表中。创建表格，如
 [此](https://airtable.com/shrUqFItKPlSpgrht) 
 在您的Airtable基地。
 


1. 首先，您必须输入Airtable节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/airtable/）
 .
2. 从
 ***操作***
 下拉列表。
3. 在
 ***基本ID***
 领域要获取Base ID，请转到
 [API页](https://airtable.com/api) 
 并选择正确的底座。你会在那里找到基地ID。
4. 在
 ***表***
 领域
5. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点附加了我们在上一个节点中设置的数据。
 



![使用Airtable节点将数据插入Airtable表](https://d33wubrfki0l68.cloudfront.net/597ee516a06a5e6b876c52f99fc7bac20f127e04/f8ac0/_images/integrations/builtin/app-nodes/oura/airtable_node.png)





 激活生产工作流
 



 此示例工作流使用s the Cron node, which is a Trigger node. You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the Cron node.
 





