


 铜
 [#](#铜 "永久链接")
=======================================



[铜](https://www.copper.com/) 
 是一款CRM，专注于与谷歌G Suite的强大集成，面向中小型企业。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/copper/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*公司
	+创建
	+删除
	+获取
	+全部获取（Get All）
	+更新
*客户来源
	+全部获取（Get All）
*引线
	+创建
	+删除
	+获取
	+全部获取（Get All）
	+更新
*机会
	+创建
	+删除
	+获取
	+全部获取（Get All）
	+更新
*人员
	+创建
	+删除
	+获取
	+全部获取（Get All）
	+更新
*项目
	+创建
	+删除
	+获取
	+全部获取（Get All）
	+更新
*任务
	+创建
	+删除
	+获取
	+全部获取（Get All）
	+更新
*用户
	+全部获取（Get All）



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您从铜创建、更新和获取人员。您还可以找到
 [工作流](https://n8n.io/workflows/1021) 
 此示例使用工作流将使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Copper




 最终的工作流应如下图所示。
 



![具有Copper节点的工作流](https://d33wubrfki0l68.cloudfront.net/35d1962b26e1f30b2315f9ac9b8d1dde6a5d40dd/4b2e5/_images/integrations/builtin/app-nodes/copper/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. 铜节点（创建：人）
 [#](#2-copper-node-create-person "永久链接")



 此节点将在Copper中创建一个新人员。
 


1. 首先，您必须输入Copper节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/copper/）
 .
2. 从
 ***资源***
 下拉列表。
3. 在
 ***姓名***
 领域
4. 单击
 ***添加字段***
 按钮，然后从下拉列表中选择“电子邮件”。
5. 单击
 ***添加电子邮件***
 按钮
6. 在
 ***电子邮件***
 领域
7. 在
 ***类别***
 领域
8. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您将注意到该节点在Copper中创建了一个新的人。
 



![使用Copper节点创建新人](https://d33wubrfki0l68.cloudfront.net/90eb2044ea9376825ba893f3e1d23c3c66479e30/56cdb/_images/integrations/builtin/app-nodes/copper/copper_node.png)



### 
 3. Copper1节点（更新：人）
 [#](#3-copper1-node-update-person "永久链接")



 此节点将更新我们使用上一个节点创建的人员的信息。
 


1. 选择在上一个Copper节点中输入的凭据。
2. 从
 ***资源***
 下拉列表。
3. 从
 ***操作***
 下拉列表。
4. 单击
 ***人员ID***
 字段并单击
 ***添加表达式***
 .
5. 在
 ***变量选择器***
 部分：当前节点>输入数据>JSON>id。您还可以添加以下表达式：
 `｛｛$json[“id”]｝｝`
 .
6. 单击
 ***添加字段***
 按钮，然后从下拉列表中选择“电话号码”。
7. 单击
 ***添加电话号码***
 领域
8. 在
 ***电话号码***
 领域
9. 在
 ***类别***
 领域
10. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您将注意到节点更新了先前创建的人员的信息。
 



![使用Copper节点更新人员信息](https://d33wubrfki0l68.cloudfront.net/24ba84cd9f793204a3310fe1b0129558c915aab5/8dba8/_images/integrations/builtin/app-nodes/copper/copper1_node.png)



### 
 4. Copper2节点（获取：人）
 [#](#4-capper2-node-get-person "永久链接")



 此节点将检索我们先前创建的人员的信息。
 


1. 选择在上一个Copper节点中输入的凭据。
2. 从
 ***资源***
 下拉列表。
3. 从
 ***操作***
 下拉列表。
4. 单击
 ***人员ID***
 字段并单击
 ***添加表达式***
 .
5. 在
 ***变量选择器***
 部分：当前节点>输入数据>JSON>id。您还可以添加以下表达式：
 `｛｛$json[“id”]｝｝`
 .
6. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您会注意到节点检索了我们之前创建的人员的信息。
 



![使用Copper节点检索人员信息](https://d33wubrfki0l68.cloudfront.net/68d7b94ffbb7ccbc5929c5e3e40db0bb19b472a2/7cd2d/_images/integrations/builtin/app-nodes/copper/copper2_node.png)





