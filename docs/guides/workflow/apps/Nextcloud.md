


 下一个云
 [#](#nextcloud "永久链接")
=============================================



[下一个云](https://nextcloud.com/) 
 是一套免费的开源客户端服务器软件，用于创建和使用文件托管服务。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/nextcloud/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*文件
	+复制文件
	+删除文件
	+下载文件
	+移动文件
	+共享文件
	+上载文件
*文件夹
	+复制文件夹
	+创建文件夹
	+删除文件夹
	+返回给定文件夹的内容
	+移动文件夹
	+共享文件夹
*用户
	+邀请用户加入NextCloud组织
	+删除用户。
	+检索有关单个用户的信息。
	+检索用户列表。
	+编辑与用户相关的属性。



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您在下一个云中创建文件夹，将文件上载到该文件夹，并列出文件夹的内容。您还可以找到
 [工作流](https://n8n.io/workflows/620) 
 此示例使用工作流将使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Nextcloud
 -
 [HTTP请求]（/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/）




 最终的工作流应如下图所示。
 



![具有Nextcloud节点的工作流](https://d33wubrfki0l68.cloudfront.net/a11eb61dc17222877178cd55805215bd66ba557d/3d297/_images/integrations/builtin/app-nodes/nextcloud/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. Nextcloud节点（创建：文件夹）
 [#](#2-nextcloud-node-create-folder "永久链接")


1. 首先，您必须输入Nextcloud节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/nextcloud/）
 .
2. 从
 ***资源***
 下拉列表。
3. 在
 ***文件夹***
 领域
4. 单击
 ***执行节点***
 以运行节点。



![使用Nextcloud节点在Nextcloud中创建文件夹](https://d33wubrfki0l68.cloudfront.net/3c4878f44b2995dd3f7db4e78d64d63ef4d29cf3/79b4b/_images/integrations/builtin/app-nodes/nextcloud/nextcloud_node.png)



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
 以运行节点。



![使用HTTP请求节点获取要在Nextcloud中上载的文件](https://d33wubrfki0l68.cloudfront.net/853008b931e4274d23c12f5065fe3b96dedb3b34/7e0bd/_images/integrations/builtin/app-nodes/nextcloud/httprequest_node.png)



### 
 4. Nextcloud1节点（上传：文件）
 [#](#4-nextcloud1-node-upload-file "永久链接")


1. 选择您在Nextcloud节点中输入的凭据。
2. 输入在前面步骤中创建的Nextcloud文件夹的路径以及
 ***文件路径***
 领域
3. 设置
 ***二进制数据***
 切换为true。
4. 单击
 ***执行节点***
 以运行节点。



![使用Nextcloud节点在Nextcloud中上载文件](https://d33wubrfki0l68.cloudfront.net/ad906a6d3560a6024c0cf03706e6e9e6aaa80efd/f2134/_images/integrations/builtin/app-nodes/nextcloud/nextcloud1_node.png)



### 
 5. Nextcloud2节点（列表：文件夹）
 [#](#5-nextcloud2-node-list-folder "永久链接")


1. 选择您在Nextcloud节点中输入的凭据。
2. 从
 ***资源***
 下拉列表。
3. 从
 ***操作***
 下拉列表。
4. 输入在前面步骤中创建的Nextcloud文件夹的名称
 ***文件夹路径***
 领域
5. 单击
 ***执行节点***
 以运行节点。



![使用Nextcloud节点列出Nextcloud文件夹的内容](https://d33wubrfki0l68.cloudfront.net/73e78466fc983c11959f518fa48dff43b259d1e8/c8661/_images/integrations/builtin/app-nodes/nextcloud/nextcloud2_node.png)





