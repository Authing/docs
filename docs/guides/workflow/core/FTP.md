


 文件传输协议
 [#](#ftp "永久链接")
=================================



 文件传输协议节点用于访问文件并将文件上载到FTP服务器。
 




 凭据
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/ftp/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*删除文件
*下载文件
*列出文件夹的内容
*将内容从旧路径重命名/移动到新路径
*上载文件



**注：**
 要附加文件以进行上载，您需要使用其他节点，例如
 [读取二进制文件]（/integrations/builtin/core nodes/n8n nodes base.redbinaryfile/）
 节点或
 [HTTP请求]（/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/）
 节点将文件作为数据属性传递。
 



 节点参考
 [#](#节点引用 "永久链接")
-------------------------------------------------------


****协议：***
 一个下拉列表，用于在FTP或SFTP协议之间进行选择。
****路径：***
 用于指定要连接到的远程路径的字段。
****递归：***
 可用于包括所有子目录和文件的切换。



 示例用法

 [#](#示例用法 "永久链接")
 
-----------------------------------------------------



 此工作流允许您将文件上载到FTP服务器，并使用FTP节点获取所有文件的列表。您还可以找到
 [工作流](https://n8n.io/workflows/663) 
 此示例使用工作流将使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 [HTTP请求]（/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/）
 -
 FTP




 最终的工作流应如下图所示。
 



![具有FTP节点的工作流](https://d33wubrfki0l68.cloudfront.net/bdac88dc423dbd9ff654fb0b275d80773d92e14b/ef227/_images/integrations/builtin/core-nodes/ftp/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. HTTP请求节点
 [#](#2-http-request-node "永久链接")


1. 在
 ***网址***
 领域
2. 选择
 ***文件***
 来自
 ***响应格式***
 下拉列表。
3. 单击
 ***执行节点***
 以运行节点。



![使用HTTP请求节点下载文件](https://d33wubrfki0l68.cloudfront.net/35d3af8682f9c58331065946180ac276829341a8/ad7fc/_images/integrations/builtin/core-nodes/ftp/httprequest_node.png)



### 
 3. FTP节点（FTP:upload）
 [#](#3-ftp-node-ftp-upload "永久链接")


1. 首先，您必须输入FTP节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/ftp/）
 .
2. 选择
 ***上载***
 来自
 ***操作***
 下拉列表。
3. 在
 ***路径***
 领域
4. 单击
 ***执行节点***
 以运行节点。



![使用FTP节点上载文件](https://d33wubrfki0l68.cloudfront.net/63ca8ad580a30c3733aae52ac04ed489a3cd994a/8b465/_images/integrations/builtin/core-nodes/ftp/ftp_node.png)



### 
 4. FTP1节点（ftp:list）
 [#](#4-ftp1-node-ftp-list "永久链接")


1. 选择在上一个节点中输入的凭据。
2. 选择
 ***列表***
 来自
 ***操作***
 下拉列表。
3. 在
 ***路径***
 字段。
4. 单击
 ***执行节点***
 以运行节点。



![使用FTP节点获取文件列表](https://d33wubrfki0l68.cloudfront.net/03597f9997182d976d420f2ff491c483d9d5462d/3b79e/_images/integrations/builtin/core-nodes/ftp/ftp1_node.png)





