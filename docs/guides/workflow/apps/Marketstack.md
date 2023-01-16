


 市场堆栈
 [#](#marketstack "永久链接")
=================================================



[市场堆栈](https://marketstack.com/) 
 是一个以JSON格式提供股市数据的REST API。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/marketstack/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*当日结束数据
	+全部获取（Get All）
*交易所
	+获取
*票务员
	+获取



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您获取所需股票符号的过去一周的日终数据。此示例使用工作流使用以下两个节点。
 


*[Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
*市场堆栈



 最终的工作流应如下图所示。
 



![具有Marketstack节点的工作流](https://d33wubrfki0l68.cloudfront.net/d431d7d61ac6bb4017852ea3991c2eba504023b3/37459/_images/integrations/builtin/app-nodes/marketstack/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. Marketstack节点
 [#](#2市场堆栈节点 "永久链接")


1. 首先输入Marketstack节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/marketstack/）
 .
2. 选择
 **当日结束数据**
 来自
 *资源*
 下拉列表。
3
 **全部获取**
*操作*
 默认选中。
4. 输入所需的股票代码，
 `人工智能`
 在我们的示例中。
5. 单击
 **添加筛选器**
 按钮并选择
 **时间表开始日期>一周前**
 .
6. 单击
 **添加筛选器**
 按钮并选择
 **时间范围结束日期>今天**
 .
7. 单击
 **执行节点**
 以运行工作流。



![市场堆栈节点](https://d33wubrfki0l68.cloudfront.net/aab2cbfe5cdb241353cf1a4713033935dd27df86/3789b/_images/integrations/builtin/app-nodes/marketstack/marketstack_node.png)





