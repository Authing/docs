


 飞利浦色调
 [#](#philips hue "永久链接")
=================================================



[飞利浦色调](https://www.philips-hue.com/) 
 是一系列可无线控制的智能变色LED灯和灯泡。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/philipshue/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*灯光
	+删除灯光
	+检索灯光
	+检索所有灯光
	+更新灯光



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您使用飞利浦色调节点打开灯光并设置其亮度。您还可以找到
 [工作流](https://n8n.io/workflows/666) 
 此示例使用工作流将使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Philips Hue




 最终的工作流应如下图所示。
 



![使用Philips Hue节点的工作流](https://d33wubrfki0l68.cloudfront.net/5b389f0e659d54db5f640e0e4d2bfa3ab7bc3c0f/f75da/_images/integrations/builtin/app-nodes/philipshue/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. Philips Hue节点（更新：灯光）
 [#](#2-philips-hue-node-update-light "永久链接")


1. 首先，您必须输入Philips Hue节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/philipshue/）
 .
2. 在
 ***灯光ID***
 领域
3. 单击
 ***添加字段***
 并从下拉列表中选择“亮度”。
4. 在
 ***亮度***
 字段。
5. 单击
 ***执行节点***
 以运行节点。




