


 Lemlist公司公司
 [#](#lemlist "永久链接")
=========================================



[引理](https://Lemlist.com) 
 是一个电子邮件外联平台，允许您自动生成个性化图像和视频，并发送个性化冷电子邮件。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/lemlist/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*活动
	+全部获取（Get All）
*活动
	+全部获取（Get All）
*引线
	+创建
	+删除
	+获取
	+取消订阅
*团队
	+获取
*取消订阅
	+添加
	+删除
	+全部获取（Get All）



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您列出Airtable中的电子邮件，并在Lemlist中创建相应的线索。您还可以找到
 [工作流](https://n8n.io/workflows/983) 
 此示例使用工作流使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -[Airtable]/集成/内置/app节点/n8n节点base.Airtable/）
-
 Lemlist




 最终的工作流应如下图所示。
 



![具有Lemlist节点的工作流](https://d33wubrfki0l68.cloudfront.net/e497df52849e1b94fe59cdfcd76cf42ee19b274e/f5cdf/_images/integrations/builtin/app-nodes/lemlist/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. Airtable节点（列表）
 [#](#2-虚拟节点列表 "永久链接")



 此节点将列出Airtable中的所有记录。创建表格，如
 [此](https://airtable.com/shruiCc4kttDVsTsD) 
 在您的Airtable基地。
 


1. 首先，您必须输入Airtable节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/airtable/）
 .
2. 从
 ***操作***
 下拉列表。
3. 在
 ***基本ID***
 领域要获取Base ID，请转到
 [API页](https://airtable.com/api) 
 并选择正确的底座。你会在那里找到基地ID。
4. 在
 ***表***
 领域
5. 单击
 ***表***
 字段并单击
 ***添加表达式***
 .
6. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到节点返回潜在客户的信息。
 



![使用Airtable节点列出Airtable表中的数据](https://d33wubrfki0l68.cloudfront.net/d66acd602bbc4ad7578f4b569498b7eadcf5c0c6/f9a84/_images/integrations/builtin/app-nodes/lemlist/airtable_node.png)



### 
 3. Lemlist节点（创建：引线）
 [#](#3-lemlist-node-create-lead "永久链接")



 此节点将为Lemlist中的活动创建新线索。
 


1. 首先，您必须输入Lemlist节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/lemlist/）
 .
2. 从
 ***资源***
 下拉列表。
3. 从
 ***活动ID***
 下拉列表。
4. 单击
 ***电子邮件***
 字段并单击
 ***添加表达式***
 .
5. 在
 ***变量选择器***
 部分：当前节点>输入数据>JSON>字段>电子邮件。还可以添加以下表达式：
 `｛｛$json[“字段”][“电子邮件”]｝｝`
 .
6. 单击
 ***添加字段***
 按钮，然后选择“名字”。
7. 单击
 ***名字***
 字段并单击
 ***添加表达式***
 .
8. 在
 ***变量选择器***
 部分：当前节点>输入数据>JSON>字段>名称。还可以添加以下表达式：
 `｛｛$json[“字段”][“名称”]｝｝`
 .
9. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您将注意到该节点在Lemlist中创建了新线索。
 



![使用Lemlist节点创建新线索](https://d33wubrfki0l68.cloudfront.net/9dbafa86c6c734dfe2f689dad08d8de53a83c01d/5e6fc/_images/integrations/builtin/app-nodes/lemlist/lemlist_node.png)



### 
 4. 引理节点（get:lead）
 [#](#4-lemlist-node-get-lead "永久链接")



 此节点将返回我们在上一节点中创建的潜在客户的信息。
 


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
 部分：节点>Airtable>输出数据>JSON>字段>电子邮件。还可以添加以下表达式：
 `｛｛$node[“Airtable”].json[“fields”][“Email”]｝｝`
 .
6. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点返回了有关我们在上一个节点中创建的潜在客户的信息。
 



![使用Lemlist节点获取有关线索的信息](https://d33wubrfki0l68.cloudfront.net/6e9358d4db524d4b1c4081e0ef2e08a5c7433d85/a74a7/_images/integrations/builtin/app-nodes/lemlist/lemlist1_node.png)





