


 LingwaNex公司
 [#](#lingvanex "永久链接")
=============================================



[LingwaNex公司](https://lingvanex.com) 
 是一项在英语和超过112种其他语言之间翻译文本、网页、图像文本、文档的服务。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/lingvanex/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*翻译数据



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您将鸡尾酒说明翻译为意大利语。您还可以找到
 [工作流](https://n8n.io/workflows/797) 
 此示例使用工作流使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 [HTTP请求]（/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/）
 -
 LingvaNex




 最终的工作流应如下图所示。
 



![LingvaNex节点的工作流](https://d33wubrfki0l68.cloudfront.net/68b5307cd2164d11affaa7bd8a4aab2f061722f5/a4ef0/_images/integrations/builtin/app-nodes/lingvanex/workflow.png)



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
 



![使用HTTP请求节点获取有关随机鸡尾酒的信息](https://d33wubrfki0l68.cloudfront.net/a71f9a766c170a936721e9ef9d30846fa4c3243b/c886e/_images/integrations/builtin/app-nodes/lingvanex/httprequest_node.png)



### 
 3. LingvaNex节点
 [#](#3-lingvanex-node "永久链接")



 这个节点将把我们从上一个节点得到的鸡尾酒指令翻译成意大利语。要用您的语言翻译说明，请选择您的语言。
 


1. 首先，您必须输入LingvaNex节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/lingvanex/）
 .
2. 单击
 ***文本***
 字段并单击
 ***添加表达式***
 .
3. 在
 ***变量选择器***
 部分：节点>HTTP请求>输出数据>JSON>饮料>[item:0]>strInstructions。还可以添加以下表达式：
 `｛｛$node[“HTTP请求”].json[“饮料”][0][“strInstructions”]}｝`
 .
4. 从
 ***翻译为***
 下拉列表。
5. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您会注意到节点将鸡尾酒的说明翻译为意大利语。
 



![使用LingvaNex节点将指令翻译成意大利语](https://d33wubrfki0l68.cloudfront.net/a44c1a58563f393bd72bfbd24d4c2fcaff868586/1504e/_images/integrations/builtin/app-nodes/lingvanex/lingvanex_node.png)





