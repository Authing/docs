


 明智的
 [#](#wise "永久链接")
===================================



[明智](https://wise.com) 
 允许您以低成本转账方式将资金转移到国外，通过国际账户详细信息接收资金，并在手机上跟踪交易。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credential/wise/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*帐户
	+检索此用户的所有帐户货币的余额。
	+检索此用户的无边界帐户中的货币。
	+检索此用户的无边界帐户的对账单。
*汇率
	+获取
*个人资料
	+获取
	+全部获取（Get All）
*收件人
	+全部获取（Get All）
*报价
	+创建
	+获取
*转移
	+创建
	+删除
	+执行
	+获取
	+全部获取（Get All）



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您创建报价单和转账，执行转账，并使用明智的节点获取转账信息。您还可以找到
 [工作流](https://n8n.io/workflows/992) 
 此示例使用工作流使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Wise




 最终的工作流应如下图所示。
 



![具有Wise节点的工作流](https://d33wubrfki0l68.cloudfront.net/c7abdeeb97babb758e9edd95e4f0606d725baa3b/a3c46/_images/integrations/builtin/app-nodes/wise/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. 明智的节点（create:quote）
 [#](#2线-节点-创建-引用 "永久链接")



 此节点将在Wise中创建新报价。
 


1. 首先，您必须输入Wise节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credential/wise/）
 .
2. 从
 ***资源***
 下拉列表。
3. 从
 ***操作***
 下拉列表。
4. 从
 ***配置文件ID***
 下拉列表。
5. 从
 ***目标帐户ID***
 下拉列表。
6. 在
 ***金额***
 领域
7. 在
 ***来源货币***
 字段。
8. 在
 ***目标货币***
 领域
9. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点创建了一个新报价。
 



![使用Wise节点创建新报价](https://d33wubrfki0l68.cloudfront.net/0d51b14b70297c38c3b0606b890dabd85c3994b7/22589/_images/integrations/builtin/app-nodes/wise/wise_node.png)



### 
 3. Wise1节点（创建：传输）
 [#](#3-wise1-node-create-transfer "永久链接")



 此节点将为我们在上一个节点中创建的报价创建一个新的转移。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***资源***
 下拉列表。
3. 从
 ***配置文件ID***
 下拉列表。
4. 单击
 ***报价单ID***
 字段并单击
 ***添加表达式***
 .
5. 在
 ***变量选择器***
 部分：当前节点>输入数据>JSON>id。您还可以添加以下表达式：
 `｛｛$json[“id”]｝｝`
 .
6. 从
 ***目标帐户ID***
 下拉列表。
7. 单击
 ***添加字段***
 按钮
8. 在
 ***参考***
 字段。
9. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点为我们在上一个节点中创建的报价创建了一个新的转移。
 



![使用Wise节点创建新传输](https://d33wubrfki0l68.cloudfront.net/998bc65f0d99f142701ac843e6f3567088b0a991/63241/_images/integrations/builtin/app-nodes/wise/wise1_node.png)



### 
 4. Wise2节点（执行：传输）
 [#](#4-ise2-node-execute-transfer "永久链接")



 此节点将执行我们在上一个节点中创建的传输。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***资源***
 下拉列表。
3. 从
 ***操作***
 下拉列表。
4. 从
 ***配置文件ID***
 下拉列表。
5. 单击
 ***传输ID***
 字段并单击
 ***添加表达式***
 .
6. 在
 ***变量选择器***
 部分：当前节点>输入数据>JSON>id。您还可以添加以下表达式：
 `｛｛$json[“id”]｝｝`
 .
7. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到节点返回执行我们在上一个节点中创建的传输。
 



![使用Wise节点执行传输](https://d33wubrfki0l68.cloudfront.net/ff93a00da095f4f84f2f1f7f0e574db2dd08971f/5ff27/_images/integrations/builtin/app-nodes/wise/wise2_node.png)



### 
 5. Wise3节点（获取：传输）
 [#](#5-wwise3-node-get-transfer "永久链接")



 此节点将返回我们在上一个节点中执行的传输的信息。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***资源***
 下拉列表。
3. 从
 ***操作***
 下拉列表。
4. 单击
 ***传输ID***
 字段并单击
 ***添加表达式***
 .
5. 在
 ***变量选择器***
 部分：Nodes>Wise1>Output Data>JSON>id。您还可以添加以下表达式：
 `｛｛$node[“Wise1”].json[“id”]｝｝`
 .
6. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点返回了有关我们在上一个节点中执行的传输的信息。
 



![使用Wise节点获取传输](https://d33wubrfki0l68.cloudfront.net/e70481af82dd7aa3777e539b48cbbcb2dfb9fd6e/408ee/_images/integrations/builtin/app-nodes/wise/wise3_node.png)





