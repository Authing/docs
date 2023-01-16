


 发送网格
 [#](#sendgrid "永久链接")
===========================================



[发送网格](https://发送网格.co) 
 提供基于云的服务，帮助企业提供电子邮件。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/sendgrid/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*联系人
	+创建/更新联系人
	+删除联系人
	+通过ID获取联系人
	+获取所有联系人
*列表
	+创建列表
	+删除列表
	+获取列表
	+获取所有列表
	+更新列表
*邮件
	+发送电子邮件。



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您使用SendGrid节点创建、更新和获取联系人。您还可以找到
 [工作流](https://n8n.io/workflows/901) 
 此示例使用工作流使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 SendGrid




 最终的工作流应如下图所示。
 



![具有SendGrid节点的工作流](https://d33wubrfki0l68.cloudfront.net/1247c20de9aa5a8f2939e82c209ec490e770b86b/1e8ba/_images/integrations/builtin/app-nodes/sendgrid/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下“开始”节点存在。
 


### 
 2. SendGrid节点（追加启动：联系人）
 [#](#2-sendgrid-node-upsertcontact "永久链接")



 此节点将在SendGrid中创建联系人。
 


1. 首先，您必须输入SendGrid节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/sendgrid/）
 .
2. 从
 ***资源***
 下拉列表。
3. 从
 ***操作***
 下拉列表。
4. 在
 ***电子邮件***
 领域
5. 单击
 ***添加字段***
 按钮，然后选择“名字”。
6. 在
 ***名字***
 领域
7. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点使用其名字创建联系人。
 



![使用SendGrid节点创建新联系人](https://d33wubrfki0l68.cloudfront.net/1357fc4f33232bab5334f72582d1a936963ab5fb/4da5a/_images/integrations/builtin/app-nodes/sendgrid/sendgrid_node.png)



### 
 3. SendGrid1节点（追加启动：联系人）
 [#](#3-sendgrid1-node-upsertcontact "永久链接")



 此节点将更新我们在上一个节点中创建的联系人。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***资源***
 下拉列表。
3. 从
 ***操作***
 下拉列表。
4. 单击
 ***电子邮件***
 字段并单击
 ***添加表达式***
 .
5. 在
 ***变量选择器***
 部分：节点>发送网格>参数>电子邮件。还可以添加以下表达式：
 `｛｛$node[“SendGrid”].parameter[“email”]｝｝`
 .
6. 单击
 ***添加字段***
 按钮并选择“姓氏”。
7. 在
 ***姓氏***
 领域
8. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您将注意到该节点更新了我们在上一个节点中创建的联系人。
 



![使用SendGrid节点更新联系人](https://d33wubrfki0l68.cloudfront.net/bb8cc092f2bf614bd58c0ff1bfc1ab113dcb77e7/afaeb/_images/integrations/builtin/app-nodes/sendgrid/sendgrid1_node.png)



### 
 4. SendGrid2节点（get:contact）
 [#](#4-sendgrid2-node-get联系 "永久链接")



 此节点将返回我们使用SendGrid节点创建的联系人的信息。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***资源***
 下拉列表。
3. 从
 ***操作***
 下拉列表。
4. 从
 ***签署人：***
 下拉列表。
5. 单击
 ***电子邮件***
 字段并单击
 ***添加表达式***
 .
6. 在
 ***变量选择器***
 部分：节点>发送网格>参数>电子邮件。还可以添加以下表达式：
 `｛｛$node[“SendGrid”].parameter[“email”]｝｝`
 .
7. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点返回了我们使用SendGrid节点创建的联系人的信息。
 



![使用SendGrid节点获取联系人信息](https://d33wubrfki0l68.cloudfront.net/5562cc3bb9ef3fb1cf015e1f33e2615a9fbed85a/1775d/_images/integrations/builtin/app-nodes/sendgrid/sendgrid2_node.png)





