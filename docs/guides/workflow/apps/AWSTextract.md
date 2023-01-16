


 AWS文本
 [#](#aws textract "永久链接")
===================================================



[AWS文本](https://aws.amazon.com/textract/) 
 是一种从任何文档中提取打印文本、手写体和数据的服务。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/aws/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*分析收据或发票



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您从AWS S3中存储的发票中提取数据。您还可以找到
 [工作流](https://n8n.io/workflows/1282) 
 此示例使用工作流使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 [AWS S3]（/integrations/builtin/app nodes/n8n nodes-base.awsS3/）
 -
 AWS文本




 最终工作流如下图所示。
 



![使用AWS S3和AWS Textract节点的工作流](https://d33wubrfki0l68.cloudfront.net/60e9f5c16402630d94c47acd64eaf01d6665ff5e/eead1/_images/integrations/builtin/app-nodes/awstextract/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. AWS S3节点（下载：文件）
 [#](#2-aws-s3-node-download-file "永久链接")



 该节点将从S3存储桶检索带有收据的图像文件。
 


1. 选择AWS S3节点的凭据。看见
 [此处]（/integrations/builtin/credentials/aws/）
 有关如何创建这些凭据的信息。
2. 在
 ***Bucket名称***
 领域
3. 在
 ***文件密钥***
 领域
4. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您可以看到节点返回的文件。
 



![使用AWS S3节点获取存储在存储桶中的文件](https://d33wubrfki0l68.cloudfront.net/f60b3e6e99d7ba9090c3c28ebf7d04ff237a32dc/f6afd/_images/integrations/builtin/app-nodes/awstextract/awss3_node.png)



### 
 3. AWS Textract节点（analyzeExpense）
 [#](#3-aws-textract-node-analyzeexpense "永久链接")



 此节点将从上一节点返回的收据中提取数据。
 


1. 选择AWS凭据。
2. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您可以看到AWS Textract提取并由节点返回的收据数据。
 



![使用AWS Textract节点从收据中提取数据](https://d33wubrfki0l68.cloudfront.net/1929c4b7538af20a26033080fb67694bdfee9a9d/09c4f/_images/integrations/builtin/app-nodes/awstextract/awstextract_node.png)





