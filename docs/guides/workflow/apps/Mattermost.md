


 Mattermost公司公司
 [#](#mattermost "永久链接")
===============================================



[最美](https://mattermost.org/) 
 是一个开源、可自行托管的在线聊天服务，具有文件共享、搜索和集成功能。它被设计为组织和公司的内部聊天。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credential/mattermost/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*渠道
	+将用户添加到频道
	+创建新频道
	+软删除频道
	+获取频道的成员页面
	+恢复软删除的频道
	+搜索频道
	+获取频道的统计信息
*消息
	+通过在数据库中将帖子标记为已删除，软删除帖子
	+将消息发布到频道
	+将短暂消息发布到频道
*反应
	+向帖子添加反应。
	+从帖子中删除反应
	+获取对一个或多个帖子的所有反应
*用户
	+创建新用户
	+通过归档用户对象来停用用户并撤消其所有会话。
	+检索所有用户
	+通过电子邮件获取用户
	+按ID获取用户
	+邀请用户加入团队



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您在Mattermost上创建频道、添加成员和向频道发布消息。您还可以找到
 [工作流](https://n8n.io/workflows/832) 
 此示例使用工作流使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Mattermost




 最终的工作流应如下图所示。
 



![具有Mattermost节点的工作流](https://d33wubrfki0l68.cloudfront.net/476ed2158c24a833621ccf5df9fecd30f4616209/5e0ca/_images/integrations/builtin/app-nodes/mattermost/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. 最底层节点（创建：通道）
 [#](#2模式节点创建通道 "永久链接")



 此节点将创建一个名为
 `文档`
 在马特莫斯特。如果要创建具有不同名称的频道，请输入该名称。
 


1. 首先，您必须输入Mattermost节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credential/mattermost/）
 .
2. 从
 ***资源***
 下拉列表。
3. 从
 ***团队ID***
 下拉列表。
4. 输入
 `文档`
 在
 ***显示名称***
 领域
5. 输入
 `文档`
 在
 ***姓名***
 领域
6. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点创建了一个名为
 `文档`
 在马特莫斯特。
 



![使用Mattermost节点创建频道](https://d33wubrfki0l68.cloudfront.net/eaf1473562c758061a43e964caab504cf61f2982/d930c/_images/integrations/builtin/app-nodes/mattermost/mattermost_node.png)



### 
 3. Mattermost1节点（addUser:channel）
 [#](#3-mattermost1-node-adduser-channel "永久链接")



 此节点将向我们在上一个节点中创建的通道添加一个成员。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***资源***
 下拉列表。
3. 从
 ***操作***
 下拉列表。
4. 单击
 ***通道ID***
 字段并单击
 ***添加表达式***
 .
5. 在
 ***变量选择器***
 section:Nodes>Mattermost>Output Data>JSON>id。您还可以添加以下表达式：
 `｛｛$node[“Mattermost”].json[“id”]｝｝`
 .
6. 从
 ***用户ID***
 下拉列表。
7. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点向我们在上一个节点中创建的频道添加了一个用户。
 



![使用Mattermost节点将用户添加到频道](https://d33wubrfki0l68.cloudfront.net/ea291175f2a349419bf523cb4103e559c951d589/79293/_images/integrations/builtin/app-nodes/mattermost/mattermost1_node.png)



### 
 4. Mattermost2节点（发布：消息）
 [#](#4-mattermost2-node-post-message "永久链接")



 该节点将向我们使用Mattermost节点创建的频道发布一条消息。
 


1. 选择在上一个节点中输入的凭据。
2. 单击
 ***通道ID***
 字段并单击
 ***添加表达式***
 .
3. 在
 ***变量选择器***
 section:Nodes>Mattermost>Output Data>JSON>id。您还可以添加以下表达式：
 `｛｛$node[“Mattermost”].json[“id”]｝｝`
 .
4. 在
 ***消息***
 字段。
5. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点向我们在Mattermost节点中创建的频道发布了一条消息。
 



![使用Mattermost节点向频道发布消息](https://d33wubrfki0l68.cloudfront.net/c2d397162451269e8c8d75c49e27c979191e9e09/64bd0/_images/integrations/builtin/app-nodes/mattermost/mattermost2_node.png)




 常见问题解答
 [#](#faqs "永久链接")
-----------------------------------


### 
 如何解决
 ***通道ID***
 领域
 [#](#how-do-i-resolve-the-error-for-the-channel-id-field "永久链接")



 如果您不是系统管理员，可能会出现错误
 `从服务器加载参数选项时出现问题：“最严重的错误响应：您没有适当的权限。”`
 旁边的
 ***通道ID***
 领域
 



 如果系统管理员已授予您
 `后期处理：频道`
 权限，即使出现错误，也可以成功执行节点。
 


### 
 如何查找频道ID？
 [#](#how-do-i-find-the-channel-id "永久链接")



 要在Mattermost中查找频道ID，请执行以下操作llow the steps mentioned below.
 


1. Select the channel from the left sidebar.
2. Click on the channel name on the top and select 'View Info' from the dropdown list.
3. Use the displayed
 ***ID***
 in n8n.




