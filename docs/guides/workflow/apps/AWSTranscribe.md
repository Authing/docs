


 AWS转录
 [#](#aws转录 "永久链接")
=======================================================



[AWS转录](https://aws.amazon.com/transcribe/) 
 是一种识别音频或视频中的语音并将该语音转录为文本的服务。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/aws/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------



**转录作业**
 -创建转录作业
-删除转录作业
-获取转录作业
-获取所有转录作业
 



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您为AWS S3中存储的所有音频和视频文件创建转录作业。您还可以找到
 [工作流](https://n8n.io/workflows/1111) 
 此示例使用工作流使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 [AWS S3]（/integrations/builtin/app nodes/n8n nodes-base.awsS3/）
 -
 AWS转录




 最终的工作流应如下图所示。
 



![具有AMQP Sender节点的工作流](https://d33wubrfki0l68.cloudfront.net/c2c2aa59704f7361a90bed25ff512793d4d4f610/38021/_images/integrations/builtin/app-nodes/awstranscribe/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. AWS S3节点（getAll:file）
 [#](#2-aws-s3-node-getal-file "永久链接")



 该节点将从您指定的S3存储桶中检索所有文件。
 


1. 首先，您必须输入AWS S3节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/aws/）
 .
2. 从
 ***操作***
 下拉列表。
3. 在
 ***Bucket名称***
 领域
4. 切换
 ***全部返回***
 到
 `真值`
 。此选项将返回存储在S3存储桶中的所有文件的信息。
5. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您将注意到节点返回存储在您指定的存储桶中的所有文件的信息。
 



![使用AWS S3节点获取存储在存储桶中的文件信息](https://d33wubrfki0l68.cloudfront.net/609a70139391bf5fa8e0b74b23a2b0277cb4b92f/245cb/_images/integrations/builtin/app-nodes/awstranscribe/awss3_node.png)



### 
 3. AWS转录节点（创建：transcriptionJob）
 [#](#3-aws-transcript-node-create-transcriptionjob "永久链接")



 此节点将为上一节点返回的文件创建转录作业。
 


1. 选择在上一个节点中输入的凭据。
2. 单击
 ***作业名称***
 字段并单击
 ***添加表达式***
 .
3. 输入
 `｛｛$json[“Key”].replace（/\s/g，'-'）｝｝`
 在
 ***表达式***
 领域代码段获取文件名，并用连字符（-）替换空格。
4. 单击
 ***媒体文件URI***
 字段并单击
 ***添加表达式***
 .
5. 输入
 `s3：//｛｛$node[“AWS s3”].prarameter[“bucketName”]｝｝/｛｛$json[“Key”]｝｝
 在
 ***表达式***
 领域
6. 切换
 ***检测语言***
 到
 `真值`
 .
7. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您将注意到节点为存储在S3存储桶中的文件创建了一个转录作业。
 



![使用AWS转录节点创建转录作业](https://d33wubrfki0l68.cloudfront.net/0e6619b78b3bf1c484107d3fefa55b4c3768334d/95560/_images/integrations/builtin/app-nodes/awstranscribe/awstranscribe_node.png)





