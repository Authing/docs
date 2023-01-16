


 转换器套件
 [#](#convertkit "永久链接")
===============================================



[转换器套件](https://www.convertkit.com/) 
 是一个功能齐全的电子邮件营销平台。转换器套件可用于构建电子邮件列表、发送电子邮件广播、自动化序列、创建片段和构建登录页面。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credential/convertkit/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*自定义字段
	+创建字段
	+删除字段
	+获取所有字段
	+更新字段
*表单
	+添加订阅者
	+获取所有表单
	+列出对包含订阅者数据的表单的订阅
*顺序
	+添加订阅者
	+获取所有序列
	+获取序列的所有订阅，包括订户数据
*标签
	+创建标记
	+获取所有标签
*标记订阅服务器
	+向订阅者添加标记
	+列出对包含订户数据的标记的订阅
	+从订阅者中删除标记



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您使用ConvertKit节点向表单添加订阅者、创建标记并将订阅者添加到标记。您还可以找到
 [工作流](https://n8n.io/workflows/642) 
 此示例使用工作流将使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 ConvertKit




 最终的工作流应如下图所示。
 



![具有ConvertKit节点的工作流](https://d33wubrfki0l68.cloudfront.net/eaeced2b2e8d11d5f0cc9ec21ed72f9cf9e76fbb/4a893/_images/integrations/builtin/app-nodes/convertkit/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. ConvertKit节点（addSubscriber:form）
 [#](#2-转换套件-节点-地址-订阅表单 "永久链接")


1. 首先，您必须输入ConvertKit节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credential/convertkit/）
 .
2. 从
 ***表单ID***
 下拉列表。
3. 在
 ***电子邮件***
 领域
4. 单击
 ***执行节点***
 以运行节点。



![使用ConvertKit节点将订阅者添加到表单](https://d33wubrfki0l68.cloudfront.net/9281b11ce40ad367972ee462cf0a987a3a21ef57/dff39/_images/integrations/builtin/app-nodes/convertkit/convertkit_node.png)



### 
 3. ConvertKit1节点（create:tag）
 [#](#3-convertkit1-node-create-tag "永久链接")


1. 选择在上一个ConvertKit节点中输入的凭据。
2. 从
 ***资源***
 下拉列表。
3. 在
 ***姓名***
 领域
4. 单击
 ***执行节点***
 以运行节点。



![使用ConvertKit节点创建标记](https://d33wubrfki0l68.cloudfront.net/8c4307dad881e1c7aecfc8c6bf550c7a4bc6aea0/d68ae/_images/integrations/builtin/app-nodes/convertkit/convertkit1_node.png)



### 
 4. ConvertKit2节点（添加：tagSubscriber）
 [#](#4-convertkit2-node-add-tagsubscriber "永久链接")


1. 选择在上一个ConvertKit节点中输入的凭据。
2. 从
 ***资源***
 下拉列表。
3. 从
 ***操作***
 下拉列表。
4. 从
 ***标记ID***
 下拉列表。
5. 单击
 ***电子邮件***
 字段并单击
 ***添加表达式***
 .
6. 在
 ***变量选择器***
 部分：节点>ConvertKit>输出数据>JSON>订阅者>电子邮件地址。还可以添加以下表达式：
 `｛｛$node[“ConvertKit”].json[“subscriber”][“email_address”]｝｝`
 .
7. 单击
 ***执行节点***
 以运行节点。



![使用ConvertKit节点将订阅者添加到标记](https://d33wubrfki0l68.cloudfront.net/af541fa2017c7d6c6f4a85350f993e099e0f4554/b85e7/_images/integrations/builtin/app-nodes/convertkit/convertkit2_node.png)





