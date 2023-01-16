


 横幅广告
 [#](#bannerbear "永久链接")
===============================================



[横幅](https://www.bannerbear.com/) 
 是一种基于API的图像生成服务，可自动生成图形模板的变体。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credential/bannerbear/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*图像
	+创建图像
	+获取图像
*模板
	+获取模板
	+获取所有模板



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您使用横幅广告欢迎模板创建图像。您还可以找到
 [工作流](https://n8n.io/workflows/544) 
 在网站上。此示例使用工作流将使用以下两个节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Bannerbear




 最终的工作流应如下图所示。
 



![具有Bannerbear节点的工作流](https://d33wubrfki0l68.cloudfront.net/69537add89dcea0f666457b39c4f810337af85b9/69e0c/_images/integrations/builtin/app-nodes/bannerbear/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. 横幅节点
 [#](#2-退火棒-节点 "永久链接")


1. 首先，您必须输入Bannerbear节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credential/bannerbear/）
 .
2. 从
 *模板ID*
 下拉列表。
3. 单击
 *添加字段*
 下拉菜单，选择“等待图像”，然后将滑块设置为“打开”。
4. 单击
 *添加修改*
 按钮，然后从
 *姓名*
 下拉列表。
5. 在
 *文本*
 领域
6. 单击
 *执行节点*
 以运行工作流。




