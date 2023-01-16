


 自动驾驶仪
 [#](#自动驾驶 "永久链接")
=============================================



[自动驾驶](https://www.autopilothq.com/) 
 是一款视觉营销软件，可让您在整个客户旅程中实现营销的自动化和个性化。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/autopilot/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*联系人
	+创建/更新联系人
	+删除联系人
	+获取联系人
	+获取所有联系人
*联系人行程
	+将联系人添加到列表
*联系人列表
	+将联系人添加到列表。
	+检查联系人是否在列表中。
	+获取列表中的所有联系人。
	+从列表中删除联系人。
*列表
	+创建列表。
	+获取所有列表



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您创建新列表，向该列表中添加新联系人，更新联系人，并使用自动导航节点获取列表中的所有联系人。您还可以找到
 [工作流](https://n8n.io/workflows/990-manage-contacts-via-autopilot/) 
 此示例使用工作流使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 自动驾驶仪




 最终的工作流应如下图所示。
 



![带有自动驾驶仪节点的工作流](https://d33wubrfki0l68.cloudfront.net/aa46a10ca249fd1fea0eb0a983c434605f27a079/0258f/_images/integrations/builtin/app-nodes/autopilot/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下“开始”节点存在。
 


### 
 2. 自动驾驶仪节点（创建：列表）
 [#](#2-autopilot-node-create-list "永久链接")



 此节点将创建一个名为
 `n8n个文档`
 在Autopilot中。
 


1. 首先，您必须输入Autopilot节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/autopilot/）
 .
2. 从
 ***资源***
 下拉列表。
3. 输入
 `n8n个文档`
 在
 ***姓名***
 领域
4. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您会注意到该节点创建了一个新列表，名称为
 `n8n个文档`
 .
 



![使用自动导航节点创建新列表](https://d33wubrfki0l68.cloudfront.net/0612500912545b1c90623492dd38ce957ea2c1b9/f740e/_images/integrations/builtin/app-nodes/autopilot/autopilot_node.png)



### 
 3. Autopilot 1节点（追加启动：联系人）
 [#](#3-autopilot1-node-upsert-contact "永久链接")



 此节点创建一个新联系人，并将其添加到上一节点中创建的列表中。
 


1. 选择在上一个节点中输入的凭据。
2. 在
 ***电子邮件***
 领域
3. 单击
 ***添加字段***
 并从下拉列表中选择“列表ID”。
4. 单击
 ***列表ID***
 字段并单击
 ***添加表达式***
 .
5. 在
 ***变量选择器***
 部分：当前节点>输入数据>JSON>list\_id。还可以添加以下表达式：
 `｛｛$json[“list_id”]｝｝`
 .
6. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您将注意到该节点使用电子邮件地址创建了一个新联系人
 `harshil@n8n.io` 
 并将其添加到列表中
 `n8n个文档`
 在上一个节点中创建。
 



![使用自动导航节点创建新联系人并将其添加到列表中](https://d33wubrfki0l68.cloudfront.net/1fc2645a89ae0fa2ab7553198d1f6a2f70af985b/52632/_images/integrations/builtin/app-nodes/autopilot/autopilot1_node.png)



### 
 4. Autopilot 2节点（更新：联系人）
 [#](#4-autopilot2-node-update-联系 "永久链接")



 此节点更新我们在上一个节点中创建的联系人的信息。
 


1. 选择在上一个节点中输入的凭据。
2. 单击
 ***电子邮件***
 字段并单击
 ***添加表达式***
 .
3. 在
 ***变量选择器***
 部分：节点>自动驾驶1>参数>电子邮件。还可以添加以下表达式：
 `｛｛$node[“Autopilot 1”].prarameter[“email”]｝｝`
 .
4. 单击
 ***添加字段***
 并从下拉列表中选择“公司”。
5. 输入
 `n8n`
 在
 ***公司***
 领域
6. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您会注意到该节点通过添加标记更新了在上一个节点中创建的联系人
 `审阅者`
 这是一个很好的例子。
 



![使用自动导航节点通过添加标签更新联系人](https://d33wubrfki0l68.cloudfront.net/3aa074239eb3a9268b78ed8e5950dbd812cc048a/bb164/_images/integrations/builtin/app-nodes/autopilot/autopilot2_node.png)



### 
 5. Autopilot 3节点（getAll:contact）
 [#](#5-autopilot 3-node-getall-contact "永久链接")



 此节点返回
 `n8n个文档`
 使用Autopilot节点创建的列表。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***资源***
 下拉列表。
3. 从
 ***操作***
 下拉列表。
4. 单击
 ***列表ID***
 字段并单击
 ***添加表达式***
 .
5. 在
 ***变量选择器***
 部分：Nodes>Autopilot>Output Data>JSON>list\_id。还可以添加以下表达式：
 `｛｛$node[“Autopilot”].json[“list_id”]｝｝`
 .
6. 切换
 ***全部返回***
 为真。
7. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到节点返回列表中存在的所有联系人
 `n8n个文档`
 .
 



![使用自动导航节点获取列表中的所有联系人](https://d33wubrfki0l68.cloudfront.net/77a79da034ef5b71e8cfb9ce96ff0d8cae313a94/c54ad/_images/integrations/builtin/app-nodes/autopilot/autopilot3_node.png)





