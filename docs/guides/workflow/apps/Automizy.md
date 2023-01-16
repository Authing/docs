


 自动调整
 [#](#automizy "永久链接")
===========================================



[自动调整](https://automizy.com/) 
 是一款电子邮件营销自动化软件，提供AI驱动的主题线测试仪、AB测试和电子邮件自动化。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/automizy/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*联系人
	+创建联系人
	+删除联系人
	+获取联系人
	+获取所有联系人
	+更新联系人
*列表
	+创建列表
	+删除列表
	+获取列表
	+获取所有列表
	+更新列表



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您创建新列表，向该列表中添加新联系人，更新联系人，并使用“自动”节点获取列表中的所有联系人。您还可以找到
 [工作流](https://n8n.io/workflows/720) 
 此示例使用工作流使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 自动调整




 最终的工作流应如下图所示。
 



![具有自动调整节点的工作流](https://d33wubrfki0l68.cloudfront.net/243480910f13082097ee48f0810b23fec1b9d522/48a07/_images/integrations/builtin/app-nodes/automizy/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下“开始”节点存在。
 


### 
 2. 自动调整节点（创建：列表）
 [#](#2-自动节点-创建列表 "永久链接")



 此节点将创建一个名为
 `n8n个文档`
 在自动化中。
 


1. 首先，您必须输入Automize节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/automizy/）
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
 



![使用“自动”节点创建新列表](https://d33wubrfki0l68.cloudfront.net/d0739eb1e8c3e98d3ee1efc032196d77eeea0124/753f6/_images/integrations/builtin/app-nodes/automizy/automizy_node.png)



### 
 3. 自动调整1节点（创建：联系人）
 [#](#3-自动创建节点-联系 "永久链接")



 此节点创建一个新联系人，并将其添加到上一节点中创建的列表中。
 


1. 选择在上一个节点中输入的凭据。
2. 在
 ***电子邮件***
 领域
3. 单击
 ***列表ID***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 section:Nodes>Automize>Output Data>JSON>id。您还可以添加以下表达式：
 `｛｛$node[“Automizy”].json[“id”]｝｝`
 .
5. 单击
 ***添加字段***
 并从下拉列表中选择“状态”。
6. 从
 ***状态***
 下拉列表。
7. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您将注意到该节点使用电子邮件地址创建了一个新联系人
 `example@n8n.io` 
 和状态
 `活动的`
 并将其添加到列表中
 `n8n个文档`
 在上一个节点中创建。
 



![使用“自动”节点创建新联系人并将其添加到列表中](https://d33wubrfki0l68.cloudfront.net/f498b2a2a212e2d58b0816f5a668b89158111556/f36d3/_images/integrations/builtin/app-nodes/automizy/automizy1_node.png)



### 
 4. 自动调整2节点（更新：联系人）
 [#](#4-automize2-node-update-联系 "永久链接")



 此节点通过添加标记更新我们在上一个节点中创建的联系人
 `审阅者`
 请确保在Automize中创建标记。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***操作***
 下拉列表。
3. 单击
 ***电子邮件***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 部分：节点>自动调整1>输出数据>JSON>电子邮件。还可以添加以下表达式：
 `｛｛$node[“Automizy1”].json[“email”]｝｝`
 .
5. 单击
 ***添加字段***
 并从下拉列表中选择“标签”。
6. 从
 ***标签***
 下拉列表。
7. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您会注意到该节点通过添加标记更新了在上一个节点中创建的联系人
 `审阅者`
 这是一个很好的例子。
 



![使用“自动调整”节点通过添加标记更新联系人](https://d33wubrfki0l68.cloudfront.net/e940215365214e00f960b3293169c49f9f9be0bc/70f4e/_images/integrations/builtin/app-nodes/automizy/automizy2_node.png)



### 
 5. Automizy3节点（getAll:contact）
 [#](#5-自动化3-node-getall-contact "永久链接")



 此节点返回
 `n8n个文档`
 使用Automize节点创建的列表。
 


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
 section:Nodes>Automize>Output Data>JSON>id。您还可以添加以下表达式：
 `｛｛$node[“Automizy”].json[“id”]｝｝`
 .
5. 切换
 ***全部返回***
 为真。
6. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到节点返回列表中存在的所有联系人
 `n8n个文档`
 .
 



![使用“自动”节点获取列表中的所有联系人](https://d33wubrfki0l68.cloudfront.net/ba7e8771e6980d757ed08b3dbe891ad071b3d90d/90b14/_images/integrations/builtin/app-nodes/automizy/automizy3_node.png)





