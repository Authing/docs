


 AWS Lambda公司公司
 [#](#aws lambda "永久链接")
===============================================



[AWS Lambda](https://aws.amazon.com/lambda/) 
 是一个事件驱动的无服务器计算平台，由Amazon作为Amazon Web Services的一部分提供。它是一种计算服务，运行代码以响应事件，并自动管理代码所需的计算资源。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/aws/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*调用函数



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您使用AWS Lambda调用函数。您还可以找到
 [工作流](https://n8n.io/workflows/510) 
 在网站上。此示例使用工作流将使用以下两个节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 AWS Lambda




 最终的工作流应如下图所示。
 



![AWS Lambda节点的工作流](https://d33wubrfki0l68.cloudfront.net/aeebc722e76ce2d75488612318d311e6704a0658/3837d/_images/integrations/builtin/app-nodes/awslambda/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. AWS Lambda节点
 [#](#2-aws-lambda-node "永久链接")


1. 首先，您必须输入AWS Lambda节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/aws/）
 .
2. 选择要从
 *功能*
 下拉列表。
3. 单击
 *执行节点*
 以运行工作流。




