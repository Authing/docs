


 运行甲板
 [#](#rundeck "永久链接")
=========================================



[运行甲板](https://www.rundeck.com/) 
 是用于事件管理、业务连续性和自助服务操作的开源runbook自动化。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/rundeck/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------



**工作**
 -执行作业
-获取作业的元数据
 



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您在Rundeck上执行作业。您还可以找到
 [工作流](https://n8n.io/workflows/539) 
 在本网站上。此示例使用工作流使用以下两个节点。
 


*[Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
*运行甲板



 最终的工作流应如下图所示。
 



![具有Rundeck节点的工作流](https://d33wubrfki0l68.cloudfront.net/acda1432120da4d7063c97032ba0294c0bed2963/614a4/_images/integrations/builtin/app-nodes/rundeck/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. Rundeck节点
 [#](#2-rundeck-node "永久链接")


1. 首先，您必须输入Rundeck节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/rundeck/）
 .
2. 在
 *作业Id*
 领域您可以在下面的常见问题解答中找到有关如何获取作业ID的说明。
3. 单击
 *执行节点*
 以运行工作流。



 常见问题解答
 [#](#faqs "永久链接")
-----------------------------------


### 
 如何查找作业ID？
 [#](#how-do-i-find-the-job-id "永久链接")


1. 访问Rundeck仪表板。
2. 打开包含要用于n8n的作业的项目。
3. 在侧边栏中，单击“JOBS”。
4. 在“所有作业”下，单击要用于n8n的作业的名称。
5. 在左上角的作业名称下，复制以较小字体显示在作业名称下方的字符串。这是您的工作ID。
6. 将此作业ID粘贴到
 `作业Id `
 n8n中的字段。




