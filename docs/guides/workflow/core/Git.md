


 Git公司公司
 [#](#git "永久链接")
=================================



[吉特](https://git-scm.com/) 
 是一个自由开源的分布式版本控制系统，旨在快速高效地处理从小到大的项目。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credential/git/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*添加要提交的文件或文件夹
*添加配置属性
*克隆存储库
*将文件或文件夹提交到git
*从远程存储库获取
*返回电流配置
*返回git提交历史记录
*从远程存储库中提取
*推送到远程存储库
*将标签推送到远程存储库
*当前存储库的返回状态
*创建新标记
*设置用户



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您向git存储库添加、提交和推送更改。您还可以找到
 [工作流](https://n8n.io/workflows/1115) 
 此示例使用工作流将使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Git




 最终的工作流应如下图所示。
 



![具有Git节点的工作流](https://d33wubrfki0l68.cloudfront.net/ae1db182c77316ea0a459759616ffdb20f88ce4a/24e2a/_images/integrations/builtin/core-nodes/git/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. Git节点（添加）
 [#](#2-git-node-add "永久链接")



 此节点将添加
 `自述文件.md`
 文件到临时区域。如果要添加其他文件，请输入该文件的路径。
 


1. 从
 ***操作***
 下拉列表。
2. 在
 ***存储库路径***
 领域
3. 在
 ***要添加的路径***
 领域
4. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到节点添加了
 `自述文件.md`
 文件到临时区域。
 



![使用Git节点将文件添加到暂存区域](https://d33wubrfki0l68.cloudfront.net/9fa2b3ccfd063e95e16e5efe34b84b5b888a3019/2fc1b/_images/integrations/builtin/core-nodes/git/git_node.png)



### 
 3. Git1节点（提交）
 [#](#3-git1-node-commit "永久链接")



 此节点将提交上一个节点添加到临时区域的所有更改。
 


1. 从
 ***操作***
 下拉列表。
2. 单击
 ***存储库路径***
 字段并单击
 ***添加表达式***
 .
3. 在
 ***变量选择器***
 部分：节点>Git>参数>reposi到ryPath。还可以添加以下表达式：
 `｛｛$node[“Git”].prarameter[“repositoryPath”]｝｝`
 .
4. 在
 ***消息***
 领域
5. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到节点创建了一个新的提交。
 



![使用Git节点提交更改](https://d33wubrfki0l68.cloudfront.net/5eaf47cf5d3c04c5033ed4dbfb0494f8cb0dda5c/cf987/_images/integrations/builtin/core-nodes/git/git1_node.png)



### 
 4. Git2节点（日志）
 [#](#4-git2-node-log "永久链接")



 此节点将返回存储库的提交日志。
 


1. 单击
 ***存储库路径***
 字段并单击
 ***添加表达式***
 .
2. 在
 ***变量选择器***
 部分：节点>Git>参数>repositoryPath。还可以添加以下表达式：
 `｛｛$node[“Git”].prarameter[“repositoryPath”]｝｝`
 .
3. 切换
 ***全部返回***
 to
 `真值`
 。此选项将返回所有日志。
4. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到节点创建了一个新的提交。
 



![使用Git节点记录提交](https://d33wubrfki0l68.cloudfront.net/1ebb783796c48e3dc00923fa58696fc399780b27/482d0/_images/integrations/builtin/core-nodes/git/git2_node.png)



### 
 5. Git3节点（Push）
 [#](#5-git3-node-push "永久链接")



 此节点将将更改推送到云存储库。
 


1. 从
 ***操作***
 下拉列表。
2. 单击
 ***存储库路径***
 字段并单击
 ***添加表达式***
 .
3. 在
 ***变量选择器***
 部分：节点>Git>参数>repositoryPath。还可以添加以下表达式：
 `｛｛$node[“Git”].prarameter[“repositoryPath”]｝｝`
 .
4. 单击
 ***执行节点***
 以运行节点。



**注：**
 如果您不使用SSH，则必须创建凭据来验证自己。您还需要设置一个上游分支来推动更改。这只需要一次。您可以通过执行以下命令来设置上游分支
 `git push-u原始主机`
 从终端。
 



 在下面的屏幕截图中，您将注意到节点将本地更改推送到云存储库。
 



![使用Git节点推送更改](https://d33wubrfki0l68.cloudfront.net/f17f3627a74cacfb01ec1908d813863c03eaa879/eff1d/_images/integrations/builtin/core-nodes/git/git3_node.png)





