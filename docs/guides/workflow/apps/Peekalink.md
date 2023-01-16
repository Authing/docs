


 Peekalink公司公司
 [#](#peekalink "永久链接")
=============================================



[皮卡利克](https://peekalink.io) 
 是一个API，允许开发人员预览web上的链接。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credential/peekalink/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*检查给定链接的预览是否可用
*返回链接的预览



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您检查链接的预览是否可用，并返回链接预览。您还可以找到
 [工作流](https://n8n.io/workflows/935) 
 此示例使用工作流使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Peekalink
 -
 [IF]（/integrations/builtin/core nodes/n8n nodes base.IF/）
 -
 [无操作，不执行任何操作]（/integrations/builtin/core-nodes/n8n-nodes-base.noop/）




 最终的工作流应如下图所示。
 



![具有Peekalink节点的工作流](https://d33wubrfki0l68.cloudfront.net/6ae0834464c63132b6cdde791c0f3f59b68dce4e/b75b4/_images/integrations/builtin/app-nodes/peekalink/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下“开始”节点存在。
 


### 
 2. Peekalink节点（创建：房间）
 [#](#2-peekalink-node-create-room "永久链接")



 此节点将检查指定链接的预览是否可用。
 


1. 首先，您必须输入Peekalink节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credential/peekalink/）
 .
2. 从
 ***操作***
 下拉列表。
3. 在
 ***网址***
 领域
4. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到节点返回有关指定链接的预览是否可用的信息。
 



![使用Peekalink节点检查给定链接的预览是否可用](https://d33wubrfki0l68.cloudfront.net/53edafc08054b1d3d7a424f95b147ccbfde86562/68918/_images/integrations/builtin/app-nodes/peekalink/peekalink_node.png)



### 
 3. IF节点
 [#](#3-if-node "永久链接")



 此节点将检查来自上一节点的响应。如果上一个节点返回
 `真值`
 ，IF节点也将返回
 `真值`
 ，否则IF节点将返回
 `错误`
 .
 


1. 单击
 ***添加条件***
 并选择“布尔”。
2. 单击
 ***值1***
 字段并单击
 ***添加表达式***
 .
3. 在
 ***变量选择器***
 部分：当前节点>输入数据>JSON>可用。还可以添加以下表达式：
 `｛｛$json[“isAvailable”]｝｝`
 .
4. 切换
 ***值2***
 到
 `真值`
 .
5. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点返回上一个节点的数据
 `真值`
 树枝
 



![使用IF节点检查来自上一节点的响应](https://d33wubrfki0l68.cloudfront.net/0a436cfffb2d258cf67f0b3c78ee3888a6315f67/96da2/_images/integrations/builtin/app-nodes/peekalink/if_node.png)



### 
 4. Peekalink节点（预览）
 [#](#4-peekalink-node-preview "永久链接")



 此节点将返回您在Peekalink节点中指定的URL预览。
 


1. 将节点连接到IF节点的“真”输出
2. 选择在上一个Peekalink节点中输入的凭据。
3. 单击
 ***网址***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 部分：节点>Peekalink>参数>url。还可以添加以下表达式：
 `｛｛$node[“Peekalink”].prarameter[“url”]｝｝`
 .
5. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您将注意到该节点返回您在Peekalink节点中指定的URL的预览。
 



![使用Peekalink节点获取URL预览](https://d33wubrfki0l68.cloudfront.net/9ef6cb1812d6809f8f66b2c880474035a8a9b7cf/effdd/_images/integrations/builtin/app-nodes/peekalink/peekalink1_node.png)



### 
 5. NoOp节点
 [#](#5-noop-node "永久链接")



 在此处添加此节点是可选的，因为缺少此节点不会对工作流的功能产生影响。我们添加了这一点，因为它有时可以帮助其他人更好地从视觉上理解工作流。
 


1. 创建
 ***无操作***
 节点连接到IF节点的“假”输出。
2. 单击
 ***执行节点***
 以运行节点。



![使用NoOp节点](https://d33wubrfki0l68.cloudfront.net/66d45d96c4e05079d3dc165647cb1d119182eab8/3e457/_images/integrations/builtin/app-nodes/peekalink/noop_node.png)





