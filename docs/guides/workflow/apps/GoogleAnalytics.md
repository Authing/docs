


 谷歌分析
 [#](#谷歌分析 "永久链接")
===========================================================



[谷歌分析](https://analytics.google.com) 
 是谷歌提供的一项网络分析服务，可让您测量广告ROI，并跟踪Flash、视频和社交网站及应用程序。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/google/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*报告
	+返回分析数据
*用户活动
	+返回用户活动数据。



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您使用Goole Analytics节点获取网站的分析指标，并将其存储在Airtable中。您还可以找到
 [工作流](https://n8n.io/workflows/892) 
 此示例使用工作流使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 谷歌分析
 -
 [Set]（/integrations/builtin/core nodes/n8n nodes base.Set/）
 -[Airtable]/集成/内置/app节点/n8n节点base.Airtable/）
 



 最终的工作流应如下图所示。
 



![具有Google Analytics节点的工作流](https://d33wubrfki0l68.cloudfront.net/579752cd98b6e7e56a6fb307075dccc6c654ef9d/e6e0f/_images/integrations/builtin/app-nodes/googleanalytics/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下“开始”节点存在。
 


### 
 2. 谷歌分析节点（get:report）
 [#](#2-google-analysis-node-get-report "永久链接")



 此节点将检索给定日期范围内按国家分组的会话度量。您可以选择不同的维度、度量和日期范围。
 


1. 首先，您必须输入Google Analytics节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/google/）
 .
2. 从
 ***视图ID***
 下拉列表。
3. 单击
 ***添加字段***
 然后选择“尺寸”。
4. 单击
 ***添加维度***
 按钮
5. 从
 ***姓名***
 领域
6. 单击
 ***添加字段***
 并选择“日期范围”。
7. 单击
 ***添加日期范围***
 按钮
8. 在
 ***开始日期***
 领域
9. 在
 ***结束日期***
 领域
10. 单击
 ***添加字段***
 并选择“度量”。
11. 单击
 ***添加指标***
 按钮
12. 输入
 `会话`
 在
 ***别名***
 领域
13. 输入
 `ga:会话`
 在
 ***表达式***
 领域
14. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您会注意到节点返回了按国家分组的会话的信息。
 



![使用Google Analytics节点检索网站分析](https://d33wubrfki0l68.cloudfront.net/38bda4e2e075a8611c642438a542992a9cadbe5a/11425/_images/integrations/builtin/app-nodes/googleanalytics/analytics_node.png)



### 
 3. 设置节点
 [#](#3-集-节点 "永久链接")



 我们将使用Set节点设置国家/地区和指标的值。此数据将传递给工作流中的下一个节点。
 


1. 单击
 ***添加值***
 按钮并从下拉列表中选择“字符串”。
2. 输入
 `国家/地区`
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
 部分：当前节点>输入数据>JSON>国家。还可以添加以下表达式：
 `｛｛$json[“ga:country”]｝｝`
 .
5. 单击
 ***添加值***
 并从下拉列表中选择“数字”。
6. 输入
 `度量值`
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
 部分：当前节点>输入数据>JSON>总计。还可以添加以下表达式：
 `｛｛$json[“到tal”]｝｝`
 .
9. 切换
 ***仅保留集合***
 to
 `真值`
 。我们将此选项设置为true，以确保只有在此节点中设置的数据才能传递到工作流中的下一个节点。
10. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到节点为
 `国家/地区`
 和
 `度量值`
 .
 



![使用Set节点设置数据](https://d33wubrfki0l68.cloudfront.net/69dc248cf54c5a7c88ec8f36280a6fa94dece16d/bd16d/_images/integrations/builtin/app-nodes/googleanalytics/set_node.png)



### 
 4. Airtable节点（追加）
 [#](#4-airtable-node-append "永久链接")



 此节点将把我们在上一个节点中设置的数据附加到表中。创建表格，如
 [此](https://airtable.com/shrFIVzFaXgv7LekV) 
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
 



![使用Airtable节点将数据插入Airtable表](https://d33wubrfki0l68.cloudfront.net/31d48fc91a0b535bca4fdb7444a9833e15f4c8a8/2a286/_images/integrations/builtin/app-nodes/googleanalytics/airtable_node.png)





