


 家庭助理
 [#](#家庭助理 "永久链接")
=======================================================



[家庭助理](https://www.home-assistant.io/) 
 是一款用于家庭自动化的免费开源软件，旨在成为智能家庭设备的中央控制系统，重点关注本地控制和隐私。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/homeassistant/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*摄影机代理
	+获取摄像头截图
*配置
	+获取配置
	+检查配置
*事件
	+创建事件
	+获取所有事件
*日志
	+获取特定实体的日志
	+获取所有日志
*服务
	+调用特定域内的服务
	+获取所有服务
*州
	+创建新记录，或更新当前记录（如果已存在）（追加启动）
	+获取特定实体的状态
	+获取所有状态
*模板
	+创建模板



 实例
 [#](#示例 "永久链接")
-----------------------------------------



 此工作流允许您检索当前的家庭助理配置详细信息。此示例使用工作流将使用以下两个节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Home Assistant




 最终的工作流应如下图所示。
 



![具有Home Assistant节点的工作流](https://d33wubrfki0l68.cloudfront.net/59b8e5fb76e07282ede2795f0bf33c193a33bd2e/a3f7e/_images/integrations/builtin/app-nodes/homeassistant/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. Home Assistant节点
 [#](#2-home-assistant-node "永久链接")


1. 首先选择Home Assistant节点的凭据。您可以了解如何创建凭据
 [此处]（/integrations/builtin/credentials/homeassistant/）
 .
2. 从
 **资源**
 下拉选择
 **配置**
 .
3. 从
 **操作**
 下拉选择
 **获取**
 .
4. 单击
 **执行节点**
 以运行工作流。



![家庭助手节点](https://d33wubrfki0l68.cloudfront.net/f59304db7f19b04a69722d22258c6575ab5cf9a3/43a37/_images/integrations/builtin/app-nodes/homeassistant/home_assistant_node.png)





