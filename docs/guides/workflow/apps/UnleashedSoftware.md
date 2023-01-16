


 发布的软件
 [#](#释放软件 "永久链接")
===============================================================



[释放的软件](https://www.unleashedsoftware.com) 
 是一款云应用程序，通过使产品企业能够实现对供应商、生产、仓库和销售的完全清晰和控制，产品企业可以自由地更好地制作、管理和移动产品。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/内置/凭据/未发布软件/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*销售订单
	+获取所有销售订单
*库存
	+手头有存货
	+获取所有库存



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您根据订单状态从发布的软件获取所有订单的列表。您还可以找到
 [工作流](https://n8n.io/workflows/641) 
 此示例使用工作流将使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Unleashed Software




 最终的工作流应如下图所示。
 



![具有Unleashed Software节点的工作流](https://d33wubrfki0l68.cloudfront.net/d00a203185064aa47f723a6dae747f48004b5b3a/a877a/_images/integrations/builtin/app-nodes/unleashedsoftware/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. 卸载软件节点
 [#](#2-未发布的软件-节点 "永久链接")


1. 首先，您必须输入Unleashed Software节点的凭据。你可以知道怎么做
 [此处]（/integrations/内置/凭据/未发布软件/）
 .
2. 切换
 ***全部返回***
 为真。
3. 单击
 ***添加筛选器***
 按钮，然后从下拉列表中选择“订单状态”。
4. 从
 ***订单状态***
 下拉列表。
5. 单击
 ***执行节点***
 以运行节点。



![使用Unleashed Software节点获取已完成销售订单的列表](https://d33wubrfki0l68.cloudfront.net/08f0120e3c7766b235033bf74c5771bd25f1c585/46eab/_images/integrations/builtin/app-nodes/unleashedsoftware/unleashedsoftware_node.png)





