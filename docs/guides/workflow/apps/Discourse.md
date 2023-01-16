


 论文
 [#](#话语 "永久链接")
=============================================



[话语](https://www.discourse.org/) 
 是一个开源的讨论平台，可以用作邮件列表、讨论论坛、长表单聊天室等。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credential/discussion/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*类别
	+创建类别
	+获取所有类别
	+更新类别
*组
	+创建组
	+获取一个群
	+获取所有组
	+更新组
*岗位
	+创建帖子
	+获取帖子
	+获取所有帖子
	+更新帖子
*用户
	+创建用户
	+获取用户
	+获取所有用户
*用户组
	+创建用户到组
	+从组中删除用户



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您使用“话语”节点创建、更新和获取帖子。您还可以找到
 [工作流](https://n8n.io/workflows/930) 
 此示例使用工作流将使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 论文




 最终的工作流应如下图所示。
 



![具有“话语”节点的工作流](https://d33wubrfki0l68.cloudfront.net/4f6ba7719f1c5548ab4ffe48187550ea63f917b0/b1e6b/_images/integrations/builtin/app-nodes/discourse/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. 话语节点（创建：post）
 [#](#2-清除-节点-创建-post "永久链接")



 此节点将在
 `休息室`
 类别如果要在其他类别下创建文章，请选择该类别。
 


1. 首先，您必须为“话语”节点输入凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credential/discussion/）
 .
2. 在
 ***标题***
 领域
3. 在
 ***内容***
 领域
4. 单击
 ***添加字段***
 并从下拉列表中选择“类别ID”。
5. 从
 ***类别ID***
 下拉列表。
6. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您会注意到该节点在类别下创建了一个新主题
 `休息室`
 .
 



![使用“话语”节点创建主题](https://d33wubrfki0l68.cloudfront.net/7002ef364786110ce84e2af4926a6202aa41156c/24955/_images/integrations/builtin/app-nodes/discourse/discourse_node.png)



### 
 3. Discours1节点（更新：post）
 [#](#3-displace1-node-update-post "永久链接")



 此节点将更新我们在上一个节点中创建的帖子的内容。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***操作***
 下拉列表。
3. 单击
 ***岗位ID***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 部分：当前节点>输入数据>JSON>id。您还可以添加以下表达式：
 `｛｛$json[“id”]｝｝`
 .
5. 在
 ***内容***
 领域
6. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您将注意到该节点更新了我们在上一个节点中创建的帖子的内容。
 



![使用“话语”节点更新帖子](https://d33wubrfki0l68.cloudfront.net/576a516d0b16f75ae53f3a817328de351edfc3fd/bbd48/_images/integrations/builtin/app-nodes/discourse/discourse1_node.png)



### 
 4. Discourse2节点（get:post）
 [#](#4-digrase2-node-get-post "永久链接")



 此节点将检索我们以前更新的帖子。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***操作***
 下拉列表。
3. 单击
 ***岗位ID***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 部分：当前节点>输入数据>JSON>id。您还可以添加以下表达式：
 `｛｛$json[“id”]｝｝`
 .
5. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您注意到节点检索了我们之前创建的帖子。
 



![使用“话语”节点获取帖子](https://d33wubrfki0l68.cloudfront.net/3b8ad4136965e66b439d8ea16e0ffae6db944f8c/71c4d/_images/integrations/builtin/app-nodes/discourse/discourse2_node.png)





