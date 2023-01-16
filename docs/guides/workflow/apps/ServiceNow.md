


 立即服务
 [#](#servicenow "永久链接")
===============================================



[立即服务](https://www.servicenow.com/) 
 是一个云计算平台，帮助公司管理其运营的数字工作流。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/servicenow/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*商务服务
	+全部获取（Get All）
*配置项目
	+全部获取（Get All）
*部门
	+全部获取（Get All）
*字典
	+全部获取（Get All）
*事件
	+创建
	+删除
	+获取
	+全部获取（Get All）
	+更新
*表格记录
	+创建
	+删除
	+获取
	+全部获取（Get All）
	+更新
*用户
	+创建
	+删除
	+获取
	+全部获取（Get All）
	+更新
*用户组
	+全部获取（Get All）
*用户角色
	+全部获取（Get All）



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您获取50个最新事件，并仅查看所需的字段。此示例使用工作流使用以下节点：
 


*[Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
*立即服务



 最终的工作流应如下图所示。
 



![具有ServiceNow节点的工作流](https://d33wubrfki0l68.cloudfront.net/5fd5f909979dc270ae590c7a85578de8d132e96d/59e46/_images/integrations/builtin/app-nodes/servicenow/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. ServiceNow节点
 [#](#2-servicenow-node "永久链接")


1. 首先输入凭据，您可以了解如何做到这一点
 [此处]（/integrations/builtin/credentials/servicenow/）
 .
2. 选择
 **事件**
 来自
 ***资源***
 下拉列表。
3. 选择
 **全部获取**
 来自
 ***操作***
 下拉列表。
4. 单击
 ***添加选项***
 并选择
 **字段**
 .
5. 使用下拉菜单选择要查看的字段，这里我们使用
 `关闭代码`
 ,
 `严重性`
 ,
 `系统ID `
 和
 `解决时间`
 .
6. 单击
 ***执行节点***
 以运行工作流。



![ServiceNow节点](https://d33wubrfki0l68.cloudfront.net/3a60e0cd92d3f6819ee28e67358768d3134cbc9d/39005/_images/integrations/builtin/app-nodes/servicenow/servicenow_node.png)





