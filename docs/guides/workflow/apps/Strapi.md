


 Strapi公司公司
 [#](#strapi "永久链接")
=======================================



[带](https://www.strapi.io/) 
 是一个开源的Headless CMS，它允许开发者自由选择工具和框架，同时允许编辑轻松管理和分发内容。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credential/strapi/）
 .
 





 Strapi版本4
 



 Strapi节点节点是为Strapi版本3构建的。它的一些操作将无法与Strapi版本4一起使用。
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*条目
	+创建条目
	+删除条目
	+获取条目
	+获取所有条目
	+更新条目



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您在Strapi中创建、更新和获取条目。您还可以找到
 [工作流](https://n8n.io/workflows/779) 
 此示例使用工作流将使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 [Set]（/integrations/builtin/core nodes/n8n nodes base.Set/）
 -
 Strapi




 最终的工作流应如下图所示。
 



![具有Strapi节点的工作流](https://d33wubrfki0l68.cloudfront.net/97a56b1532570185f3e0fbb8833a0aa7e76b1d44/33525/_images/integrations/builtin/app-nodes/strapi/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. 设置节点
 [#](#2-集-节点 "永久链接")



 我们将使用Set节点为内容类型的条目设置标题、内容和描述
 `发布`
 。如果Strapi中有不同的内容类型，请相应地设置值。
 


1. 单击
 ***添加值***
 并从下拉列表中选择“字符串”。
2. 输入
 `标题`
 在
 ***姓名***
 领域
3. 输入
 `自动使用n8n`
 在
 ***价值***
 领域
4. 单击
 ***添加值***
 并从下拉列表中选择“字符串”。
5. 输入
 `内容`
 在
 ***姓名***
 领域
6. 输入
 `Strapi是无头CMS。我们将使用Strapi和n8n来自动化我们的内容创建工作流。”
 在
 ***价值***
 领域
7. 单击
 ***添加值***
 并从下拉列表中选择“字符串”。
8. 输入
 `说明`
 在
 ***姓名***
 领域
9. 输入
 `了解如何使用n8n自动化Strapi
 在
 ***价值***
 领域
10. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到节点设置了标题、内容和描述的值。
 



![使用Set节点设置数据](https://d33wubrfki0l68.cloudfront.net/a5bdb94b79096c4bd89f7089855b6522b7a712df/d20b1/_images/integrations/builtin/app-nodes/strapi/set_node.png)



### 
 2. Strapi节点（创建：条目）
 [#](#2-strapi-node-create-entry "永久链接")



 此节点将为内容类型创建条目
 `帖子`
 。如果您有不同的内容类型，请改用该内容类型。
 


1. 首先，您必须输入Strapi节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credential/strapi/）
 .
2. 从
 ***操作***
 下拉列表。
3. 输入
 `帖子`
 在
 ***内容类型***
 领域
4. 输入
 `标题、内容、描述`
 在
 ***列***
 领域如果要为其他列添加数据，请输入这些列名称。
5. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您将注意到该节点使用上一个节点的信息在Strapi中创建了一个新条目。
 



![使用Strapi节点创建条目](https://d33wubrfki0l68.cloudfront.net/08836a1873a9238cfd5fc185f51e7b8365aa7b7c/54bfb/_images/integrations/builtin/app-nodes/strapi/strapi_node.png)



### 
 3. Set1节点
 [#](#3-集1-节点 "永久链接")



 我们将使用Set节点来确保只有在该节点中设置的数据才能传递给工作流中的下一个节点。我们将设置
 `id `
 和
 `蛞蝓`
 在此节点中。
 


1. 单击
 ***添加值***
 并从下拉列表中选择“字符串”。
2. 输入
 `id `
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
 section:Nodes>Strapi>Output Data>JSON>id。您还可以添加以下表达式：
 `｛｛$node[“Strapi”].json[“id”]｝｝`
 .
5. 单击
 ***添加值***
 并从下拉列表中选择“字符串”。
6. 输入
 `蛞蝓`
 在
 ***姓名***
 领域
7. 输入
 `带n8n`的自动跟踪
 在
 ***价值***
 领域
8. 切换
 ***仅保留集合***
 到
 `真值`
 。我们将此选项设置为true，以确保只有在此节点中设置的数据才能传递到工作流中的下一个节点。
9. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到节点设置了
 `id `
 和
 `蛞蝓`
 。这些值将传递到工作流中的下一个节点。
 



![使用Set节点设置id和slug的值](https://d33wubrfki0l68.cloudfront.net/6a7708419cfedc97bad7d41db5de643173d74ee6/fa661/_images/integrations/builtin/app-nodes/strapi/set1_node.png)



### 
 4. Strapi1节点（更新：条目）
 [#](#4-strapi1-node-update-entry "永久链接")



 该节点将更新我们使用Strapi节点创建的条目的slug。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***操作***
 下拉列表。
3. 单击
 ***内容类型***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 部分：节点>Strapi>参数>contentType。还可以添加以下表达式：
 `｛｛$node[“Strapi”].parameter[“contentType”]｝｝`
 .
5. Ente公司r
 `id` 
 in the
 ***Update Key***
 field.
6. Enter
 `slug` 
 in the
 ***Columns***
 field. If you want to update a different column, enter that column name instead.
7. Click on
 ***Execute Node***
 to run the node.



 In the screenshot below, you will notice that the node adds a slug to the entry that we created using the Strapi node.
 



![Using the Strapi node to update an entry](https://d33wubrfki0l68.cloudfront.net/4daeccdc39ee45c20df516b680c1413a295dded0/f35e7/_images/integrations/builtin/app-nodes/strapi/strapi1_node.png)



### 
 5. Strapi2 node (get: entry)
 [#](#5-strapi2-node-get-entry "Permanent link")



 This node returns information about the entry that we created using the Strapi node.
 


1. Select the credentials that you entered in the previous node.
2. Click on the gears icon next to the
 ***Content Type***
 field and click on
 ***Add Expression***
 .
3. Select the following in the
 ***Variable Selector***
 section: Nodes > Strapi > Parameters > contentType. You can also add the following expression:
 `{{$node["Strapi"].parameter["contentType"]}}` 
 .
4. Click on the gears icon next to the
 ***Entry ID***
 field and click on
 ***Add Expression***
 .
5. Select the following in the
 ***Variable Selector***
 section: Nodes > Strapi > Output Data > JSON > id. You can also add the following expression:
 `{{$node["Strapi1"].json["id"]}}` 
 .
6. Click on
 ***Execute Node***
 to run the node.



 In the screenshot below, you will notice that the node returns information about the entry that we specified.
 



![Using the Strapi node to get information of an entry](https://d33wubrfki0l68.cloudfront.net/5f46349ac2c42af45a5dd4f2781372f63c0aee14/96b52/_images/integrations/builtin/app-nodes/strapi/strapi2_node.png)





