


 AWS和SNS
 [#](#aws-sns "永久链接")
=========================================



[AWS和SNS](https://aws.amazon.com/sns/) 
 是作为Amazon Web Services的一部分提供的通知服务。它提供了一个低成本的基础设施，用于主要向移动用户大规模传递消息。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/aws/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*将消息发布到主题



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您使用AWS SNS发布消息。您还可以找到
 [工作流](https://n8n.io/workflows/501) 
 在网站上。此示例使用工作流将使用以下两个节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 AWS SNS




 最终的工作流应如下图所示。
 



![AWS SNS节点的工作流](https://d33wubrfki0l68.cloudfront.net/cc5551bb3b67212ddf931f367075aa63a2b5643d/8847c/_images/integrations/builtin/app-nodes/awssns/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. AWS SNS节点
 [#](#2-aws-sns-node "永久链接")


1. 首先，您必须输入AWS SNS节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/aws/）
 .
2. 在
 *主题*
 下拉列表。您可以在AWS SNS中找到如何创建新主题的说明
 [此处](https://docs.aws.amazon.com/sns/latest/dg/sns-tutorial-create-topic.html) 
 .
3. 在
 *主题*
 领域
4. 在
 *消息*
 领域
5. 单击
 *执行节点*
 以运行工作流。




