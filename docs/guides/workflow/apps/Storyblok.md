


 Storyblok公司公司
 [#](#storyblok "永久链接")
=============================================



[故事情节](https://www.storyblok.com/) 
 是一个带有可视化编辑器的无头内容管理系统。它为开发人员提供了构建可靠、快速网站所需的所有灵活性，同时为没有编码技能的内容创作者提供了独立于开发人员编辑内容的能力。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credential/storyblok/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


### 
 内容API
 [#](#content-api "永久链接")



**故事**
 -获取故事
-获取所有故事
 


### 
 管理API
 [#](#管理api "永久链接")



**故事**
 -删除故事
-获取故事
-获取所有故事
-发布故事
-取消发布故事
 



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您获取所有以slug开头的故事
 `释放`
 并使用Storyblok节点发布它们。您还可以找到
 [工作流](https://n8n.io/workflows/768) 
 此示例使用工作流将使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Storyblok




 最终的工作流应如下图所示。
 



![具有Storyblok节点的工作流](https://d33wubrfki0l68.cloudfront.net/95955c7b355fbfd9fae618b6c7471074cac1e737/044b9/_images/integrations/builtin/app-nodes/storyblok/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. Storyblok节点（getAll:story）
 [#](#2-storyblok-node-getal-story "永久链接")



 此节点将获取所有以开头的故事
 `释放`
 .
 


1. 从
 ***来源***
 下拉列表。
2. 您必须输入Storyblok节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credential/storyblok/）
 .
3. 从
 ***操作***
 下拉列表。
4. 从
 ***空间ID***
 下拉列表。
5. 单击
 ***添加筛选器***
 按钮
6. 输入
 `释放`
 在
 ***以开头***
 领域
7. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您会注意到节点返回所有以slug开头的故事
 `释放`
 .
 



![使用Storyblok节点获取过滤的故事](https://d33wubrfki0l68.cloudfront.net/c1bbe818d782bdfb5efdf683cfc843b988b2afaf/b14a3/_images/integrations/builtin/app-nodes/storyblok/storyblok_node.png)



### 
 3. Storyblok1节点（发布：story）
 [#](#3-storyblok1-node-publish-story "永久链接")



 此节点将发布上一节点返回的故事。
 


1. 从
 ***来源***
 下拉列表。
2. 选择在上一个节点中输入的凭据。
3. 从
 ***操作***
 下拉列表。
4. 单击
 ***空间ID***
 字段并单击
 ***添加表达式***
 .
5. 在
 ***变量选择器***
 部分：节点>Storyblok>参数>空间。还可以添加以下表达式：
 `｛｛$node[“Storyblok”].parameter[“space”]｝｝`
 .
6. 单击
 ***故事ID***
 字段并单击
 ***添加表达式***
 .
7. 在
 ***变量选择器***
 section:Nodes>Storyblok>Output Data>JSON>id。您还可以添加以下表达式：
 `｛｛$node[“Storyblok”].json[“id”]｝｝`
 .
8. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您会注意到该节点发布了上一个节点返回的故事。
 



![使用Storyblok节点发布故事](https://d33wubrfki0l68.cloudfront.net/7f09d6345eefb6ea9117cae9a4bd5503c0593602/8abe4/_images/integrations/builtin/app-nodes/storyblok/storyblok1_node.png)





