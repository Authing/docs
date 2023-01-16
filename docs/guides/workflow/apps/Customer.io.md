


 客户.io
 [#](#customerio "永久链接")
================================================



[客户.io](https://customer.io/) 
 使用户能够使用其网站数据向选定的客户群发送时事通讯。您可以发送定向电子邮件、推送通知和短信，以减少客户流失，建立更牢固的关系，并推动订阅。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/customerio/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*客户
	+创建/更新客户。
	+删除客户。
*事件
	+跟踪客户事件。
	+跟踪匿名事件。
*活动
	+获取
	+全部获取（Get All）
	+获取指标
*分段
	+添加客户
	+删除客户



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您创建客户并将其添加到customer.io中的某个细分市场
 [工作流](https://n8n.io/workflows/646) 
 此示例使用工作流将使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 客户.io




 最终的工作流应如下图所示。
 



![具有Customer.io节点的工作流](https://d33wubrfki0l68.cloudfront.net/054518d105ad5a81e983beda16f404b4b18f6110/5ee1a/_images/integrations/builtin/app-nodes/customerio/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. CustomerIo节点（追加销售：客户）
 [#](#2-客户-模型-用户 "永久链接")


1. 首先，您必须输入Customer.io节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/customerio/）
 .
2. 在
 ***身份证号码***
 领域
3. 单击
 ***添加字段***
 按钮，然后从下拉列表中选择“自定义属性”。
4. 单击
 ***选择要添加的选项***
 按钮
5. 输入
 `名称`
 在
 ***密钥***
 领域
6. 在
 ***价值***
 领域
7. 单击
 ***执行节点***
 以运行节点。



![使用Customer.io节点创建新客户](https://d33wubrfki0l68.cloudfront.net/3ae84cc8d3a04c3fea3848fd531a6dad5d92aa6b/12cfb/_images/integrations/builtin/app-nodes/customerio/customerio_node.png)



### 
 3. CustomerIo1节点（添加：段）
 [#](#3-客户1-node-add-segment "永久链接")


1. 选择在上一个Customer.io节点中输入的凭据。
2. 从
 ***资源***
 领域
3. 单击
 ***客户ID***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 部分：Nodes>CustomerIo>Output Data>JSON>id。您还可以添加以下表达式：
 `｛｛$node[“CustomerIo”].json[“id”]｝｝`
 .
5. 单击
 ***执行节点***
 以运行节点。



![使用Customer.io节点将客户添加到细分市场](https://d33wubrfki0l68.cloudfront.net/b7d65e08c82747e6eb71fcd657d2bc96df7fb708/c43f4/_images/integrations/builtin/app-nodes/customerio/customerio1_node.png)





