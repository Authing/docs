


 领英
 [#](#linkedin "永久链接")
===========================================



[链接](https://www.linkedin.com/) 
 是一项面向就业的在线服务。它主要用于职业网络，包括发布工作的雇主和发布简历的求职者。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credential/linkedin/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*岗位
	+创建新帖子




 记住
 



 如果作为组织过帐，请在URN字段中仅输入组织编号。例如
 `03262013` 
 不
 `urn:li：公司：03262013`
 .
 




 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您从URL获取图像并将其发布到领英上。您还可以找到
 [工作流](https://n8n.io/workflows/681) 
 此示例使用工作流将使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 [HTTP请求]（/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/）
 -
 LinkedIn




 最终的工作流应如下图所示。
 



![具有LinkedIn节点的工作流](https://d33wubrfki0l68.cloudfront.net/988a45846b7c69b870ff7340328c24e41ea7030f/fbe52/_images/integrations/builtin/app-nodes/linkedin/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. HTTP请求节点
 [#](#2-http-request-node "永久链接")


1. 在
 ***网址***
 领域
2. 选择
 ***文件***
 来自
 ***响应格式***
 下拉列表。
3. 单击
 ***执行节点***
 以运行节点。



![使用HTTP请求节点下载图像](https://d33wubrfki0l68.cloudfront.net/0917c55eefa8b0fa28454f8da747fea90fda56b9/dac9f/_images/integrations/builtin/app-nodes/linkedin/httprequest_node.png)



### 
 3. LinkedIn节点
 [#](#3-链接-节点 "永久链接")


1. 首先，您必须输入LinkedIn节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credential/linkedin/）
 .
2. 从
 ***发布为***
 下拉列表。
3. 从
 ***人员***
 下拉列表。
4. 在
 ***文本***
 领域
5. 从
 ***媒体类别***
 下拉列表。
6. 单击
 ***执行节点***
 以运行节点。



![使用LinkedIn节点发布](https://d33wubrfki0l68.cloudfront.net/b1f1ff6f532b83750505668665f4042fbfc33200/f42f0/_images/integrations/builtin/app-nodes/linkedin/linkedin_node.png)





