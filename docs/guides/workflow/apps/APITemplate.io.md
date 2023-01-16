


 API模板.io
 [#](#apitemplateeio "永久链接")
======================================================



[API模板.io](https://apitemplate.io) 
 允许您自动生成图像和PDF文档。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/apitemplateio/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*帐户
*获取
*图像
*创建
*PDF格式
*创建



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您使用通过Typeform提交收到的信息创建发票。您还可以找到
 [工作流](https://n8n.io/workflows/989) 
 此示例使用工作流将使用以下节点。
-
 [Typeform Trigger]（/integrations/builtin/Trigger nodes/n8n nodes base.typeformtrigger/）
 -
 API模板.io




 最终的工作流应如下图所示。
 



![具有APITemplate.io节点的工作流](https://d3.3wubrfki0l6.8.cloudfront.net/383bfa3a38bf91.84.c5.586e0682.4e965fef2137.c0/b7da4/_images/integrations/builtin/app-nodes/apitemplateio/workflow.png)



### 
 1. 类型触发器节点
 [#](#1-typeform-trigger-node "永久链接")



 提交表单时，此节点将触发工作流。确保创建一个收集以下信息的表单：
 


*帐单收件人（短文本）
*客户的电子邮件地址（电子邮件）
*项目描述（短文本）
*项目价格（数量）
*项目描述（短文本）
*项目价格（数量）
*从
 ***身份验证***
 下拉列表。
*输入Typeform触发器节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/typeform/）
 .
*从中选择发票表单
 ***表单***
 下拉列表。
*切换
 ***简化答案***
 到
 `错误`
 。通过将此选项设置为false，节点将返回具有重复名称的字段的值。
*单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到提交表单时节点会触发工作流。我们将把这些信息传递给工作流中的下一个节点。
 



![在提交表单时使用Typeform触发器节点触发工作流](https://d33wubrfki0l68.cloudfront.net/98b19c92ba2f01823ded5471e192c46ef5c28f17/5e614/_images/integrations/builtin/app-nodes/apitemplateio/typeformtrigger_node.png)



### 
 2. APITemplate.io节点（创建：pdf）
 [#](#2-apittemplateio-node-create-pdf "永久链接")



 此节点将使用上一节点的信息生成发票。如果您还没有发票模板，请在APITemplate.io中创建发票模板。
 


1. 首先，您必须输入APITemplate.io节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/apitemplateio/）
 .
2. 从
 ***资源***
 下拉列表。
3. 从
 ***模板ID***
 下拉列表。
4. 切换
 ***JSON参数***
 到
 `真值`
 。通过将此选项设置为true，节点允许我们编写自定义JSON数据。
5. 切换
 ***下载***
 到
 `真值`
 .
6. 单击
 ***属性（JSON）***
 领域
7. 在
 ***编辑表达式***
 字段：
 


|  |  |
| --- | --- |
| 

```
 1
 2
 3
 4
 5
 6
 7
 8
 9
10
11
12
13
14
15
16
17
18
19
20
21
```

 | 

```
{
 “公司”：“n8n”，
 “email”：“｛｛$json[”1“][”email“]｝｝”，
 “发票号”：“213223444”，
 “发票日期”：“18-03-2021”，
 “发票到期日”：“17-04-2021”，
 “地址”：“德国柏林”，
 “company\bill_to”：“｛｛$json[“0”][“text”]｝｝”，
 “网站”：“https://n8n.io",
 “document\_id”：“889856789012”，
 “项目”：[
 {
 “item\_name”：“｛｛$json[”2“][”text“]｝”，
 “price”：“EUR｛$json[”3“][”number“]｝”
 },
 {
 “item\_name”：“｛｛$json[”4“][”text“]｝”，
 “price”：“EUR｛$json[“5”][“number”]｝｝”
 }
 ]
}

```

 |
8. 单击
 ***添加字段***
 按钮
9. 在
 ***文件名***
 字段。
10. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点使用上一个节点的数据创建发票。
 



![使用APITemplate.io节点创建发票](https://d33wubrfki0l68.cloudfront.net/412b9930c1ba5961304ad390d5e888a5cf30d177/9ec79/_images/integrations/builtin/app-nodes/apitemplateio/apitemplate.io_node.png)





 激活生产工作流
 



 您需要保存工作流，然后单击屏幕右上方的“激活”切换以激活工作流。然后将根据“类型触发器”节点中的设置触发工作流。
 





