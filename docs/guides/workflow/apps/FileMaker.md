


 文件生成器
 [#](#filemaker "永久链接")
=============================================



[文件制造商](https://www.claris.com/filemaker/) 
 是一个集成的企业资源规划软件。它是制造商、分销商和服务公司使用的通用ERP软件。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/filemaker/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*查找记录
*获取记录
*按Id获取记录
*执行脚本
*创建记录
*编辑记录
*重复记录
*删除记录



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您从文件生成器创建、更新和检索记录。您还可以找到
 [工作流](https://n8n.io/workflows/1068) 
 此示例使用工作流使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 FileMaker




 最终的工作流应如下图所示。
 



![具有FileMaker节点的工作流](https://d33wubrfki0l68.cloudfront.net/c30e14b3824b37348e856c92284a889b304e8cab/30011/_images/integrations/builtin/app-nodes/filemaker/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下“开始”节点存在。
 


### 
 2. FileMaker节点
 [#](#2-filemaker-node "永久链接")



 此节点将在FileMaker中创建新记录。
 


1. 首先，您必须输入FileMaker节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/filemaker/）
 .
2. 从
 ***行动***
 下拉列表。
3. 从
 ***布局***
 下拉列表。
4. 单击
 ***添加字段***
 按钮
5. 从
 ***字段***
 下拉列表。
6. 在
 ***价值***
 领域
7. 单击
 ***添加字段***
 按钮
8. 从
 ***字段***
 下拉列表。
9. 在
 ***价值***
 领域
10. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您将注意到该节点在FileMaker中创建了一条新记录。
 



![使用FileMaker节点创建新记录](https://d33wubrfki0l68.cloudfront.net/1d36cfa3d4c5fefc1b8d4b3f45abe4605e74a94c/2edf8/_images/integrations/builtin/app-nodes/filemaker/filemaker_node.png)



### 
 3. FileMaker1节点
 [#](#3-filemaker1-node "永久链接")



 此节点将向我们在上一节点中创建的记录添加一个新字段。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***行动***
 下拉列表。
3. 从
 ***布局***
 下拉列表。
4. 单击
 ***记录Id***
 字段并单击
 ***添加表达式***
 .
5. 在
 ***变量选择器***
 部分：当前节点>输入数据>JSON>响应>recordId。还可以添加以下表达式：
 `｛｛$json[“response”][“recordId”]｝｝`
 .
6. 单击
 ***模块Id***
 字段并单击
 ***添加表达式***
 .
7. 在
 ***变量选择器***
 部分：当前节点>输入数据>JSON>响应>modId。还可以添加以下表达式：
 `｛｛$json[“response”][“modId”]｝｝`
 .
8. 单击
 ***添加字段***
 按钮
9. 从
 ***字段***
 下拉列表。
10. 在
 ***价值***
 领域
11. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到节点添加了
 `地址_国家/地区`
 字段添加到我们在上一个节点中创建的记录。
 



![使用FileMaker节点更新记录](https://d33wubrfki0l68.cloudfront.net/8d53a051aa210dc0e5cba849e7ae66dccdbd14c2/8732f/_images/integrations/builtin/app-nodes/filemaker/filemaker1_node.png)



### 
 4. FileMaker2节点
 [#](#4-filemaker2-node "永久链接")



 此节点将获取有关先前创建的记录的信息。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***行动***
 下拉列表。
3. 从
 ***布局***
 下拉列表。
4. 单击
 ***记录Id***
 字段并单击
 ***添加表达式***
 .
5. 在
 ***变量选择器***
 部分：节点>FileMaker>输出数据>JSON>响应>recordId。还可以添加以下表达式：
 `｛｛$node[“FileMaker”].json[“response”][“recordId”]｝｝`
 .
6. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您将注意到节点返回记录的信息。
 



![使用FileMaker节点将信息返回记录](https://d33wubrfki0l68.cloudfront.net/f103d2bae006249fc36d387ccfaf4b773541c346/c3da8/_images/integrations/builtin/app-nodes/filemaker/filemaker2_node.png)





