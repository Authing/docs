


 项目列表
 [#](#项列出 "永久链接")
===============================================



 Item Lists节点简化了对包含列表（数组）的返回数据的处理，使您能够修改结构以进行进一步处理，而无需使用
 [代码]（/integrations/builtin/core-nodes/n8n-nodes-base.Code/）
 节点并编写自定义JavaScript。
 



 操作
 [#](#操作 "永久链接")
-----------------------------------------------



 “项目列表”节点允许您执行以下操作：
 


**拆分项目*
 ：从项目中的数据列表创建单独的项目。
**聚合项目*
 ：将多个项目合并为一个新项目。
**删除重复项*
 ：移除多余物品。
**排序*
 ：更改项目顺序。
**限制*
 ：删除超过定义的最大数量的项目。




 通常，不应将表达式用于需要
 `键`
 值（例如，
 **要拆分的字段**
 ). 表达式通常返回值，而不是键。
 



### 
 拆分项目
 [#](#拆分项目 "永久链接")



 如果您的数据包含项目列表（例如客户列表），并且您希望拆分它们，以便为每个客户提供一个项目，则此操作非常有用。
 



![拆分项目输出](https://d33wubrfki0l68.cloudfront.net/a378faaf8366b06844ea5c8397861ded0af7488e/4ae57/_images/integrations/builtin/core-nodes/itemlists/split_out.png)




 使用
 *拆分项目*
 操作，配置以下参数和选项：
 


**要拆分的字段*
 ：包含要分离为单个项目的列表的字段（例如。
 `名称`
 在这里的示例中）。
 **必须是明文，而不是表达式**
**包括*
 ：选择输入数据中的任何其他字段是否应与每个新的单个项目一起保留。您可以选择：
	+*无其他字段*
	+*所有其他字段*
	+*选定的其他字段*
	 ：选中时
	 *要包含的字段*
	 字段。输入所需字段的逗号分隔列表。
**禁用点符号*
 ：禁用时，子字段（格式为
 `父项.子项`
 )无法引用。
**目标字段名称*
 ：可选设置用于放置新拆分内容的字段名。


### 
 聚合项目
 [#](#聚合项目 "永久链接")



 当您想要获取多个单独的项目，或只是其中的特定部分，并将它们组合成单独的项目时，聚合项目操作非常有用。例如，下图显示了从包含许多其他详细信息的一系列单个客户记录中，将客户姓名和电子邮件地址分组为单个项目。
 



![聚合项目输出](https://d33wubrfki0l68.cloudfront.net/b589a76682d29b431730312b83b815485823d7bb/ce284/_images/integrations/builtin/core-nodes/itemlists/aggregate.png)




 使用
 *聚合项目*
 操作，配置以下参数和选项：
 


**要聚合的字段*
 ：要聚合在一起的输入数据中的字段的名称。
**重命名字段*
 ：启用此切换以输入聚合输出数据的字段名。聚合多个字段时，必须提供新的输出字段名称，
 **不能保留未定义的多个字段**
 .
**输出字段名称*
 ：仅在以下情况下显示
 *重命名字段*
 已启用。聚合输出数据的字段名。
**禁用点符号*
 ：禁用时，子字段（格式为
 `父项.子项`
 )无法引用。
**保留聚合列表*
 ：如果启用，则要聚合的列表字段将输出列表列表（而不是合并到单个列表中）。


### 
 删除重复项
 [#](#删除重复项 "永久链接")



 在许多情况下，您可能会遇到重复数据、用户创建多个帐户、客户多次提交同一订单等情况。当使用大型数据集时，很难轻松发现和删除这些项目。
 



 “删除重复项”操作允许您标识所有字段或仅所需字段子集中相同的项目。
 



![删除重复项输出](https://d33wubrfki0l68.cloudfront.net/07a1419c0c06c3c657cd04f00b1acbddea1bc8e6/eb0ce/_images/integrations/builtin/core-nodes/itemlists/duplicates.png)




 使用
 *删除重复项*
 操作，配置以下参数和选项：
 


**比较*
 ：提供应比较输入数据的哪些字段以检查它们是否相同。以下选项可用：
**所有字段*
 ：比较输入数据的所有字段。
**除*外的所有字段
 ：输入应从比较中排除哪些输入数据字段。可以提供多个值，用逗号分隔。
**选定字段*
 ：输入应包括在比较中的输入数据字段。可以提供多个值，用逗号分隔。
**禁用点符号*
 ：禁用时，子字段（格式为
 `父项.子项`
 )无法引用。


### 
 分类
 [#](#sort "永久链接")



 “排序”操作允许您按所需顺序组织列表，或根据需要生成随机选择（即，将任务随机分配给用户）。
 




 记住
 



 Sort操作使用默认的JavaScript操作，将要排序的元素转换为字符串并比较其值。看见
 [此处](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) 
 了解更多信息。
 




![排序项目输出](https://d33wubrfki0l68.cloudfront.net/f360c3b4940c82abd5d5634aa038dca14ceefd48/609db/_images/integrations/builtin/core-nodes/itemlists/sort.png)




 使用
 *排序*
 操作，配置以下参数和选项：
 


**类型*
 ：使用下拉菜单选择输入排序的方式。以下选项可用：
**简单*
 ：选择后，可以使用
 **添加要排序的字段*
 button to input the desired fields, and select whether* 
 Ascending
 *or* 
 Descending\* order is desired.
* *Random* 
 : Select to create a random order in the list.
* *Code* 
 : When selected, displays a code input field where you can enter custom JavaScript code to perform the sort operation.


### 
 Limit
 [#](#limit "Permanent link")



 If you want to keep and process only a specific number of items from your incoming data, the Limit operation allows you to select the desired number of items to keep and whether they should be taken from the beginning or end of the data (e.g. take the 5 highest priority tickets, the oldest order, etc.).
 



![Limit Items output](https://d33wubrfki0l68.cloudfront.net/a1d2213682b3b107a5d322d3dec5de91a6d6bba5/8cdfd/_images/integrations/builtin/core-nodes/itemlists/limit.png)




 When using the
 *Limit* 
 operation, configure the following parameters and options:
 


* *Max Items* 
 : Enter the maximum number of items that should be kept. If the input data contains more than this value, items will be removed.
* *Keep* 
 : When items must be removed, select if the input items at the beginning or end are kept.




