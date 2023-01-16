


 谷歌视角
 [#](#google视角 "永久链接")
===============================================================



[谷歌视角](https://www.perspectiveapi.com/) 
 是一个免费的API，它使用机器学习来识别“有毒”评论，从而更容易在网上主持更好的对话。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/google/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*分析注释



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您分析评论中的脏话。此示例使用工作流使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 谷歌视角




 最终的工作流应如下图所示。
 



![使用Google Perspective节点的工作流](https://d33wubrfki0l68.cloudfront.net/5b4b749f8debf569036df49d59edc5ca2b00f6c7/e10f2/_images/integrations/builtin/app-nodes/googleperspective/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下“开始”节点存在。
 


### 
 2. Google透视节点
 [#](#2-google-perspective-node "永久链接")


1. 首先输入Google Perspective节点的凭据。您可以了解如何为此节点输入凭据
 [此处]（/integrations/builtin/credentials/google/）
 .
2
 **分析评论**
***操作***
 默认选中。
3. 在
 ***文本***
 字段输入要分析的注释。
4. 从
 ***属性***
 截面单击
 **添加属性**
 .
	*对于
	 ***属性名称***
	 选择
	 **亵渎**
	 .
	*对于
	 ***得分阈值***
	 离开
	 **0.00** 
	 默认设置返回所有分数。
5. 单击
 **执行节点**
 以运行工作流。



![谷歌透视节点](https://d33wubrfki0l68.cloudfront.net/293a1768b5c06d8e5e71c8380711e3800d9ce783/71e4a/_images/integrations/builtin/app-nodes/googleperspective/googleperspective_node.png)





