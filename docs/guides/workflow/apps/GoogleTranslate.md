


 谷歌翻译
 [#](#google翻译 "永久链接")
===========================================================



[谷歌翻译](https://translate.google.com/) 
 是谷歌开发的免费多语言翻译服务，用于将文本和网站从一种语言翻译成另一种语言。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/google/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*语言
	+翻译数据



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您使用Google翻译节点将文本从英语翻译为德语。您还可以找到
 [工作流](https://n8n.io/workflows/743) 
 在网站上。此示例使用工作流使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 谷歌翻译




 最终的工作流应如下图所示。
 



![具有Google翻译节点的工作流](https://d33wubrfki0l68.cloudfront.net/97d65ddf8b500e93106c4ae209d9be134a17b920/5d448/_images/integrations/builtin/app-nodes/googletranslate/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. 谷歌翻译节点（翻译：语言）
 [#](#2-google-translate-node-translatelanguage "永久链接")



 此节点将翻译文本
 `来自n8n的您好
 德语。您可以输入不同的文本，也可以选择另一种语言来翻译文本。
 


1. 从
 ***身份验证***
 下拉列表。
2. 接下来，您必须输入Google Translate节点的凭据。您可以了解如何为此节点输入凭据
 [此处]（/integrations/builtin/credentials/google/）
 .
3. 输入文本
 `来自n8n的您好
 在
 ***文本***
 领域
4. 从
 ***翻译为***
 下拉列表。DE是德语的语言代码。您可以参考
 [语言支持](https://cloud.google.com/translate/docs/languages) 
 查看所有支持的语言及其对应的语言代码列表。
5. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您会注意到节点翻译了文本
 `来自n8n的您好
 德语。
 



![使用谷歌翻译节点翻译德语文本](https://d33wubrfki0l68.cloudfront.net/73a498761f44bc290420cf2a0db85a9496999b00/49102/_images/integrations/builtin/app-nodes/googletranslate/googletranslate_node.png)





