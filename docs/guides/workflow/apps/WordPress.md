


 WordPress
 [#](#wordpress "永久链接")
=============================================



[WordPress](https://wordpress.org/) 
 是一个用PHP编写的免费开源内容管理系统，与MySQL或MariaDB数据库配对。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/wordpress/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*岗位
	+创建帖子
	+获取帖子
	+获取所有帖子
	+更新帖子
*用户
	+创建用户
	+获取用户
	+获取所有用户
	+更新用户



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您在WordPress中创建和更新帖子。您还可以找到
 [工作流](https://n8n.io/workflows/668) 
 此示例使用工作流将使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 WordPress




 最终的工作流应如下图所示。
 



![使用WordPress节点的工作流](https://d33wubrfki0l68.cloudfront.net/511be6eb2ba0819199645cf63d80974a3f20f4ba/c0206/_images/integrations/builtin/app-nodes/wordpress/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. Wordpress节点（创建：post）
 [#](#2命令press-node-create-post "永久链接")


1. 首先，您必须输入WordPress节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/wordpress/）
 .
2. 在
 ***标题***
 领域
3. 单击
 ***执行节点***
 以运行工作流。



![使用WordPress节点创建新帖子](https://d33wubrfki0l68.cloudfront.net/3d0135768fd555c22271a72890a383d2113452fe/8dfd7/_images/integrations/builtin/app-nodes/wordpress/wordpress_node.png)



### 
 3. Wordpress1节点（更新：post）
 [#](#3-wordpress1-node-update-post "永久链接")


1. 选择在上一个节点中输入的凭据。
2. 从
 ***操作***
 下拉列表。
3. 单击
 ***岗位ID***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 section:Nodes>Wordpress>Output Data>JSON>id。您还可以添加以下表达式：
 `｛｛$node[“Wordpress”].json[“id”]｝｝`
 .
5. 单击
 ***添加字段***
 按钮，然后从下拉列表中选择“内容”。
6. 在
 ***内容***
 提出。
7. 单击
 ***执行节点***
 以运行工作流。



![使用WordPress节点更新帖子](https://d33wubrfki0l68.cloudfront.net/5fe30b901a0e6f9c469921a3394514e3aa4e9a27/6f048/_images/integrations/builtin/app-nodes/wordpress/wordpress1_node.png)





