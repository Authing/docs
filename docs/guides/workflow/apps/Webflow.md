


 Web流
 [#](#webflow "永久链接")
=========================================



[网络流](https://webflow.com) 
 是一个应用程序，允许您使用基于浏览器的可视化编辑软件构建响应网站。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/webflow/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*项目
	+创建
	+删除
	+获取
	+全部获取（Get All）
	+更新



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您从Web流创建、更新和获取项目。您还可以找到
 [工作流](https://n8n.io/workflows/1048) 
 此示例使用工作流将使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Webflow




 最终的工作流应如下图所示。
 



![具有Webflow节点的工作流](https://d33wubrfki0l68.cloudfront.net/8ca7eedf4d359da5c28d85f55acfff1c3e5d9109/a2440/_images/integrations/builtin/app-nodes/webflow/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. Webflow节点（创建：项）
 [#](#2网络流-节点-创建-项目 "永久链接")



 此节点将创建类型为的新集合
 `工作组成员`
 在Webflow中。如果要创建具有不同类型的集合，请改用该类型。
 


1. 首先，您必须输入Webflow节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/webflow/）
 .
2. 从
 ***操作***
 下拉列表。
3. 从
 ***站点ID***
 下拉列表。
4. 从
 ***集合ID***
 下拉列表。
5. 单击
 ***添加字段***
 按钮
6. 从
 ***字段ID***
 下拉列表。如果使用不同的集合类型，请选择该集合中存在的字段。
7. 输入
 `n8n`
 在
 ***字段值***
 领域
8. 单击
 ***添加字段***
 按钮。
9. 从
 ***字段ID***
 下拉列表。如果使用不同的集合类型，请选择该集合中存在的字段。
10. 输入
 `n8n`
 在
 ***字段值***
 领域
11. 单击
 ***添加字段***
 按钮
12. 从
 ***字段ID***
 下拉列表。如果使用不同的集合类型，请选择该集合中存在的字段。
13. 输入
 `错误`
 在
 ***字段值***
 领域
14. 单击
 ***添加字段***
 按钮
15. 从
 ***字段ID***
 下拉列表。如果使用不同的集合类型，请选择该集合中存在的字段。
16. 输入
 `错误`
 在
 ***字段值***
 领域
17. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到节点为集合类型创建了一个新项
 `工作组成员`
 在Webflow中。
 



![使用Webflow节点创建新项目](https://d33wubrfki0l68.cloudfront.net/33444cf9077e73203e5475a566b916056698759a/940f2/_images/integrations/builtin/app-nodes/webflow/webflow_node.png)



### 
 3. Webflow1节点（更新：项）
 [#](#3-webflow1-node-update-item "永久链接")



 此节点将更新我们使用上一个节点创建的项。
 


1. 选择在上一个Webflow节点中输入的凭据。
2. 从
 ***操作***
 下拉列表。
3. 从
 ***站点ID***
 下拉列表。
4. 从
 ***集合ID***
 下拉列表。
5. 单击
 ***项目ID***
 字段并单击
 ***添加表达式***
 .
6. 在
 ***变量选择器***
 部分：当前节点>输入数据>JSON>\_id。还可以添加以下表达式：
 `｛｛$json[“_id”]｝｝`
 .
7. 单击
 ***添加属性***
 按钮。
单击
 ***添加字段***
 按钮
8. 从
 ***字段ID***
 下拉列表。如果使用不同的集合类型，请选择该集合中存在的字段。
9. 单击
 ***字段值***
 字段并单击
 ***添加表达式***
 .
10. 在
 ***变量选择器***
 部分：当前节点>输入数据>JSON>名称。还可以添加以下表达式：
 `｛｛$json[“name”]｝｝`
 .
11. 单击
 ***添加字段***
 按钮
12. 从
 ***字段ID***
 下拉列表。如果使用不同的集合类型，请选择该集合中存在的字段。
13. 单击
 ***字段值***
 字段并单击
 ***添加表达式***
 .
14. 在
 ***变量选择器***
 部分：当前节点>输入数据>JSON>slug。还可以添加以下表达式：
 `｛｛$json[“slug”]｝｝`
 .
15. 单击
 ***添加字段***
 按钮
16. 从
 ***字段ID***
 下拉列表。如果使用不同的集合类型，请选择该集合中存在的字段。
17. 单击
 ***字段值***
 字段并单击
 ***添加表达式***
 .
18. 在
 ***变量选择器***
 部分：当前节点>输入数据>JSON>\_archived。还可以添加以下表达式：
 `｛｛$json[“_archived”]｝｝`
 .
19. 单击
 ***添加字段***
 按钮
20. 从
 ***字段ID***
 下拉列表。如果使用不同的集合类型，请选择该集合中存在的字段。
21. 单击
 ***字段值***
 字段并单击
 ***添加表达式***
 .
22. 在
 ***变量选择tor***
 section: Current Node > Input Data > JSON > \_draft. You can also add the following expression:
 `{{$json["_draft"]}}` 
 .
23. Click on the
 ***Add Field***
 button.
24. Select 'Avatar (ImageRef)' from the
 ***Field ID***
 dropdown list. If you're using a different collection type, select the field present in that collection.
25. Enter
 `https://n8n.io/n8n-logo.png` 
 in the
 ***Value***
 field.
26. Click on
 ***Execute Node***
 to run the node.



 In the screenshot below, you will notice that the node updates the item that got created previously.
 



![Using the Webflow node to update an item](https://d33wubrfki0l68.cloudfront.net/7da9183fd287a6de27357b44d8b46078edec054e/9024f/_images/integrations/builtin/app-nodes/webflow/webflow1_node.png)



### 
 4. Webflow2 node (get: item)
 [#](#4-webflow2-node-get-item "Permanent link")



 This node will retrieve the information about the item that we created earlier.
 


1. Select the credentials that you entered in the previous Webflow node.
2. Select your site from the
 ***Site ID***
 dropdown list.
3. Select 'Team Members' from the
 ***Collection ID***
 dropdown list.
4. Click on the gears icon next to the
 ***Item ID***
 field and click on
 ***Add Expression***
 .
5. Select the following in the
 ***Variable Selector***
 section: Current Node > Input Data > JSON > \_id. You can also add the following expression:
 `{{$json["_id"]}}` 
 .
6. Click on
 ***Execute Node***
 to run the node.



 In the screenshot below, you will notice that the node retrieves the information of the item that we created earlier.
 



![Using the Webflow node to retrieve the information of an item](https://d33wubrfki0l68.cloudfront.net/790b0d47111e49f54c4c5140c55fc5e4fe0cd925/43a90/_images/integrations/builtin/app-nodes/webflow/webflow2_node.png)





