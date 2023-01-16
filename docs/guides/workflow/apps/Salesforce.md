


 销售人员
 [#](#salesforce "永久链接")
===============================================



[销售人员](https://www.salesforce.com/) 
 是一家基于云的软件公司。它提供客户关系管理服务，还销售一套互补的企业应用程序，专注于客户服务、营销自动化、分析和应用程序开发。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/salesforce/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*帐户
	+向帐户添加备注
	+创建帐户
	+创建新帐户，或更新当前帐户（如果已存在）（追加启动）
	+获取帐户
	+获取所有帐户
	+返回帐户元数据的概述。
	+删除帐户
	+更新帐户
*附件
	+创建附件
	+删除附件
	+获取附件
	+获取所有附件
	+返回附件元数据的概述。
	+更新附件
*案例
	+向案例添加注释
	+创建案例
	+获取一个案例
	+获取所有案例
	+返回案例元数据的概述
	+删除案例
	+更新案例
*联系人
	+将潜在客户添加到活动中
	+向联系人添加备注
	+创建联系人
	+创建新联系人，或更新当前联系人（如果已存在）（追加启动）
	+删除联系人
	+获取联系人
	+返回联系人元数据的概述
	+获取所有联系人
	+更新联系人
*自定义对象
	+创建自定义对象记录
	+创建新记录，或更新当前记录（如果已存在）（追加启动）
	+获取自定义对象记录
	+获取所有自定义对象记录
	+删除自定义对象记录
	+更新自定义对象记录
*文件
	+上载文档
*流量
	+获取所有流
	+调用流
*引线
	+将潜在客户添加到活动中
	+向潜在客户添加备注
	+创建潜在客户
	+创建一个新的潜在客户，或更新当前的潜在客户（如果已经存在）（追加销售）
	+删除潜在客户
	+获取线索
	+获取所有线索
	+返回Lead元数据的概述
	+更新潜在客户
*机会
	+向商机添加备注
	+创造机会
	+创建一个新机会，或更新当前机会（如果已经存在）（追加销售）
	+删除商机
	+获得机会
	+获取所有机会
	+返回商机元数据的概述
	+更新商机
*搜索
	+执行SOQL查询，该查询在单个响应中返回所有结果
*任务
	+创建任务
	+删除任务
	+获取任务
	+获取所有任务
	+返回任务元数据的概述
	+更新任务
*用户
	+获取用户
	+获取所有用户



 使用销售人员自定义字段
 [#](#使用salesforce自定义字段 "永久链接")
-----------------------------------------------------------------------------------------------------



 要向请求中添加自定义字段，请执行以下操作：
 


1. 选择
 **其他字段**
 >
 **添加字段**
 .
2. 在下拉列表中，选择
 **自定义字段**
 .



 然后可以查找并添加自定义字段。
 



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您在Salesforce中创建、更新和向潜在客户添加备注。您还可以找到
 [工作流](https://n8n.io/workflows/664) 
 此示例使用工作流将使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Salesforce




 最终的工作流应如下图所示。
 



![具有Salesforce节点的工作流](https://d33wubrfki0l68.cloudfront.net/43d245ac432fea788bc123e9096c54199dc71053/e60b8/_images/integrations/builtin/app-nodes/salesforce/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. Salesforce节点（创建：销售线索）
 [#](#2-salesforce-node-create-lead "永久链接")


1. 首先，您必须输入Salesforce节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/salesforce/）
 .
2. 在
 ***公司***
 领域
3. 在
 ***姓氏***
 领域
4. 单击
 ***执行节点***
 以运行节点。



![使用Salesforce节点创建销售线索](https://d33wubrfki0l68.cloudfront.net/492dcdfcf2c064ca0ed3c4d2805a0fa22947e1cc/f0598/_images/integrations/builtin/app-nodes/salesforce/salesforce_node.png)



### 
 3. Salesforce1节点（更新：销售线索）
 [#](#3-销售人员1-node-update-lead "永久链接")


1. 选择在上一个节点中输入的凭据。
2. 从
 ***操作***
 下拉列表。
3. 单击
 ***销售线索ID***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 部分：Nodes>Salesforce>Output Data>JSON>id。您还可以添加以下表达式：
 `｛｛$node[“Salesforce”].json[“id”]｝｝`
5. 单击
 ***添加字段***
 按钮，然后从下拉列表中选择“城市”。
6. 在
 ***城市***
 字段。
7. 单击
 ***执行节点***
 以运行节点。



![使用Salesforce节点更新销售线索](https://d33wubrfki0l68.cloudfront.net/cebddc1dc33f18505d8c45432193a52db89e3607/16771/_images/integrations/builtin/app-nodes/salesforce/salesforce1_node.png)



### 
 4. Salesforce2节点（添加注释：lead）
 [#](#4-salesforce2-node-addnote-lead "永久链接")


1. 选择在上一个节点中输入的凭据。
2. 选择
 ***添加备注***
 来自
 ***操作***
 下拉列表。
3. 单击
 ***销售线索ID***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 部分：Nodes>Salesforce>Output Data>JSON>id。您还可以添加以下表达式：
 `｛｛$node[“Salesforce”].json[“id”]｝｝`
5. 在
 ***标题le***
 field.
6. Click on
 ***Execute Node***
 to run the node.



![Add a note to a lead with the Salesforce node](https://d33wubrfki0l68.cloudfront.net/d7721ee905cd8c64a1a44065cd26fe01b629440f/b34cb/_images/integrations/builtin/app-nodes/salesforce/salesforce2_node.png)





