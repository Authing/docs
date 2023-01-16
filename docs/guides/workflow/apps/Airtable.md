


 空气表
 [#](#airtable "永久链接")
===========================================



[空气表](https://airtable.com/) 
 是一个电子表格数据库混合，具有数据库的功能，但应用于电子表格。空气表表中的字段类似于电子表格中的单元格，但具有“复选框”、“电话号码”和“下拉列表”等类型，并且可以引用图像等文件附件。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/airtable/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*将数据附加到表
*从表中删除数据
*列出表中的数据
*从表中读取数据
*更新表中的数据



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您从Airtable中的表插入和更新数据。您还可以找到
 [工作流](https://n8n.io/workflows/818) 
 此示例使用工作流将使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 [Set]（/integrations/builtin/core nodes/n8n nodes base.Set/）
 -
 Airtable




 最终的工作流应如下图所示。
 



![具有Airtable节点的工作流](https://d33wubrfki0l68.cloudfront.net/f1f8bc045e5dbb21d25579989977296c01296122/cf1a4/_images/integrations/builtin/app-nodes/airtable/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. 设置节点
 [#](#2-集-节点 "永久链接")



 我们将使用Set节点为新记录的name和id字段设置值。
 


1. 单击
 ***添加值***
 按钮，然后从下拉列表中选择“数字”。
2. 输入
 `ID `
 在
 ***姓名***
 领域
3. 在
 ***价值***
 字段。
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
 字段。
7. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到节点为
 `ID `
 和
 `名称`
 .
 



![使用Set节点设置Airtable节点要插入的数据](https://d33wubrfki0l68.cloudfront.net/c19ce1b833816020ffa85cf60e34d9c39195d3d0/d7915/_images/integrations/builtin/app-nodes/airtable/set_node.png)



### 
 3. Airtable节点（追加）
 [#](#3-虚拟节点-附加 "永久链接")



 此节点将把我们在上一个节点中设置的数据附加到表中。创建表格，如
 [此](https://airtable.com/shrN2yLZyKEETq1xj) 
 在您的Airtable基地。
 


1. 首先，您必须输入Airtable节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/airtable/）
 .
2. 从
 ***操作***
 下拉列表。
3. 在
 ***基本ID***
 字段。要获取Base ID，请转到
 [API页](https://airtable.com/api) 
 并选择正确的底座。你会在那里找到基地ID。
4. 在
 ***表***
 领域
5. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点附加了我们在上一个节点中设置的数据。
 



![使用Airtable节点将数据插入Airtable表](https://d33wubrfki0l68.cloudfront.net/ec1f1e986092e82b8bb5f4a8238062385663b637/89ddd/_images/integrations/builtin/app-nodes/airtable/airtable_node.png)



### 
 4. Airtable1节点（列表）
 [#](#4-airtable1-node-list "永久链接")



 此节点将列出具有名称的所有记录
 `n8n`
 。如果要列出具有不同名称的记录，请改用该名称。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***操作***
 下拉列表。
3. 单击
 ***基本ID***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 部分：节点>Airtable>参数>应用程序。还可以添加以下表达式：
 `｛｛$node[“Airtable”].parameter[“application”]｝｝`
 .
5. 单击
 ***表***
 字段并单击
 ***添加表达式***
 .
6. 在
 ***变量选择器***
 部分：节点>空气表>参数>表。还可以添加以下表达式：
 `｛｛$node[“Airtable”].parameter[“table”]｝｝`
 .
7. 单击
 ***添加选项***
 并从下拉列表中选择“按公式筛选”。
8. 输入
 `名称='n8n'`
 在
 ***按公式筛选***
 领域
9. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您会注意到节点只返回带有名称的记录
 `n8n`
 .
 



![使用Airtable节点从Airtable表读取数据](https://d33wubrfki0l68.cloudfront.net/0eb9f17654574762b95715e27bdc0b97954d2bdd/32d36/_images/integrations/builtin/app-nodes/airtable/airtable1_node.png)



### 
 5. Set1节点
 [#](#5-集1-节点 "永久链接")



 我们将使用Set节点来确保只有在该节点中设置的数据才能传递给工作流中的下一个节点。我们将设置
 `名称`
 在此节点中。
 


1. 单击
 ***添加值***
 按钮，然后从下拉列表中选择“字符串”。
2. 输入
 `名称`
 在
 ***姓名***
 字段。
3. 输入
 `节点化`
 在
 ***价值***
 领域
4. 切换
 ***仅保留集合***
 到
 `真值`
 。我们将此选项设置为true，以确保只有在此节点中设置的数据才能传递到工作流中的下一个节点。
5. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您会注意到节点设置了
 `名称`
 。此值将传递给工作流中的下一个节点。
 



![使用Set节点将数据设置为inserted by the Airtable node](https://d33wubrfki0l68.cloudfront.net/c19ce1b833816020ffa85cf60e34d9c39195d3d0/d7915/_images/integrations/builtin/app-nodes/airtable/set_node.png)



### 
 6. Airtable2 node (Update)
 [#](#6-airtable2-node-update "Permanent link")



 This node will update the Name field of the record that we received from the previous Airtable node.
 


1. Select the credentials that you entered in the previous Airtable node.
2. Select 'Update' from the
 ***Operation***
 dropdown list.
3. Click on the gears icon next to the
 ***Base ID***
 field and click on
 ***Add Expression***
 .
4. Select the following in the
 ***Variable Selector***
 section: Nodes > Airtable > Parameters > application. You can also add the following expression:
 `{{$node["Airtable"].parameter["application"]}}` 
 .
5. Click on the gears icon next to the
 ***Table***
 field and click on
 ***Add Expression***
 .
6. Select the following in the
 ***Variable Selector***
 section: Nodes > Airtable > Parameters > table. You can also add the following expression:
 `{{$node["Airtable"].parameter["table"]}}` 
 .
7. Click on the gears icon next to the
 ***Id***
 field and click on
 ***Add Expression***
 .
8. Select the following in the
 ***Variable Selector***
 section: Nodes > Airtable1 > Output Data > JSON > id. You can also add the following expression:
 `{{$node["Airtable1"].json["id"]}}` 
 .
9. Click on
 ***Execute Node***
 to run the node.



 In the screenshot below, you will notice that the node updates the Name field.
 



![Using the Airtable node to update data of a record](https://d33wubrfki0l68.cloudfront.net/a3e3a57c7f92680b085ddaa983eadf9ecfacf28d/63833/_images/integrations/builtin/app-nodes/airtable/airtable2_node.png)




 FAQs
 [#](#faqs "Permanent link")
-----------------------------------


### 
 How to get the Record ID?
 [#](#how-to-get-the-record-id "Permanent link")



 To fetch data for a particular record, you need the Record ID. There are two ways to get the Record ID.
 



**Create a Record ID column in Airtable** 




 To create a
 `Record ID` 
 column in your table, refer to this
 [article](https://support.airtable.com/hc/en-us/articles/360051564873-Record-ID) 
 . You can then use this Record ID in your Airtable node.
 



**Use the List operation** 




 To get the Record ID of your record, you can use the
 ***List***
 operation of the Airtable node. This operation will return the Record ID along with the fields. You can then use this Record ID in your Airtable node.
 


### 
 How to filter records when using the List operation?
 [#](#how-to-filter-records-when-using-the-list-operation "Permanent link")



 To filter records from your Airtable base, use the
 ***Filter By Formula***
 option. For example, if you want to return all the users that belong to the organization
 `n8n` 
 , follow the steps mentioned below:
1. Select 'List' from the
 ***Operation***
 dropdown list.
2. Enter the base ID and the table name in the
 ***Base ID***
 and
 ***Table***
 field, respectively.
3. Click on
 ***Add Option***
 and select 'Filter By Formula' from the dropdown list.
4. Enter the following formula in the
 ***Filter By Formula***
 field:
 `{Organization}='n8n'` 
 .
 



 Similarly, if you want to return all the users that do not belong to the organization
 `n8n` 
 , use the following formula:
 `NOT({Organization}='n8n')` 
 .
 



 Refer to the Airtable
 [documentation](https://support.airtable.com/hc/en-us/articles/203255215-Formula-Field-Reference) 
 to learn more about the formulas.
 




