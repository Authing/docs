


 谷歌图书
 [#](#google books "永久链接")
===================================================



[谷歌图书](https://books.google.com) 
 是谷歌提供的在线浏览、购买或借阅书籍的服务。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/google/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*书架
	+检索指定用户的特定书架资源
	+获取指定用户的所有公共书架资源
*书架卷
	+向书架添加卷
	+清除书架中的所有卷
	+获取指定用户的特定书架中的所有卷
	+在书架中移动卷
	+从书架中删除卷
*体积
	+根据ID获取卷资源
	+获取按查询筛选的所有卷



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您获取卷并使用谷歌图书节点将其添加到书架。您还可以找到
 [工作流](https://n8n.io/workflows/771) 
 此示例使用工作流使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Google Books




 最终的工作流应如下图所示。
 



![使用Google Books节点的工作流](https://d33wubrfki0l68.cloudfront.net/bca4fea890024abe8835c0e19e5b4e62363d811b/f414b/_images/integrations/builtin/app-nodes/googlebooks/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下“开始”节点存在。
 


### 
 2. 谷歌图书节点（get:volume）
 [#](#2-google-books-node-get-volume "永久链接")



 此节点将从Google Books检索卷。
 


1. 从
 ***身份验证***
 下拉列表。
2. 输入Google Books节点的凭据。您可以了解如何为此节点输入凭据
 [此处]（/integrations/builtin/credentials/google/）
 .
3. 在
 ***卷ID***
 字段。
4. 单击
 ***执行节点***
 以运行工作流。



 在下面的屏幕截图中，您将看到节点检索我们指定的卷的信息。
 



![使用Google Books节点检索卷的信息](https://d33wubrfki0l68.cloudfront.net/1db39302ed2356c73084091d2296bda36bf50414/6707c/_images/integrations/builtin/app-nodes/googlebooks/googlebooks_node.png)



### 
 3. Google Books1节点（添加：书架卷）
 [#](#3-google-books1-node-add-bookshelfvolume "永久链接")



 这个节点将把我们从上一个节点获得的卷添加到GoogleBooks中的书架。
 


1. 在
 ***身份验证***
 领域
2. 选择在上一个Google Books节点中输入的凭据。
3. 从
 ***资源***
 下拉列表。
4. 从
 ***操作***
 下拉列表。
5. 在
 ***身份证号码***
 领域
6. 单击
 ***卷ID***
 字段并单击
 ***添加表达式***
 .
7. 在
 ***变量选择器***
 section:Nodes>Google Books>Output Data>JSON>id。您还可以添加以下表达式：
 `｛｛$node[“Google Books”].json[“id”]｝｝`
 .
8. 单击
 ***执行节点***
 以运行工作流。



 在下面的屏幕截图中，您会注意到这个节点将我们从上一个节点获得的卷添加到我们指定的书架中。
 



![使用Google Books节点将卷添加到书架卷](https://d33wubrfki0l68.cloudfront.net/08d85ec5b45d1b5e57c0b14e3929231d903bae1f/f1f38/_images/integrations/builtin/app-nodes/googlebooks/googlebooks1_node.png)



### 
 4. Google Books2节点（getAll:书架卷）
 [#](#4-google-books2-node-getall-bokshelfvolume "永久链接")



 此节点将返回书架中的所有卷。
 


1. 在
 ***身份验证***
 领域
2. 选择在上一个Google Books节点中输入的凭据。
3. 从
 ***资源***
 下拉列表。
4. 从
 ***操作***
 下拉列表。
5. 切换
 ***我的图书馆***
 为真。这将返回您帐户的信息。
6. 单击
 ***书架ID***
 字段并单击
 ***添加表达式***
 .
7. 在
 ***变量选择器***
 部分：节点>Google Books1>参数>shelfId。还可以添加以下表达式：
 `｛｛$node[“Google Books1”].prarameter[“shelfId”]｝｝`
 .
8. 单击
 ***执行节点***
 以运行工作流。



 在下面的屏幕截图中，您将注意到该节点返回我们指定的书架中的所有卷。
 



![使用Google Books节点获取书架中的所有卷](https://d33wubrfki0l68.cloudfront.net/466ad4504d8f841cf10b24303a464aecaf3b9c08/b6513/_images/integrations/builtin/app-nodes/googlebooks/googlebooks2_node.png)





