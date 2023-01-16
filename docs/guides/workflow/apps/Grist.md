


 格里斯特（Grist）
 [#](#grist "永久链接")
=====================================



[格里斯特](https://getgrist.com/) 
 结合了电子表格的灵活性和数据库的健壮性，以您的方式组织数据。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/grist/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*在表中创建行
*从表中删除行
*从表中读取行
*更新表中的行



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您从Grist中的表插入和更新数据。您还可以找到
 [工作流](https://n8n.io/workflows/818) 
 此示例使用工作流使用以下节点：
 


*[Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
*格里斯特（Grist）



 最终工作流应如下所示：
 



![具有Grist节点的工作流](https://d33wubrfki0l68.cloudfront.net/28203a43be4477330c9e5181d2f3ebedf7f87952/0d0aa/_images/integrations/builtin/app-nodes/grist/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. 栅格节点（创建）
 [#](#2-grist-node-create "永久链接")



 此工作流假定Grist工作区中有一个带有表的文档。
 



![Grist文件示例中的表格](https://d33wubrfki0l68.cloudfront.net/5f7530ce0b18ce949ba2d9663d20bde6b96aa146/95b7b/_images/integrations/builtin/app-nodes/grist/table_start.png)




 此节点将在表中创建新记录。
 


1. 首先输入Grist节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/grist/）
 .
2. 从
 ***操作***
 下拉列表。
3. 在
 ***文档ID***
 领域
4. 在
 ***表ID***
 领域
5. 低于
 ***要发送的字段***
 单击
 **添加字段**
 按钮两次。
6. 对于第一个字段，选择
 **姓名**
 来自
 ***字段ID***
 下拉列表，并在
 ***字段值***
 .
7. 对于第二个字段，选择
 `链接`
 来自
 ***字段ID***
 下拉列表，并在
 ***字段值***
 .
8. 单击
 **执行节点**
 以运行节点。



 下面是一个配置外观示例：
 



![使用Grist节点将数据插入Grist表](https://d33wubrfki0l68.cloudfront.net/8f4ca42ceb930386cb532ce6511d239b92443aa6/062c9/_images/integrations/builtin/app-nodes/grist/grist_node.png)




 下面是将记录添加到Grist表的结果：
 



![使用Grist节点创建新记录后的示例表](https://d33wubrfki0l68.cloudfront.net/5dcc4bf71c152db19b2a8d63820ca2258679d215/eeed1/_images/integrations/builtin/app-nodes/grist/table_create.png)



### 
 3. Grist1节点（全部获取）
 [#](#3-grist1-node-get-all "永久链接")



 此节点将列出具有特定
 `名称`
 价值
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***操作***
 下拉列表。
3. 单击
 ***文档ID***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 部分：
 **节点**
 >
 **格栅**
 >
 **参数**
 >
 **文档ID**
 .
5. 单击
 ***表***
 字段并单击
 ***添加表达式***
 .
6. 在
 ***变量选择器***
 部分：
 **节点**
 >
 **格栅**
 >
 **参数**
 >
 **表Id**
 .
7. 单击
 ***添加选项***
 并从下拉列表中选择“过滤器”。
8. 单击
 ***添加筛选器***
 按钮
9. 选择
 `名称`
 来自
 **列**
 下拉列表。
10. 在
 ***价值观***
 领域
11. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，节点只返回了名为“Grist”的记录：
 



![使用Grist节点从Grist表读取数据](https://d33wubrfki0l68.cloudfront.net/aee0fef200c1c7efb3082257a3c7ceeda70abc5f/0f49f/_images/integrations/builtin/app-nodes/grist/grist1_node.png)



### 
 4. Grist2节点（更新）
 [#](#4-grist2-node-update "永久链接")



 此节点将更新从上一个Grist节点接收的记录的名称字段。
 


1. 选择
 ***格栅1***
 节点，然后单击“复制节点”。现在，您不需要再次指定凭据、文档ID和表ID。
2. 双击新复制的节点（Grist2）进行编辑。
3. 从
 ***操作***
 下拉列表。
4. 单击
 ***行ID***
 字段并单击
 ***添加表达式***
 .
5. 在
 ***变量选择器***
 部分：
 **节点**
 >
 **格栅1**
 >
 **输出数据**
 >
 **JSON**
 >
 **id**
 .
6. 低于
 ***要发送的字段***
 单击
 ***添加字段***
 按钮
7. 选择
 `名称`
 来自
 ***字段ID***
 下拉列表，并在
 ***字段值***
 .
8. 单击
 ***执行节点***
 以运行节点。



 下面是一个配置外观示例：
 



![使用Grist节点更新记录的数据](https://d33wubrfki0l68.cloudfront.net/1c8829d25179ad1f08b44581524e408f1667df97/cd042/_images/integrations/builtin/app-nodes/grist/grist2_node.png)




 结果是第一条记录中的名称从“Grist”变为“Grist Labs”：
 



![使用Grist节点更新记录后的示例表](https://d33wubrfki0l68.cloudfront.net/22fbcd3789de55afa8639a615d310f96d15952ac/89b1a/_images/integrations/builtin/app-nodes/grist/table_update.png)




 常见问题解答
 [#](#faqs "永久链接")
-----------------------------------


### 
 如何获取行ID？
 [#](#如何获取行id "永久链接")



 更新or delete a particular record, you need the Row ID. There are two ways to get the Row ID.
 



**Create a Row ID column in Grist** 




 Create a new column in your Grist table with the formula
 `$id` 
 .
 



**Use the Get All operation** 




 The
 ***Get All***
 operation returns the Row ID of each record along with the fields.
 



 You can obtain it with the expression
 `{{$node["GristNodeName"].json["id"]}}` 
 .
 


### 
 How to filter records when using the Get All operation?
 [#](#how-to-filter-records-when-using-the-get-all-operation "Permanent link")


* Click on
 ***Add Option***
 and select 'Filter' from the dropdown list.
* You can add filters for any number of columns. The result will only include records which match all the columns.
* For each column, you can enter any number of values separated by commas. The result will include records which match any of the values for that column.




