


 谷歌联系人
 [#](#google联系人 "永久链接")
=========================================================



[谷歌联系人](https://contacts.google.com/) 
 是谷歌的联系人管理工具，可在其免费电子邮件服务Gmail中使用，作为一项独立服务，也是谷歌面向业务的网络应用程序GoogleApps套件的一部分。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/google/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*联系人
	+创建联系人
	+删除联系人
	+获取联系人
	+检索所有联系人
	+更新联系人



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您从Google联系人创建、更新和获取联系人。您还可以找到
 [工作流](https://n8n.io/workflows/637) 
 此示例使用工作流将使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 谷歌联系人




 最终的工作流应如下图所示。
 



![使用Google联系人节点的工作流](https://d33wubrfki0l68.cloudfront.net/e4a34a21ec54fe0be98d16300a9035f32719be83/e0bba/_images/integrations/builtin/app-nodes/googlecontacts/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. Google联系人节点（创建：联系人）
 [#](#2-google-contacts-node-create-contact "永久链接")


1. 首先，您必须输入Google联系人节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/google/）
 .
2. 在
 ***姓氏***
 领域
3. 在
 ***给定名称***
 领域
4. 单击
 ***执行节点***
 以运行节点。



![使用Google联系人节点创建联系人](https://d33wubrfki0l68.cloudfront.net/f481c3d4f18126410590ee96eb943847a4c4bca7/0dcb3/_images/integrations/builtin/app-nodes/googlecontacts/googlecontacts_node.png)



### 
 3. 谷歌联系人1节点（更新：联系人）
 [#](#3-google-contacts1-node-update-contact "永久链接")


1. 选择在上一个节点中输入的凭据。
2. 从
 ***操作***
 下拉列表。
3. 单击
 ***联系人ID***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 部分：节点>Google联系人>输出数据>JSON>联系人ID。还可以添加以下表达式：
 `｛｛$node[“Google联系人”].json[“联系人ID”]｝｝`
 .
5. 选择
 `*` 
 来自
 ***字段***
 下拉列表。
6. 单击
 ***添加字段***
 按钮并选择
 ***公司***
 .
7. 单击
 ***添加公司***
 按钮
8. 将
 ***当前***
 领域
9. 在
 ***域***
 领域
10. 在
 ***姓名***
 领域
11. 在
 ***标题***
 领域
12. 单击
 ***执行节点***
 以运行节点。



![使用Google联系人节点更新联系人](https://d33wubrfki0l68.cloudfront.net/2d61fdabe0232c53c032f971eb2acd15536c8ece/9cf7a/_images/integrations/builtin/app-nodes/googlecontacts/googlecontacts1_node.png)



### 
 4. 谷歌联系人2节点（获取：联系人）
 [#](#4-google-contacts2-node-get-contact "永久链接")


1. 选择在上一个节点中输入的凭据。
2. 从
 ***操作***
 下拉列表。
3. 单击
 ***联系人ID***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 部分：节点>Google联系人>输出数据>JSON>联系人ID。还可以添加以下表达式：
 `｛｛$node[“Google联系人”].json[“联系人ID”]｝｝`
 .
5. 从
 ***字段***
 下拉列表。
6. 单击
 ***执行节点***
 以运行节点。



![使用Google联系人节点获取联系人](https://d33wubrfki0l68.cloudfront.net/667445cc6da4bdfa51aebd470603ec484f981572/ab9c1/_images/integrations/builtin/app-nodes/googlecontacts/googlecontacts2_node.png)





