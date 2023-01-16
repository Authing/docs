


 概念
 [#](#概念 "永久链接")
=======================================



[通知](https://notion.so) 
 是用于笔记、任务、Wiki和数据库的一体式工作区。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credential/concept/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------



**区块**
 -附加一个块
-获取所有子块
 



**数据库**
 -获取数据库
-获取所有数据库
-查询数据库
 



**数据库记录**
 -在数据库中创建记录
-更新数据库中的记录
 



**第**页
 -创建页面
-获取页面
-页面文本搜索
 



**用户**
 -获取用户
-获取所有用户
 



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您在通过Calendly创建邀请时向Notion数据库添加新用户。您还可以找到
 [工作流](https://n8n.io/workflows/1088) 
 此示例使用工作流使用以下节点。
 


*[Calendly Trigger]（/integrations/builtin/Trigger nodes/n8n nodes base.calendlytrigger/）
*通知



 最终的工作流应如下图所示。
 



![具有Notion节点的工作流](https://d33wubrfki0l68.cloudfront.net/828d66a51c59953f28575fe495bc4311ec559577/cce93/_images/integrations/builtin/app-nodes/notion/workflow.png)



### 
 1. 日历触发节点
 [#](#1-calendly-trigger-node "永久链接")



 创建邀请时，日历节点将触发工作流。
 


1. 首先，您必须输入Notion节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/calendly/）
 .
2. 从
 ***事件***
 下拉列表。
3. 保存工作流，以便注册webhook。
4. 单击
 ***执行节点***
 以运行节点。



**注：**
 由于您将在构建工作流时使用测试webhook，因此节点仅保持活动状态120秒。单击
 ***执行节点***
 按钮，通过Calendly创建邀请。
 



 在下面的屏幕截图中，您会注意到，创建邀请时，日历触发器节点会触发工作流。
 



![使用日历触发器节点触发工作流](https://d33wubrfki0l68.cloudfront.net/c5a5925829704c4d09ef6e87a91d38f44daa1377/0b0e7/_images/integrations/builtin/app-nodes/notion/calendlytrigger_node.png)



### 
 2. 通知节点（创建：databaseRecord）
 [#](#2-notion-node-create-databaserecordd "永久链接")



 此节点将使用从上一节点接收的信息创建新记录。
 


1. 首先，您必须输入Notion节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credential/concept/）
 .
2. 从
 ***资源***
 下拉列表。
3. 从
 ***数据库ID***
 下拉列表。
4. 单击
 ***添加属性***
 按钮
5. 从
 ***密钥***
 下拉列表。
6. 单击
 ***标题***
 字段并单击
 ***添加表达式***
 .
7. 在
 ***变量选择器***
 部分：当前节点>输入数据>JSON>有效负载>被邀请者>名称。还可以添加以下表达式：
 `｛｛$json[“有效载荷”][“被邀请者”][“名称”]｝｝`
 .
8. 单击
 ***添加属性***
 按钮
9. 从
 ***密钥***
 下拉列表。
10. 单击
 ***电子邮件***
 字段并单击
 ***添加表达式***
 .
11. 在
 ***变量选择器***
 部分：当前节点>输入数据>JSON>有效负载>受邀者>电子邮件。还可以添加以下表达式：
 `｛｛$json[“有效载荷”][“受邀者”][“电子邮件”]｝｝`
 .
12. 单击
 ***添加属性***
 按钮
13. 从
 ***密钥***
 下拉列表。
14. 从
 ***选项***
 下拉列表。
15. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点根据从上一个节点接收到的信息创建了一个新记录。
 



![使用Notion节点在Notion中添加新记录](https://d33wubrfki0l68.cloudfront.net/f78f91ef2786a5d4a216868c35dea96f7a1eef81/16279/_images/integrations/builtin/app-nodes/notion/notion_node.png)





 激活生产工作流
 



 您需要保存工作流，然后单击屏幕右上方的“激活”切换以激活工作流。然后，您的工作流将按照“日历触发”节点中的设置所指定的触发。
 





