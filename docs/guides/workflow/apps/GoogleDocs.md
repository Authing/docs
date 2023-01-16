


 谷歌文件
 [#](#google docs "永久链接")
=================================================



[谷歌文档](https://docs.google.com) 
 是一款基于网络的文字处理器，是谷歌办公软件套件的一部分，属于谷歌硬盘服务。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/google/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*文件
	+创建
	+获取
	+更新



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您创建新的Google文档并向其中添加所需的文本。此示例使用工作流使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 谷歌文件




 最终的工作流应如下图所示。
 



![使用Google Docs节点的工作流](https://d33wubrfki0l68.cloudfront.net/0c76ea4f8af5d39d4193f10929079fa959f74297/c8a17/_images/integrations/builtin/app-nodes/googledocs/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下“开始”节点存在。
 


### 
 2. Google Docs节点-创建
 [#](#2-google-docs-node-create "永久链接")



 这个
 **文件**
 默认情况下选择资源。按如下方式配置其余参数：
 


1. 从
 **身份验证**
 下拉选择所需的方法和相应的
 [**凭据**]（/integrations/builtin/Credentials/google/）
 .
2. 从
 **操作**
 下拉选择
 **创建**
 .
3. 从
 **驱动器**
 下拉列表选择要在其中创建此文件的驱动器。默认情况下选择“我的驱动器”。
4. 从
 **文件夹**
 下拉列表选择将在其中创建此文件的驱动器文件夹。根文件夹(
 `/` 
 )默认选中。
5. 在
 **标题**
 字段输入新Google Doc的名称。



![使用Google Docs节点创建文件](https://d33wubrfki0l68.cloudfront.net/8d73a1de37ccc4fc2d3b3b41b2f7020dca0ba084/5387e/_images/integrations/builtin/app-nodes/googledocs/googledocs_node.png)



### 
 3. Google Docs节点-更新
 [#](#3-google-docs-node-update "永久链接")



 这个
 **文件**
 默认情况下选择资源。按如下方式配置其余参数：
 


1. 从
 **操作**
 下拉选择
 **更新**
 .
2. 在
 **文档ID或URL**
 字段中，输入上一节点创建的文件的文档ID或URL。
3. 发件人
 **行动**
 ，按如下方式配置字段：
	***对象：**
	 选择动作的对象。这里我们使用“文本”。
	***操作：**
	 选择要对对象执行的操作。这里我们使用“插入”。
	***插入段：**
	 选择应在文档中执行操作的位置。这里我们使用“身体”。
	***插入位置：**
	 选择选定段内的位置。这里我们使用“在特定位置的末尾”。
	***文本：**
	 输入要插入的文本。



![使用Google Docs节点更新文件中的文本](https://d33wubrfki0l68.cloudfront.net/e29bc138e162d37bddca6d4ef20f1bbee77bc644/b9ecd/_images/integrations/builtin/app-nodes/googledocs/googledocs1_node.png)





