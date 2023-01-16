


 养蜂人
 [#](#beeminder "永久链接")
=============================================



[蜂鸣](https://www.beeminder.com/) 
 是一项帮助您自我跟踪并坚持目标的服务。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credential/beeminder/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------



**数据点**
 -为目标创建数据点
-删除数据点
-获取目标的所有数据点
-更新数据点
 



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您在Strava中添加新活动时向养蜂人添加数据点。您还可以找到
 [工作流](https://n8n.io/workflows/900) 
 此示例使用工作流将使用以下节点。
-
 [Strava Trigger]（/integrations/builtin/Trigger nodes/n8n nodes base.stravatrigger/）
 -
 Beeminder




 最终的工作流应如下图所示。
 



![带有Beeminder节点的工作流](https://d33wubrfki0l68.cloudfront.net/defaa5d75be1bc7e531e9f5935da35b29ef4951c/076d7/_images/integrations/builtin/app-nodes/beeminder/workflow.png)



### 
 1. Strava触发器节点
 [#](#1-strava-trigger-node "永久链接")



 每当新活动添加到Strava帐户时，此节点将触发工作流。
 


1. 首先，您必须输入Strava Trigger节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/strava/）
 .
2. 从
 ***事件***
 下拉列表。
3. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到当新活动添加到Strava时，节点会触发工作流。
 



![使用Strava触发器节点触发工作流](https://d33wubrfki0l68.cloudfront.net/4fca3ca0a057d2fc8e50d723cb0a0b7ddc87ddd4/875c5/_images/integrations/builtin/app-nodes/beeminder/stravatrigger_node.png)



### 
 2. Beeminder节点（创建：数据点）
 [#](#2-beeminder-node-create-datapoint "永久链接")



 此节点将为目标创建一个数据点
 `测试`
 。如果您创建了不同名称的目标，请选择该目标。
 


1. 首先，您必须输入Beeminder节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credential/beeminder/）
 .
2. 从
 ***目标名称***
 下拉列表。
3. 单击
 ***添加字段***
 然后选择“注释”。
4. 单击
 ***注释***
 字段并单击
 ***添加表达式***
 .
5. 在
 ***变量选择器***
 部分：当前节点>输入数据>JSON>对象\Data>名称。还可以添加以下表达式：
 `｛｛$json[“object_data”][“name”]｝｝`
 .
6. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您会注意到节点在Beeminder中创建了一个数据点。
 



![使用Beeminder节点为目标创建数据点](https://d33wubrfki0l68.cloudfront.net/63d26bac94185d6c567d0d0f1b696681680168e5/a3e75/_images/integrations/builtin/app-nodes/beeminder/beeminder_node.png)





 激活生产工作流
 



 您需要保存工作流，然后单击屏幕右上方的“激活”切换以激活工作流。然后将根据Strava触发器节点中的设置触发工作流。
 





