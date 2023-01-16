


 时间刻度DB
 [#](#timestardb "永久链接")
=================================================



[时间刻度数据库](https://www.timescale.com/) 
 是一个开源的时间序列SQL数据库，针对快速摄取和复杂查询进行了优化。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/scalendab/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*执行SQL查询
*在数据库中插入行
*更新数据库中的行



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您每分钟接收ISS位置的更新，并使用TimscaleDB节点将其插入表中。您还可以找到
 [工作流](https://n8n.io/workflows/91.7) 
 此示例使用工作流使用以下节点。
 


*[调度触发器]（/integrations/builtin/core nodes/n8n nodes base.schedumetrigger/）
*[HTTP请求]（/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/）
*[Set]（/integrations/builtin/core nodes/n8n nodes base.Set/）
*时间刻度DB



 最终的工作流应如下图所示。
 



![具有TimescaleDB节点的工作流](https://d33wubrfki0l68.cloudfront.net/2237b1ceda7e24aaccef96c11acaff90dcca034f/f4145/_images/integrations/builtin/app-nodes/timescaledb/workflow.png)



### 
 1. Cron节点
 [#](#1-cron-node "永久链接")



 Cron节点将每分钟触发一次工作流。
 


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
 



![使用Cron节点每分钟触发一次工作流](https://d33wubrfki0l68.cloudfront.net/36fd1155cc051ed8fdec0fd38643df556706e428/4945c/_images/integrations/builtin/app-nodes/timescaledb/cron_node.png)



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
 



![使用HTTP请求节点获取有关ISS位置的信息](https://d33wubrfki0l68.cloudfront.net/758ee7b33d898bcdedea4c19f4ffbff01801add0/43e94/_images/integrations/builtin/app-nodes/timescaledb/httprequest_node.png)



### 
 3. 设置节点
 [#](#3-集-节点 "永久链接")



 我们将使用Set节点来确保只有在该节点中设置的数据才能传递给工作流中的下一个节点。
 


1. 单击
 ***添加值***
 并从下拉列表中选择“字符串”。
2. 输入
 `纬度`
 在
 ***姓名***
 字段。
3. 单击
 ***价值***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 部分：当前节点>输入数据>JSON>0>纬度。还可以添加以下表达式：
 `｛｛$json[“0”][“纬度”]｝｝`
 .
5. 单击
 ***添加值***
 并从下拉列表中选择“字符串”。
6. 输入
 `经度`
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
 部分：当前节点>输入数据>JSON>0>经度。还可以添加以下表达式：
 `｛｛$json[“0”][“经度”]｝｝`
 .
9. 单击
 ***添加值***
 并从下拉列表中选择“字符串”。
10. 输入
 `时间戳`
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
 部分：当前节点>输入数据>JSON>0>timestamp。还可以添加以下表达式：
 `｛｛$json[“0”][“timestamp”]｝｝`
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
 



![使用Set节点设置数据](https://d33wubrfki0l68.cloudfront.net/1a8ad6bc56b097e3e447ee4c8eec23f7e9ea1290/d6f9c/_images/integrations/builtin/app-nodes/timescaledb/set_node.png)



### 
 4. TimescaleDB节点（插入）
 [#](#4-时间刻度db-node-insert "永久链接")



 我们将把上一个节点的数据插入到名为
 `iss`
 。若要创建表，请使用以下SQL命令。
 


|  |  |
| --- | --- |
| 

```
1
```

 | 

```
CREATE TABLE iss（纬度NUMERIC、经度NUMERIC和时间戳NUMERIC）；

```

 |






1. 首先，您必须输入TimescaleDB节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/scalendab/）
 .
2. 输入
 `iss`
 在
 ***表***
 字段。
3. 输入
 `纬度、经度、时间戳`
 在
 ***列***
 领域
4. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您将注意到e that the node inserts the data from the previous node to the
 `iss` 
 table in TimescaleDB.
 



![Using the TimescaleDB node to insert the data to a table](https://d33wubrfki0l68.cloudfront.net/90be980c0c88d860d91f595b3f23ecce17c7c8ae/47f8c/_images/integrations/builtin/app-nodes/timescaledb/timescaledb_node.png)





 Activate workflow for production
 



 This example workflow uses the Cron node, which is a Trigger node. You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the Cron node.
 




 FAQs
 [#](#faqs "Permanent link")
-----------------------------------


### 
 How to specify the data type of a column?
 [#](#how-to-specify-the-data-type-of-a-column "Permanent link")



 To specify the data type of a column, append the column name with
 `:type` 
 , where
 `type` 
 is the data type of that column. For example, if you want to specify the type
 `int` 
 for the column
 *id* 
 and type
 `text` 
 for the column
 *name* 
 , you can use the following snippet in the
 ***Columns***
 field:
 `id:init,name:text` 
 .
 




