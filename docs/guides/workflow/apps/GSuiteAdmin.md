


 G Suite管理员
 [#](#g-suite-admin "永久链接")
=====================================================



[G Suite管理员](https://developers.google.com/admin-sdk) 
 帮助您管理域和应用程序资源、创建报告以及管理G Suite组织的订阅和警报。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/google/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*组
	+创建组
	+删除组
	+获取一个群
	+获取所有组
	+更新组
*用户
	+创建用户
	+删除用户
	+获取用户
	+获取所有用户
	+更新用户



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您使用G Suite管理节点创建、更新和获取用户。您还可以找到
 [工作流](https://n8n.io/workflows/710) 
 此示例使用工作流使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 G Suite管理员




 最终的工作流应如下图所示。
 



![具有Google Sheets节点的工作流](https://d33wubrfki0l68.cloudfront.net/2945ae190c0f6f5f6e0358fad9e53c372ba4dd3a/4af8f/_images/integrations/builtin/app-nodes/gsuiteadmin/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下“开始”节点存在。
 


### 
 2. G Suite管理节点（创建：用户）
 [#](#2-g-suite-admin-node-create-user "永久链接")



 此节点将使用以下信息在G Suite中创建一个用户：名字、姓氏、密码、域和用户名。
 


1. 首先，您必须输入G Suite Admin节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/google/）
 .
2. 在
 ***名字***
 字段。
3. 在
 ***姓氏***
 字段。
4. 在
 ***密码***
 领域
5. 从
 ***域***
 下拉列表。
6. 在
 ***用户名***
 字段。
7. 单击
 ***执行节点***
 以运行工作流。



 在下面的屏幕截图中，您将看到该节点创建了一个名为的新用户
 `内森（Nathan）`
 姓
 `属性`
 领域
 `n8n.io`
 ，用户名
 `nat（自然）`
 和密码。
 



![使用G Suite管理节点创建用户](https://d33wubrfki0l68.cloudfront.net/52b519956094fb5ace779f64841bd2f77cb2face/3b18f/_images/integrations/builtin/app-nodes/gsuiteadmin/gsuiteadmin_node.png)



### 
 3. G Suite Admin1节点（更新：用户）
 [#](#3-g-suite-admin1-node-update-user "永久链接")



 此节点将从上一个节点获取用户ID，并将用户的姓氏更新为
 `内特`
 .
 


1. 选择在上一个G Suite管理节点中输入的凭据。
2. 从
 ***操作***
 下拉列表。
3. 单击
 ***用户ID***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 部分：Nodes>G Suite Admin>Output Data>JSON>id。您还可以添加以下表达式：
 `｛｛$node[“G Suite Admin”].json[“id”]｝｝`
 .
5. 单击
 ***添加字段***
 按钮，然后从下拉列表中选择“姓氏”。
6. 在
 ***姓氏***
 字段。
7. 单击
 ***执行节点***
 以运行工作流。



 在下面的屏幕截图中，您将注意到该节点已更新了我们在上一个节点中创建的用户的姓氏。
 



![使用G Suite Admin节点更新用户的姓氏](https://d33wubrfki0l68.cloudfront.net/f7af535b696e5b538db433cc7a55f58f1ca32015/802b8/_images/integrations/builtin/app-nodes/gsuiteadmin/gsuiteadmin1_node.png)



### 
 4. G Suite Admin2（获取：用户）
 [#](#4-g-suite-admin2-get-user "永久链接")



 此节点将获取我们在G Suite Admin节点中创建的用户的信息。
 


1. 选择在上一个G Suite管理节点中输入的凭据。
2. 从
 ***操作***
 下拉列表。
3. 单击
 ***用户ID***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 部分：Nodes>G Suite Admin>Output Data>JSON>id。您还可以添加以下表达式：
 `｛｛$node[“G Suite Admin”].json[“id”]｝｝`
 .
5. 单击
 ***执行节点***
 以运行工作流。



 在下面的屏幕截图中，您将注意到该节点返回我们在G Suite Admin节点中创建的用户的信息。
 



![使用G Suite Admin节点获取用户信息](https://d33wubrfki0l68.cloudfront.net/88c2a8d2ff5cef332beaffa7def82be2a466f712/b73ee/_images/integrations/builtin/app-nodes/gsuiteadmin/gsuiteadmin2_node.png)




 常见问题解答
 [#](#faqs "永久链接")
-----------------------------------


### 
 投射用户信息的不同方式有哪些？
 [#](#what-are-the-different-ways-to-project-auser-information "永久链接")



 投射用户信息有三种不同的方式：
 


****基本：***
 不包括任何自定义字段。
****自定义：***
 在customField中包含架构中的自定义字段。
****完整：***
 包括与用户关联的所有字段。



 您可以按照以下步骤包含自定义字段。
1. 从
 ***投影***
 下拉列表。
2. 单击
 ***添加选项***
 按钮，然后从下拉列表中选择“自定义模式”。
3. 从
 ***自定义架构***
 下拉列表。
 




