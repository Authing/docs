


 Microsoft Excel
 [#](#microsoft excel "永久链接")
=========================================================



[Microsoft Excel]（Microsoft Excel）(https://office.live.com/start/excel.aspx) 
 是Microsoft开发的电子表格。它具有计算、绘图工具、数据透视表和一种称为Visual Basic for Applications的宏编程语言。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/microsoft/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*表
	+将行添加到表的末尾
	+检索表列列表
	+检索表行列表
	+查找特定的列值，然后返回匹配的行
*工作簿
	+向工作簿中添加新工作表。
	+获取所有工作簿的数据
*工作表
	+获取所有工作表
	+获取工作表内容



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您从Microsoft Excel获取有关所有工作簿的信息。您还可以找到
 [工作流](https://n8n.io/workflows/566) 
 在网站上。此示例使用工作流将使用以下两个节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Microsoft Excel




 最终的工作流应如下图所示。
 



![具有Microsoft Excel节点的工作流](https://d33wubrfki0l68.cloudfront.net/ae53d133deb271e5401610610f28c624dfc9c1a5/061ab/_images/integrations/builtin/app-nodes/microsoftexcel/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. Microsoft Excel节点
 [#](#2-microsoft-excel-node "永久链接")


1. 首先，您必须输入Microsoft Excel节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/microsoft/）
 .
2. 从
 *操作*
 下拉列表。
3. 单击
 *执行节点*
 以运行工作流。




