


 WooCommerce公司公司
 [#](#woocommerce "永久链接")
=================================================



【WooCommerce】(https://woocommerce.com/) 
 是WordPress的一个可定制的开源电子商务插件。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/woocommerce/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*客户
	+创建客户
	+删除客户
	+检索客户
	+检索所有客户
	+更新客户
*订单
	+创建订单
	+删除订单
	+获取订单
	+获取所有订单
	+更新订单
*产品
	+创建产品
	+删除产品
	+获取产品
	+获取所有产品
	+更新产品



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您从WooCommerce创建、更新和获取产品。您还可以找到
 [工作流](https://n8n.io/workflows/847) 
 此示例使用工作流使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 WooCommerce




 最终的工作流应如下图所示。
 



![WooCommerce节点的工作流](https://d33wubrfki0l68.cloudfront.net/003bd40ee88f0fdc6cfad3d2ceed3e439d06b458/8cc22/_images/integrations/builtin/app-nodes/woocommerce/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. WooCommerce节点（创建：产品）
 [#](#2-商业模式-创建产品 "永久链接")



 此节点将在WooCommerce中创建新产品。
 


1. 首先，您必须输入WooCommerce节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/woocommerce/）
 .
2. 在
 ***姓名***
 领域
3. 单击
 ***添加字段***
 然后选择“描述”。
4. 在
 ***说明***
 字段。
5. 单击
 ***添加字段***
 并选择“常规价格”。
6. 在
 ***常规价格***
 字段。
7. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点创建了一个新产品。
 



![使用WooCommerce节点创建新产品](https://d33wubrfki0l68.cloudfront.net/58afc41ffd63819308ff70905af84ede8fad4660/c7d42/_images/integrations/builtin/app-nodes/woocommerce/woocommerce_node.png)



### 
 3. WooCommerce1节点（更新：产品）
 [#](#3-oocommerce1-node-update产品 "永久链接")



 此节点将更新我们在上一个节点中创建的产品。我们将更新产品的数量。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***操作***
 下拉列表。
3. 单击
 ***产品ID***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 section:Nodes>WooCommerce>Output Data>JSON>id。您还可以添加以下表达式：
 `｛｛$node[“WooCommerce”].json[“id”]｝｝`
 .
5. 单击
 ***添加字段***
 并选择“库存数量”。
6. 在
 ***库存数量***
 字段。
7. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点更新了我们在上一个节点中创建的产品的数量。
 



![使用WooCommerce节点更新产品数量](https://d33wubrfki0l68.cloudfront.net/f8faa058606b9903947538abf11a89b8496de963/d9ce9/_images/integrations/builtin/app-nodes/woocommerce/woocommerce1_node.png)



### 
 4. WooCommerce2节点（get:product）
 [#](#4-oocommerce2-node-get-product "永久链接")



 此节点将获取有关我们使用WooCommerce节点创建的产品的信息。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***操作***
 下拉列表。
3. 单击
 ***产品ID***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 section:Nodes>WooCommerce>Output Data>JSON>id。您还可以添加以下表达式：
 `｛｛$node[“WooCommerce”].json[“id”]｝｝`
 .
5. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点返回有关我们使用WooCommerce节点创建的产品的信息。
 



![使用WooCommerce节点获取产品信息](https://d33wubrfki0l68.cloudfront.net/81f51056d005a4047ab4b1f6b976673134c9f137/75ae4/_images/integrations/builtin/app-nodes/woocommerce/woocommerce2_node.png)





