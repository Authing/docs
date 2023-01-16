


 谷歌硬盘
 [#](#google驱动器 "永久链接")
===================================================



[谷歌硬盘](https://drive.google.com) 
 是由Google开发的文件存储和同步服务。它允许用户在服务器上存储文件、跨设备同步文件和共享文件。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/google/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*驱动器
	+创建驱动器
	+删除驱动器
	+获取驱动器
	+列出所有驱动器
	+更新驱动器
*文件
	+复制文件
	+删除文件
	+下载文件
	+列出文件和文件夹
	+共享文件
	+更新文件
	+上载文件
*文件夹
	+创建文件夹
	+删除文件夹
	+共享文件夹



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您从谷歌硬盘下载文件。您还可以找到
 [工作流](https://n8n.io/workflows/515) 
 在网站上。此示例使用工作流使用以下两个节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Google Drive
 -
 [写入二进制文件]（/integrations/builtin/core nodes/n8n nodes base.writebinaryfile/）




 最终的工作流应如下图所示。
 



![使用Google Drive节点的工作流](https://d33wubrfki0l68.cloudfront.net/99dfbbf13513213c0127a3b1ef8f802269c9c151/8e636/_images/integrations/builtin/app-nodes/googledrive/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下“开始”节点存在。
 


### 
 2. Google Sheets节点
 [#](#2-google-sheets-node "永久链接")


1. 首先，您必须输入Google Drive节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/google/）
 ，在“Google Drive/Sheets API”部分。
2. 从
 *身份验证*
 下拉列表。
3. 从
 *操作*
 下拉列表。
4. 复制位于
 `/日期/`
 和
 `/编辑`
 在您的Google Drive URL中。将该字符串粘贴到
 *文件ID*
 领域


### 
 3. 写入二进制文件节点
 [#](#3-写入二进制文件-代码 "永久链接")


1. 在
 *文件名*
 领域
2. 单击
 *执行节点*
 以运行工作流。



 常见问题解答
 [#](#faqs "永久链接")
-----------------------------------


### 
 如何列出文件夹中的所有文件/文件夹？
 [#](#how-do-i-list-all-filesfolders-within-a-folder "永久链接")



 要列出文件夹中的所有文件和文件夹，请执行以下步骤。
 


1. 切换
 ***使用查询字符串***
 到
 `真值`
 .
2. 复制位于
 `https://drive.google.com/drive/u/0/folders/` 
 。此字符串是文件夹ID。
3. 输入
 `父级中的'FOLDER_ID'
 在
 ***查询字符串***
 领域代替
 `文件夹ID `
 使用在上一步骤中复制的文件夹ID。



 有几个其他选项可用于细化列出的结果。提到
 [搜索文件和文件夹：Querystring](https://developers.google.com/drive/api/v3/search-files#query_string_examples) 
 了解更多信息。
 




