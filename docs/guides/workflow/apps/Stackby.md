


 Stackby公司公司
 [#](#stackby "永久链接")
=========================================



[堆叠](https://stackby.com/) 
 是一个实时数据库和团队协作平台。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/stackby/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*追加
*删除
*列表
*阅读



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您从Stackby中的表插入和检索数据。您还可以找到
 [工作流](https://n8n.io/workflows/934) 
 此示例使用工作流将使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 [Set]（/integrations/builtin/core nodes/n8n nodes base.Set/）
 -
 Stackby




 最终的工作流应如下图所示。
 



![具有Stackby节点的工作流](https://d33wubrfki0l68.cloudfront.net/f984d943ab266d693edd85496c2bb16fb557dcb3/cc033/_images/integrations/builtin/app-nodes/stackby/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. 设置节点
 [#](#2-集-节点 "永久链接")



 我们将使用Set节点为新记录的name和id字段设置值。
 


1. 单击
 ***添加值***
 按钮，然后从下拉列表中选择“数字”。
2. 输入
 `ID `
 在
 ***姓名***
 领域
3. 在
 ***价值***
 领域
4. 单击
 ***添加值***
 按钮，然后从下拉列表中选择“字符串”。
5. 输入
 `名称`
 在
 ***姓名***
 领域
6. 在
 ***价值***
 领域
7. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到节点为
 `ID `
 和
 `名称`
 .
 



![使用Set节点设置数据](https://d33wubrfki0l68.cloudfront.net/30e420a37bf36ade588a698656994a0a69608e76/20414/_images/integrations/builtin/app-nodes/stackby/set_node.png)



### 
 3. Stackby节点（附加）
 [#](#3-stackby-node-append "永久链接")



 此节点将把我们在上一个节点中设置的数据附加到表中。创建表格，如
 [此](https://stackby.com/embed/shr161295766228627eec5) 
 在Stackby堆栈中。
 



 复制位于以下位置的字符串
 `/堆栈/`
 在Stackby URL中。这是您的堆栈ID。例如，如果URL是
 `https://stackby.com/stack/stabdcat4234324/` 
 ，堆栈ID将为
 `标签4234324`
 .
 


1. 首先，您必须输入Stackby节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/stackby/）
 .
2. 将堆栈ID粘贴到
 ***堆栈ID***
 领域
3. 在
 ***表***
 领域
4. 输入
 `ID，名称`
 在
 ***列***
 领域
5. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点附加了我们在上一个节点中设置的数据。
 



![使用Stackby节点将数据插入Stackby表](https://d33wubrfki0l68.cloudfront.net/15504a357c0b8b75fa7203b96f2bbd5438edb3a6/3040e/_images/integrations/builtin/app-nodes/stackby/stackby_node.png)



### 
 4. Stackb1节点（列表）
 [#](#4-stackby-node-list "永久链接")



 此节点将列出表中的所有记录。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***操作***
 下拉列表。
3. 单击
 ***堆栈ID***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 部分：节点>Stackby>参数>stackId。还可以添加以下表达式：
 `｛｛$node[“Stackby”].parameter[“stackId”]｝｝`
 .
5. 单击
 ***表***
 字段并单击
 ***添加表达式***
 .
6. 在
 ***变量选择器***
 部分：节点>堆栈>参数>表。还可以添加以下表达式：
 `｛｛$node[“Stackby”].prarameter[“table”]｝｝`
 .
7. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到节点返回存储在表中的所有条目。
 



![使用Stackby节点从Stackby表读取数据](https://d33wubrfki0l68.cloudfront.net/d0584d285f393a838a01732c0086e55262e5f473/4cced/_images/integrations/builtin/app-nodes/stackby/stackby1_node.png)





