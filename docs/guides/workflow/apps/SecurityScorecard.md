


 安全记分卡
 [#](#securitycorecard "永久链接")
=============================================================



[安全记分卡](https://securityscorecard.com) 
 使组织能够证明并保持对主要法规和标准的遵守，包括PCI、NIST、SOX、GDPR等。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/securiyscorecard/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*公司
	+获取公司因素得分和问题计数
	+获取公司的历史因素得分
	+获取公司的历史分数
	+获取公司信息和记分卡摘要
	+获取公司的分数改进计划
*行业
	+获取因子分数
	+获取历史因素得分
	+获取分数
*邀请
	+为公司/用户创建邀请
*投资组合
	+创建公文包
	+删除公文包
	+获取所有投资组合
	+更新公文包
*投资组合公司
	+将公司添加到投资组合
	+获取投资组合中的所有公司
	+从投资组合中删除公司
*报告
	+下载生成的报告
	+生成报告
	+获取最近生成的报告列表



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您使用安全记分卡节点生成、检索和下载报告。您还可以找到
 [工作流](https://n8n.io/workflows/920) 
 此示例使用工作流使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 SecurityScorecard




 最终的工作流应如下图所示。
 



![具有SecurityScorecard节点的工作流](https://d33wubrfki0l68.cloudfront.net/00c1ac0db3f6ff93b0719a7abe024bf4d296d23e/c217c/_images/integrations/builtin/app-nodes/securityscorecard/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下“开始”节点存在。
 


### 
 2. SecurityScorecard节点（生成：报告）
 [#](#2-安全记分卡-节点-代-报告 "永久链接")



 此节点将为我们指定的公司生成完整的记分卡报告。
 


1. 首先，您必须为SecurityScorecard节点输入凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/securiyscorecard/）
 .
2. 从
 ***资源***
 下拉列表。
3. 从
 ***操作***
 下拉列表。
4. 从
 ***报告***
 下拉列表。
5. 在
 ***记分卡标识符***
 领域
6. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点生成了完整的记分卡报告
 `n8n.io`
 .
 



![使用SecurityScorecard节点创建完整的记分卡报告](https://d33wubrfki0l68.cloudfront.net/30f4db24fc20f485e91b850599d4a322cda3a3ec/c9cad/_images/integrations/builtin/app-nodes/securityscorecard/securityscorecard_node.png)



### 
 3. SecurityScorecard1节点（getAll:report）
 [#](#3-安全记分卡1-node-getall-report "永久链接")



 此节点将从SecurityScorecard返回报告。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***资源***
 下拉列表。
3. 从
 ***操作***
 下拉列表。
4. 输入
 `1` 
 在
 ***限制***
 领域通过将其设置为1，节点将返回单个报告。
5. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到节点从SecurityScroecard返回一个报告。
 



![使用SecurityScorecard节点获取报告](https://d33wubrfki0l68.cloudfront.net/7505191e70f0e76d17b17f25bfd4221bbe638669/e1f17/_images/integrations/builtin/app-nodes/securityscorecard/securityscorecard1_node.png)



### 
 4. SecurityScorecard2节点（下载：报告）
 [#](#4-安全记分卡2-node-download-report "永久链接")



 此节点将下载上一节点返回的报告。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***资源***
 下拉列表。
3. 从
 ***操作***
 下拉列表。
4. 单击
 ***报告URL***
 字段并单击
 ***添加表达式***
 .
5. 在
 ***变量选择器***
 部分：当前节点>输入数据>JSON>下载\url。还可以添加以下表达式：
 `｛｛$json[“download_url”]｝｝`
 .
6. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点下载上一个节点返回的报告。
 



![使用SecurityScorecard节点下载报告](https://d33wubrfki0l68.cloudfront.net/1dfbb5ff4800a3582eb5a15a39e342c8500d9725/0f872/_images/integrations/builtin/app-nodes/securityscorecard/securityscorecard2_node.png)





