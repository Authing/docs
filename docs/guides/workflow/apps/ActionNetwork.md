

 行动网络
 [#](#行动网络 "永久链接")
=======================================================



[行动网络](https://actionnetwork.org/) 
 是一个开放的平台，使个人和团体能够为进步事业组织起来。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/actionnetwork/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*出席
	+创建
	+获取
	+全部获取（Get All）
*事件
	+创建
	+获取
	+全部获取（Get All）
*人员
	+创建
	+获取
	+全部获取（Get All）
	+更新
*个人标签
	+添加
	+删除
*请愿书
	+创建
	+获取
	+全部获取（Get All）
	+更新
*签名
	+创建
	+获取
	+全部获取（Get All）
	+更新
*标签
	+创建
	+获取
	+全部获取（Get All）



 实例
 [#](#示例 "永久链接")
-----------------------------------------



 此工作流允许您在行动网络中创建一个新事件，然后创建一个新人并将其标记为已参加您的活动。此工作流使用以下两个节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Active活动




 最终的工作流应如下图所示。
 



![具有“操作网络”节点的工作流](https://d33wubrfki0l68.cloudfront.net/b80f0d2fb9ef5a0762d55712d5dabf19e979110f/d53e0/_images/integrations/builtin/app-nodes/actionnetwork/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. 行动网络节点
 [#](#2-操作-网络-节点 "永久链接")


1. 首先输入您的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/actionnetwork/）
 .
2. 填写以下剩余参数：
	***资源**
	 ：选择
	 **事件**
	 从下拉列表中选择。
	***操作**
	 ：选择
	 **创建**
	 从下拉列表中选择。
	***原始系统**
	 ：输入此事件的起源。在我们的示例中为n8n.io。
	***标题**
	 ：在我们的示例中输入您的活动名称July Meetup。
3. 启用
 **简单**
 切换以返回更容易查看的响应，而不是完整的原始数据。
4. 使用
 **其他字段**
 输入有关活动的任何进一步详细信息。这里我们提供了开始日期。



![操作网络节点](https://d33wubrfki0l68.cloudfront.net/d3d647fde78d5806c092b1cb72a56c7a944facf0/a3d9f/_images/integrations/builtin/app-nodes/actionnetwork/action_network_node.png)



### 
 3. Action Network1节点
 [#](#3-动作-网络-节点 "永久链接")


1. 首先输入您的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/actionnetwork/）
 .
2. 填写以下剩余参数：
	***资源**
	 ：选择
	 **人员**
	 从下拉列表中选择。
	***操作**
	 ：选择
	 **创建**
	 从下拉列表中选择。
3. 启用
 **简单**
 切换以返回更容易查看的响应，而不是完整的原始数据。
4. 在
 **电子邮件地址**
 部分中，输入此人的地址和状态（此处我们订阅他们）。
5. 使用
 **其他字段**
 输入有关此人的任何进一步详细信息。这里我们提供了他们的名字。



![操作网络1节点](https://d33wubrfki0l68.cloudfront.net/1433e340502998550310fd456fa0b433af1bd47c/8f51f/_images/integrations/builtin/app-nodes/actionnetwork/action_network_node1.png)



### 
 4. Action Network2节点
 [#](#4-action-network2-node "永久链接")


1. 首先输入您的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/actionnetwork/）
 .
2. 填写以下剩余参数：
	***资源**
	 ：选择
	 **出席**
	 从下拉列表中选择。
	***操作**
	 ：选择
	 **创建**
	 从下拉列表中选择。
	***人员ID**
	 ：输入上一节点创建的人员的ID。
	***事件ID**
	 ：输入在第一个节点中创建的事件的ID。
3. 启用
 **简单**
 切换以返回更容易查看的响应，而不是完整的原始数据。



![操作网络2节点](https://d33wubrfki0l68.cloudfront.net/eeba80a77c80c0d13619035d14f03dc8e03cb430/84cb9/_images/integrations/builtin/app-nodes/actionnetwork/action_network_node2.png)





