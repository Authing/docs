


 AWS理解
 [#](#aws理解 "永久链接")
=======================================================



[AWS理解](https://aws.amazon.com/comprehend/) 
 是一种自然语言处理（NLP）服务，它使用机器学习来发现文本中的见解和关系。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/aws/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------



**文本**



*识别主导语言
*分析文本的情感



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您分析通过Typeform提交收到的反馈的情绪，如果反馈是负面的，则在Mattermost上发送消息。您还可以找到
 [工作流](https://n8n.io/workflows/965) 
 此示例使用工作流使用以下节点。
-
 [Typeform Trigger]（/integrations/builtin/Trigger nodes/n8n nodes base.typeformtrigger/）
 -
 AWS理解
 -
 [IF]（/integrations/builtin/core nodes/n8n nodes base.IF/）
 -
 [Matermost]（/integrations/builtin/app nodes/n8n nodes-base.Mattermost/）
 -
 [无操作，不执行任何操作]（/integrations/builtin/core-nodes/n8n-nodes-base.noop/）




 最终的工作流应如下图所示。
 



![具有AWS理解节点的工作流](https://d33wubrfki0l68.cloudfront.net/b8aad30d3746aaee7e0da5aa25acef98922033e6/8cfa7/_images/integrations/builtin/app-nodes/awscomprehend/workflow.png)



### 
 1. 类型触发器节点
 [#](#1-typeform-trigger-node "永久链接")



 提交反馈表单时，此节点将触发工作流。确保为您的活动创建反馈表单。
 


1. 从
 ***身份验证***
 下拉列表。
2. 输入Typeform触发器节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/typeform/）
 .
3. 从
 ***表单***
 下拉列表。
4. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您会注意到，提交反馈时，节点会触发工作流。我们将将此反馈传递给工作流中的下一个节点。
 



![提交反馈表单时，使用Typeform触发器节点触发工作流](https://d33wubrfki0l68.cloudfront.net/a96d542f45d6f6d9b0f4a2006e58d5b1d82749a7/30f69/_images/integrations/builtin/app-nodes/awscomprehend/typeformtrigger_node.png)



### 
 2. AWS理解节点（detectSentiment:text）
 [#](#2-ws-comprehend-node-detectionsement-text "永久链接")



 此节点将分析我们从上一节点获得的反馈的情绪。我们将把分析分数传递给工作流中的下一个节点。
 


1. 首先，您必须输入AWS理解节点的凭据。您可以了解如何为此节点输入凭据
 [此处]（/integrations/builtin/credentials/aws/）
 .
2. 从
 ***操作***
 下拉列表。
3. 单击
 ***文本***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 部分：当前节点>输入数据>JSON>您对事件有何看法？还可以添加以下表达式：
 `｛｛$json[“您对该事件有何看法？”]｝｝`
 。如果您想分析不同问题的情绪，请选择该问题。
5. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您会注意到节点分析了反馈的情绪，并据此给出了分数。
 



![使用AWS理解节点分析情绪](https://d33wubrfki0l68.cloudfront.net/f8fa10310b83da28e264eab0f0da3bd74d65cdf6/d40ea/_images/integrations/builtin/app-nodes/awscomprehend/awscomprehend_node.png)



### 
 3. IF节点
 [#](#3-if-node "永久链接")



 此节点将检查我们从上一节点获得的情绪是否为负面。如果情绪是负面的，那么它将返回为真，否则为假。
 


1. 单击
 ***添加条件***
 并选择“字符串”。
2. 单击
 ***值1***
 字段并单击
 ***添加表达式***
 .
3. 在
 ***变量选择器***
 部分：当前节点>输入数据>JSON>情绪。还可以添加以下表达式：
 `｛｛$json[“情感”]｝｝`
 .
4. 输入
 `否定的`
 在
 ***值2***
 领域
5. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您将注意到节点检查我们从上一个节点接收到的情绪，并返回
 `真值`
 如果情绪是负面的。
 



![使用IF节点检查情绪](https://d33wubrfki0l68.cloudfront.net/2ed373909ae4eda5155d9aa2bcd60abedc210ee6/14e70/_images/integrations/builtin/app-nodes/awscomprehend/if_node.png)



### 
 4. 最底层节点（post:message）
 [#](#4-mattermost-node-post-message "永久链接")



 此节点将反馈和分析分数发送给
 `反馈`
 Mattermost频道。如果您有不同的频道，请改用该频道。
 


1. 创建一个连接到IF节点“true”输出的Mattermost节点。
2. 您必须输入Mattermost节点的凭据。您可以了解如何为此节点输入凭据
 [此处]（/integrations/builtin/credential/mattermost/）
 .
3. 从
 ***通道ID***
 下拉列表。
4. 单击
 ***消息***
 现场点击
 ***添加表达式***
 .
5. 在
 ***表达式***
 字段：
 <!-- `您获得了新的反馈，得分为{{$json[“SentimentScore”][“负面”]}}。下面是它所说的：{{$node[“Typeform Trigger”].json[“您对该事件有什么看法？”]}}` -->
 .
6. 单击
 ***执行节点***
 以运行工作流。



 在scr中eenshot below, you will notice that the node sends the feedback and the analysis score to the
 `feedback` 
 channel in Mattermost.
 



![Using the Mattermost node to send the feedback and the analysis score](https://d33wubrfki0l68.cloudfront.net/96f069d63d5b2eb5d27e9e0a646be43c22454a8d/d1b9f/_images/integrations/builtin/app-nodes/awscomprehend/mattermost_node.png)



### 
 5. NoOp node
 [#](#5-noop-node "Permanent link")



 Adding this node here is optional, as the absence of this node won't make a difference to the functioning of the workflow.
 


1. Create a
 ***NoOp***
 node connected to the 'false' output of the IF node.
2. Click on
 ***Execute Node***
 to run the node.



![Using the NoOp node](https://d33wubrfki0l68.cloudfront.net/5a59d41353bf8540418daff3ecb1c66c09e7b500/3aad2/_images/integrations/builtin/app-nodes/awscomprehend/noop_node.png)





 Activate workflow for production
 



 This example workflow uses the Typeform Trigger node. You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered when a new form is submitted.
 





