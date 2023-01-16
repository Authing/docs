


 德米奥
 [#](#demio "永久链接")
=====================================



[德米奥](https://demio.com) 
 提供简单、无需下载的网络研讨会体验，以及产生更好结果所需的所有营销工具。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/demio/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*事件
	+获取活动
	+获取所有事件
	+向某人注册活动
*报告
	+获取事件报告



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您通过类型form提交将观众注册到德米奥上的活动。您还可以找到
 [工作流](https://n8n.io/workflows/947) 
 此示例使用工作流使用以下节点。
-
 [Typeform Trigger]（/integrations/builtin/Trigger nodes/n8n nodes base.typeformtrigger/）
 -
 Demio




 最终的工作流应如下图所示。
 



![具有Demio节点的工作流](https://d33wubrfki0l68.cloudfront.net/465fef517b050df5905b7682276fb822701a8876/d956a/_images/integrations/builtin/app-nodes/demio/workflow.png)



### 
 1. 类型触发器节点
 [#](#1-typeform-trigger-node "永久链接")



 提交表单响应时，此节点将触发工作流。
 



 此示例工作流使用Typeform收集姓名和电子邮件地址。创建一个与
 [此](https://n8ndocsburner.typeform.com/to/dpr2kxSL) 
 对于示例工作流。以下是表格中的问题及其问题类型。
 




| 
 问题
  | 
 Type
  |
| --- | --- |
| 
 让我们从你的名字开始。
  | 
 短文本
  |
| 
 你的电子邮件地址是什么？
  | 
 电子邮件
  |


1. 首先，您必须输入Typeform触发器节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/typeform/）
 .
2. 从
 ***表单***
 下拉列表。
3. 单击
 ***执行节点***
 以运行工作流。



 在下面的屏幕截图中，您将注意到Typeform触发器节点触发工作流并返回用户提交的响应。
 



![使用Typeform触发器节点触发工作流](https://d33wubrfki0l68.cloudfront.net/f42283e8e127c10e26ff9a714ca95305c29d3eb1/a8711/_images/integrations/builtin/app-nodes/demio/typeformtrigger_node.png)



### 
 2. Demio节点（寄存器：事件）
 [#](#2-demio-node-register-event "永久链接")



 此节点将使用上一节点的信息为Demio上的事件注册用户。如果您在Demio上没有活动，请确保创建一个。
 


1. 首先，您必须输入Demio节点的凭据。您可以了解如何为此节点输入凭据
 [此处]（/integrations/builtin/credentials/demio/）
 .
2. 从
 ***操作***
 下拉列表。
3. 从
 ***事件ID***
 下拉列表。
4. 单击
 ***名字***
 字段并单击
 ***添加表达式***
 .
5. 在
 ***变量选择器***
 部分：当前节点>输入数据>JSON>让我们从您的名字开始。还可以添加以下表达式：
 `｛｛$json[“让我们从您的名字开始。”]｝｝`
 .
6. 单击
 ***电子邮件***
 字段并单击
 ***添加表达式***
 .
7. 在
 ***变量选择器***
 部分：当前节点>输入数据>JSON>您的电子邮件地址是什么？还可以添加以下表达式：
 `｛｛$json[“您的电子邮件地址是什么？”]｝｝`
 .
8. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到节点为Demio上的事件注册用户。
 



![使用Demio节点为事件注册用户](https://d33wubrfki0l68.cloudfront.net/e26edeeb2b6f441ea1c19300797996a260c41f75/ba456/_images/integrations/builtin/app-nodes/demio/demio_node.png)





 激活生产工作流
 



 此示例工作流使用Typeform触发器节点。您需要保存工作流，然后单击屏幕右上方的“激活”切换以激活工作流。提交新表单后，将触发您的工作流。
 





