


 下拉框
 [#](#下拉框 "永久链接")
=========================================



[下拉框](https://dropbox.com) 
 是一种基于云的文件存储和共享服务，可通过多个设备访问。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/dropbox/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*文件
	+复制文件
	+删除文件
	+下载文件
	+移动文件
	+上载文件
*文件夹
	+复制文件夹
	+创建文件夹
	+删除文件夹
	+返回给定文件夹中的文件和文件夹
	+移动文件夹
*搜索
	+查询



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您在下拉框中创建文件夹，将文件上载到该文件夹，并列出文件夹的内容。您还可以找到
 [工作流](https://n8n.io/workflows/615) 
 此示例使用工作流使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Dropbox
 -
 [HTTP请求]（/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/）




 最终的工作流应如下图所示。
 



![具有Dropbox节点的工作流](https://d33wubrfki0l68.cloudfront.net/81866c730c7ec1a51e91dd9185be412ef5d93971/31cce/_images/integrations/builtin/app-nodes/dropbox/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下“开始”节点存在。
 


### 
 2. Dropbox节点（创建：文件夹）
 [#](#2-dropbox-node-create-folder "永久链接")


1. 首先，您必须输入Dropbox节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/dropbox/）
 .
2. 从
 ***资源***
 下拉列表。
3. 在
 ***文件夹***
 领域
4. 单击
 ***执行节点***
 以运行工作流。



![使用Dropbox节点在Dropbox中创建文件夹](https://d33wubrfki0l68.cloudfront.net/c4c44e4f35159de42539e8fdfca97a712bf869a5/f281a/_images/integrations/builtin/app-nodes/dropbox/dropbox_node.png)



### 
 3. HTTP请求节点（GET）
 [#](#3-http-request-node-get "永久链接")


1. 输入
 `https://n8n.io/n8n-logo.png` 
 在
 ***网址***
 领域
2. 从
 ***响应格式***
 下拉列表。
3. 单击
 ***执行节点***
 以运行工作流。



![使用HTTP请求节点获取要在Dropbox中上载的文件](https://d33wubrfki0l68.cloudfront.net/b26caaee32e18b0a2ce8c97ecb4155241323cd72/063e0/_images/integrations/builtin/app-nodes/dropbox/httprequest_node.png)



### 
 4. Dropbox1节点（上传：文件）
 [#](#4-dropbox1-node-upload-file "永久链接")


1. 选择在Dropbox节点中输入的凭据。
2. 输入在前面步骤中创建的Dropbox文件夹的路径以及
 ***文件路径***
 领域
3. 设置
 ***二进制数据***
 切换为true。
4. 单击
 ***执行节点***
 以运行节点。



![使用Dropbox节点在Dropbox中上载文件](https://d33wubrfki0l68.cloudfront.net/eac0f59e3f2be2dc068d70f4dfba1ce40a890d9e/b54ed/_images/integrations/builtin/app-nodes/dropbox/dropbox1_node.png)



### 
 5. Dropbox2节点（列表：文件夹）
 [#](#5-dropbox2-node-list-folder "永久链接")


1. 选择在Dropbox节点中输入的凭据。
2. 从
 ***资源***
 下拉列表。
3. 从
 ***操作***
 下拉列表。
4. 输入在前面步骤中创建的Dropbox文件夹的路径
 ***文件夹路径***
 领域
5. 单击
 ***执行节点***
 以运行节点。



![使用Dropbox节点列出Dropbox文件夹的内容](https://d33wubrfki0l68.cloudfront.net/647c023323a42bdaef1485a8d1f43130b3f280f4/9fd86/_images/integrations/builtin/app-nodes/dropbox/dropbox2_node.png)





