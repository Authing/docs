


 Brandfetch品牌品牌
 [#](#brandfetch "永久链接")
===============================================



[品牌](https://www.Brandfetch.com/) 
 是一个品牌搜索引擎，可帮助您查找徽标、颜色、字体、图像等。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/brandfetch/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*返回公司的颜色
*返回公司数据
*返回公司字体
*返回公司的行业
*返回公司徽标和图标



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您获取公司的徽标、图标和信息，并将其存储在Airtable中。您还可以找到
 [工作流](https://n8n.io/workflows/835) 
 此示例使用工作流将使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Brandfetch
 -
 [Set]（/integrations/builtin/core nodes/n8n nodes base.Set/）
 -
 [Airtable]（/integrations/builtin/app nodes/n8n nodes-base.Airtable/）




 最终的工作流应如下图所示。
 



![具有Brandfetch节点的工作流](https://d33wubrfki0l68.cloudfront.net/0cb2fba7dbd42b0e9ec19ddfb7afcbc6e95b2667/10421/_images/integrations/builtin/app-nodes/brandfetch/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. Brandfetch节点（徽标）
 [#](#2-brandfetch-node-logo "永久链接")



 此节点将获取n8n的徽标和图标的URL。如果您想要其他公司的徽标和图标，请输入该公司的域名。
 


1. 首先，您必须输入Brandfetch节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/brandfetch/）
 .
2. 输入
 `n8n.io`
 在
 ***域***
 领域
3. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点检索n8n的徽标和图标的URL。
 



![使用Brandfetch节点检索公司徽标和图标的URL](https://d33wubrfki0l68.cloudfront.net/04b539de3998ef6519327da4e6035708b602b65c/5c4a1/_images/integrations/builtin/app-nodes/brandfetch/brandfetch_node.png)



### 
 3. Brandfetch1节点（公司）
 [#](#3-brandfetch1-node-company "永久链接")



 此节点将获取有关n8n的公司数据。
 


1. 选择在上一个Brandfetch节点中输入的凭据。
2. 从
 ***操作***
 下拉列表。
3. 单击
 ***域***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 部分：节点>Brandfetch>参数>域。还可以添加以下表达式：
 `｛｛$node[“Brandfetch”].prarameter[“domain”]｝｝`
 .
5. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到节点返回关于n8n的公司数据。
 



![使用Brandfetch节点检索公司数据](https://d33wubrfki0l68.cloudfront.net/4a3da59011bc4ad41661a7027817a7ab97f5532e/f5974/_images/integrations/builtin/app-nodes/brandfetch/brandfetch1_node.png)



### 
 4. 设置节点
 [#](#4-set-node "永久链接")



 我们将使用Set节点来确保只有在该节点中设置的数据才能传递给工作流中的下一个节点。我们将设置
 `名称`
 ,
 `图标URL`
 和
 `徽标URL`
 在此节点中。
 


1. 单击
 ***添加值***
 按钮，然后从下拉列表中选择“字符串”。
2. 输入
 `名称`
 在
 ***姓名***
 领域
3. 单击
 ***价值***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 部分：节点>Brandfetch1>输出数据>JSON>名称。还可以添加以下表达式：
 `｛｛$node[“Brandfetch1”].json[“name”]｝｝`
 .
5. 单击
 ***添加值***
 按钮，然后从下拉列表中选择“字符串”。
6. 输入
 `图标URL`
 在
 ***姓名***
 领域
7. 单击
 ***价值***
 字段并单击
 ***添加表达式***
 .
8. 在
 ***变量选择器***
 部分：节点>Brandfetch>输出数据>JSON>图标>图像。还可以添加以下表达式：
 `｛{$node[“Brandfetch”].json[“icon”][“image”]｝｝`
 .
9. 单击
 ***添加值***
 按钮，然后从下拉列表中选择“字符串”。
10. 输入
 `徽标URL`
 在
 ***姓名***
 领域
11. 单击
 ***价值***
 字段并单击
 ***添加表达式***
 .
12. 在
 ***变量选择器***
 部分：节点>Brandfetch>输出数据>JSON>徽标>图像。还可以添加以下表达式：
 `｛｛$node[“Brandfetch”].json[“徽标”][“图像”]｝｝`
 .
13. 切换
 ***仅保留集合***
 到
 `真值`
 。我们将此选项设置为true，以确保只有在此节点中设置的数据才能传递到工作流中的下一个节点。
14. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您会注意到节点设置了
 `名称`
 ,
 `图标URL`
 和
 `徽标URL`
 。此值将传递给工作流中的下一个节点。
 



![使用Set节点设置Airtable节点要插入的数据](https://d33wubrfki0l68.cloudfront.net/7c8e142b42e4862b6a2abdda1a7eea3d752ee015/29f74/_images/integrations/builtin/app-nodes/brandfetch/set_node.png)



### 
 5. Airtable节点（追加）
 [#](#5-虚拟节点-附加 "永久链接")



 此节点将把我们在上一个节点中设置的数据附加到表中。创建表格，如
 [此](https://airtable.com/shrPVVaVZuHofrDVw) 
 在您的Airtable基地。
 


1. 首先，您必须输入Airtable节点的凭据。您可以了解如何 to do that
 [here](/integrations/builtin/credentials/airtable/) 
 .
2. Select 'Append' from the
 ***Operation***
 dropdown list.
3. Enter the Base ID in the
 ***Base ID***
 field. For obtaining the Base ID, head over to their
 [API page](https://airtable.com/api) 
 and select the correct base. You'll find the Base ID there.
4. Enter the name of your table in the
 ***Table***
 field.
5. Click on
 ***Execute Node***
 to run the node.



 In the screenshot below, you will notice that the node appends the data that we had set in the previous node.
 



![Using the Airtable node to insert data into an Airtable table](https://d33wubrfki0l68.cloudfront.net/bd99596a0cd00726e9cc753432527a173e34e3c0/8112a/_images/integrations/builtin/app-nodes/brandfetch/airtable_node.png)





