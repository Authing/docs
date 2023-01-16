


 Yourls公司公司
 [#](#yourls "永久链接")
=======================================



[你的](http://yourls.org/) 
 是一个免费的开源软件，允许您运行URL缩短服务。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/yourls/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*网址
	+展开URL
	+缩短URL
	+获取一个短URL的统计信息



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您创建短URL并获取URL的统计信息。您还可以找到
 [工作流](https://n8n.io/workflows/815) 
 此示例使用工作流使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Yourls




 最终的工作流应如下图所示。
 



![具有Yourls节点的工作流](https://d33wubrfki0l68.cloudfront.net/190274ea87b647c4e7ea6cd522d7881d5874d347/c7256/_images/integrations/builtin/app-nodes/yourls/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. Yourls节点（缩写：url）
 [#](#2-yourls-node-shorten-url "永久链接")



 此节点将为我们指定的链接创建一个短URL。
 


1. 首先，您必须输入Yourls节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/yourls/）
 .
2. 在
 ***网址***
 字段。
3. 单击
 ***添加字段***
 然后选择“标题”。
4. 在
 ***标题***
 领域
5. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到节点为您指定的URL创建了一个短URL。
 



![使用Yourls节点创建短URL](https://d33wubrfki0l68.cloudfront.net/86e189b5f1f269b88180e85ce486f29f96e84f03/54542/_images/integrations/builtin/app-nodes/yourls/yourls_node.png)



### 
 3. Yourls1节点（stats:url）
 [#](#3-yourls1-node-stats-url "永久链接")



 此节点将提供我们指定的短URL的统计信息。我们将获得在上一步中创建的URL的统计信息。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***操作***
 下拉列表。
3. 单击
 ***短URL***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 部分：节点>Yourls>输出数据>JSON>shorturl。还可以添加以下表达式：
 `｛｛$node[“Yourls”].json[“shorturl”]｝｝`
 .
5. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您将注意到该节点为我们提供了在上一个节点中创建的短URL的统计信息。
 



![使用Yourls节点获取短URL的统计信息](https://d33wubrfki0l68.cloudfront.net/4cf2ff56265a1cee440bbbf43ad8dcb7af71c2e2/73e3f/_images/integrations/builtin/app-nodes/yourls/yourls1_node.png)





