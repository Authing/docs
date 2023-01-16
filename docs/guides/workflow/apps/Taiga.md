


 泰加
 [#](#taiga "永久链接")
=====================================



[泰加](https://www.taiga.io/) 
 是一个面向初创公司、敏捷开发人员和设计师的免费开源项目管理平台。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/taiga/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------



**问题**
 -创建问题
-删除问题
-遇到问题
-获取所有问题
-更新问题
 



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您创建、更新和获取有关泰加的问题。您还可以找到
 [工作流](https://n8n.io/workflows/685) 
 此示例使用工作流将使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Taiga




 最终的工作流应如下图所示。
 



![使用Taiga节点的工作流](https://d33wubrfki0l68.cloudfront.net/ed03742f2862dca452cf8768e3c3beb74307d0f8/e3bda/_images/integrations/builtin/app-nodes/taiga/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. Taiga节点（创建：问题）
 [#](#2-taiga-node-create-issue "永久链接")


1. 首先，您必须输入Taiga节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/taiga/）
 .
2. 从
 ***项目ID***
 下拉列表。
3. 在
 ***主题***
 领域
4. 单击
 ***执行节点***
 以运行节点。



![使用Taiga节点创建问题](https://d33wubrfki0l68.cloudfront.net/a669ea259b12f2ad277b6261e7a43c2175e63410/96889/_images/integrations/builtin/app-nodes/taiga/taiga_node.png)



### 
 3. Taiga1节点（更新：问题）
 [#](#3-taiga1-node-update-eissue "永久链接")


1. 选择在上一个节点中输入的凭据。
2. 从
 ***操作***
 下拉列表。
3. 单击
 ***项目ID***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 部分：节点>Taiga>输出数据>JSON>项目。还可以添加以下表达式：
 `｛｛$node[“Taiga”].json[“project”]｝｝`
 .
5. 单击
 ***问题ID***
 字段并单击
 ***添加表达式***
 .
6. 在
 ***变量选择器***
 section:Nodes>Taiga>OutputData>JSON>id。您还可以添加以下表达式：
 `｛｛$node[“Taiga”].json[“id”]｝｝`
 .
7. 单击
 ***添加字段***
 按钮，然后从下拉列表中选择“描述”。
8. 在
 ***说明***
 领域
9. 单击
 ***执行节点***
 以运行节点。



![使用Taiga节点更新问题](https://d33wubrfki0l68.cloudfront.net/9f5cef60ad8bd3d97fe5d96dae7298f7e99293ec/33bad/_images/integrations/builtin/app-nodes/taiga/taiga1_node.png)



### 
 4. Taiga2节点（获取：问题）
 [#](#4-taiga2-node-get-issue "永久链接")


1. 选择在上一个节点中输入的凭据。
2. 从
 ***操作***
 下拉列表。
3. 单击
 ***问题ID***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 section:Nodes>Taiga>OutputData>JSON>id。您还可以添加以下表达式：
 `｛｛$node[“Taiga”].json[“id”]｝｝`
 .
5. 单击
 ***执行节点***
 以运行节点。



![使用Taiga节点解决问题](https://d33wubrfki0l68.cloudfront.net/bd2c082edca0df3034ecd887a538ffb4688be178/9f66f/_images/integrations/builtin/app-nodes/taiga/taiga2_node.png)





