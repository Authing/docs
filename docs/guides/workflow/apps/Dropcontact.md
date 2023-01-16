


 下拉联系人
 [#](#dropcontact "永久链接")
=================================================



[下拉联系人](https://www.dropcpontact.com) 
 是一个电子邮件查找器平台，允许您自动查找、验证和验证提名电子邮件，并使用所有有效的信息来联系他，从而丰富您的联系人。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/dropcontact/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------



**联系人**
 -浓缩（Enrich）
-获取请求
 



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您从Google Sheet中查找电子邮件和丰富联系人，并将其添加到Lemlist。您还可以找到
 [工作流](https://n8n.io/workflows/1304) 
 在n8n.io上。
 



 此示例使用工作流将使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 [Google Sheets节点]（/integrations/builtin/app nodes/n8n nodes-base.googlesheets/）
 -
 Dropcontact节点
 -
 [Lemlist-node]（/integrations/builtin/app-nodes/n8n-nodes-base.Lemlist/）




![具有GetResponse节点的工作流](https://d33wubrfki0l68.cloudfront.net/0f223725506b47a888a0e34e41ba94c48f8ae1ca/76c6d/_images/integrations/builtin/app-nodes/dropcontact/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. Google Sheet节点
 [#](#2-google-sheet-node "永久链接")



 此节点将列出Google Sheet中的所有记录。创建图纸，如
 [此](https://docs.google.com/spreadsheets/d/1jCyGrz01b7wdoujEHHZvw-JD5zszTMFqn8cvvSnLPrE/edit#gid=0) 
 在您的Google Drive中。
 


1. 首先，您必须输入Google Sheet节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/google/）
 .
2. 从
 ***资源***
 下拉列表。
3. 从
 ***操作***
 下拉列表。
4. 在
 ***工作表ID***
 领域URL中提供了您的Google工作表ID
 `https://docs.google.com/spreadsheets/d/｛spreadsheetId｝/edit`
5. 在
 ***范围***
 字段，输入
 `A： K（K）`
 .
6. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到节点返回潜在客户的信息。
 



![使用谷歌工作表](https://d33wubrfki0l68.cloudfront.net/93d61bf0b5448015fa8f5b537de41da356c9c934/ba84f/_images/integrations/builtin/app-nodes/dropcontact/googlesheet_node.png)



### 
 3. Dropcontact节点
 [#](#3-dropcontact-node "永久链接")



 此节点将查找已验证的电子邮件地址并丰富联系人。
 


1. 首先，您必须输入Dropcontact节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/dropcontact/）
 .
2. 从
 ***资源***
 下拉列表。
3. 从
 ***操作***
 下拉列表。
4. 单击
 ***添加字段***
 然后选择“公司名称”。
5. 单击
 ***公司名称***
 字段并单击
 ***添加表达式***
 .
6. 在
 ***变量选择器***
 部分：节点>输入数据>JSON>字段>companyName。还可以添加以下表达式：
 `｛｛$json[“fields”][“companyName”]｝｝`
 .
7. 单击
 ***添加字段***
 然后选择“名字”。
8. 单击
 ***名字***
 字段并单击
 ***添加表达式***
 .
9. 在
 ***变量选择器***
 部分：节点>输入数据>JSON>字段>firstName。还可以添加以下表达式：
 `｛｛$json[“fields”][“firstName”]｝｝`
 .
10. 单击
 ***添加字段***
 然后选择“全名”。
11. 单击
 ***全名***
 字段并单击
 ***添加表达式***
 .
12. 在
 ***变量选择器***
 部分：节点>输入数据>JSON>字段>fullName。还可以添加以下表达式：
 `｛｛$json[“fields”][“fullName”]｝｝`
 .
13. 单击
 ***添加字段***
 然后选择“姓氏”。
14. 单击
 ***姓氏***
 字段并单击
 ***添加表达式***
 .
15. 在
 ***变量选择器***
 部分：节点>输入数据>JSON>字段>lastName。还可以添加以下表达式：
 `｛｛$json[“fields”][“lastName”]｝｝`
 .
16. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您将注意到Dropcontact节点丰富了您的数据。
 



![使用Dropcontact节点](https://d33wubrfki0l68.cloudfront.net/3eff55fe8c9a0d70cb8ebf96c640182cabe56c84/f2eb4/_images/integrations/builtin/app-nodes/dropcontact/dropcontact_node.png)



### 
 4. Lemlist节点
 [#](#4-lemlist-node "永久链接")



 此节点将为Lemlist中的活动创建新线索。
 


1. 首先，您必须输入Lemlist节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/lemlist/）
 .
2. 从
 ***资源***
 下拉列表。
3. 从
 ***活动ID***
 下拉列表。
4. 单击
 ***电子邮件***
 字段，然后单击“添加表达式”。
5. 在
 ***变量选择器***
 部分：Dropcontact>Input Data>JSON>字段>电子邮件>[Item:0]>电子邮件。还可以添加以下表达式：
 `｛｛$json[“电子邮件”][0][“电子邮件”]｝｝`
6. 单击
 ***添加字段***
 按钮，然后选择“名字”。
7. 单击
 ***名字***
 字段并单击
 ***添加表达式***
 .
8. 在
 ***变量选择器***
 部分：节点>输入数据>JSON>字段>first\_name。还可以添加以下表达式：
 `｛｛$json[“fields”][“first_name”]｝｝`
 .
9. 氯ick on the
 ***Add Field***
 button and select 'Last Name'.
10. Click on the gears icon next to the
 ***Last Name***
 field and click on
 ***Add Expression***
 .
11. Select the following in the
 ***Variable Selector***
 section: Node > Input Data > JSON > fields > last\_name . You can also add the following expression:
 `{{$json["fields"]["last_name"]}}` 
 .
12. Click on the
 ***Add Field***
 button and select 'Company Name'.
13. Click on the gears icon next to the
 ***Company Name***
 field and click on
 ***Add Expression***
 .
14. Select the following in the
 ***Variable Selector***
 section: Node > Input Data > JSON > fields > company\_name . You can also add the following expression:
 `{{$json["fields"]["company_name"]}}` 
 .
15. Click on the
 ***Add Field***
 button and select 'Deduplicate'.
16. Toggle
 ***Deduplicate***
 to
 `true` 
 .
17. Click on
 ***Execute Node***
 to run the node.



 In the screenshot below, you will notice that the node creates new enriched leads in Lemlist.
 



![Using the Lemlist node](https://d33wubrfki0l68.cloudfront.net/46358c829b77648cfcdedf2b7337188ad88ff609/ad6c2/_images/integrations/builtin/app-nodes/dropcontact/lemlist_node.png)





