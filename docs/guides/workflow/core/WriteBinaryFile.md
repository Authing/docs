


 写入二进制文件
 [#](#写入二进制文件 "永久链接")
=============================================================



 写入二进制文件节点用于将文件写入运行n8n的主机。
 




 牢记
 


1. 如果您在Docker中运行n8n，那么您的命令将在n8n容器上运行，而不是在Docker主机上运行。



1. 此节点将查找与n8n安装路径相关的文件。建议使用绝对文件路径以防止任何错误。



 节点参考
 [#](#节点引用 "永久链接")
-------------------------------------------------------


1. ***文件名***
 field：此字段指定文件应写入的路径以及文件名。
2. ***物业名称***
 field：要将读取文件的数据写入的二进制属性的名称。



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您使用“写入二进制文件”节点将文件写入主机。您还可以找到
 [工作流](https://n8n.io/workflows/590) 
 在网站上。此示例使用工作流将使用以下三个节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 [HTTP请求]（/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/）
 -
 Write Binary File




 最终的工作流应如下图所示。
 



![具有“写入二进制文件”节点的工作流](https://d33wubrfki0l68.cloudfront.net/d625b4dae162734d95472bd3a34ab0d12fcf749c/f009f/_images/integrations/builtin/core-nodes/writebinaryfile/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. HTTP请求节点
 [#](#2-http-request-node "永久链接")


1. 输入
 `https://docs.n8n.io/assets/img/n8n-logo.png` 
 在
 ***网址***
 领域
2. 从
 ***响应格式***
 下拉列表。
3. 单击
 ***执行节点***
 以运行节点。



![使用HTTP请求节点获取图像](https://d33wubrfki0l68.cloudfront.net/f0bb5c51e3df093637aedfc2a4a8d04e5fe1d9a9/b64a1/_images/integrations/builtin/core-nodes/writebinaryfile/httprequest_node.png)



### 
 3. 写入二进制文件节点
 [#](#3-写入二进制文件-代码 "永久链接")


1. 在
 ***文件名***
 领域
2. 单击
 ***执行节点***
 以运行节点。




