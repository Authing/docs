


 Mindee公司公司
 [#](#mindee "永久链接")
=======================================



[明迪](https://mindee.com) 
 开发基于API的产品，用于从任何类型的图像中即时提取信息并将其转换为可用数据。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/mindee/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------



**发票**
 -预测
 



**收据**
 -预测
 



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您使用Mindee节点从收据图像中提取信息。您还可以找到
 [工作流](https://n8n.io/workflows/702) 
 此示例使用工作流使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 [HTTP请求]（/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/）
 -
 Mindee




 最终的工作流应如下图所示。
 



![具有Mindee节点的工作流](https://d33wubrfki0l68.cloudfront.net/f64466ff3c540376d616a66516ac578d5970b4c5/73c70/_images/integrations/builtin/app-nodes/mindee/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下“开始”节点存在。
 


### 
 2. HTTP请求（GET）
 [#](#2-http-request-get "永久链接")



 此示例工作流使用HTTP请求节点发出GET请求以下载收据的图像。也可以使用其他节点，例如
 [Box]（/integrations/builtin/app nodes/n8n nodes-base.Box/）
 节点，以获取要使用的收据的图像。
 


1. 在
 ***网址***
 领域例如
 `https://miro.medium.com/max/1400/0*1T9GkAb93w5NSMsf`
 .
2. 从
 ***响应格式***
 下拉列表。
3. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您将注意到HTTP请求节点从URL下载图像。此图像（二进制数据）现在可以由工作流中的其他节点使用。
 



![使用HTTP请求节点获取文件](https://d33wubrfki0l68.cloudfront.net/dd2a9c33d657bdc9c86f5af94026b3cd09e8b4f1/b24f0/_images/integrations/builtin/app-nodes/mindee/httprequest_node.png)



### 
 3. Mindee节点（预测：接收）
 [#](#3-minde-node-predict-recept "永久链接")



 该节点将从HTTP请求节点获取收据的图像（二进制数据），并从中提取信息。
1. 从
 ***资源***
 下拉列表。
2. 您必须输入Mindee节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/mindee/）
 .
3. 单击
 ***执行节点***
 以运行工作流。
 



 在下面的截图中，您将注意到该节点从从HTTP请求节点获得的图像中提取信息。
 



![使用Mindee节点从收据中提取信息](https://d33wubrfki0l68.cloudfront.net/eb264f68377468f90a19b37e377c54bd2b984e67/7e5e3/_images/integrations/builtin/app-nodes/mindee/mindee_node.png)





