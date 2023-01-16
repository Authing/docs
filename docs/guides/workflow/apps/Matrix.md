


 矩阵
 [#](#矩阵 "永久链接")
=======================================



[矩阵](https://matrix.org) 
 是一个开放的标准，用于通过IP进行互操作、分散、实时通信。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credential/matrix/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*帐户
	+获取当前用户的帐户信息
*事件
	+按ID获取单个事件
*媒体
	+将媒体发送到聊天室
*消息
	+向会议室发送消息
	+从文件室获取所有邮件
*房间
	+具有已定义设置的新聊天室
	+邀请用户加入会议室
	+加入新聊天室
	+将用户踢出房间
	+离开一个房间
*会议室成员
	+获取所有成员



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您创建文件室，邀请来自其他文件室的成员，并向我们使用“矩阵”节点创建的文件室发送消息。您还可以找到
 [工作流](https://n8n.io/workflows/724) 
 此示例使用工作流使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 矩阵
 -
 [IF]（/integrations/builtin/core nodes/n8n nodes base.IF/）
 -
 [无操作，不执行任何操作]（/integrations/builtin/core-nodes/n8n-nodes-base.noop/）




 最终的工作流应如下图所示。
 



![具有矩阵节点的工作流](https://d33wubrfki0l68.cloudfront.net/2d0d3cf1539a05b60cc7c7aef8fda51267f1b58b/9a11a/_images/integrations/builtin/app-nodes/matrix/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下“开始”节点存在。
 


### 
 2. 矩阵节点（创建：房间）
 [#](#2-matrix-node-create-room "永久链接")



 此节点将创建一个名为
 `n8n`
 在Matrix服务器上。
 


1. 首先，您必须输入Matrix节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credential/matrix/）
 .
2. 从
 ***资源***
 下拉列表。
3. 输入
 `n8n`
 在
 ***会议室名称***
 领域也可以为房间输入其他名称。
4. 在
 ***房间别名***
 字段。
5. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您会注意到节点创建了一个房间
 `n8n`
 使用别名
 `#讨论n8n:matrix.org
 .
 



![使用矩阵节点创建房间](https://d33wubrfki0l68.cloudfront.net/586633a1f72d0993ca00d5cf2b1d022dc07a1779/6fd8b/_images/integrations/builtin/app-nodes/matrix/matrix_node.png)



### 
 3. Matrix1节点（me:account）
 [#](#3-matrix1-node-m-account "永久链接")



 此节点将从Matrix服务器获取您的帐户信息。我们这样做是因为Matrix将向会议室的所有成员发送邀请，包括您。由于您已经是会议室的成员，因此会出现错误。稍后我们将使用此节点的数据，以确保您不会向自己发送邀请。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***资源***
 下拉列表。
3. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到节点返回您的用户ID。
 



![使用矩阵节点获取您的帐户信息](https://d33wubrfki0l68.cloudfront.net/bf595f7ae98709a542ea8decfa22d36ea67b07c0/6d06e/_images/integrations/builtin/app-nodes/matrix/matrix1_node.png)



### 
 3. Matrix2节点（getAll:roomMember）
 [#](#3-matrix2-node-getall-roommember "永久链接")



 此节点将返回房间中所有成员的信息。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***资源***
 下拉列表。
3. 从
 ***房间ID***
 下拉列表。我们稍后将在工作流中邀请此会议室的成员。
4. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您会注意到节点返回了我们指定的房间中所有成员的信息。此节点的输出将传递给工作流中的下一个节点。
 



![使用矩阵节点获取房间中成员的信息](https://d33wubrfki0l68.cloudfront.net/ca965a28955fe2cdbc53dc8e543c7d02556a67b1/70fd9/_images/integrations/builtin/app-nodes/matrix/matrix2_node.png)



### 
 4. IF节点
 [#](#4-if-node "永久链接")



 此节点将比较您的用户ID与其他成员的用户ID。如果用户ID不相等，则输出为真。
 


1. 单击
 ***添加条件***
 并选择“字符串”。
2. 单击
 ***值1***
 字段并单击
 ***添加表达式***
 .
3. 在
 ***变量选择器***
 部分：节点>矩阵1>输出数据>JSON>用户\_id。还可以添加以下表达式：
 `｛｛$node[“Matrix1”].json[“user_id”]｝｝`
 .
4. 从
 ***操作***
 下拉列表。
5. 单击
 ***值2***
 字段并单击
 ***添加表达式***
 .
6. 在
 ***变量选择器***
 部分：节点>矩阵2>输出数据>JSON>用户\_id。还可以添加以下表达式：
 `｛｛$node[“Matrix2”].json[“user_id”]｝｝`
 .
7. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点返回了除您自己之外的所有房间成员的信息。
 



![使用IF节点将您的用户id与房间中成员的用户id进行比较](https://d33wubrfki0l68.cloudfront.net/1d8e97ebb4d8b11475cb783693597af569b78bd1/81bb9/_images/integrations/builtin/app-nodes/matrix/if_node.png)



### 
 4. Matrix3节点（邀请：房间）
 [#](#4-matrix3-node-invite-room "永久链接")



 此节点将 send an invitation to the members returned by the previous node to join the room that we created using the Matrix node.
 


1. Connect the node to the 'true' output of the IF node
2. Select the credentials that you entered in the previous node.
3. Select 'Room' from the
 ***Resource***
 dropdown list.
4. Select 'Invite' from the
 ***Operation***
 dropdown list.
5. Click on the gears icon next to the
 ***Room ID***
 field and click on
 ***Add Expression***
 .
6. Select the following in the
 ***Variable Selector***
 section: Nodes > Matrix > Output Data > JSON > room\_id. You can also add the following expression:
 `{{$node["Matrix"].json["room_id"]}}` 
 .
7. Click on the gears icon next to the
 ***User ID***
 field and click on
 ***Add Expression***
 .
8. Select the following in the
 ***Variable Selector***
 section: Nodes > IF > Output Data > JSON > user\_id. You can also add the following expression:
 `{{$node["IF"].json["user_id"]}}` 
 .
9. Click on
 ***Execute Node***
 to run the node.



 In the screenshot below, you will notice that the node sends an invite to join the
 `n8n` 
 room to the members of the other room.
 



![Using the Matrix node to send an invite to join the room](https://d33wubrfki0l68.cloudfront.net/918f645cb8619aa38dfe196a63b9eb3de1de3c96/de1dd/_images/integrations/builtin/app-nodes/matrix/matrix3_node.png)



### 
 5. Matrix4 node (create: message)
 [#](#5-matrix4-node-create-message "Permanent link")



 This node will send a message to the new room that we created using the Matrix node.
 


1. Select the credentials that you entered in the previous node.
2. Click on the gears icon next to the
 ***Room ID***
 field and click on
 ***Add Expression***
 .
3. Select the following in the
 ***Variable Selector***
 section: Nodes > Matrix > Output Data > JSON > room\_id. You can also add the following expression:
 `{{$node["Matrix"].json["room_id"]}}` 
 .
4. Enter a message in the
 ***Text***
 field.
5. Click on
 ***Execute Node***
 to run the node.



 In the screenshot below, you will notice that the node sends a message to the room that we created with the Matrix node.
 



![Using the Matrix node to send a message to the room we created](https://d33wubrfki0l68.cloudfront.net/1acc7daba26ecf36f397b70d8f273436dc2bda49/d9cc8/_images/integrations/builtin/app-nodes/matrix/matrix4_node.png)



### 
 6. NoOp node
 [#](#6-noop-node "Permanent link")



 Adding this node here is optional, as the absence of this node won't make a difference to the functioning of the workflow. We've added this as it can sometimes help others with a better understanding of the workflow, visually.
 


1. Create a
 ***NoOp***
 node connected to the 'false' output of the IF node.
2. Click on
 ***Execute Node***
 to run the node.



![Using the NoOp node](https://d33wubrfki0l68.cloudfront.net/708d08c61e6b15d6d7007209f0cfb52c4d2bd774/dfc93/_images/integrations/builtin/app-nodes/matrix/noop_node.png)





