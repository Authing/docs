


 Microsoft团队
 [#](#microsoft团队 "永久链接")
=========================================================



[Microsoft团队](https://teams.microsoft.com/) 
 是一个面向业务的通信和协作平台，它结合了工作场所聊天、视频会议、文件存储和应用程序集成。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/microsoft/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*渠道
	+创建频道
	+删除频道
	+获取频道
	+获取所有频道
	+更新频道
*频道消息（测试版）
	+创建邮件
	+获取所有邮件
*任务
	+创建任务
	+删除任务
	+获取任务
	+获取所有任务
	+更新任务



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您创建、更新并向Microsoft团队中的频道发送消息。您还可以找到
 [工作流](https://n8n.io/workflows/680) 
 此示例使用工作流将使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Microsoft Teams




 最终的工作流应如下图所示。
 



![具有Microsoft Teams节点的工作流](https://d33wubrfki0l68.cloudfront.net/26464039ded4acb45aaa8bb0e925f5d6c3b5090c/2b73c/_images/integrations/builtin/app-nodes/microsoftteams/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. Microsoft Teams节点（创建：频道）
 [#](#2-microsoft-teams-node-create-channel "永久链接")


1. 首先，您必须输入Microsoft Teams节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/microsoft/）
 .
2. 从
 ***团队ID***
 下拉列表。
3. 在
 ***姓名***
 领域
4. 单击
 ***执行节点***
 以运行节点。



![使用Microsoft Teams节点创建频道](https://d33wubrfki0l68.cloudfront.net/7b85035f852863a6357a56ea9a26e2956f95fbc3/e71a7/_images/integrations/builtin/app-nodes/microsoftteams/microsoftteams_node.png)



### 
 3. Microsoft Teams1节点（更新：通道）
 [#](#3-microsoft-teams1-node-update频道 "永久链接")


1. 选择在上一个节点中输入的凭据。
2. 从
 ***操作***
 下拉列表。
3. 单击
 ***团队ID***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 部分：节点>Microsoft团队>参数>团队ID。还可以添加以下表达式：
 `｛｛$node[“Microsoft Teams”].parameter[“teamId”]｝｝`
5. 单击
 ***通道ID***
 字段并单击
 ***添加表达式***
 .
6. 在
 ***变量选择器***
 部分：节点>Microsoft团队>输出>JSON>id。您还可以添加以下表达式：
 `｛｛$node[“Microsoft Teams”].json[“id”]｝｝`
7. 单击
 ***添加字段***
 按钮，然后从下拉列表中选择“名称”。
8. 在
 ***姓名***
 领域
9. 单击
 ***执行节点***
 以运行节点。



![使用Microsoft Teams节点更新频道](https://d33wubrfki0l68.cloudfront.net/634addfe9df8e129915ec0d8fe1b7107a289d929/3d6ac/_images/integrations/builtin/app-nodes/microsoftteams/microsoftteams1_node.png)



### 
 4. Microsoft Teams2节点（创建：channelMessage）
 [#](#4-microsoft-teams2-node-create-channelmessage "永久链接")


1. 选择在上一个节点中输入的凭据。
2. 从
 ***资源***
 下拉列表。
3. 单击
 ***团队ID***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 部分：节点>Microsoft团队>参数>团队ID。还可以添加以下表达式：
 `｛｛$node[“Microsoft Teams”].parameter[“teamId”]｝｝`
5. 单击
 ***通道ID***
 字段并单击
 ***添加表达式***
 .
6. 在
 ***变量选择器***
 部分：节点>Microsoft团队>输出>JSON>id。您还可以添加以下表达式：
 `｛｛$node[“Microsoft Teams”].json[“id”]｝｝`
7. 从
 ***消息类型***
 下拉列表。
8. 在
 ***消息***
 字段。
9. 单击
 ***执行节点***
 以运行节点。



![使用Microsoft Teams节点发送消息](https://d33wubrfki0l68.cloudfront.net/362d56931c00aa1aad135183286b99c0d08e05fb/f4d4d/_images/integrations/builtin/app-nodes/microsoftteams/microsoftteams2_node.png)





