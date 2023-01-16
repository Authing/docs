


 谷歌BigQuery
 [#](#google bigquery "永久链接")
=========================================================



[谷歌BigQuery](https://cloud.google.com/bigquery/) 
 是一个完全管理的无服务器数据仓库，可对PB级数据进行可扩展分析。它是一个平台即服务，支持使用ANSI SQL进行查询。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/google/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------



**记录**



*创建新记录
*检索所有记录



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您每分钟将ISS的位置更新发送到Google BigQuery中的表格。您还可以找到
 [工作流](https://n8n.io/workflows/1049) 
 此示例使用工作流使用以下节点。
 


*[调度触发器]（/integrations/builtin/core nodes/n8n nodes base.schedumetrigger/）
*[HTTP请求]（/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/）
*[Set]（/integrations/builtin/core nodes/n8n nodes base.Set/）
*谷歌BigQuery



 最终的工作流应如下图所示。
 



![使用Google BigQuery节点的工作流](https://d33wubrfki0l68.cloudfront.net/cdd788b250a8c728919330fc80f8f5d714f108ed/34550/_images/integrations/builtin/app-nodes/googlebigquery/workflow.png)



### 
 1. 调度触发器节点
 [#](#1-调度触发器-代码 "永久链接")



 Schedule Trigger节点将每分钟触发一次工作流。
 


1. 单击
 ***添加Cron时间***
 .
2. 从
 ***模式***
 下拉列表。
3. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到Cron节点被配置为每分钟触发一次工作流。
 



![使用Cron节点每分钟触发一次工作流](https://d33wubrfki0l68.cloudfront.net/e3e650e5ff60d19d34db403c2b6034e007743385/a9c2c/_images/integrations/builtin/app-nodes/googlebigquery/cron_node.png)



### 
 2. HTTP请求节点（GET）
 [#](#2-http-request-node-get "永久链接")



 此节点将向API发出GET请求
 `https://api.wheretheiss.at/v1/satellites/25544/positions` 
 以获取国际空间站的位置。此信息将传递到工作流中的下一个节点。
 


1. 输入
 `https://api.wheretheiss.at/v1/satellites/25544/positions` 
 在
 ***网址***
 领域
2. 单击
 ***添加参数***
 中的按钮
 ***查询参数***
 部分
3. 输入
 `时间戳`
 在
 ***姓名***
 领域
4. 单击
 ***价值***
 字段并单击
 ***添加表达式***
 .
5. 输入以下表达式：
 `｛｛Date.now（）｝｝`
 。此表达式将返回当前时间戳。
6. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您将注意到节点向API发出GET请求，并返回有关ISS位置的信息。
 



![使用HTTP请求节点获取有关ISS位置的信息](https://d33wubrfki0l68.cloudfront.net/2b0f6f91b6fccc08516bd90ca25463193787afb6/fdba3/_images/integrations/builtin/app-nodes/googlebigquery/httprequest_node.png)



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
 部分：当前节点>输入数据>JSON>0>名称。还可以添加以下表达式：
 `｛｛$json[“0”][“name”]｝｝`
 .
5. 单击
 ***添加值***
 并从下拉列表中选择“数字”。
6. 输入
 `纬度`
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
 部分：节点>输入数据>JSON>0>纬度。还可以添加以下表达式：
 `｛｛$json[“0”][“纬度”]｝｝`
 .
9. 单击
 ***添加值***
 并从下拉列表中选择“数字”。
10. 输入
 `经度`
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
 部分：节点>输入数据>JSON>0>经度。还可以添加以下表达式：
 `｛｛$json[“0”][“经度”]｝｝`
 .
13. 单击
 ***添加值***
 并从下拉列表中选择“数字”。
14. 输入
 `时间戳`
 在
 ***姓名***
 领域
15. 单击
 ***价值***
 字段并单击
 ***添加表达式***
 .
16. 在
 ***变量选择器***
 部分：节点>输入数据>JSON>0>timestamp。还可以添加以下表达式：
 `｛｛$json[“0”][“timestamp”]｝｝`
 .
17. 切换
 ***仅保留集合***
 到
 `真值`
 。我们将此选项设置为true，以确保只有在此节点中设置的数据才能传递到工作流中的下一个节点。
18. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点使用来自上一个节点的数据，并返回我们为工作流设置的数据。
 



![使用Set节点设置数据](https://d33wubrfki0l68.cloudfront.net/9023e127b399ccbd2d826b9324ae7eb5868d2f1e/1b12b/_images/integrations/builtin/app-nodes/googlebigquery/set_node.png)



### 
 4. Google BigQuery节点（创建：记录）
 [#](#4-google-bigquery-node-create-record "永久链接")



 此节点将数据从上一个节点发送到
 `位置`
 表。如果已创建表 with a different name, use that table instead.
 


1. First of all, you'll have to enter credentials for the Google BigQuery node. You can find out how to do that
 [here](/integrations/builtin/credentials/google/) 
 .
2. Select a project from the
 ***Project ID***
 dropdown list.
3. Select a dataset from the
 ***Dataset ID***
 dropdown list.
4. Select the table from
 `position` 
 from the
 ***Table ID***
 dropdown list. If you created a table with a different name, select that table instead.
5. Enter
 `name, latitude, longitude, timestamp` 
 in the
 ***Columns***
 field.
6. Click on
 ***Execute Node***
 to run the node.



 In the screenshot below, you will notice that the node sends the data from the previous node to the
 `position` 
 table in Google BigQuery.
 



![Using the Google BigQuery node to create new record](https://d33wubrfki0l68.cloudfront.net/0691bb4db2c503178df87c2082bfe597a1b517e2/f80f5/_images/integrations/builtin/app-nodes/googlebigquery/googlebigquery_node.png)





 Activate workflow for production
 



 This example workflow uses the Cron node, which is a Trigger node. You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the Cron node.
 





