


 电子政务
 [#](#e-goi "永久链接")
=====================================



[电子政务](https://www.e-goi.com/) 
 是一个全渠道营销自动化平台。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/egoi/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------



**联系人**
 -创建成员
-获取成员
-获取所有成员
-更新成员
 



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您使用电子政务节点创建、更新和获取联系人。您还可以找到
 [工作流](https://n8n.io/workflows/852) 
 此示例使用工作流使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 E-goi




 最终的工作流应如下图所示。
 



![电子政务节点的工作流](https://d33wubrfki0l68.cloudfront.net/444e021066137e084e632d3e3f07e2113c9a3bae/64639/_images/integrations/builtin/app-nodes/egoi/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下“开始”节点存在。
 


### 
 2. 电子政务节点（创建：联系人）
 [#](#2-goi-node-create-contact "永久链接")



 此节点将在电子政务中创建新联系人。我们将在电子邮件中添加联系人的名字。
 


1. 首先，您必须输入E-goi节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/egoi/）
 .
2. 从
 ***列表ID***
 领域
3. 在
 ***电子邮件***
 领域
4. 单击
 ***添加字段***
 按钮，然后从下拉列表中选择“名字”。
5. 在
 ***名字***
 领域
6. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您会注意到该节点创建了一个新联系人，联系人的名字和电子邮件。
 



![使用E-goi节点创建新联系人](https://d33wubrfki0l68.cloudfront.net/0a08f8d454786afab54af897b7f3e8fbb1b0fdb9/7303d/_images/integrations/builtin/app-nodes/egoi/e-goi_node.png)



### 
 3. 电子政务1节点（更新：联系人）
 [#](#3-e-goi1-node-update联系 "永久链接")



 此节点将更新我们在上一节点中创建的联系人的信息。我们将使用此节点更新联系人的名字。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***操作***
 下拉列表。
3. 单击
 ***列表ID***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 部分：节点>电子政务>参数>列表。还可以添加以下表达式：
 `｛｛$node[“E-goi”].parameter[“list”]｝｝`
 .
5. 单击
 ***联系人ID***
 字段并单击
 ***添加表达式***
 .
6. 在
 ***变量选择器***
 部分：Nodes>E-goi>Output Data>JSON>base>contact\_id。还可以添加以下表达式：
 `｛｛$node[“E-goi”].json[“base”][“contact_id”]｝｝`
 .
7. 单击
 ***添加字段***
 按钮，然后从下拉列表中选择“名字”。
8. 在
 ***名字***
 领域
9. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您将注意到该节点更新了我们在上一个节点中创建的联系人的信息。这里，节点已更新联系人的名字。
 



![使用E-goi节点更新联系人](https://d33wubrfki0l68.cloudfront.net/54710a8324d35c8183f76e4dcb2c194eb3319557/c9f70/_images/integrations/builtin/app-nodes/egoi/e-goi1_node.png)



### 
 3. 电子政务节点（获取：联系人）
 [#](#3-e-goi2-node-get-contact "永久链接")



 此节点将返回我们使用E-goi节点创建的联系人的信息。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***操作***
 下拉列表。
3. 单击
 ***列表ID***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 部分：节点>电子政务1>参数>列表。还可以添加以下表达式：
 `｛｛$node[“E-goi1”].prarameter[“list”]｝｝`
 .
5. 单击
 ***联系人ID***
 字段并单击
 ***添加表达式***
 .
6. 在
 ***变量选择器***
 部分：节点>电子政务1>输出数据>JSON>基础>联系人\_id。还可以添加以下表达式：
 `｛｛$node[“E-goi”].json[“base”][“contact_id”]｝｝`
 .
7. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您将注意到该节点返回了我们使用E-goi节点创建的联系人的信息。
 



![使用E-goi节点获取联系人信息](https://d33wubrfki0l68.cloudfront.net/60b7029ca0a7789e5d15407b55aeca861cd2637a/5ed93/_images/integrations/builtin/app-nodes/egoi/e-goi2_node.png)





