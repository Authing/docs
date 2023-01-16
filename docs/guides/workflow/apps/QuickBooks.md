


 QuickBooks
 [#](#quickbooks "永久链接")
===============================================



[QuickBooks](https://quickbooks.intuit.com) 
 是Intuit开发的会计软件包。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credential/quickbooks/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*法案
	+创建
	+删除
	+获取
	+全部获取（Get All）
	+更新
*客户
	+创建
	+获取
	+全部获取（Get All）
	+更新
*员工
	+创建
	+获取
	+全部获取（Get All）
	+更新
*估价
	+创建
	+删除
	+获取
	+全部获取（Get All）
	+发送
	+更新
*发票
	+创建
	+删除
	+获取
	+全部获取（Get All）
	+发送
	+更新
	+无效
*项目
	+获取
	+全部获取（Get All）
*付款
	+创建
	+删除
	+获取
	+全部获取（Get All）
	+发送
	+更新
	+无效
*采购
	+获取
	+全部获取（Get All）
*交易
	+获取报告
*供应商
	+创建
	+获取
	+全部获取（Get All）
	+更新



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您创建客户和发票，并将发票发送给客户。您还可以找到
 [工作流](https://n8n.io/workflows/949) 
 此示例使用工作流使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 QuickBooks




 最终的工作流应如下图所示。
 



![具有QuickBooks节点的工作流](https://d33wubrfki0l68.cloudfront.net/8364925510f4d18ea6b1794afdeeee223eb891d5/87717/_images/integrations/builtin/app-nodes/quickbooks/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下“开始”节点存在。
 


### 
 2. QuickBooks节点（创建：客户）
 [#](#2-quickbooks-node-createcustomer "永久链接")



 此节点将在QuickBooks中创建新客户。
 


1. 首先，您必须输入QuickBooks节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credential/quickbooks/）
 .
2. 从
 ***操作***
 下拉列表。
3. 在
 ***显示名称***
 领域
4. 单击
 ***添加字段***
 按钮，然后选择“主电子邮件地址”。
5. 在
 ***主要电子邮件地址***
 领域
6. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点创建了一个新客户。
 



![使用QuickBooks节点创建新客户](https://d33wubrfki0l68.cloudfront.net/7f57a734d455504f8c810a07f19f49b7a6a94128/86e7e/_images/integrations/builtin/app-nodes/quickbooks/quickbooks_node.png)



### 
 3. QuickBooks1节点（创建：发票）
 [#](#3-quickbooks1-node-createinvoice "永久链接")



 此节点将为我们在上一节点中创建的客户创建发票。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***资源***
 下拉列表。
3. 从
 ***操作***
 下拉列表。
4. 单击
 ***针对客户***
 字段并单击
 ***添加表达式***
 .
5. 在
 ***变量选择器***
 部分：当前节点>输入数据>JSON>Id。您还可以添加以下表达式：
 `｛｛$json[“Id”]｝｝`
 .
6. 单击
 ***添加项目***
 按钮
7. 从
 ***添加行项目属性***
 下拉列表。
8. 从
 ***项目***
 下拉列表。
9. 从
 ***添加行项目属性***
 下拉列表。
10. 在
 ***金额***
 领域
11. 从
 ***添加行项目属性***
 下拉列表。
12. 从
 ***详细信息类型***
 下拉列表。
13. 从
 ***添加行项目属性***
 下拉列表。
14. 在
 ***说明***
 领域
15. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点为我们在上一个节点中创建的客户创建了发票。
 



![使用QuickBooks节点创建新发票](https://d33wubrfki0l68.cloudfront.net/5d56b9d3cd94e8e29faa982f9758f6e92ec4817c/d123d/_images/integrations/builtin/app-nodes/quickbooks/quickbooks1_node.png)



### 
 4. QuickBooks2节点（发送：发票）
 [#](#4-quickbooks2-node-sensistinvoice "永久链接")



 此节点将发送我们在上一个节点中创建的发票。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***资源***
 下拉列表。
3. 从
 ***操作***
 下拉列表。
4. 单击
 ***发票ID***
 字段并单击
 ***添加表达式***
 .
5. 在
 ***变量选择器***
 部分：当前节点>输入数据>JSON>Id。您还可以添加以下表达式：
 `｛｛$json[“Id”]｝｝`
 .
6. 在
 ***电子邮件***
 领域
7. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您将注意到节点将发票发送给客户。
 



![使用QuickBooks节点向客户发送发票](https://d33wubrfki0l68.cloudfront.net/d63351235d0d75e94c4ee7c6e4ff128ce5fe8b1e/d95fc/_images/integrations/builtin/app-nodes/quickbooks/quickbooks2_node.png)





