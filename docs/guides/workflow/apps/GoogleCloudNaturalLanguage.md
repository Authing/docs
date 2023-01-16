


 谷歌云自然语言
 [#](#谷歌云自然语言 "永久链接")
=====================================================================================



[谷歌云自然语言](https://cloud.google.com/natural-language/) 
 使用机器学习来揭示文本的结构和意义。您可以提取有关人员、地点和事件的信息，并更好地了解社交媒体情绪和客户对话。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/google/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*文件
	+分析情绪



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您分析通过Typeform提交收到的反馈的情绪，如果反馈是负面的，则在Mattermost上发送消息。您还可以找到
 [工作流](https://n8n.io/workflows/786) 
 此示例使用工作流使用以下节点。
-
 [Typeform Trigger]（/integrations/builtin/Trigger nodes/n8n nodes base.typeformtrigger/）
 -
 谷歌云自然语言
 -
 [IF]（/integrations/builtin/core nodes/n8n nodes base.IF/）
 -
 [Matermost]（/integrations/builtin/app nodes/n8n nodes-base.Mattermost/）
 -
 [无操作，不执行任何操作]（/integrations/builtin/core-nodes/n8n-nodes-base.noop/）




 最终的工作流应如下图所示。
 



![使用谷歌云自然语言节点的工作流](https://d33wubrfki0l68.cloudfront.net/b498d77dc9978cd8f0051531bd8ca8dfe7105b8f/b2648/_images/integrations/builtin/app-nodes/googlecloudnaturallanguage/workflow.png)



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
 ![提交反馈表单时，使用Typeform触发器节点触发工作流](https://d33wubrfki0l68.cloudfront.net/35fc087d1b3486a1aae620b7ab987dbf16fb967d/c4ca3/_images/integrations/builtin/app-nodes/googlecloudnaturallanguage/typeformtrigger_node.png)



### 
 2. 谷歌云自然语言节点（analyzeSentiment:document）
 [#](#2-google-cloud-natural-language-node-analyzement-document "永久链接")



 此节点将分析我们从上一节点获得的反馈的情绪。我们将把分析分数传递给工作流中的下一个节点。
 


1. 首先，您必须输入Google Cloud自然语言节点的凭据。您可以了解如何为此节点输入凭据
 [此处]（/integrations/builtin/credentials/google/）
 .
2. 单击
 ***内容***
 字段并单击
 ***添加表达式***
 .
3. 在
 ***变量选择器***
 部分：节点>类型触发器>输出数据>JSON>您对事件有何看法？还可以添加以下表达式：
 `｛｛$node[“Typeform Trigger”].json[“您对事件有什么看法？”]｝｝`
 。如果您想分析不同问题的情绪，请选择该问题。
4. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您会注意到节点分析了反馈的情绪，并据此给出了分数。
 



![使用谷歌云自然语言节点分析情感](https://d33wubrfki0l68.cloudfront.net/d2b8a624ed75696554526e926c4419254e8bb0e0/91fde/_images/integrations/builtin/app-nodes/googlecloudnaturallanguage/googlecloudnaturallanguage_node.png)



### 
 3. IF节点
 [#](#3-if-node "永久链接")



 此节点将检查我们从上一节点获得的分数是否小于
 `0` 
 。如果分数小于
 `0` 
 ，否则返回true。
 


1. 单击
 ***添加条件***
 然后选择“数字”。
2. 单击
 ***值1***
 字段并单击
 ***添加表达式***
 .
3. 在
 ***变量选择器***
 部分：节点>谷歌云自然语言>输出数据>JSON>文档情感>分数。还可以添加以下表达式：
 `｛｛$node[“谷歌云自然语言”].json[“documentSensition”][“score”]｝｝`
 .
4. 从
 ***操作***
 下拉列表。
5. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到节点检查我们从上一个节点收到的分数是否小于
 `0` 
 .
 



![使用IF节点检查分数是否小于0](https://d33wubrfki0l68.cloudfront.net/9fe4bdf79713d17c781ff261d823953166e19e0b/63806/_images/integrations/builtin/app-nodes/googlecloudnaturallanguage/if_node.png)



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
 ***Message***
 field click on
 ***Add Expression***
 .
5. Enter the following message in the
 ***Expression***
 field:
 `You got a new feedback with a score of {{$node["Google Cloud Natural Language"].json["documentSentiment"]["score"]}}. Here is what it says:{{$node["Typeform Trigger"].json["What did you think about the event?"]}}` 
 .
6. Click on
 ***Execute Node***
 to run the workflow.



 In the screenshot below, you will notice that the node sends the feedback and the analysis score to the
 `Feedback` 
 channel in Mattermost.
 



![Using the Mattermost node to send the feedback and the analysis score](https://d33wubrfki0l68.cloudfront.net/3d8929ce35d7185af36cf28754150802bd579bc3/7a47e/_images/integrations/builtin/app-nodes/googlecloudnaturallanguage/mattermost_node.png)



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



![Using the NoOp node](https://d33wubrfki0l68.cloudfront.net/5a59d41353bf8540418daff3ecb1c66c09e7b500/d92c8/_images/integrations/builtin/app-nodes/googlecloudnaturallanguage/noop_node.png)





 Activate workflow for production
 



 This example workflow uses the Typeform Trigger node. You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered when a new form is submitted.
 





