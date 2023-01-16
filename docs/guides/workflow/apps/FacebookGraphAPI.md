


 Facebook图表API
 [#](#facebook图表api "永久链接")
===============================================================



[脸书](https://www.facebook.com/) 
 是一个社交网站，可以方便地与家人和朋友在线连接和分享。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/facebookgraph/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------



**默认值**
 -获取
-柱，柱
-删除
 



**视频上传**
 -获取
-柱，柱
-删除
 


### 
 参数
 [#](#参数 "永久链接")


***主机URL**
 ：请求的主机URL。以下选项可用：
	+**默认值**
	 ：请求被传递到
	 `graphic.facebook.com`
	 主机URL。用于大多数请求。
	+**视频**
	 ：请求被传递到
	 `图形视频.facebook.com`
	 主机URL。仅用于视频上载请求。
***HTTP请求方法**
 ：用于此请求的方法，可从以下选项中选择：
	+**获取**
	+**员额**
	+**删除**
***图形API版本**
 ：的版本
 〔Facebook图表API〕(https://developers.facebook.com/docs/graph-api/changelog) 
 用于此请求。
***节点**
 ：要操作的节点，例如
 `/<page id>/feed`
 。在
 [官方Facebook开发者文档](https://developers.facebook.com/docs/graph-api/using-graph-api) 
 .
***边缘**
 ：要操作的节点的边缘。边表示附着到节点的对象集合。
***忽略SSL问题**
 ：即使无法进行SSL证书验证，也切换为仍然下载响应。
***发送二进制数据**
 ：可用于
 `帖子`
 操作。如果启用，二进制数据将作为正文发送。需要设置以下内容：
	+**二进制属性**
	 ：包含要上载的文件数据的二进制属性的名称。



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您在Facebook上检索配置文件的名字和姓氏。您还可以找到
 [工作流](https://n8n.io/workflows/514) 
 在网站上。此示例使用工作流将使用以下两个节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Facebook图表API




 最终的工作流应如下图所示。
 



![具有Facebook Graph API节点的工作流](https://d33wubrfki0l68.cloudfront.net/9e5e720e6a6242fa757b6ee2ef43787d47c4bb41/61cf1/_images/integrations/builtin/app-nodes/facebookgraphapi/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. Facebook Graph API节点
 [#](#2-facebook-graph-api-node "永久链接")


1. 首先，您必须输入Facebook Graph API节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/facebookgraph/）
 .
2. 输入
 `我`
 在
 *节点*
 领域
3. 单击
 *添加选项*
 按钮，然后从下拉列表中选择“字段”。
4. 单击
 *添加字段*
 按钮并输入
 `第一个名称`
 在
 *姓名*
 领域
5. 单击
 *添加字段*
 按钮并输入
 `姓氏`
 在
 *姓名*
 领域
6. 单击
 *执行节点*
 以运行工作流。




