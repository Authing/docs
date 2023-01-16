


 转到网络研讨会
 [#](#gotowebinar "永久链接")
=================================================



[转到网络研讨会](https://www.gotomeeting.com/webinar) 
 是一个帮助您创建和提供在线视频会议的平台。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credential/gotowebinar/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*与会者
	+获取
	+全部获取（Get All）
	+获取详细信息
*联合组织者
	+创建
	+删除
	+全部获取（Get All）
	+Reinvite公司
*专家组成员
	+创建
	+删除
	+全部获取（Get All）
	+Reinvite公司
*注册人
	+创建
	+删除
	+获取
	+全部获取（Get All）
*会话
	+获取
	+全部获取（Get All）
	+获取详细信息
*网络研讨会
	+创建
	+获取
	+全部获取（Get All）
	+更新



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您创建、更新和获取网络研讨会。您还可以找到
 [工作流](https://n8n.io/workflows/960) 
 此示例使用工作流使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 转到网络研讨会




 最终的工作流应如下图所示。
 



![具有GoToWebinar节点的工作流](https://d33wubrfki0l68.cloudfront.net/dbb7359c4109c029e1ba9905bd9b18170e374f81/5592a/_images/integrations/builtin/app-nodes/gotowebinar/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下“开始”节点存在。
 


### 
 2. GoToWebinar节点（创建：网络研讨会）
 [#](#2-gotowebinar-node-create-webinar "永久链接")



 此节点将在GoToWebinar中创建一个新的网络研讨会。
 


1. 首先，您必须输入GoToWebinar节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credential/gotowebinar/）
 .
2. 从
 ***资源***
 下拉列表。
3. 从
 ***操作***
 下拉列表。
4. 在
 ***主题***
 领域
5. 单击
 ***添加时间范围***
 按钮
6. 在
 ***开始时间***
 领域
7. 在
 ***结束时间***
 领域
8. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您将注意到该节点创建了一个新的网络研讨会。
 



![使用GoToWebinar节点创建新的网络研讨会](https://d33wubrfki0l68.cloudfront.net/0a0673067195ee39678e00ebb937eb88482d6b6a/a205e/_images/integrations/builtin/app-nodes/gotowebinar/gotowebinar_node.png)



### 
 3. GoToWebinar1节点（更新：网络研讨会）
 [#](#3-gotowebinar1-node-update-webinar "永久链接")



 此节点将更新我们在上一节点中创建的网络研讨会的描述。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***资源***
 下拉列表。
3. 从
 ***操作***
 下拉列表。
4. 单击
 ***网络研讨会密钥***
 字段并单击
 ***添加表达式***
 .
5. 在
 ***变量选择器***
 部分：当前节点>输入数据>JSON>webinarKey。还可以添加以下表达式：
 `｛｛$json[“webinarKey”]｝｝`
 .
6. 单击
 ***添加字段***
 按钮，然后从下拉列表中选择“描述”。
7. 在
 ***说明***
 领域
8. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您将注意到该节点更新了我们在上一个节点中创建的网络研讨会的描述。
 



![使用GoToWebinar节点更新网络研讨会](https://d33wubrfki0l68.cloudfront.net/2ae87ab1e520e72b3d3e57ac930bf8c19b7a0590/31789/_images/integrations/builtin/app-nodes/gotowebinar/gotowebinar1_node.png)



### 
 4. GoToWebinar2节点（获取：网络研讨会）
 [#](#4-gotowebinar2-node-get-webinar "永久链接")



 此节点将获取有关我们先前创建的网络研讨会的信息。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***资源***
 下拉列表。
3. 从
 ***操作***
 下拉列表。
4. 单击
 ***网络研讨会密钥***
 字段并单击
 ***添加表达式***
 .
5. 在
 ***变量选择器***
 部分：节点>GoToWebinar>输出数据>JSON>webinarKey。还可以添加以下表达式：
 `｛｛$node[“GoToWebinar”].json[“webinarKey”]｝｝`
 .
6. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您会注意到节点返回了有关网络研讨会的信息。
 



![使用GoToWebinar节点获取网络研讨会的信息](https://d33wubrfki0l68.cloudfront.net/668860a3e629199cf4694154b1264fd1f0aebf34/bc59f/_images/integrations/builtin/app-nodes/gotowebinar/gotowebinar2_node.png)





