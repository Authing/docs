


 Reddit公司公司
 [#](#reddit "永久链接")
=======================================



[重新编辑](https://www.reddit.com) 
 是一个社交新闻聚合、网络内容分级和讨论网站。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credential/reddit/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*岗位
	+向子插件提交帖子
	+从子插件中删除文章
	+从subreddit获取帖子
	+从子插件获取所有帖子
	+在子Reddit或所有Reddit中搜索帖子。
*发表评论
	+在文章中创建顶级评论
	+检索帖子中的所有评论
	+从帖子中删除评论
	+在帖子中回复评论
*个人资料
	+获取
*子层
	+检索有关子插件的背景信息。
	+从所有Reddit检索有关subreddit的信息。
*用户
	+获取



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您在Reddit上创建帖子并向该帖子添加评论。您还可以找到
 [工作流](https://n8n.io/workflows/928) 
 此示例使用工作流使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Reddit




 最终的工作流应如下图所示。
 



![具有Reddit节点的工作流](https://d33wubrfki0l68.cloudfront.net/eae4d3b9e3698bffee1d118c2810c5594b02c71f/bcd3c/_images/integrations/builtin/app-nodes/reddit/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下“开始”节点存在。
 


### 
 2. Reddit节点（创建：发布）
 [#](#2-redit-node-create-post "永久链接")



 此节点将在subreddit下创建帖子
 `n8n`
 。如果要在其他子reddit下创建文章，请输入该子reddit的名称。
 


1. 首先，您必须输入Reddit节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credential/reddit/）
 .
2. 输入
 `n8n`
 在
 ***子层***
 领域
3. 在
 ***标题***
 领域
4. 在
 ***文本***
 领域
5. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您会注意到该节点在subreddit下创建了一个新帖子
 `n8n`
 .
 



![使用Reddit节点创建帖子](https://d33wubrfki0l68.cloudfront.net/dd8af81861d249d027a1d75a0add32981dfe948b/89c19/_images/integrations/builtin/app-nodes/reddit/reddit_node.png)



### 
 3. Reddit1节点（get:post）
 [#](#3-redit1-node-get-post "永久链接")



 此节点将检索我们使用上一个节点创建的帖子。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***操作***
 下拉列表。
3. 单击
 ***子层***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 部分：节点>Reddit>参数>subreddit。还可以添加以下表达式：
 `｛｛$node[“Reddit”].prarameter[“subreddit”]｝｝`
 .
5. 单击
 ***岗位ID***
 字段并单击
 ***添加表达式***
 .
6. 在
 ***变量选择器***
 部分：当前节点>输入数据>JSON>id。您还可以添加以下表达式：
 `｛｛$json[“id”]｝｝`
 .
7. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您将注意到该节点返回了我们在上一个节点中创建的帖子的信息。
 



![使用Reddit节点获取帖子](https://d33wubrfki0l68.cloudfront.net/ed6becd23e7281d13596c28ae5c2b37d08af506c/a0893/_images/integrations/builtin/app-nodes/reddit/reddit1_node.png)



### 
 4. Reddit节点（创建：postComment）
 [#](#4-reddit-node-create-postcomment "永久链接")



 此节点将向我们之前创建的帖子添加注释。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***资源***
 下拉列表。
3. 单击
 ***岗位ID***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 部分：当前节点>输入数据>JSON>id。您还可以添加以下表达式：
 `｛｛$json[“id”]｝｝`
 .
5. 在
 ***注释文本***
 领域
6. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您会注意到节点对我们之前创建的帖子进行了评论。
 



![使用Reddit节点创建注释](https://d33wubrfki0l68.cloudfront.net/94954894f5f884e750aa9e60eb0c08dd806c34db/b07ef/_images/integrations/builtin/app-nodes/reddit/reddit2_node.png)





