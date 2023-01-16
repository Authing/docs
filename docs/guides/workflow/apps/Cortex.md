


 皮质
 [#](#皮层 "永久链接")
=======================================



[皮质](https://github.com/TheHive-Project/皮层Docs) 
 提供强大的可观察（URL、文件、IP等）分析机制。它允许您使用单个工具分析收集到的可观测数据，对威胁做出响应，并与选区和其他团队进行交互。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credential/cortex/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*分析仪
	+执行分析器
*作业
	+获取作业详细信息
	+获取作业报告
*响应者
	+执行响应程序



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您分析URL并使用Cortex节点获取作业详细信息。您还可以找到
 [工作流](https://n8n.io/workflows/809) 
 此示例使用工作流将使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Cortex




 最终的工作流应如下图所示。
 



![带有Cortex节点的工作流](https://d33wubrfki0l68.cloudfront.net/ac381111bdd2fcae4cd7ae12e20758964931ac4f/846b1/_images/integrations/builtin/app-nodes/cortex/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. 皮层节点（分析器：执行）
 [#](#2-端口-节点-分析器-执行 "永久链接")



 此节点将分析URL。如果要分析不同的可观察类型，请选择该类型。
 


1. 首先，您必须输入Cortex节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credential/cortex/）
 .
2. 从
 ***分析仪类型***
 下拉列表。
3. 从
 ***可观测类型***
 下拉列表。
4. 在
 ***可观测值***
 领域
5. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您将注意到节点开始分析URL。
 



![使用Cortex节点分析URL](https://d33wubrfki0l68.cloudfront.net/9745b3bf1abaa0f1363cc43affa73661c658298d/380de/_images/integrations/builtin/app-nodes/cortex/cortex_node.png)



### 
 3. Cortex1节点（作业：get）
 [#](#3-cortex1-node-job-get "永久链接")



 此节点将返回我们在上一节点中执行的分析的作业详细信息。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***资源***
 下拉列表。
3. 单击
 ***作业ID***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 部分：节点>皮质>输出数据>JSON>\_id。还可以添加以下表达式：
 `｛｛$node[“Cortex”].json[“_id”]｝｝`
 .
5. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您将注意到节点开始分析URL。
 



![使用Cortex节点获取作业详细信息](https://d33wubrfki0l68.cloudfront.net/0cef73a3406e5a0f50c88c726203ba92792c5970/79db9/_images/integrations/builtin/app-nodes/cortex/cortex1_node.png)





