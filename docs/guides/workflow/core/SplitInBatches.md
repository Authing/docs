


 批量拆分
 [#](#分批拆分为 "永久链接")
===========================================================



 “批内拆分”节点保存原始传入数据，并在每次迭代时返回预定义数量的数据。此节点可用于循环数据。
 



 节点参考
 [#](#节点引用 "永久链接")
-------------------------------------------------------


***批量大小：**
 每次调用返回的项目数。
****选项***
	+***重置：***
	 如果设置为true，则节点将重置。




 警告
 



 n8.n本机处理传入项目。工作流中可能不需要“批中拆分”节点。要了解有关n8n如何处理多个项目的更多信息，请参阅
 [n8n中的循环]（/flow logic/Looping/）
 .
 




 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您使用批内拆分节点从两个不同的源读取RSS提要。工作流中需要“批中拆分”节点，因为RSS读取节点只处理它接收的第一个项目。您还可以找到
 [工作流](https://n8n.io/workflows/6.87) 
 此示例使用工作流将使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 [代码]（/integrations/builtin/core-nodes/n8n-nodes-base.Code/）
 -
 批量拆分
 -
 [RSS Feed Read]（/integrations/builtin/core nodes/n8n nodes-base.rssfelread/）




 最终的工作流应如下图所示。
 



![具有批拆分节点的工作流](https://d3.3wubrfki0l68.cloudfront.net/ee878ea643a2.b3142c32dec4727ba1135.8600d5e/1b30c/_images/integrations/builtin/core-nodes/splitinbatches/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. 代码节点
 [#](#2-代码-代码 "永久链接")


1. 粘贴以下JavaScript代码：






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
```

 | 

```
返回[
 {
 json：{
 url:'https://medium.com/feed/n8n-io',
 }
 },
 {
 json：{
 url:'https://dev.to/feed/n8n',
 }
 }
];

```

 |



 2. 单击
 ***执行节点***
 以运行节点。
 



![使用“代码”节点返回URL](https://d33wubrfki0l68.cloudfront.net/1925400d4a8a539ff04ac5e36744f2d91434f4db/a555c/_images/integrations/builtin/core-nodes/splitinbatches/function_node.png)



### 
 3. SplitInBatches节点
 [#](#3-拆分批次-节点 "永久链接")


1. 将批量大小设置为
 `1` 
 在
 ***批次大小***
 领域
2. 单击
 ***执行节点***
 以运行节点。



![使用批内拆分节点拆分数据](https://d33wubrfki0l68.cloudfront.net/98a50534f08fe5c992a1e923d29590b557ec8ef6/c9a40/_images/integrations/builtin/core-nodes/splitinbatches/splitinbatches_node.png)



### 
 4. RSS读取节点
 [#](#4-rss-read-node "永久链接")


1. 单击
 ***网址***
 字段并单击
 ***添加表达式***
 .
2. 在
 ***变量选择器***
 部分：节点>分割批次>输出数据>JSON>url。还可以添加以下表达式：
 `｛｛$node[“SplitInBatches”].json[“url”]｝｝`
 .
3. 单击
 ***执行节点***
 以运行工作流。



![使用RSS读取节点从RSS源读取数据](https://d33wubrfki0l68.cloudfront.net/8dd31a47d49c69e6b2f0f07c3b16bd069c67d3ad/e36e6/_images/integrations/builtin/core-nodes/splitinbatches/rssfeedread_node.png)




 常见问题解答
 [#](#faqs "永久链接")
-----------------------------------


### 
 如何确定节点不需要处理任何项目？
 [#](#如何确定节点 "永久链接"未处理任何项目)



 要确定项目是否由节点处理，请使用以下表达式：
 `｛｛$node[“SplitInBatches”].context[“noItemsLeft”]｝｝`
 。此表达式返回布尔值。如果有数据需要处理，表达式将返回
 `错误`
 否则
 `真值`
 .
 



 请参阅此
 [工作流](https://n8n.io/workflows/995) 
 尝试一下。
 


### 
 如何获取节点的当前运行索引？
 [#](#如何获取节点 "永久链接"的当前运行索引)



 要获取节点的当前运行索引，请使用以下表达式：
 `｛｛$node[“SplitInBatches”].context[“currentRunIndex”]；｝｝`
 .
 



 请参阅此
 [工作流](https://n8n.io/workflows/996) 
 尝试一下。
 




