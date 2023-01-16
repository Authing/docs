


 Phan到mbuster公司公司
 [#](#phantombuster "永久链接")
=====================================================



[Phantombuster](https://www.phantombuster.com/) 
 是一个刮取平台，允许在网络上进行链操作和数据提取，以产生业务线索、营销受众和整体增长。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/vantombuster/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*代理人
	+按ID删除代理。
	+通过ID获取代理。
	+获取当前用户组织的所有代理。
	+获取代理的最新容器的输出。
	+将代理添加到启动队列。



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您在Airtable中存储幻象的输出。您还可以找到
 [工作流](https://n8n.io/workflows/882) 
 此示例使用工作流使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Phantombuster
 -
 [Set]（/integrations/builtin/core nodes/n8n nodes base.Set/）
 -
 [Airtable]（/integrations/builtin/app nodes/n8n nodes-base.Airtable/）




 最终的工作流应如下图所示。
 



![具有Phantombuster节点的工作流](https://d33wubrfki0l68.cloudfront.net/82580c880f89424410cce9e0177555a2f180daaf/a6256/_images/integrations/builtin/app-nodes/phantombuster/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. Phantombuster节点（getOutput:agent）
 [#](#2-phantombuster-node-getoutt-agent "永久链接")



 创建并启动
 [LinkedIn个人资料抓取器](https://phantombuster.com/automations/linkedin/3112/linkedin-profile-scraper) 
 在你的Phantombuster账户中。此节点将返回此幻象的输出。
 


1. 首先，您必须输入Phantombuster节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/vantombuster/）
 .
2. 从
 ***操作***
 下拉列表。
3. 从
 ***代理人***
 下拉列表。
4. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您将注意到该节点返回LinkedIn Profile Scraper幻象的输出。
 



![使用Phantombuster节点获取幻象的输出](https://d33wubrfki0l68.cloudfront.net/4e997b04804614ef3416d84645dc7afec37cb7da/2e7d0/_images/integrations/builtin/app-nodes/phantombuster/phantombuster_node.png)



### 
 3. 设置节点
 [#](#3-集-节点 "永久链接")



 我们将使用Set节点来确保只有在该节点中设置的数据才能传递给工作流中的下一个节点。
 


1. 单击
 ***添加值***
 并从下拉列表中选择“字符串”。
2. 输入
 `名称`
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
 部分：节点>Phantombuster>输出数据>JSON>常规>全名。还可以添加以下表达式：
 `｛｛$node[“Phantombuster”].json[“general”][“fullName”]｝｝`
 .
5. 单击
 ***添加值***
 并从下拉列表中选择“字符串”。
6. 输入
 `电子邮件`
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
 部分：节点>Phantombuster>输出数据>JSON>详细信息>邮件。还可以添加以下表达式：
 `｛｛$node[“Phantombuster”].json[“details”][“mail”]｝｝`
 .
9. 单击
 ***添加值***
 并从下拉列表中选择“字符串”。
10. 输入
 `公司`
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
 部分：节点>Phantombuster>输出数据>JSON>作业>[Item:0]>companyName。还可以添加以下表达式：
 `｛｛$node[“Phantombuster”].json[“jobs”][0][“companyName”]｝｝`
 .
13. 切换
 ***仅保留集合***
 to
 `真值`
 。我们将此选项设置为true，以确保只有在此节点中设置的数据才能传递到工作流中的下一个节点。
14. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点使用来自上一个节点的数据，并返回我们为工作流设置的数据。
 



![使用Set节点设置数据](https://d33wubrfki0l68.cloudfront.net/a943d6712fc724add4c1d122ef1915883b412ef2/ee304/_images/integrations/builtin/app-nodes/phantombuster/set_node.png)




 4. Airtable节点（追加）
 [#](#4-airtable-node-append "永久链接")
--------------------------------------------------------------------------



 此节点将把我们在上一个节点中设置的数据附加到表中。创建表格，如
 [此](https://airtable.com/shr6hP774ijrXFput) 
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
 



![使用Airtable节点将数据插入Airtable表](https://d33wubrfki0l68.cloudfront.net/0db45818646db140f32155032e89eea36cfe9ca6/97e11/_images/integrations/builtin/app-nodes/phantombuster/airtable_node.png)





