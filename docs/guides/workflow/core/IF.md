


 如果
 [#](#如果是 "永久链接")
===============================



 如果节点用于根据比较操作有条件地拆分工作流。
 



 节点参考
 [#](#节点引用 "永久链接")
-------------------------------------------------------



 可以使用
 **添加条件**
 下拉列表。可以根据数据类型创建条件，每个数据类型的可用比较操作各不相同。
 



**布尔值**



*相等
*不相等



**编号**



*较小
*较小相等值
*相等
*不相等
*更大
*大于等于
*为空



**字符串**



*包含
*相等
*不包含
*不相等
*Regex公司
*为空



 您可以使用
 **合并**
 下拉列表。
 



 使用If和Merge节点执行分支
 [#](#使用if和merge节点执行分支 "永久链接")
-----------------------------------------------------------------------------------------------------------



 如果将合并节点添加到包含If节点的工作流中，则可能会导致If节点的两个输出分支都执行。
 



 合并节点由一个分支触发，然后转到并执行另一个分支。
 



 例如，在下面的屏幕截图中，有一个工作流包含Set节点、If节点和Merge节点。标准的If节点行为是执行一个分支（在截图中，这是
 **真**
 输出）。但是，由于Merge节点，两个分支都会执行，尽管If节点没有将任何数据发送到
 **错误**
 树枝
 



![简单工作流的屏幕截图。工作流有一个Set节点，后面是If节点。它以Merge节点结束。](https://d3.3wubrfki0l6.8..cloudfront.net/4.699c2.1.6f5.ea86a21c95d46fe4c05aea95aef7.ad/45a8d/_images/integrations/builtin/core-nodes/merge/if-merge-节点。png)




 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流执行两种不同的
 *设置*
 基于
 *如果*
 节点。您还可以找到
 [工作流](https://n8n.io/workflows/581) 
 此示例使用工作流将使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 [代码]（/integrations/builtin/core-nodes/n8n-nodes-base.Code/）
 -
 IF
 -
 [Set]（/integrations/builtin/core nodes/n8n nodes base.Set/）




 最终的工作流应如下图所示。
 



![具有IF节点的工作流](https://d33wubrfki0l68.cloudfront.net/643a927abe0e47ae3533cd2bf84a43d80acab0e6/69950/_images/integrations/builtin/core-nodes/if/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. 代码节点
 [#](#2-代码-代码 "永久链接")


1. 输入以下代码：
 


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
      id:0，
    }
  },
  {
    json：{
      id:1，
    }
  }
];

```

 |
2. 单击
 **执行节点**
 以运行工作流。



![使用代码节点向IF节点发送数据](https://d33wubrfki0l68.cloudfront.net/fee61b72710a357dfe0f530b770ddafba8f7469a/69303/_images/integrations/builtin/core-nodes/if/function_node.png)



### 
 3. IF节点
 [#](#3-if-node "永久链接")


1. 单击
 **添加条件**
 按钮，然后从下拉列表中选择“数字”。
2. 单击
 **值1**
 字段并单击
 **添加表达式**
 .
3. 在
 **变量选择器**
 部分：节点>函数>输出数据>JSON>ID。您还可以添加以下表达式：
 `｛｛$node[“Function”].json[“id”]｝｝`
 .
4. 从
 **操作**
 下拉列表，选择“相等”。
5. 单击
 **执行节点**
 以运行工作流。



![使用IF节点根据输入有条件地执行](https://d33wubrfki0l68.cloudfront.net/f56acf224d7ff1aef5f4074c8e5fb30999bfa95a/21f9a/_images/integrations/builtin/core-nodes/if/if_node.png)



### 
 4. 设置节点（对于“true”条件）
 [#](#4-set-node-for-true-condition "永久链接")


1. 创建一个连接到IF节点“true”输出的Set节点。
2. 单击
 **增加价值**
 按钮，然后从下拉列表中选择“字符串”。
3. 输入
 `名称`
 在
 **姓名**
 字段。
4. 输入
 `n8n`
 在
 **值**
 领域
5. 单击
 **执行节点**
 以运行工作流。



**注：**
 请注意，只有值为0的ID才到达此Set节点。
 



![当条件为真时，使用Set节点设置值](https://d33wubrfki0l68.cloudfront.net/154d75d491f751701f45f819857a3f2aba62a8e2/2b265/_images/integrations/builtin/core-nodes/if/set_node.png)



### 
 5. Set1节点（针对“false”条件）
 [#](#5-set1-node-for-false条件 "永久链接")


1. 创建
 *设置*
 节点连接到IF节点的“假”输出。
2. 单击
 **增加价值**
 按钮，然后从下拉列表中选择“字符串”。
3. 输入
 `名称`
 在
 **姓名**
 领域
4. 输入
 `节点化`
 在
 **值**
 领域
5. 单击
 **执行节点**
 以运行工作流。



**注：**
 请注意，只有值为1的ID才这样做
 *设置*
 node.
 



![当条件为false时，使用Set节点设置值](https://d33wubrfki0l68.cloudfront.net/1f44d5920b03629e3012a1841ae946c236d2f187/8ea46/_images/integrations/builtin/core-nodes/if/set1_node.png)





