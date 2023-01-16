


 弹性研究
 [#](#弹性搜索 "永久链接")
=====================================================



[弹性搜索](https://www.elastic.co/) 
 是一个分布式、免费、开放的搜索和分析引擎，适用于所有类型的数据，包括文本、数字、地理空间、结构化和非结构化数据。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credential/elasticsearch/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*文件
	+创建文档
	+删除文档
	+获取文档
	+获取所有文档
	+更新文档
*索引
	+创建
	+删除
	+获取
	+全部获取（Get All）



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您获取选定索引的所有文档。此示例使用工作流使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 弹性研究




 最终的工作流应如下图所示。
 



![具有Elasticsearch节点的工作流](https://d33wubrfki0l68.cloudfront.net/784c82845a8a18ae75ac56bece33729800902876/a68fc/_images/integrations/builtin/app-nodes/elasticsearch/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下“开始”节点存在。
 


### 
 2. 弹性搜索节点
 [#](#2-elasticsearch-node "永久链接")


1. 首先输入Elasticsearch节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credential/elasticsearch/）
 .
2. 选择
 **文件**
 来自
 ***资源***
 下拉列表。
3. 选择
 **全部获取**
 来自
 ***操作***
 下拉列表。
4. 在
 ***索引ID***
 领域
5. 单击
 ***执行节点***
 以运行节点。



![使用Elasticsearch节点](https://d33wubrfki0l68.cloudfront.net/f6c717f087535ec8dbc12ec350a0a8dda70a9c2a/2ef22/_images/integrations/builtin/app-nodes/elasticsearch/elasticsearch_node.png)





