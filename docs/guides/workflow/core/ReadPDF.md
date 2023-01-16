


 阅读PDF
 [#](#阅读pdf "永久链接")
===========================================



 “读取PDF”节点用于从PDF文档中读取数据并将其内容提取为文本。
 




 牢记
 



 您将需要使用其他节点，例如
 [读取二进制文件]（/integrations/builtin/core nodes/n8n nodes base.redbinaryfile/）
 节点或
 [HTTP请求]（/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/）
 节点，将图像文件作为数据属性传递给Read PDF节点。
 




 节点参考
 [#](#节点引用 "永久链接")
-------------------------------------------------------



 “读取PDF”节点有一个属性：
 


1. *二进制属性*
 field：此字段指定用于读取n8n中PDF文件的数据属性的名称。



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您使用“读取PDF”节点读取PDF文件。您还可以找到
 [工作流](https://n8n.io/workflows/585) 
 在网站上。此示例使用工作流将使用以下三个节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 [读取二进制文件]（/integrations/builtin/core nodes/n8n nodes base.redbinaryfile/）
 -
 PDF阅读




 最终的工作流应如下图所示。
 



![具有“读取PDF”节点的工作流](https://d33wubrfki0l68.cloudfront.net/3ca616352d60971130efc6685310c4b1a1ff69ca/89cf4/_images/integrations/builtin/core-nodes/readpdf/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. 读取二进制文件
 [#](#2-读取二进制文件 "永久链接")


1. 在
 *文件路径*
 领域


### 
 3. 阅读PDF节点
 [#](#3-read-pdf-node "永久链接")


1. 输入
 *属性名称*
 在
 *二进制属性*
 字段。
2. 单击
 *执行节点*
 以运行工作流。




