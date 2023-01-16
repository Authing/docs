


 快速底座
 [#](#快速基础 "永久链接")
===============================================



[快速基础](https://www.quickbase.com/) 
 是一个低代码应用程序开发平台。它允许您连接数据，实时集成系统，并使用简单的业务逻辑协调自动化工作流。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credential/quickbase/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*字段
	+获取所有字段
*文件
	+删除文件
	+下载文件
*记录
	+创建记录
	+删除记录
	+获取所有记录
	+更新记录
	+更新记录
*报告
	+获取报告
	+运行报告



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您在快速底座中创建、更新和获取所有记录。您还可以找到
 [工作流](https://n8n.io/workflows/805) 
 此示例使用工作流将使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 [Set]（/integrations/builtin/core nodes/n8n nodes base.Set/）
 -
 Quick Base




 最终的工作流应如下图所示。
 



![具有Quick Base节点的工作流](https://d33wubrfki0l68.cloudfront.net/5df7a985352fc49aec8ca25782104c0bfcd4bd2b/981dc/_images/integrations/builtin/app-nodes/quickbase/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. 设置节点
 [#](#2-集-节点 "永久链接")



 我们将使用Set节点设置新记录的名称和年龄。
 


1. 单击
 ***添加值***
 并从下拉列表中选择“字符串”。
2. 输入
 `名称`
 在
 ***姓名***
 字段。
3. 输入
 `n8n`
 在
 ***价值***
 字段。
4. 单击
 ***添加值***
 并从下拉列表中选择“数字”。
5. 输入
 `年龄`
 在
 ***姓名***
 领域
6. 将值设置为
 `8` 
 .
7. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您会注意到node设置了name和age的值。
 



![使用Set节点设置数据](https://d33wubrfki0l68.cloudfront.net/90123fb86828b2792d100aa90b6e9dd33e64f585/d61de/_images/integrations/builtin/app-nodes/quickbase/set_node.png)



### 
 3. Quick Base节点（创建：记录）
 [#](#3-quick-base-node-create-record "永久链接")



 此节点将在表中创建新记录。
 


#### 
 创建快速基准表
 [#](#creating-a-quick-base-table "永久链接")


1. 使用字段创建新表
 `名称`
 和
 `年龄`
 .
2. 复制位于
 `数据库/`
 和
 `?a=td`
 在Quick Base URL中。此字符串是我们将在Quick Base节点中使用的表ID。


#### 
 配置Quick Base节点
 [#](#配置快速基本节点 "永久链接")


1. 首先，您必须输入Quick Base节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credential/quickbase/）
 .
2. 在
 ***表ID***
 领域
3. 输入
 `姓名，年龄`
 在
 ***列***
 领域
4. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点使用上一个节点的信息在Quick Base中创建了一个新记录。
 



![使用Quick Base节点创建条目](https://d33wubrfki0l68.cloudfront.net/f272ff26d459170b4d71ef1b676998bfa2347a34/ba27e/_images/integrations/builtin/app-nodes/quickbase/quickbase_node.png)



### 
 4. Set1节点
 [#](#4-set1-node "永久链接")



 我们将使用Set节点来确保只有在该节点中设置的数据才能传递给工作流中的下一个节点。我们将设置
 `年龄`
 和
 `记录ID#`
 在此节点中。
 


1. 单击
 ***添加值***
 并从下拉列表中选择“数字”。
2. 输入
 `年龄`
 在
 ***姓名***
 领域
3. 将值设置为
 `10` 
 .
4. 单击
 ***添加值***
 并从下拉列表中选择“数字”。
5. 输入
 `记录ID#`
 在
 ***姓名***
 领域
6. 单击
 ***价值***
 字段并单击
 ***添加表达式***
 .
7. 在
 ***变量选择器***
 部分：节点>快速基础>输出数据>JSON>记录ID#。还可以添加以下表达式：
 `｛｛$node[“Quick Base”].json[“Record ID#”]｝｝`
 .
8. 切换
 ***仅保留集合***
 到
 `真值`
 。我们将此选项设置为true，以确保只有在此节点中设置的数据才能传递到工作流中的下一个节点。
9. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您会注意到节点设置了
 `年龄`
 和
 `记录ID#`
 。此值将传递给工作流中的下一个节点。
 



![使用“设置”节点设置年龄和记录ID#的值](https://d33wubrfki0l68.cloudfront.net/e9554801a209818223074ac8e71bf56be3b0ebf3/9d6ae/_images/integrations/builtin/app-nodes/quickbase/set1_node.png)



### 
 5. Quick Base1节点（更新：记录）
 [#](#5-quick-base1-node-update-record "永久链接")



 此节点将使用我们在上一节点中设置的新值更新年龄字段。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***操作***
 下拉列表。
3. 单击
 ***表ID***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 部分：节点>快速基础>参数>tableId。还可以添加以下表达式：
 `｛｛$node[“Quick Base”].parameter[“tableId”]｝｝`
 .
5. 输入
 `年龄`
 在
 ***列***
 字段。如果要更新其他列，请改为输入该列名称。
6. 输入
 `记录ID#`
 在
 ***更新密钥***
 领域
7. 单击
 ***执行Node***
 to run the node.



 In the screenshot below, you will notice that the node updates the age field with the new value that we set in the previous node.
 



![Using the Quick Base node to update an entry](https://d33wubrfki0l68.cloudfront.net/bce73b0854809edfa7ffe23b9ea48d80fde6ee5a/88596/_images/integrations/builtin/app-nodes/quickbase/quickbase1_node.png)



### 
 6. Quick Base2 node (getAll: record)
 [#](#6-quick-base2-node-getall-record "Permanent link")



 This node returns all the records from Quick Base.
 


1. Select the credentials that you entered in the previous node.
2. Select 'Get All' from the
 ***Operation***
 dropdown list.
3. Click on the gears icon next to the
 ***Table ID***
 field and click on
 ***Add Expression***
 .
4. Select the following in the
 ***Variable Selector***
 section: Nodes > Quick Base > Parameters > tableId. You can also add the following expression:
 `{{$node["Quick Base"].parameter["tableId"]}}` 
 .
5. Click on
 ***Execute Node***
 to run the node.



 In the screenshot below, you will notice that the node returns all the records from Quick Base.
 



![Using the Quick Base node to get all the records](https://d33wubrfki0l68.cloudfront.net/9c0c96e6dd5aa6c5ecd9de70a1755295bd53a6e1/77921/_images/integrations/builtin/app-nodes/quickbase/quickbase2_node.png)





