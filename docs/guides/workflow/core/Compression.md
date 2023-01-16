


 压缩
 [#](#压缩 "永久链接")
=================================================



 压缩节点用于压缩和解压缩文件。您可以使用
 `gzip（gzip）`
 或
 `zip（压缩）`
 文件格式。
 



 节点参考
 [#](#节点引用 "永久链接")
-------------------------------------------------------


*操作
	+压缩
	+解压缩
*选项
	+***二进制属性***
	 field：此字段允许您指定二进制属性的名称
	+***输出前缀***
	 field：此字段允许您为生成的文件名指定前缀。“解压缩”操作显示此字段，“压缩”操作显示“gzip”输出格式
	+***输出格式***
	 field：此字段允许您选择输出格式。当从
	 ***操作***
	 下拉列表。以下是可用的格式：
		-gzip语言
		-拉链
	+***文件名***
	 field：此字段允许您指定文件名。当从
	 ***输出格式***
	 下拉列表。
	+***二进制属性输出***
	 field：此字段允许您为生成的文件指定名称。当从
	 ***输出格式***
	 下拉列表。



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您将二进制文件压缩为zip格式并将其上载到Dropbox。您还可以找到
 [工作流](https://n8n.io/workflows/908) 
 此示例使用工作流将使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 [HTTP请求]（/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/）
 -
 [Dropbox]（/integrations/builtin/app nodes/n8n nodes-base.Dropbox/）




 最终的工作流应如下图所示。
 



![具有“编辑图像”节点的工作流](https://d33wubrfki0l68.cloudfront.net/6659bbc8fd9b92714c1550292b917bfb64b8a9fc/8820d/_images/integrations/builtin/core-nodes/compression/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. HTTP请求节点（GET）
 [#](#2-http-request-node-get "永久链接")



 此示例工作流使用HTTP请求节点从URL获取图像。您也可以使用
 [读取二进制文件]（/integrations/builtin/core nodes/n8n nodes base.redbinaryfile/）
 节点从指定的路径读取文件。
 


1. 在
 ***网址***
 字段。例如
 `https://docs.n8n.io/assets/img/final-workflow.f380b957.png` 
 .
2. 从
 ***响应格式***
 下拉列表。
3. 输入
 `工作流程图像`
 在
 ***二进制属性***
 领域
4. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到HTTP请求节点从URL获取图像。此图像作为二进制数据传递给工作流中的下一个节点。
 



![使用HTTP请求节点从URL获取图像](https://d33wubrfki0l68.cloudfront.net/55235b31389d5ea38f9ee800cb6b485d67a0bdb2/eae47/_images/integrations/builtin/core-nodes/compression/httprequest_node.png)



### 
 3. HTTP Request1节点（GET）
 [#](#3-http-request1-node-get "永久链接")



 此节点从URL获取图像。您也可以使用
 [读取二进制文件]（/integrations/builtin/core nodes/n8n nodes base.redbinaryfile/）
 节点从指定的路径读取文件。
 


1. 在
 ***网址***
 领域例如
 `https://n8n.io/n8n-logo.png` 
 .
2. 从
 ***响应格式***
 下拉列表。
3. 输入
 `徽标`
 在
 ***二进制属性***
 领域
4. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到HTTP请求节点从URL获取图像。此图像作为二进制数据传递给工作流中的下一个节点。
 



![使用HTTP请求节点从URL获取图像](https://d33wubrfki0l68.cloudfront.net/c5f0c02f8fe83373e07246b69a62614dce3cc4ba/4f729/_images/integrations/builtin/core-nodes/compression/httprequest1_node.png)



### 
 4. 压缩节点（compress）
 [#](#4-压缩节点-压缩 "永久链接")



 该节点将从HTTP请求节点接收的二进制文件压缩为zip文件。如果你想压缩它们
 `gzip（gzip）`
 格式，请选择该选项。
 


1. 从
 ***操作***
 下拉列表。
2. 输入
 `徽标，workflow_image`
 在
 ***二进制属性***
 领域
3. 从
 ***输出格式***
 下拉列表。
4. 输入
 `图像.zip `
 在
 ***文件名***
 字段。
5. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您将注意到节点压缩文件并生成
 `图像.zip `
 .
 



![使用压缩节点压缩文件](https://d33wubrfki0l68.cloudfront.net/92db97627f6b2a6f5cfafe78c5cc1612942e6eb7/d262f/_images/integrations/builtin/core-nodes/compression/compression_node.png)



### 
 5. Dropbox节点（上传：文件）
 [#](#5线盒-调制解调器-文件 "永久链接")



 此节点将压缩文件上载到您的Dropbox帐户。
 


1. 首先，您必须输入Dropbox节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/dropbox/）
 .
2. 输入
 `/图像.zip `
 在
 ***文件路径***
 领域
3. 切换
 ***二进制数据***
 到
 `真值`
 。此选项允许我们从上一个节点上载二进制数据。
4. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到节点上载了我们在上一个节点中生成的压缩文件。
 



![使用Dropbox节点上载文件](https://d33wubrfki0l68.cloudfront.net/5baf73dcf3cea6854dc764a2cb31319696b4d800/23c91/_images/integrations/builtin/core-nodes/compression/dropbox_node.png)





