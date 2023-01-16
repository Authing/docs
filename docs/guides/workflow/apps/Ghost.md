


 鬼
 [#](#ghost "永久链接")
=====================================



[幽灵](https://www.ghost.org/) 
 是一个基于Node.js技术堆栈的开源专业发布平台。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credential/ghost/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


### 
 管理API
 [#](#admin api "永久链接")



**职位**
 -创建帖子
-删除帖子
-获取帖子
-获取所有帖子
-更新帖子
 


### 
 内容API
 [#](#content-api "永久链接")



**职位**
 -获取帖子
-获取所有帖子
 



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您在鬼中创建、更新和获取帖子。您还可以找到
 [工作流](https://n8n.io/workflows/825) 
 此示例使用工作流将使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Ghost




 最终的工作流应如下图所示。
 



![具有Ghost节点的工作流](https://d33wubrfki0l68.cloudfront.net/97e79818f564e2e3602d59cbf2de1e685b4dce4d/eace5/_images/integrations/builtin/app-nodes/ghost/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. 重影节点（创建：post）
 [#](#2-host-node-create-post "永久链接")



 此节点将创建标题为
 `用n8n运行幽灵！`
 。如果您想创建具有不同标题的文章，请改用该标题。
 


1. 从
 ***来源***
 下拉列表。
2. 您必须输入Ghost节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credential/ghost/）
 .
3. 从
 ***操作***
 下拉列表。
4. 输入
 `用n8n运行幽灵！`
 在
 ***标题***
 领域
5. 在
 ***内容***
 领域
6. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您将注意到该节点创建了一个新帖子。
 



![使用Ghost节点创建新文章并发布它](https://d33wubrfki0l68.cloudfront.net/25f7fa3ffbf1e122f2b747a77a3f55712ec918b7/39cc2/_images/integrations/builtin/app-nodes/ghost/ghost_node.png)



### 
 3. Ghost1节点（更新：post）
 [#](#3-host1-node-update-post "永久链接")



 此节点将更新我们在上一个节点中创建的帖子的状态。我们会将帖子的状态更改为
 `已发布`
 .
 


1. 从
 ***来源***
 下拉列表。
2. 选择在上一个节点中输入的凭据。
3. 从
 ***操作***
 下拉列表。
4. 单击
 ***岗位ID***
 字段并单击
 ***添加表达式***
 .
5. 在
 ***变量选择器***
 部分：Nodes>Ghost>Output Data>JSON>id。您还可以添加以下表达式：
 `｛｛$node[“Ghost”].json[“id”]｝｝`
 .
6. 单击
 ***添加字段***
 并选择“状态”。
7. 从
 ***状态***
 下拉列表。
8. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您将注意到该节点更新了我们在上一个节点中创建的帖子的状态。
 



![使用Ghost节点更新帖子的状态](https://d33wubrfki0l68.cloudfront.net/a819ab48df8b1f1dd9020e9bb8bba7ed7d1df9b7/61a8a/_images/integrations/builtin/app-nodes/ghost/ghost1_node.png)



### 
 4. Ghost2节点（get:post）
 [#](#4-ghost2-node-get-post "永久链接")



 该节点返回有关我们使用Ghost节点创建的帖子的信息。在此节点中，我们使用
 ***管理API***
 。您也可以使用
 ***内容API***
 以获取有关帖子的信息。
 


1. 从
 ***来源***
 下拉列表。
2. 选择在上一个节点中输入的凭据。
3. 从
 ***签署人：***
 下拉列表。
4. 单击
 ***标识符***
 字段并单击
 ***添加表达式***
 .
5. 在
 ***变量选择器***
 部分：Nodes>Ghost>Output Data>JSON>id。您还可以添加以下表达式：
 `｛｛$node[“Ghost”].json[“id”]｝｝`
 .
6. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到节点返回有关我们指定的帖子的信息。
 



![使用Ghost节点获取帖子信息](https://d33wubrfki0l68.cloudfront.net/5a54f307e528cec5bba65010330086843bc2302d/58eba/_images/integrations/builtin/app-nodes/ghost/ghost2_node.png)





