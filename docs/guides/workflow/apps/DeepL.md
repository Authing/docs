


 深度L
 [#](#deepl "永久链接")
=====================================



[深度](https://deepL.com) 
 是一种机器翻译服务，允许您将文本翻译成不同的语言。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/depl/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*语言
	+翻译数据



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您将鸡尾酒说明翻译为法语。您还可以找到
 [工作流](https://n8n.io/workflows/998) 
 此示例使用工作流使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 [HTTP请求]（/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/）
 -
 深度L




 最终的工作流应如下图所示。
 



![使用DeepL节点的工作流](https://d33wubrfki0l68.cloudfront.net/aa139739b1f7547e2d261ec11a380181ab9e3f93/3218e/_images/integrations/builtin/app-nodes/deepl/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下“开始”节点存在。
 


### 
 2. HTTP请求节点（GET）
 [#](#2-http-request-node-get "永久链接")



 此节点将向API发出GET请求
 `https://www.thecocktaildb.com/api/json/v1/1/random.php` 
 随便拿一杯鸡尾酒。此信息将传递到工作流中的下一个节点。
 


1. 输入
 `https://www.thecocktaildb.com/api/json/v1/1/random.php` 
 在
 ***网址***
 领域
2. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您将注意到节点向API发出GET请求，并返回有关随机鸡尾酒的信息。
 



![使用HTTP请求节点获取有关随机鸡尾酒的信息](https://d33wubrfki0l68.cloudfront.net/671ae54d5ebaba1e76ef4790eb51620f0161d7aa/35c5e/_images/integrations/builtin/app-nodes/deepl/httprequest_node.png)



### 
 3. DeepL节点（翻译：语言）
 [#](#3-depl-node-translate-language "永久链接")



 这个节点将把我们从上一个节点得到的鸡尾酒指令翻译成法语。要用您的语言翻译说明，请选择您的语言。
 


1. 首先，您必须输入DeepL节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/depl/）
 .
2. 单击
 ***文本***
 字段并单击
 ***添加表达式***
 .
3. 在
 ***变量选择器***
 部分：当前节点>输入数据>JSON>饮料>[item:0]>strInstructions。还可以添加以下表达式：
 `｛｛$json[“饮料”][0][“strInstructions”]｝｝`
 .
4. 从
 ***目标语言***
 下拉列表。
5. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您会注意到节点将鸡尾酒的说明翻译为法语。
 



![使用DeepL节点将指令翻译成法语](https://d33wubrfki0l68.cloudfront.net/a0694be5a5e53012538bfea332dabadc825baa4f/9e813/_images/integrations/builtin/app-nodes/deepl/deepl_node.png)





