


 比特典狱长
 [#](#bitwarden "永久链接")
=============================================



[比特典狱长](https://www.bitwarden.com/) 
 是一个面向个人、团队和商业组织的开源密码管理解决方案。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credential/bitwarder/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*集合
	+删除
	+获取
	+全部获取（Get All）
	+更新
*事件
	+全部获取（Get All）
*组
	+创建
	+删除
	+获取
	+全部获取（Get All）
	+获取成员
	+更新
	+更新成员
*成员
	+创建
	+删除
	+获取
	+全部获取（Get All）
	+获取组
	+更新
	+更新组



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您创建组，将成员添加到组，并在比特典狱长中获取组成员。您还可以找到
 [工作流](https://n8n.io/workflows/1001) 
 此示例使用工作流将使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Bitwarden




 最终的工作流应如下图所示。
 



![具有Bitwarden节点的工作流](https://d33wubrfki0l68.cloudfront.net/767164420b441722dfc3d5db24b2f28ea372013c/9847c/_images/integrations/builtin/app-nodes/bitwarden/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. Bitwarden节点（创建：组）
 [#](#2-bitwarden-node-create-group "永久链接")



 此节点将创建一个名为
 `文档`
 在Bitwarden。
 


1. 首先，您必须输入Bitwarder节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credential/bitwarder/）
 .
2. 从
 ***资源***
 下拉列表。
3. 从
 ***操作***
 下拉列表。
4. 输入
 `文档`
 在
 ***姓名***
 领域
5. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您将注意到该节点在Bitwarder中创建了一个新组。
 



![使用Bitwarden节点创建新组](https://d33wubrfki0l68.cloudfront.net/682a51b36841af7117e35744ee12467a941452e7/2e258/_images/integrations/builtin/app-nodes/bitwarden/bitwarden_node.png)



### 
 3. Bitwardn1节点（getAll:member）
 [#](#3-bitwardn1-node-getall-member "永久链接")



 此节点将从Bitwarder获取所有成员。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***资源***
 下拉列表。
3. 从
 ***操作***
 下拉列表。
4. 切换
 ***全部返回***
 到
 `真值`
 .
5. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您将注意到节点从Bitwarder中检索所有成员。
 



![使用Bitwarden节点获取所有成员](https://d33wubrfki0l68.cloudfront.net/f505317c671fda922402f9e9adb3619324f7564d/838b8/_images/integrations/builtin/app-nodes/bitwarden/bitwarden1_node.png)



### 
 4. Bitwardn2节点（updateMembers:group）
 [#](#4-bitwardn2-node-updatemembers-group "永久链接")



 此节点将更新我们先前创建的组中的所有成员。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***资源***
 下拉列表。
3. 从
 ***操作***
 下拉列表。
4. 单击
 ***组ID***
 字段并单击
 ***添加表达式***
 .
5. 在
 ***变量选择器***
 section:Nodes>Bitwarder>Output Data>JSON>id。您还可以添加以下表达式：
 `｛{$node[“Bitwarden”].json[“id”]｝｝`
 .
6. 单击
 ***成员ID***
 字段并单击
 ***添加表达式***
 .
7. 在
 ***变量选择器***
 部分：当前节点>输入数据>JSON>id。您还可以添加以下表达式：
 `｛｛$json[“id”]｝｝`
 .
8. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您将注意到节点更新了组的成员。
 



![使用Bitwarden节点更新组中的成员](https://d33wubrfki0l68.cloudfront.net/636a5bf22dc33885f26a9c938d137b9d314ee6a2/a29f4/_images/integrations/builtin/app-nodes/bitwarden/bitwarden2_node.png)



### 
 5. Bitwardn3节点（getMembers:group）
 [#](#5-bitwardn3-node-getmembers组 "永久链接")



 此节点将获取我们之前创建的组中的所有成员。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***资源***
 下拉列表。
3. 从
 ***操作***
 下拉列表。
4. 单击
 ***组ID***
 字段并单击
 ***添加表达式***
 .
5. 在
 ***变量选择器***
 section:Nodes>Bitwarder>Output Data>JSON>id。您还可以添加以下表达式：
 `｛{$node[“Bitwarden”].json[“id”]｝｝`
 .
6. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到节点检索组中的成员。
 



![使用Bitwarden节点获取组中的成员](https://d33wubrfki0l68.cloudfront.net/e65da62843986b22679f0f05f3a4164993c5a760/e3556/_images/integrations/builtin/app-nodes/bitwarden/bitwarden3_node.png)





