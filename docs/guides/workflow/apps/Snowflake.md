


 雪花
 [#](#雪花 "永久链接")
=============================================



[雪花](https://snowflake.com) 
 是一个云数据平台，提供为云设计的数据仓库即服务。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credential/snowflake/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*执行SQL查询。
*在数据库中插入行。
*更新数据库中的行。



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您在雪花中创建表、插入和更新表中的数据。您还可以找到
 [工作流](https://n8n.io/workflows/824) 
 此示例使用工作流将使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 [Set]（/integrations/builtin/core nodes/n8n nodes base.Set/）
 -
 Snowflake




 最终的工作流应如下图所示。
 



![具有Snowflake节点的工作流](https://d33wubrfki0l68.cloudfront.net/a95ed830e4acd4c1cf7b8e15acf55cf3f4a954e6/357b7/_images/integrations/builtin/app-nodes/snowflake/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. 雪花节点（执行查询）
 [#](#2-snowflake-node-execute-query "永久链接")



 此节点将创建一个名为
 `文档`
 具有
 `id `
 和
 `名称`
 柱。
 


1. 首先，您必须输入Snowflake节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credential/snowflake/）
 .
2. 从
 ***操作***
 下拉列表。
3. 在
 ***查询***
 字段：
 `CREATE TABLE文档（id INT，name STRING）；`
 .
4. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到节点创建了一个名为
 `文档`
 在Snowflake。
 



![使用Snowflake节点创建表](https://d33wubrfki0l68.cloudfront.net/3f1fdc87e03b1c7ab69493f4263eb80de297752c/86946/_images/integrations/builtin/app-nodes/snowflake/snowflake_node.png)



### 
 3. 设置节点
 [#](#3-集-节点 "永久链接")



 我们将使用Set节点为新记录的id和name列设置值。
 


1. 单击
 ***添加值***
 按钮，然后从下拉列表中选择“数字”。
2. 输入
 `id `
 在
 ***姓名***
 领域
3. 在
 ***价值***
 领域
4. 单击
 ***添加值***
 按钮，然后从下拉列表中选择“字符串”。
5. 输入
 `名称`
 在
 ***姓名***
 领域
6. 在
 ***价值***
 领域
7. 切换
 ***仅保留集合***
 到
 `真值`
 。我们将此选项设置为true，以确保只有在此节点中设置的数据才能传递到工作流中的下一个节点。
8. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到节点为
 `id `
 和
 `名称`
 .
 



![使用Set节点设置要由Snowflake节点插入的数据](https://d33wubrfki0l68.cloudfront.net/a6a6b579e2070ff61c5d0f3ed98aaefdee346069/61868/_images/integrations/builtin/app-nodes/snowflake/set_node.png)



### 
 4. 雪花1节点（插入）
 [#](#4-nowflake1-node-insert "永久链接")



 此节点将在上一个节点中设置的数据插入
 `文档`
 Snowflake的桌子。
 


1. 选择在上一个Snowflake节点中输入的凭据。
2. 输入
 `文档`
 在
 ***表***
 领域
3. 输入
 `id，名称`
 在
 ***列***
 领域
4. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您会注意到节点将数据插入到我们使用Snowflake节点创建的表中。
 



![使用Snowflake节点将数据插入表](https://d33wubrfki0l68.cloudfront.net/298e046fce8265b785d993d8e856ea4e0c09e657/85e2b/_images/integrations/builtin/app-nodes/snowflake/snowflake1_node.png)



### 
 5. Set1节点
 [#](#5-集1-节点 "永久链接")



 我们将使用Set节点来确保只有在该节点中设置的数据才能传递给工作流中的下一个节点。我们将设置
 `名称`
 在此节点中。
 


1. 单击
 ***添加值***
 按钮，然后从下拉列表中选择“数字”。
2. 输入
 `id `
 在
 ***姓名***
 领域
3. 输入
 `1` 
 在
 ***价值***
 领域
4. 单击
 ***添加值***
 按钮，然后从下拉列表中选择“字符串”。
5. 输入
 `名称`
 在
 ***姓名***
 领域
6. 输入
 `节点化`
 在
 ***价值***
 领域
7. 切换
 ***仅保留集合***
 到
 `真值`
 。我们将此选项设置为true，以确保只有在此节点中设置的数据才能传递到工作流中的下一个节点。
8. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您会注意到节点设置了
 `名称`
 。此值将传递给工作流中的下一个节点。
 



![使用Set节点设置要由Snowflake节点更新的数据](https://d33wubrfki0l68.cloudfront.net/9caa86dfe1739bd745f7c3569a1903eed9cac343/085c9/_images/integrations/builtin/app-nodes/snowflake/set1_node.png)



### 
 6. 雪花2节点（更新）
 [#](#6-雪花2-node-update "永久链接")



 此节点将更新
 `名称`
 id的列
 `1` 
 .
 


1. 选择在上一个Snowflake节点中输入的凭据。
2. 从
 ***操作***
 下拉列表。
3. 单击
 ***表***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 部分：节点>雪花1>参数>表。还可以添加以下表达式：
 `｛｛$node[“Snowflake1”].prarameter[“table”]｝｝`
 .
5. 输入
 `名称`
 在
 ***Columns***
 field.
6. Click on
 ***Execute Node***
 to run the node.



 In the screenshot below, you will notice that the node updates the value of the name field for the record with id
 `1` 
 .
 



![Using the Snowflake node to update data](https://d33wubrfki0l68.cloudfront.net/33a8928974811faf516f91a6d5e5522d5835b6e1/7a8f9/_images/integrations/builtin/app-nodes/snowflake/snowflake2_node.png)





