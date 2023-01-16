


 HTML提取
 [#](#html提取 "永久链接")
===================================================



 HTML提取节点用于提取网页的HTML内容。
 



 节点参考
 [#](#节点引用 "永久链接")
-------------------------------------------------------


***源数据：**
 此字段指定是从二进制数据还是JSON数据读取HTML。在此下拉列表中，有两个选项。
	+二进制
	+JSON文件
****JSON属性：***
 可以在其中找到HTML（从中提取数据）的JSON属性的名称。当在
 ***源数据***
 领域
****二进制属性：***
 可以在其中找到HTML（从中提取数据）的二进制属性的名称。当在
 ***源数据***
 字段。
属性可以包含字符串或字符串数组。
****提取值：***
	+***键：***
	 保存提取值的键。
	+***CSS选择器：***
	 要使用的CSS选择器。
	+***返回值：***
	 应返回的数据类型。在此下拉列表中有四个选项。
		-***属性：***
		 从元素中获取类似“class”的属性值。
			****属性：***
			 要返回其值的属性的名称。
		-***HTML：***
		 获取元素包含的HTML。
		-***文本：***
		 仅获取元素的文本内容。
		-***值：***
		 获取输入、选择或文本区域的值。
	+***返回阵列：***
	 以数组的形式返回值，这样如果找到多个值，它们也会分别返回。如果未设置，则所有值将作为单个字符串返回。
****选项：***
	+***微调值：***
	 删除值开头和结尾的所有空格和换行符。



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您从
 [哈克农](https://hackernoon.com/) 
 主页，使用HTML提取节点。您还可以找到
 [工作流](https://n8n.io/workflows/434) 
 此示例使用工作流使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 [HTTP请求]（/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/）
 -
 HTML Extract




 最终的工作流应如下图所示。
 



![具有HTML提取节点的工作流](https://d33wubrfki0l68.cloudfront.net/6a079ffdf780339ff13313dc6aaafb213636ff19/09409/_images/integrations/builtin/core-nodes/htmlextract/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. HTTP请求节点（GET）
 [#](#2-http-request-node-get "永久链接")


1. 输入
 `https://hackernoon.com` 
 在
 ***网址***
 领域
2. 从
 ***响应格式***
 下拉列表。
3. 单击
 ***执行节点***
 以运行节点。



![使用HTTP请求节点从Hackernon获取文章](https://d33wubrfki0l68.cloudfront.net/be1a109060551bbc82e95c3e52ede63661373e21/174a8/_images/integrations/builtin/core-nodes/htmlextract/httprequest_node.png)



### 
 3. HTML Extract节点（json:data）
 [#](#3-html-extract-node-json-data "永久链接")


1. 单击
 ***添加值***
 按钮
2. 输入
 `项目`
 在
 ***密钥***
 字段。
3. 输入
 `h2`
 在
 ***CSS选择器***
 领域
4. 从
 ***返回值***
 下拉列表。
5. 切换
 ***返回数组***
 为真。
6. 单击
 ***执行节点***
 以运行节点。



![使用HTML Extract节点提取文章标题](https://d33wubrfki0l68.cloudfront.net/1188912ea4b76f143f40df4cad2125d4176992a0/7e96d/_images/integrations/builtin/core-nodes/htmlextract/htmlextract_node.png)



### 
 4. HTML Extract1节点（json:item）
 [#](#4-html-extract1-node-json-item "永久链接")


1. 输入
 `项目`
 在
 ***JSON属性***
 领域
2. 单击
 ***添加值***
 按钮
3. 输入
 `标题`
 在
 ***密钥***
 领域
4. 输入
 `一个`
 在
 ***CSS选择器***
 领域
5. 单击
 ***添加值***
 按钮。
6. 输入
 `url `
 在
 ***密钥***
 领域
7. 输入
 `一个`
 在
 ***CSS选择器***
 领域
8. 从
 ***返回值***
 下拉列表。
9. 输入
 `href`
 在
 ***属性***
 字段。
10. 单击
 ***执行节点***
 以运行节点。



![使用HTML Extract节点提取文章的标题和链接](https://d33wubrfki0l68.cloudfront.net/102d2fb23c59cc57a90f3297946f63e4f922307a/0803e/_images/integrations/builtin/core-nodes/htmlextract/htmlextract1_node.png)





