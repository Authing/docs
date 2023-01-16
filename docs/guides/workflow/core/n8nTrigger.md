


 n8n触发器
 [#](#n8n触发器 "永久链接")
=================================================



 n8n触发器节点在n8n实例启动或重新启动时被触发。n8n触发器节点可用于通知n8n实例何时启动。
 



 节点参考
 [#](#节点引用 "永久链接")
-------------------------------------------------------


*事件
	+***实例已启动：***
	 n8n实例启动或重新启动时触发



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您在n8n实例启动时在Mattermost上接收消息。您还可以找到
 [工作流](https://n8n.io/workflows/1058) 
 此示例使用工作流使用以下节点。
-
 n8n触发器
 -
 [Matermost]（/integrations/builtin/app nodes/n8n nodes-base.Mattermost/）




 最终的工作流应如下图所示。
 



![具有Webhook节点的工作流](https://d33wubrfki0l68.cloudfront.net/b261c54522e9fb1f6eda1ddc3708417a609adf54/fcddc/_images/integrations/builtin/core-nodes/n8ntrigger/workflow.png)



### 
 1. n8n触发器节点
 [#](#1-n8n-trigger-node "永久链接")



 n8n触发器节点将在n8n启动时触发工作流。
 


1. 从
 ***事件***
 下拉列表。



 在下面的屏幕截图中，您将注意到，当n8n实例启动时，节点会触发工作流。
 



![使用n8n触发器节点触发工作流](https://d33wubrfki0l68.cloudfront.net/338d1fd6be23c26c1b721e4e2259d16effca83a7/7f795/_images/integrations/builtin/core-nodes/n8ntrigger/n8ntrigger_node.png)



### 
 2. 最底层节点（post:message）
 [#](#2-mattermost-node-post-message "永久链接")



 此节点将在
 `工作流`
 Mattermost上的频道。
 


1. 首先，您必须输入Mattermost节点的凭据。您可以了解如何为此节点输入凭据
 [此处]（/integrations/builtin/credential/mattermost/）
 .
2. 从
 ***通道ID***
 下拉列表。
3. 单击
 ***消息***
 现场点击
 ***添加表达式***
 .
4. 在
 ***表达式***
 字段：
 `n8n实例开始于｛｛$json[“timestamp”]｝｝。`
 .
5. 单击
 ***执行节点***
 以运行工作流。



 在下面的屏幕截图中，您会注意到节点向Mattermost发送了一条消息。
 



![使用Mattermost节点向频道发送消息](https://d33wubrfki0l68.cloudfront.net/ade6556356f322e2094ec41f1673e95d97bee65b/f2795/_images/integrations/builtin/core-nodes/n8ntrigger/mattermost_node.png)





 激活生产工作流
 



 此示例工作流使用n8n触发器节点，它是一个触发器节点。您需要保存工作流，然后单击屏幕右上方的“激活”切换以激活工作流。
 





