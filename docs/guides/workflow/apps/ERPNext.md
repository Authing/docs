


 ERP文本
 [#](#erpnext "永久链接")
=========================================



[ERP文本](https://erpnext.com) 
 是一个开源的集成企业资源规划软件。它是制造商、分销商和服务公司使用的通用ERP软件。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/erpnext/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------



**文件**
 -创建文档
-删除文档
-检索文档
-检索所有文档
-更新文档
 



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您从ERP文本创建、更新和检索文档。您还可以找到
 [工作流](https://n8n.io/workflows/961) 
 此示例使用工作流使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 ERPNext




 最终的工作流应如下图所示。
 



![具有ERPNext节点的工作流](https://d33wubrfki0l68.cloudfront.net/ff329deea5a6b7fc4edceeec598dbde9ae2304bf/1e14f/_images/integrations/builtin/app-nodes/erpnext/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下“开始”节点存在。
 


### 
 2. ERPNext节点（文档：创建）
 [#](#2-erpnext-node-document-create "永久链接")



 此节点将在ERPNext中创建新文档。
 


1. 首先，您必须输入ERPNext节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/erpnext/）
 .
2. 从
 ***文档类型***
 下拉列表。
3. 单击
 ***添加属性***
 按钮
4. 从
 ***字段***
 下拉列表。
5. 输入
 `项目1`
 在
 ***价值***
 领域
6. 单击
 ***添加属性***
 按钮
7. 从
 ***字段***
 下拉列表。
8. 输入
 `项目-1`
 在
 ***价值***
 领域
9. 单击
 ***添加属性***
 按钮
10. 从
 ***字段***
 下拉列表。
11. 输入
 `产品`
 在
 ***价值***
 领域
 **注：**
 确保ERPNext帐户中存在项目组。
12. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您会注意到节点创建了一个名为
 `项目1`
 .
 



![使用ERPNext节点创建新项目](https://d33wubrfki0l68.cloudfront.net/6bb19405cabcdd36286a9c20b9084525ce8c027f/7efbe/_images/integrations/builtin/app-nodes/erpnext/erpnext_node.png)



### 
 3. ERPNext1节点（文档：addContact）
 [#](#3-erpnext1-node-document-addcontact "永久链接")



 此节点将添加
 `项目税`
 属性设置为我们在上一个节点中创建的项。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***操作***
 下拉列表。
3. 从
 ***文档类型***
 下拉列表。
4. 单击
 ***项目名称***
 字段并单击
 ***添加表达式***
 .
5. 在
 ***变量选择器***
 部分：当前节点>输入数据>JSON>名称。还可以添加以下表达式：
 `｛｛$json[“name”]｝｝`
 .
6. 单击
 ***添加属性***
 按钮
7. 从
 ***字段***
 下拉列表。
8. 输入
 `5` 
 在
 ***价值***
 领域
9. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点将Item Tax属性添加到我们在上一个节点中创建的项目中。
 



![使用ERPNext节点更新项目](https://d33wubrfki0l68.cloudfront.net/0f47be6a19877562cecffd7b497cb5c75c27dc57/b0891/_images/integrations/builtin/app-nodes/erpnext/erpnext1_node.png)



### 
 4. ERPNext2节点（文档：get）
 [#](#4-ernext2-node-document-get "永久链接")



 此节点将获取有关先前创建的项的信息。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***操作***
 下拉列表。
3. 从
 ***文档类型***
 下拉列表。
4. 单击
 ***项目名称***
 字段并单击
 ***添加表达式***
 .
5. 在
 ***变量选择器***
 部分：当前节点>输入数据>JSON>名称。还可以添加以下表达式：
 `｛｛$json[“name”]｝｝`
 .
6. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到节点返回项目的信息。
 



![使用ERPNext节点返回项目信息](https://d33wubrfki0l68.cloudfront.net/867875055b15f8484a24621ff661bd6089b541e9/b3b38/_images/integrations/builtin/app-nodes/erpnext/erpnext2_node.png)





