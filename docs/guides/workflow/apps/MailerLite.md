


 邮件精简版
 [#](#mailerlite "永久链接")
===============================================



[邮件精简版](https://www.mailerlite.com/) 
 是一个电子邮件营销解决方案，它为您提供了一个用户友好的内容编辑器、简化的订户管理和带有最重要统计信息的活动报告。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credential/mailerlite/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*订阅者
	+创建新订户
	+获取订阅者
	+获取所有订阅者
	+更新订阅者



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您使用MailerLite节点创建、更新和获取订阅者。您还可以找到
 [工作流](https://n8n.io/workflows/751) 
 此示例使用工作流使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 MailerLite




 最终的工作流应如下图所示。
 



![具有MailerLite节点的工作流](https://d33wubrfki0l68.cloudfront.net/a1c9ab670080891c722948a5bea18504fd01d1b5/ed783/_images/integrations/builtin/app-nodes/mailerlite/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下“开始”节点存在。
 


### 
 2. MailerLite节点（创建：订阅者）
 [#](#2-mailerlite-node-create-subscriber "永久链接")



 此节点将在MailerLite中创建新订户。我们将添加订阅者的姓名以及他们的电子邮件。
 


1. 首先，您必须输入MailerLite节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credential/mailerlite/）
 .
2. 在
 ***电子邮件***
 领域
3. 单击
 ***添加字段***
 按钮，然后从下拉列表中选择“名称”。
4. 在
 ***姓名***
 领域
5. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点创建了一个新的订阅者，其中包含他们的姓名和电子邮件。
 



![使用MailerLite节点创建文件室](https://d33wubrfki0l68.cloudfront.net/0c760043985868c18e423f6610f035cd1ba2ae35/807a5/_images/integrations/builtin/app-nodes/mailerlite/mailerlite_node.png)



### 
 3. MailerLite1节点（更新：订阅者）
 [#](#3-mailerlite1-node-update-subscriber "永久链接")



 此节点将更新我们在上一个节点中创建的订户的信息。我们将添加有关使用此节点的订户所在城市的信息。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***操作***
 下拉列表。
3. 单击
 ***订阅者电子邮件***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 部分：节点>MailerLite>输出数据>JSON>电子邮件。还可以添加以下表达式：
 `｛｛$node[“MailerLite”].json[“email”]｝｝`
 .
5. 单击
 ***添加字段***
 按钮，然后从下拉列表中选择“自定义字段”。
6. 单击
 ***添加自定义字段***
 按钮
7. 从
 ***字段ID***
 下拉列表。
8. 在
 ***价值***
 领域
9. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点更新了我们在上一个节点中创建的订阅者的信息。这里，节点添加了关于订户所在城市的信息。
 



![使用MailerLite节点更新订阅者](https://d33wubrfki0l68.cloudfront.net/9b4b8c89c3a92cff6f4ba252405c0ffccef8f5e5/0c457/_images/integrations/builtin/app-nodes/mailerlite/mailerlite1_node.png)



### 
 3. MailerLite2节点（获取：订阅者）
 [#](#3-mailerlite2-node-get-subscriber "永久链接")



 此节点将返回我们使用MailerLite节点创建的订阅者的信息。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***操作***
 下拉列表。
3. 单击
 ***订阅者电子邮件***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 部分：节点>MailerLite>输出数据>JSON>电子邮件。还可以添加以下表达式：
 `｛｛$node[“MailerLite”].json[“email”]｝｝`
 .
5. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点返回了我们使用MailerLite节点创建的订阅者的信息。
 



![使用MailerLite节点获取订阅者的信息](https://d33wubrfki0l68.cloudfront.net/1c4b7014a703ff53897316707583ebb13044d6c8/f42e9/_images/integrations/builtin/app-nodes/mailerlite/mailerlite2_node.png)





