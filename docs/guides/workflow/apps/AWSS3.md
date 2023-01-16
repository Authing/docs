


 AWS S3
 [#](#aws-s3 "永久链接")
=======================================



[AWS S3](https://aws.amazon.com/s3/) 
 是Amazon Web Services提供的一种服务，通过Web服务接口提供对象存储。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/aws/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*铲斗
	+创建存储桶
	+删除存储桶
	+获取所有存储桶
	+在存储桶中搜索
*文件
	+复制文件
	+删除文件
	+下载文件
	+获取所有文件
	+上载文件
*文件夹
	+创建文件夹
	+删除文件夹
	+获取所有文件夹



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您在AWS S3上创建存储桶。您还可以找到
 [工作流](https://n8n.io/workflows/458) 
 在网站上。此示例使用工作流将使用以下两个节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 AWS S3




 最终的工作流应如下图所示。
 



![AWS S3节点的工作流](https://d33wubrfki0l68.cloudfront.net/a2d70e78c5a4900b50372068b5d1a83f62d3f24d/3950e/_images/integrations/builtin/app-nodes/awss3/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. AWS S3节点
 [#](#2-ws-s3节点 "永久链接")


1. 首先，您必须输入AWS S3节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/aws/）
 .
2. 从
 *资源*
 下拉列表。
3. 在
 *姓名*
 领域
4. 单击
 *执行节点*
 以运行工作流。




