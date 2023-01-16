


 PostHog公司公司
 [#](#postog "永久链接")
=========================================



[邮政编码](https://posthog.com) 
 是一个开源产品分析平台。它提供了改进产品的工具，如会话记录、热图和功能标志。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/postog/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*别名
	+创建别名
*事件
	+创建事件
*身份
	+创建
*轨道
	+跟踪页面
	+跟踪屏幕



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您在请求webhook URL时在PostHog中创建事件。您还可以找到
 [工作流](https://n8n.io/workflows/968) 
 此示例使用工作流使用以下节点。
-
 [Webhook]（/integrations/builtin/core-nodes/n8n-nodes-base.Webhook/）
 -
 PostHog




 最终的工作流应如下图所示。
 



![具有PostHog节点的工作流](https://d33wubrfki0l68.cloudfront.net/837b6d2b93d413e6bab2a615600f88f74a308836/ef79c/_images/integrations/builtin/app-nodes/posthog/workflow.png)



### 
 1. Webhook节点
 [#](#1-webhook-node "永久链接")



 此节点将触发工作流。我们将向测试webhook URL发出GET请求，并传递一个名为
 `事件`
 .
 


1. 单击
 ***Webhook URL***
 并选择“测试”选项卡。
2. 复制显示的URL。稍后我们将对此URL发出GET请求。
3. 保存工作流以注册webhook。
4. 单击
 ***执行节点***
 以运行节点。
5. 在新的浏览器选项卡中，粘贴在上一步骤中复制的URL，然后追加
 `?事件=登录`
 您的URL应该与以下URL类似：
 `https://your-n8n.url/webhook/path?event=login` 
 。这里，我们将传递一个名为
 `事件`
 并分配值
 `登录名`
 这是一个很好的例子。
6. 按Enter（或Return）向测试webhook URL发出请求。



 在下面的屏幕截图中，您将注意到节点触发工作流并接收查询参数。我们将在工作流的下一个节点中使用查询参数的值。
 



![使用Webhook节点触发工作流](https://d33wubrfki0l68.cloudfront.net/afae9ce7b603f4d28a4a4b7ee9efa994d22ba6c2/8be9d/_images/integrations/builtin/app-nodes/posthog/webhook_node.png)



### 
 2. PostHog节点（创建：客户）
 [#](#2-posthog-node-createcustomer "永久链接")



 此节点将在PostHog中创建一个新事件。
 


1. 首先，您必须输入PostHog节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/postog/）
 .
2. 单击
 ***事件***
 字段并单击
 ***添加表达式***
 .
3. 在
 ***变量选择器***
 部分：当前节点>输入数据>JSON>查询>事件。还可以添加以下表达式：
 `｛｛$json[“查询”][“事件”]｝｝`
 .
4. 在
 ***不同的ID***
 领域
5. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您将注意到该节点在PostHog中创建了一个新事件。
 



![使用PostHog节点创建新事件](https://d33wubrfki0l68.cloudfront.net/a73cfb1fac0f09129a62262c6638b5f381a73b29/c8a03/_images/integrations/builtin/app-nodes/posthog/posthog_node.png)





 激活生产工作流
 



 此示例工作流使用Webhook节点，它是一个触发器节点。您需要保存工作流，然后单击屏幕右上方的“激活”切换以激活工作流。每当GET请求发送到
 ***生产***
 webhook URL。
 





