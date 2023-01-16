


 回应指令
 [#](#getresponse "永久链接")
=================================================



[获取响应](https://www.getresponse.com/) 
 是一个在线平台，提供电子邮件营销软件、登录页面创建者、网络研讨会托管等。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/getresponse/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*联系人
	+创建新联系人
	+删除联系人
	+获取联系人
	+获取所有联系人
	+更新联系人属性



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您从回应指令获取所有联系人，并检查他们是否属于特定活动。如果联系人不属于指定的活动，工作流将使用GetResponse节点更新联系人的活动ID。您还可以找到
 [工作流](https://n8n.io/workflows/778) 
 此示例使用工作流将使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 GetResponse
 -
 [IF]（/integrations/builtin/core nodes/n8n nodes base.IF/）
 -
 [无操作，不执行任何操作]（/integrations/builtin/core-nodes/n8n-nodes-base.noop/）




 最终的工作流应如下图所示。
 



![具有GetResponse节点的工作流](https://d33wubrfki0l68.cloudfront.net/c87410a36d747e25c698e4049704e197954d7c95/0f78b/_images/integrations/builtin/app-nodes/getresponse/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. GetResponse节点（getAll:contact）
 [#](#2-getsresponse-node-getall-contact "永久链接")



 此节点将从GetResponse中检索所有联系人。
 


1. 首先，您必须输入GetResponse节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/getresponse/）
 .
2. 从
 ***操作***
 下拉列表。
3. 切换
 ***全部返回***
 为真。
4. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点从GetResponse中检索所有联系人。
 



![使用GetResponse节点检索所有联系人](https://d33wubrfki0l68.cloudfront.net/3df5343085d59d8c4147af50b96ac0040cc8d30c/0ecc8/_images/integrations/builtin/app-nodes/getresponse/getresponse_node.png)



### 
 3. IF节点
 [#](#3-if-node "永久链接")



 此节点将检查联系人是否属于
 `n8n`
 无论是否参加活动。如果联系人不属于
 `n8n`
 否则返回true。如果您还没有活动，请在GetResponse中创建活动。
 


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
 部分：节点>获取响应>输出数据>JSON>活动>名称。还可以添加以下表达式：
 `｛｛$node[“GetResponse”].json[“campaign”][“name”]｝｝`
 .
4. 从
 ***操作***
 下拉列表。
5. 输入
 `n8n`
 在
 ***值2***
 领域如果您有不同名称的活动，请改用该名称。
6. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点返回所有不属于
 `n8n`
 运动
 



![使用IF节点检查联系人是否属于n8n活动](https://d33wubrfki0l68.cloudfront.net/377e79454d3c4345d7f007fd9b6909ca34efec04/94b99/_images/integrations/builtin/app-nodes/getresponse/if_node.png)



### 
 4. GetResponse1节点（更新：联系人）
 [#](#4-getresponse1-node-update-contact "永久链接")



 此节点将更新我们从上一节点的真实分支获得的所有联系人的活动ID。
 


1. 创建一个连接到IF节点“true”输出的GetResponse节点。
2. 选择在上一个GetResponse节点中输入的凭据。
3. 从
 ***操作***
 下拉列表。
4. 单击
 ***联系人ID***
 字段并单击
 ***添加表达式***
 .
5. 在
 ***变量选择器***
 部分：节点>IF>输出数据>JSON>contactId。还可以添加以下表达式：
 `｛｛$node[“IF”].json[“contactId”]｝｝`
 .
6. 单击
 ***添加字段***
 并从下拉列表中选择“Campaign ID”。
7. 选择
 `n8n`
 来自
 ***活动ID***
 下拉列表。如果您有不同名称的活动，请选择该名称。
8. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您注意到该节点更新了所有不属于
 `n8n`
 运动
 



![使用GetResponse节点更新联系人的活动](https://d33wubrfki0l68.cloudfront.net/2d1725ca9a28084c40c6029c677750b16e49ccc8/6d0f4/_images/integrations/builtin/app-nodes/getresponse/getresponse1_node.png)



### 
 5. NoOp节点
 [#](#5-noop-node "永久链接")



 在此处添加此节点是可选的，因为缺少此节点不会对工作流的功能产生影响。
 


1. 创建
 ***无操作***
 节点连接到IF节点的“假”输出。
2. 单击
 ***执行节点***
 以运行节点。



![使用NoOp节点](https://d33wubrfki0l68.cloudfront.net/5a59d41353bf8540418daff3ecb1c66c09e7b500/24e50/_images/integrations/builtin/app-nodes/getresponse/noop_node.png)





