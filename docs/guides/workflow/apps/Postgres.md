


 Postgres公司
 [#](#postgres "永久链接")
===========================================



[PostgreSQL](https://www.postgresql.org/) 
 ，也称为Postgres，是一个自由开源的关系数据库管理系统，强调可扩展性和SQL遵从性。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/postgres/）
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



 此工作流允许您在Postgres实例上运行SQL查询。您还可以找到
 [工作流](https://n8n.io/workflows/599) 
 此示例使用工作流将使用以下节点。
 


*[Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
*[Set]（/integrations/builtin/core nodes/n8n nodes base.Set/）
*Postgres公司



 最终的工作流应如下图所示。
 



![带有Postgres节点的工作流](https://d3.3wubrfki0l6.8.cloudfront.net/4482.60b67.5f494f86dd5977387960c1.f3d652292/3c162/_images/integrations/builtin/app-nodes/postgres/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. Postgres节点（执行查询）
 [#](#2-postgres-node-execute-query "永久链接")


1. 输入Postgres节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/postgres/）
 .
2. 选择
 **执行查询**
 来自
 **操作**
 下拉列表。
3. 在
 **查询**
 字段：
 `CREATE TABLE测试（id INT，名称VARCHAR（255），PRIMARY KEY（id））；`
 .
4. 单击
 **节点**
 选项卡和切换
 **始终输出数据**
 为真。
5. 单击
 **执行节点**
 以运行节点。



![使用Postgres节点创建表](https://d33wubrfki0l68.cloudfront.net/71acf9a6030f716bdd7327cef5d62014e593d276/9661e/_images/integrations/builtin/app-nodes/postgres/postgres_node.png)



### 
 3. 设置节点
 [#](#3-集-节点 "永久链接")


1. 单击
 **增加价值**
 按钮并选择
 **编号**
 从下拉列表中选择。
2. 输入
 `id `
 在
 **姓名**
 字段。
3. 单击
 **增加价值**
 按钮并选择
 **字符串**
 从下拉列表中选择。
4. 输入
 `名称`
 在
 **姓名**
 领域
5. 在
 **值**
 领域
6. 单击
 **执行节点**
 以运行节点。



![使用Set节点设置Postgres节点要插入的数据](https://d33wubrfki0l68.cloudfront.net/9e942610a4340fdc62e4b51c537b546b5d8b4dd2/466fe/_images/integrations/builtin/app-nodes/postgres/set_node.png)



### 
 4. Postgres1节点（插入）
 [#](#4-postgres1-node-insert "永久链接")


1. 选择在上一个Postgres节点中输入的凭据。
2. 输入
 `测试`
 在
 **表**
 字段。
3. 输入
 `id，名称`
 在
 **列**
 领域
4. 单击
 **执行节点**
 以运行节点。



![使用Postgres节点将数据插入表](https://d33wubrfki0l68.cloudfront.net/f0214048ad016719df74f3b01555b58f36ade70d/9cb40/_images/integrations/builtin/app-nodes/postgres/postgres1_node.png)




 指定列的数据类型
 [#](#specify-the-data-type-of-a-column "永久链接")
---------------------------------------------------------------------------------------------



 要指定列的数据类型，请使用
 `：类型`
 哪里
 `类型`
 是该列的数据类型。例如，如果要指定类型
 `整数`
 对于柱
 *编号*
 和类型
 `文本`
 对于柱
 *姓名*
 ，可以在
 **列**
 字段：
 `id:init，name:text`
 .
 



 使用查询参数
 [#](#使用查询参数 "永久链接")
-------------------------------------------------------------------



 创建要在Postgres数据库上运行的查询时，可以使用
 **查询参数**
 中的字段
 **其他字段**
 部分将数据加载到查询中。n8n清理查询参数中的数据，从而防止SQL注入。
 



 例如，您希望通过电子邮件地址查找某人。给定以下输入数据：
 





|  |  |
| --- | --- |
| 

```
 1
 2
 3
 4
 5
 6
 7
 8
 9
10
11
12
```

 | 

```
{
 {
 “电子邮件”：“alex@example.com",
 “name”：“Alex”，
 “年龄”：21
 },
 {
 “电子邮件”：“jamie@example.com",
 “name”：“Jamie”，
 “年龄”：33岁
 }
}

```

 |




 您可以编写如下查询：
 





|  |  |
| --- | --- |
| 

```
1
```

 | 

```
SELECT \*FROM用户WHERE电子邮件=$1；

```

 |




 然后在
 **查询参数**
 ，将值映射到
 `电子邮件`
 通过拖放
 **电子邮件**
 从
 **输入**
 查看
 **查询参数**
 :
 



![查询参数和输入数据字段的屏幕截图](https://d33wubrfki0l68.cloudfront.net/c56fb7abb8ada37569272f63884da6544816a942/b58fa/_images/integrations/builtin/app-nodes/postgres/use-query-parameters.png)





