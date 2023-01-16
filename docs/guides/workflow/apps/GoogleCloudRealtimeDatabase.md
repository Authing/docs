


 谷歌云实时数据库
 [#](#google云实时数据库 "永久链接")
=======================================================================================



[谷歌云实时数据库](https://firebase.google.com/docs/database/) 
 是云托管数据库。数据存储为JSON，并实时同步到每个连接的客户端。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/google/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*将数据写入数据库
*从数据库中删除数据
*从数据库中获取记录
*附加到数据列表
*更新数据库上的项目



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您每分钟接收ISS位置的更新，并使用Google Cloud实时数据库节点将其推送到数据库。您还可以找到
 [工作流](https://n8n.io/workflows/787) 
 此示例使用工作流使用以下节点。
 


*[Cron]（/integrations/builtin/core-nodes/n8n-nodes-base.Cron/）
*[HTTP请求]（/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/）
*[Set]（/integrations/builtin/core nodes/n8n nodes base.Set/）
*谷歌云实时数据库



 最终的工作流应如下图所示。
 



![使用Google Cloud实时数据库节点的工作流](https://d33wubrfki0l68.cloudfront.net/6e672cccb39127d96983ae73fe73d9119da407ae/73e54/_images/integrations/builtin/app-nodes/googlecloudrealtimedatabase/workflow.png)



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
 



![使用Cron节点每分钟触发一次工作流](https://d33wubrfki0l68.cloudfront.net/beb685c28316d33c471f92ff384704e3684deed1/98359/_images/integrations/builtin/app-nodes/googlecloudrealtimedatabase/cron_node.png)



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
 



![使用HTTP请求节点获取有关ISS位置的信息](https://d33wubrfki0l68.cloudfront.net/0b5a341b2d11a1329052223361151d8e30881e3c/25663/_images/integrations/builtin/app-nodes/googlecloudrealtimedatabase/httprequest_node.png)



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
 领域
3. 单击
 ***价值***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 部分：节点>HTTP请求>输出数据>JSON>0>纬度。还可以添加以下表达式：
 `｛｛$node[“HTTP请求”].json[“0”][“纬度”]｝｝`
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
 部分：节点>HTTP请求>输出数据>JSON>0>经度。还可以添加以下表达式：
 `｛｛$node[“HTTP请求”].json[“0”][“经度”]｝｝`
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
 部分：节点>HTTP请求>输出数据>JSON>0>timestamp。还可以添加以下表达式：
 `｛｛$node[“HTTP请求”].json[“0”][“时间戳”]｝｝`
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
 



![使用Set节点设置数据](https://d33wubrfki0l68.cloudfront.net/a30dc541eae06e812069925ee7a4963a7d7912ba/602fa/_images/integrations/builtin/app-nodes/googlecloudrealtimedatabase/set_node.png)



### 
 4. 谷歌云实时数据库节点（推送）
 [#](#4-google-cloud-realtime-database-node-push "永久链接")



 此节点将数据从上一个节点推送到
 `iss`
 Google Cloud实时数据库中的路径。如果创建了具有不同名称的路径，则可以改用该路径。
 


1. 首先，您必须输入credentials for the Google Cloud Realtime Database node. You can find out how to do that
 [here](/integrations/builtin/credentials/google/) 
 .
2. Select a project from the
 ***Project ID***
 dropdown list.
3. Select 'Push' from the
 ***Operation***
 dropdown list.
4. Enter a path in the
 ***Object Path***
 field.
5. Enter
 `latitude, longitude, timestamp` 
 in the
 ***Columns / Attributes***
 field.
6. Click on
 ***Execute Node***
 to run the node.



 In the screenshot below, you will notice that the node pushes the data from the previous node to the
 `iss` 
 path in Google Cloud Realtime Database.
 



![Using the Google Cloud Realtime Database node to push the data to a path](https://d33wubrfki0l68.cloudfront.net/55d270a8db79e078a65aa7cb9671b354f1900cfd/39520/_images/integrations/builtin/app-nodes/googlecloudrealtimedatabase/googlecloudrealtimedatabase_node.png)





 Activate workflow for production
 



 This example workflow uses the Cron node, which is a Trigger node. You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the Cron node.
 





