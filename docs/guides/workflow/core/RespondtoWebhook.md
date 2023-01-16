


 响应Webhook
 [#](#响应webhook "永久链接")
===============================================================



 这个
 *响应Webhook*
 节点可以用于具有
 [Webhook]（/integrations/builtin/core-nodes/n8n-nodes-base.Webhook/）
 节点。它允许控制对传入webhook的响应。在Webhook节点中
 **使用“响应Webhook”节点**
 选项需要在
 **响应**
 的下拉列表
 *响应Webhook*
 节点工作。
 




 表达
 



 使用时
 [expressions]（/code-examples/expressions/）
 这个
 *响应Webhook*
 节点将只为输入数据中的第一项运行
 




 节点引用
 [#](#节点引用 "永久链接")
-------------------------------------------------------



 该节点通过
 **回复**
 字段：
 


***第一个传入项目**
 ：用第一个传入项的JSON响应。
***文本**
 ：使用在
 **响应机构**
 领域
***JSON**
 ：使用
 **响应机构**
 领域
***二进制**
 ：使用在
 **响应数据源**
 领域
***无数据**
 ：未发送响应负载。



 可用选项：
 


***响应代码**
 ：设置
 [响应代码](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) 
 使用。
***响应标头**
 ：定义要发送的响应标头。



 工作流行为
 [#](#工作流行为 "永久链接")
---------------------------------------------------------------



 使用
 *响应Webhook*
 节点，工作流的行为如下：
 


*当工作流完成而不执行
 *响应Webhook*
 节点，返回具有200状态的标准消息。
*如果一秒钟
 *响应Webhook*
 节点在第一个节点之后执行，它将被忽略。
*如果工作流在第一个
 *响应Webhook*
 节点被执行时，返回一条状态为500的错误消息。
*如果
 *响应Webhook*
 节点已执行，但没有webhook
 *响应Webhook*
 节点被忽略。



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许在接收GET请求时提供HTML页面。您可以找到完整的工作流
 [这里是n8n.io](https://n8n.io/workflows/1306) 
 。示例工作流使用以下节点：
 


*[Webhook]（/integrations/builtin/core-nodes/n8n-nodes-base.Webhook/）
*响应Webhook



![使用响应Webhook节点的工作流](https://d33wubrfki0l68.cloudfront.net/d4339e7fb2936c122340d191a0eec9468358b251/cdfe9/_images/integrations/builtin/core-nodes/respondtowebhook/workflow.png)



### 
 1. Webhook节点
 [#](#1-webhook-node "永久链接")



 此节点将接收传入请求（例如，当使用浏览器打开webhook URL时）。
 


1. 在
 **路径**
 字段，例如
 `我的表单`
 .
2. 选择
 **使用“响应Webhook”节点**
 选项
 **响应**
 下拉列表。
3. 单击
 **执行节点**
 以运行节点。
4. 打开
 **测试URL**
 在下面的字段
 **Webhook URL**
 在新的浏览器选项卡中。



![Webhook节点](https://d33wubrfki0l68.cloudfront.net/3f422d90d5bd69c763b196f6a792944eece1121b/e2c3f/_images/integrations/builtin/core-nodes/respondtowebhook/webhook_节点。png)



### 
 2. 响应Webhook节点
 [#](#2-响应到webhook-node "永久链接")



 此节点将定义对上一步骤中接收的请求的响应。
 


1. 连接
 *网络挂钩*
 从上一步骤到新步骤的节点
 *响应Webhook*
 节点。
2. 选择
 **文本**
 中的选项
 **回复**
 下拉列表。
3. 在
 **响应机构**
 字段（例如
 [引导入门模板](https://getbootstrap.com/docs/5.1/getting-started/introduction/#starter-模板）
 ).
4. 单击
 **添加选项**
 >
 **响应标头**
 >
 **添加响应标题**
 向响应添加标头。
5. 输入
 `内容类型`
 在
 **姓名**
 字段和
 `text/html；字符集=UTF-8 `
 在新标题的值字段中。
6. 关闭
 *响应Webhook*
 modal并单击
 **执行工作流**
 按钮
7. 打开
 **测试URL**
 来自
 *网络挂钩*
 节点。浏览器现在应该显示在
 **响应机构**
 的字段
 *响应Webhook*
 node.



![响应Webhook节点](https://d33wubrfki0l68.cloudfront.net/3708ed85ff9ac201d92b586192b0f3738d14d1bb/e5581/_images/integrations/builtin/core-nodes/respondtowebhook/respond_to_webhook_node.png)





