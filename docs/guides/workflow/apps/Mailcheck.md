


 邮件检查
 [#](#mailcheck "永久链接")
=============================================



[邮件检查](https://www.mailcheck.co/) 
 是一个应用程序，允许您清除订阅列表中的反弹，并与客户一起丰富数据。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/mailcheck/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*电子邮件
	+检查



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您使用邮件检查节点验证Airtable中存储的电子邮件。您还可以找到
 [工作流](https://n8n.io/workflows/1055) 
 此示例使用工作流使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -[Airtable]/集成/内置/app节点/n8n节点base.Airtable/）
-
 Mailcheck
 -
 [Set]（/integrations/builtin/core nodes/n8n nodes base.Set/）




 最终的工作流应如下图所示。
 



![具有Mailcheck节点的工作流](https://d33wubrfki0l68.cloudfront.net/1cbdc84b10b4c67ab761e6d76875ba7439636059/7b4be/_images/integrations/builtin/app-nodes/mailcheck/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下“开始”节点存在。
 


### 
 2. Airtable节点（列表）
 [#](#2-虚拟节点列表 "永久链接")



 创建表格，如
 [此](https://airtable.com/shrDUFXWoHCuJjYjT) 
 在您的Airtable基地。Airtable节点将列出表中的所有记录。
 


1. 首先，您必须输入Airtable节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/airtable/）
 .
2. 从
 ***操作***
 下拉列表。
3. 在
 ***基本ID***
 领域要获取Base ID，请转到
 [API页](https://airtable.com/api) 
 并选择正确的底座。你会在那里找到基地ID。
4. 在
 ***表***
 领域
5. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您会注意到节点返回了表中的所有记录。
 



![使用Airtable节点列出Airtable表中的数据](https://d33wubrfki0l68.cloudfront.net/3b74a81e34d93b20d88c1424680350ef637cdb63/0bda1/_images/integrations/builtin/app-nodes/mailcheck/airtable_node.png)



### 
 2. 邮件检查节点（检查：电子邮件）
 [#](#2-mailcheck-node-check-email "永久链接")



 此节点将检查上一节点返回的电子邮件。
 


1. 首先，您必须输入Mailcheck节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/mailcheck/）
 .
2. 单击
 ***电子邮件***
 字段并单击
 ***添加表达式***
 .
3. 在
 ***变量选择器***
 部分：当前节点>输入数据>JSON>字段>电子邮件。还可以添加以下表达式：
 `｛｛$json[“字段”][“电子邮件”]｝｝`
 .
4. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点检查上一个节点返回的电子邮件。
 



![使用Mailcheck节点检查电子邮件](https://d33wubrfki0l68.cloudfront.net/bedd8c1085363d342d4c17497eef6cf82d07f58b/7b1dc/_images/integrations/builtin/app-nodes/mailcheck/mailcheck_node.png)



### 
 3. 设置节点
 [#](#3-集-节点 "永久链接")



 我们将使用Set节点来确保只有在该节点中设置的数据才能传递给工作流中的下一个节点。
 


1. 单击
 ***添加值***
 按钮，然后从下拉列表中选择“布尔”。
2. 输入
 `有效`
 在
 ***姓名***
 领域
3. 单击
 ***价值***
 领域
4. 在
 ***变量选择器***
 部分：当前节点>输入数据>JSON>mxExists。还可以添加以下表达式：
 `｛｛$json[“mxExists”]｝｝`
 .
5. 单击
 ***添加值***
 按钮，然后从下拉列表中选择“字符串”。
6. 输入
 `ID `
 在
 ***姓名***
 领域
7. 单击
 ***价值***
 领域
8. 在
 ***变量选择器***
 section:Nodes>Airtable>Output Data>JSON>id。您还可以添加以下表达式：
 `｛｛$node[“Airtable”].json[“id”]｝｝`
 .
9. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到节点为
 `有效`
 和
 `ID `
 .
 



![使用Set节点设置Airtable节点要更新的数据](https://d33wubrfki0l68.cloudfront.net/abeb04961567d00e9739e2116653b1baa635717e/c8173/_images/integrations/builtin/app-nodes/mailcheck/set_node.png)



### 
 4. Airtable（更新）
 [#](#4-airtable更新 "永久链接")



 此节点将更新表中的有效字段。
 


1. 选择在上一个Airtable节点中输入的凭据。
2. 从
 ***操作***
 下拉列表。
3. 单击
 ***基本ID***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 部分：节点>Airtable>参数>应用程序。还可以添加以下表达式：
 `｛｛$node[“Airtable”].parameter[“application”]｝｝`
 .
5. 单击
 ***表***
 字段并单击
 ***添加表达式***
 .
6. 在
 ***变量选择器***
 部分：节点>空气表>参数>表。还可以添加以下表达式：
 `｛｛$node[“Airtable”].parameter[“table”]｝｝`
 .
7. 单击
 ***身份证号***
 字段并单击
 ***添加表达式***
 .
8. 在
 ***变量选择器***
 部分：当前节点>输入数据>JSON>ID。您还可以添加以下表达式：
 `｛｛$jso｝n["ID"]}}` 
 .
9. Toggle
 ***Update All Fields***
 to
 `false` 
 . This option will update only the fields that we specify.
10. Click on the
 ***Add Field***
 button.
11. Enter
 `Valid` 
 in the
 ***Name***
 field.
12. Click on
 ***Execute Node***
 to run the node.



 In the screenshot below, you will notice that the node updates the Valid field in the table.
 



![Using the Airtable node to update data of a record](https://d33wubrfki0l68.cloudfront.net/b16d1f1cb5c4ddd243f6c92fae923dcd15d287fd/172c1/_images/integrations/builtin/app-nodes/mailcheck/airtable1_node.png)





