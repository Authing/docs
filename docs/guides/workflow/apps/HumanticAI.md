


 人文AI
 [#](#人文ai "永久链接")
=================================================



[人文AI](https://humantic.ai/) 
 提供人工智能驱动的候选人行为和性格评估。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/humanticai/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*个人资料
	+创建配置文件
	+检索配置文件
	+更新配置文件



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您使用人文AI节点创建、更新和获取配置文件。您还可以找到
 [工作流](https://n8n.io/workflows/784) 
 此示例使用工作流使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 [HTTP请求]（/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/）
 -
 Humantic AI




 最终的工作流应如下图所示。
 



![具有Humantic AI节点的工作流](https://d33wubrfki0l68.cloudfront.net/380b79e1ca1223333ed6259c21ca2628a8949673/96aeb/_images/integrations/builtin/app-nodes/humanticai/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下“开始”节点存在。
 


### 
 2. 人文AI节点（创建：配置文件）
 [#](#2-humantic-ai-node-create-profile "永久链接")



 此节点将为Humantic AI中的应聘者创建一个新的个人资料。我们将使用应聘者的LinkedIn URL创建新的个人档案。
 


1. 首先，您必须输入Humantic AI节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/humanticai/）
 .
2. 在
 ***用户ID***
 领域
3. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您会注意到该节点使用候选人的LinkedIn URL创建了一个新的配置文件。
 



![使用Humantic AI节点创建新配置文件](https://d33wubrfki0l68.cloudfront.net/38a17f172b879a3e50fb7f949983c0da38bf4d7c/4bd08/_images/integrations/builtin/app-nodes/humanticai/humanticai_node.png)



### 
 3. HTTP请求节点（GET）
 [#](#3-http-request-node-get "永久链接")



 此节点将从我们指定的URL获取候选人的简历。我们将把这份简历传递给工作流中的下一个节点。
 


1. 在
 ***网址***
 领域
2. 从
 ***响应格式***
 下拉列表。
3. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您会注意到节点从我们指定的URL获取候选人的简历。
 



![使用HTTP请求节点获取简历](https://d33wubrfki0l68.cloudfront.net/61dbfe13dfb30b1f6e0a1a4917861fa09a228272/fd53a/_images/integrations/builtin/app-nodes/humanticai/httprequest_node.png)



### 
 4. 人文AI1节点（更新：配置文件）
 [#](#4-humantic-ai1-node-update-profile "永久链接")



 此节点将更新我们使用Humantic AI节点创建的候选的信息。我们将添加在上一个节点中获取的候选人简历。
 


1. 选择您在上一个Humantic AI节点中输入的凭据。
2. 从
 ***操作***
 下拉列表。
3. 单击
 ***用户ID***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 部分：节点>人工智能>输出数据>JSON>结果>用户ID。还可以添加以下表达式：
 `｛{$node[“Humantic AI”].json[“results”][“userid”]}｝`
 .
5. 切换
 ***发送简历***
 到
 `真值`
 .
6. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点更新了我们使用Humantic AI节点创建的候选人的信息。在这里，节点添加了候选人的简历。
 



![使用Humantic AI节点将简历添加到应聘者的个人资料](https://d33wubrfki0l68.cloudfront.net/c984acecf6a9275dcfa165c8767ba0f9719f2b7f/e9920/_images/integrations/builtin/app-nodes/humanticai/humanticai1_node.png)



### 
 5. 人文AI2节点（get:profile）
 [#](#5-humantic-ai2-node-get-profile "永久链接")



 此节点将返回
 `招聘`
 我们使用Humantic AI节点创建的候选人的角色。
 


1. 选择在上一个节点中输入的凭据。
2. 单击
 ***用户ID***
 字段并单击
 ***添加表达式***
 .
3. 在
 ***变量选择器***
 部分：节点>人工智能>输出数据>JSON>结果>用户ID。还可以添加以下表达式：
 `｛{$node[“Humantic AI”].json[“results”][“userid”]}｝`
 .
4. 单击
 ***添加选项***
 按钮
5. 从
 ***Persona公司***
 下拉列表。
6. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到节点返回
 `招聘`
 我们使用Humantic AI节点创建的候选人的角色（列标题在屏幕截图中不可见，因为我们已经向下滚动以显示数据）。
 



![使用Humantic AI节点获取候选人信息](https://d33wubrfki0l68.cloudfront.net/69305ee2aac03f3890569fcb4fe60385d0a2721b/dfd7c/_images/integrations/builtin/app-nodes/humanticai/humanticai2_node.png)





