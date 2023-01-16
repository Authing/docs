


 移动二进制数据
 [#](#移动二进制数据 "永久链接")
===========================================================



 移动二进制数据节点用于在二进制和JSON属性之间移动数据。
 




 提示
 



 如果需要将整个CSV文件转换为JSON，请使用
 [电子表格文件]（/integrations/builtin/core nodes/n8n nodes base.spreadsheetfile/）
 节点。
 




 节点参考
 [#](#节点引用 "永久链接")
-------------------------------------------------------


****模式：***
 此字段指定数据应从何处移动到何处。
	+二进制到JSON
	+JSON到二进制
****设置所有数据：***
 如果设置为活动，则所有JSON数据将替换为从二进制键检索的数据。如果未设置为活动，则数据将写入单个密钥。当从
 ***模式***
 下拉列表。
****源密钥：***
 要从中获取数据的二进制密钥的名称。也可以使用点符号来定义深键。例如，“level.level.currentKey”。当从
 ***模式***
 下拉列表。
****目标密钥：***
 要将数据复制到的JSON键的名称。也可以使用点符号定义深度键。例如，“level.level2.newKey”。当从
 ***模式***
 下拉列表。
****转换所有数据：***
 如果设置为活动，所有JSON数据都将转换为二进制。如果未将其设置为活动，则仅转换具有一个键的数据。当从
 ***模式***
 下拉列表。
****目标密钥：***
 要将数据复制到的二进制键的名称。也可以使用点表示法定义深度键。例如，“level.level2.newKey”。当从
 ***模式***
 下拉列表。
****选项***



	+***保留源：***
	 保留源密钥。默认情况下，它将被删除。
	+***编码：***
	 设置数据流的编码。
	+以下是从
	 ***模式***
	 下拉列表。
		-***JSON分析：***
		 对数据运行JSON解析以获得正确的对象数据。当
		 ***设置所有数据***
		 设置为“false”。
		-***保持为Base64：***
		 将二进制数据保持为base64字符串。当
		 ***设置所有数据***
		 设置为“false”。
		-***带材BOM：***
		 从字符串中删除字节顺序标记（BOM）。当
		 ***编码***
		 选择。
	+以下是从
	 ***模式***
	 下拉列表。
		-***添加BOM：***
		 将字节顺序标记（BOM）添加到字符串中。当
		 ***编码***
		 选择。
		-***文件名：***
		 要设置的文件名。
		-***Mime类型：***
		 要设置的mime类型。默认情况下，将设置JSON mime类型。
		-***使用原始数据：***
		 按原样使用数据，不要将其字符串化。
		-***数据为Base64：***
		 将二进制数据保持为base64字符串。当
		 ***转换所有数据***
		 设置为“false”。



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您存储从
 [鸡尾酒数据库API](https://www.thecocktaildb.com/) 
 到您的机器。您还可以找到
 [工作流](https://n8n.io/workflows/652) 
 此示例使用工作流使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 [HTTP请求]（/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/）
 -
 [写入二进制数据]（/integrations/builtin/core nodes/n8n nodes base.writebinaryfile/）




 最终的工作流应如下图所示。
 



![具有移动二进制数据节点的工作流](https://d33wubrfki0l68.cloudfront.net/d560ebc4f011af3834ea3391f6cb94c70e9a5956/36aa4/_images/integrations/builtin/core-nodes/movebinarydata/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. HTTP请求节点（GET）
 [#](#2-http-request-node-get "永久链接")


1. 输入
 `https://www.thecocktaildb.com/api/json/v1/1/random.php` 
 在
 ***网址***
 字段。
2. 单击
 ***执行节点***
 以运行节点。



![使用HTTP请求节点从CocktailDB API获取随机鸡尾酒数据](https://d33wubrfki0l68.cloudfront.net/6233801c0db3ef0a71365755c518ffde81e5e98e/5bf9f/_images/integrations/builtin/core-nodes/movebinarydata/httprequest_node.png)



### 
 3. 移动二进制数据节点（JSON到二进制）
 [#](#3-move-binary-data-node-json-to-binary "永久链接")


1. 从
 ***模式***
 下拉列表。
2. 单击
 ***执行节点***
 以运行节点。



![使用移动二进制数据节点将JSON转换为二进制](https://d33wubrfki0l68.cloudfront.net/31b8fd388af4585066a693f2551b29b4430fd840/9a7f5/_images/integrations/builtin/core-nodes/movebinarydata/movebinarydata_node.png)



### 
 4. 写入二进制文件节点
 [#](#4-写入二进制文件-代码 "永久链接")


1. 在
 ***文件名***
 字段。
2. 单击
 ***执行节点***
 以运行节点。



![使用“写入二进制文件”节点将文件写入磁盘](https://d33wubrfki0l68.cloudfront.net/e80524a8308f71f2822c23e1cea6f29213a4d49d/c4163/_images/integrations/builtin/core-nodes/movebinarydata/writebinaryfile_node.png)





