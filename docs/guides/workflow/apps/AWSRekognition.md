


 AWS重新确认
 [#](#aws reognition "永久链接")
=========================================================



[AWS重新确认](https://aws.amazon.com/rekognition/) 
 允许您将图像和视频分析添加到应用程序中。通过AWS重新确认，您可以识别图像中的人脸、标签和名人。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/aws/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------



**图像**



*分析



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您使用AWS Rekognition节点从图像中检测人脸。您还可以找到
 [工作流](https://n8n.io/workflows/694) 
 此示例使用工作流使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 [HTTP请求]（/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/）
 -
 AWS Rekognition




 最终的工作流应如下图所示。
 



![AWS Rekognition节点的工作流](https://d33wubrfki0l68.cloudfront.net/57e34c9450654710974bbebdce4839ebec574587/24513/_images/integrations/builtin/app-nodes/awsrekognition/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下“开始”节点存在。
 


### 
 2. HTTP请求节点（GET）
 [#](#2-http-request-node-get "永久链接")



 此示例工作流使用HTTP请求节点从URL获取图像。您也可以使用
 [读取二进制文件]（/integrations/builtin/core nodes/n8n nodes base.redbinaryfile/）
 节点从指定的路径读取图像文件。
 


1. 在
 ***网址***
 领域例如
 `https://n8n.io/_nuxt/img/04c67e5.png` 
 .
2. 从
 ***响应格式***
 下拉列表。
3. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到HTTP请求节点从URL获取图像。此图像作为二进制数据传递给工作流中的下一个节点。
 



![使用HTTP请求节点从URL获取图像](https://d33wubrfki0l68.cloudfront.net/0c3cade0ffcdb44637aad93845a1a155f0503334/5720b/_images/integrations/builtin/app-nodes/awsrekognition/httprequest_node.png)



### 
 3. AWS Rekognition节点（分析：图像）
 [#](#3-aws-rekognition-node-analyze-image "永久链接")



 该节点将检测我们在上一个节点中获取的图像中的人脸。您还可以使用此节点分析存储在AWS Bucket中的图像。
 


1. 首先，您必须输入AWS Rekognition节点的凭据。您可以了解如何为此节点输入凭据
 [此处]（/integrations/builtin/credentials/aws/）
 .
2. 设置
 ***二进制数据***
 到
 `真值`
 .
3. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您将看到节点检测到我们从HTTP请求节点获得的图像中的人脸。
 



![使用AWS Rekognition节点检测图像中的人脸](https://d33wubrfki0l68.cloudfront.net/9dfc0488f4ecc0e4e54bcb06a5319ec71b4e8f73/2aa80/_images/integrations/builtin/app-nodes/awsrekognition/awsrekognition_node.png)





