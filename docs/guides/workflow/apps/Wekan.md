


 韦坎
 [#](#wekan "永久链接")
=====================================



[韦坎](https://wekan.github.io/) 
 是一个开源看板，允许基于卡片的任务和待办事项管理。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/wekan/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*董事会
	+创建新板
	+删除板
	+获取板的数据
	+获取所有用户板
*卡片
	+创建新卡
	+删除卡
	+获取一张卡片
	+获取所有卡
	+更新卡
*卡片注释
	+在卡片上创建评论
	+从卡片中删除评论
	+获取卡片评论
	+获取所有卡片评论
*检查表
	+创建新检查表
	+删除检查表
	+获取检查表的数据
	+返回卡的所有检查表
*检查表项目
	+删除检查表项目
	+获取清单项目
	+更新检查表项目
*列表
	+创建新列表
	+删除列表
	+获取列表的数据
	+获取所有董事会列表



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您创建一个板和两个名为
 `待办事项`
 和
 `完成`
 使用韦坎节点。它还允许您创建卡并更新卡的列表ID，使您能够将其从
 `待办事项`
 列表到
 `完成`
 列表您还可以找到
 [工作流](https://n8n.io/workflows/728) 
 此示例使用工作流使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Wekan




 最终的工作流应如下图所示。
 



![具有Wekan节点的工作流](https://d33wubrfki0l68.cloudfront.net/e3f6cd361cf688953147a3f6404e49d0a110658a/c3557/_images/integrations/builtin/app-nodes/wekan/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. Wekan节点（创建：板）
 [#](#2查找节点-创建板 "永久链接")



 此节点将创建一个名为
 `文档`
 在Wekan。要创建具有不同名称的板，您可以输入板的名称。
 


1. 首先，您必须输入Wekan节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/wekan/）
 .
2. 从
 ***资源***
 下拉列表。
3. 输入
 `文档`
 在
 ***标题***
 领域
4. 从
 ***所有者***
 下拉列表。
5. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点创建了一个带有标题的新板
 `文档`
 .
 



![使用Wekan节点创建板](https://d33wubrfki0l68.cloudfront.net/2bdc844953e3df736436a14205d78d4d4b45d552/2a5f2/_images/integrations/builtin/app-nodes/wekan/wekan_node.png)



### 
 3. Wekan1节点（创建：列表）
 [#](#3-ekan1-node-create-list "永久链接")



 此节点将创建具有标题的列表
 `待办事项`
 在
 `文档`
 使用上一个节点创建的板。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***资源***
 下拉列表。
3. 单击
 ***板ID***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 部分：节点>Wekan>输出数据>JSON>\_id。还可以添加以下表达式：
 `｛｛$node[“Wekan”].json[“_id”]｝｝`
 .
5. 输入
 `待办事项`
 在
 ***标题***
 领域
6. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点创建了一个名为
 `待办事项`
 在
 `文档`
 板
 



![使用Wekan节点创建标题为“待办事项”的列表](https://d33wubrfki0l68.cloudfront.net/77af16758dbc0b50ca545de47084a2f37ce011a8/e0d9a/_images/integrations/builtin/app-nodes/wekan/wekan1_node.png)



### 
 4. Wekan2节点（创建：列表）
 [#](#4-rekan2-node-create-list "永久链接")



 此节点将创建具有标题的列表
 `完成`
 在
 `文档`
 使用Wekan节点创建的板。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***资源***
 下拉列表。
3. 单击
 ***板ID***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 部分：节点>Wekan>输出数据>JSON>\_id。还可以添加以下表达式：
 `｛｛$node[“Wekan”].json[“_id”]｝｝`
 .
5. 输入
 `完成`
 在
 ***标题***
 领域
6. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点创建了一个名为
 `完成`
 在
 `文档`
 板
 



![使用Wekan节点创建标题为“完成”的列表](https://d33wubrfki0l68.cloudfront.net/33c5f76bc3cf3039e6a5645b42cdff9fd1b8e4e6/b1bb7/_images/integrations/builtin/app-nodes/wekan/wekan2_node.png)



### 
 5. Wekan3节点（创建：卡）
 [#](#5-wekan3-node-create-card "永久链接")



 此节点将在
 `文档`
 标题为
 `待办事项`
 ，它是使用Wekan1节点创建的。
 


1. 选择在上一个节点中输入的凭据。
2. 单击
 ***板ID***
 字段并单击
 ***添加表达式***
 .
3. 在
 ***变量选择器***
 部分：节点>Wekan>输出数据>JSON>\_id。还可以添加以下表达式：
 `｛｛$node[“Wekan”].json[“_id”]｝｝`
 .
4. 单击
 ***列表ID***
 字段并单击
 ***添加表达式***
 .
5. 在
 ***变量选择器***
 部分：节点>Wekan1>输出数据>JSON>\_id。还可以添加以下表达式：
 `｛｛$节点["Wekan1"].json["_id"]}}` 
 .
6. Enter
 `Document Wekan node` 
 in the
 ***Title***
 field.
7. Select 'Default' from the
 ***Swimlane ID***
 dropdown list.
8. Select an author from the
 ***Author ID***
 dropdown list.
9. Click on
 ***Execute Node***
 to run the node.



 In the screenshot below, you will notice that the node creates a new card with the title
 `Document Wekan node` 
 in the
 `To Do` 
 list of the
 `Documentation` 
 board.
 



![Using the Wekan node to create a card in the To Do list](https://d33wubrfki0l68.cloudfront.net/30df321f0087ecf6a63348b32b58337e1c847575/c2624/_images/integrations/builtin/app-nodes/wekan/wekan3_node.png)



### 
 6. Wekan4 node (update: card)
 [#](#6-wekan4-node-update-card "Permanent link")



 This node will update the list ID of the card created by the previous node and move it from the
 `To Do` 
 list to the
 `Done` 
 list.
 


1. Select the credentials that you entered in the previous node.
2. Select 'Update' from the
 ***Operation***
 dropdown list.
3. Click on the gears icon next to the
 ***Board ID***
 field and click on
 ***Add Expression***
 .
4. Select the following in the
 ***Variable Selector***
 section: Nodes > Wekan > Output Data > JSON > \_id. You can also add the following expression:
 `{{$node["Wekan"].json["_id"]}}` 
 .
5. Click on the gears icon next to the
 ***List ID***
 field and click on
 ***Add Expression***
 .
6. Select the following in the
 ***Variable Selector***
 section: Nodes > Wekan1 > Output Data > JSON > \_id. You can also add the following expression:
 `{{$node["Wekan1"].json["_id"]}}` 
 .
7. Click on the gears icon next to the
 ***Card ID***
 field and click on
 ***Add Expression***
 .
8. Select the following in the
 ***Variable Selector***
 section: Nodes > Wekan3 > Output Data > JSON > \_id. You can also add the following expression:
 `{{$node["Wekan3"].json["_id"]}}` 
 .
9. Click on the
 ***Add Field***
 button and select 'List ID'.
10. Click on the gears icon next to the
 ***List ID***
 field and click on
 ***Add Expression***
 .
11. Select the following in the
 ***Variable Selector***
 section: Nodes > Wekan2 > Output Data > JSON > \_id. You can also add the following expression:
 `{{$node["Wekan2"].json["_id"]}}` 
 .
12. Click on
 ***Execute Node***
 to run the node.



 In the screenshot below, you will notice that the node updates the list id of the card that we created in the previous node and moves it from the
 `To Do` 
 list to the
 `Done` 
 list.
 



![Using the Wekan node to update the card](https://d33wubrfki0l68.cloudfront.net/12f6feb966eab62e0c612c6656afb3959467f9a2/cb658/_images/integrations/builtin/app-nodes/wekan/wekan4_node.png)




 FAQs
 [#](#faqs "Permanent link")
-----------------------------------


### 
 How to load all the parameters for the node?
 [#](#how-to-load-all-the-parameters-for-the-node "Permanent link")



 To load all the parameters, for example, Author ID, you need to give admin permissions to the user. Refer to the
 [Wekan documentation](https://github.com/wekan/wekan/wiki/Features#members-click-member-initials-or-avatar--permissions-adminnormalcomment-only) 
 to learn how to change permissions.
 




