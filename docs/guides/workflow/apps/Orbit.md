


 轨道
 [#](#轨道 "永久链接")
=====================================



[环绕](https://orbit.love) 
 是管理和发展社区的平台。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credential/orbit/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*活动
	+为成员创建活动
	+获取所有活动
*成员
	+删除成员
	+获取成员
	+获取工作区中的所有成员
	+按身份查找成员
	+更新成员
	+创建/更新成员
*注释
	+创建注释
	+获取成员的所有笔记
	+更新备注
*岗位
	+创建帖子
	+获取所有帖子
	+删除帖子



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您创建新成员，并使用“动态观察”节点在动态观察中更新其信息。它还允许您为动态观察中的新成员创建注释和帖子。您还可以找到
 [工作流](https://n8n.io/workflows/765) 
 此示例使用工作流使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 轨道




 最终的工作流应如下图所示。
 



![具有动态观察节点的工作流](https://d33wubrfki0l68.cloudfront.net/8559d1c9e4d5892849b20434ab51ef98de16cbc0/481f9/_images/integrations/builtin/app-nodes/orbit/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下“开始”节点存在。
 


### 
 2. 动态观察节点（追加启动：成员）
 [#](#2-orbit-node-upsert-member "永久链接")



 此节点将在“动态观察”中的工作空间中创建新成员。我们将使用GitHub标识创建新成员。
 


1. 首先，您必须输入Orbit节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credential/orbit/）
 .
2. 从
 ***操作***
 下拉列表。
3. 选择要从中创建新成员的工作区
 ***工作区***
 下拉列表。
4. 单击
 ***添加标识***
 按钮
5. 从
 ***来源***
 下拉列表。
6. 从
 ***搜索依据***
 下拉列表。
7. 在
 ***用户名***
 领域
8. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您会注意到该节点使用GitHub标识在Orbit中的工作区中创建了一个新成员。
 



![使用Orbit节点在Orbit中的工作空间中创建新成员](https://d33wubrfki0l68.cloudfront.net/90618b72f4d1be16be236cd1ba7ef9f4e3bda920/de1ca/_images/integrations/builtin/app-nodes/orbit/orbit_node.png)



### 
 3. Orbit1节点（更新：成员）
 [#](#3-orbit1-node-update-member "永久链接")



 此节点将更新我们在上一个节点中创建的成员的标记。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***操作***
 下拉列表。
3. 单击
 ***工作区***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 部分：节点>动态观察>参数>workspaceId。还可以添加以下表达式：
 `｛｛$node[“Orbit”].prarameter[“workspaceId”]｝｝`
 .
5. 单击
 ***成员ID***
 字段并单击
 ***添加表达式***
 .
6. 在
 ***变量选择器***
 部分：Nodes>Orbit>Output Data>JSON>id。您还可以添加以下表达式：
 `｛｛$node[“Orbit”].json[“id”]｝｝`
 .
7. 单击
 ***添加字段***
 按钮，然后选择“要添加的标签”。
8. 在
 ***要添加的标记***
 领域可以通过用逗号分隔来添加多个标记。
9. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您将注意到该节点更新了我们在上一个节点中创建的新成员的信息。节点添加标记
 `n8nCof`
 和
 `百万小时`
 新成员。
 



![使用“动态观察”节点向成员添加标记](https://d33wubrfki0l68.cloudfront.net/03d36a91a5c5925b158028316ae4467b9a872071/e9e84/_images/integrations/builtin/app-nodes/orbit/orbit1_node.png)



### 
 4. Orbit2节点（创建：注释）
 [#](#4-orbit2-node-create-note "永久链接")



 此节点将为使用“动态观察”节点创建的成员创建注释。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***资源***
 下拉列表。
3. 单击
 ***工作区***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 部分：节点>动态观察>参数>workspaceId。还可以添加以下表达式：
 `｛｛$node[“Orbit”].prarameter[“workspaceId”]｝｝`
 .
5. 单击
 ***成员ID***
 字段并单击
 ***添加表达式***
 .
6. 在
 ***变量选择器***
 部分：Nodes>Orbit>Output Data>JSON>id。您还可以添加以下表达式：
 `｛｛$node[“Orbit”].json[“id”]｝｝`
 .
7. 在
 ***注释***
 字段。
8. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点为我们使用Orbit节点创建的成员创建了一个注释。
 



![使用“动态观察”节点为成员创建注释](https://d33wubrfki0l68.cloudfront.net/680159d5243f28a8ae249d40167f094526d167a3/6ecee/_images/integrations/builtin/app-nodes/orbit/orbit2_node.png)



### 
 5. Orbit3节点（创建：post）
 [#](#5-orbit3-node-create-post "永久链接")



 此节点将为我们使用“动态观察”节点创建的成员创建一个帖子。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***资源***
 下拉列表。
3. 单击 the gears icon next to the
 ***Workspace***
 field and click on
 ***Add Expression***
 .
4. Select the following in the
 ***Variable Selector***
 section: Nodes > Orbit > Parameters > workspaceId. You can also add the following expression:
 `{{$node["Orbit"].parameter["workspaceId"]}}` 
 .
5. Click on the gears icon next to the
 ***Member ID***
 field and click on
 ***Add Expression***
 .
6. Select the following in the
 ***Variable Selector***
 section: Nodes > Orbit > Output Data > JSON > id. You can also add the following expression:
 `{{$node["Orbit"].json["id"]}}` 
 .
7. Enter a URL for the post in the
 ***URL***
 field.
8. Click on
 ***Execute Node***
 to run the node.



 In the screenshot below, you will notice that the node creates a post for the member that we created using the Orbit node.
 



![Using the Orbit node to create a post for a member](https://d33wubrfki0l68.cloudfront.net/8d201efac3a53c2f3346b8109fdbf762aceead4a/76de8/_images/integrations/builtin/app-nodes/orbit/orbit3_node.png)





