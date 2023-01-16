


 编辑图像
 [#](#编辑图像 "永久链接")
===============================================



 “编辑图像”节点用于操纵和编辑图像。
 




 记住
 


1. 如果您没有在Docker上运行n8n，则需要安装
 [图形魔法](http://www.graphicsmagick.org/README.html) 
 .



1. 您需要使用其他节点，例如
 [读取二进制文件]（/integrations/builtin/core nodes/n8n nodes base.redbinaryfile/）
 节点或
 [HTTP请求]（/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/）
 节点将图像文件作为数据属性传递给“编辑图像”节点。



 节点参考
 [#](#节点引用 "永久链接")
-------------------------------------------------------


*操作
	+为图像添加模糊以降低清晰度
	+向图像添加边框
	+创建新图像
	+裁剪图像
	+在另一个图像上合成图像
	+在图像上绘制
	+获取有关图像的信息
	+旋转图像
	+更改图像的大小
	+沿X或Y轴的剪切图像
	+向图像添加文本



 也可以使用
 *格式*
 中的字段
 *添加选项*
 下拉列表。
 


*选项
	+***文件名***
	 field：允许您指定输出文件的文件名。
	+***格式***
	 字段：允许您指定输出文件的图像格式：
		-位图
		-GIF图片
		-JPEG格式
		-PNG格式
		-TIFF格式



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您使用“编辑图像”节点将文本添加到从internet下载的图像中。您还可以找到
 [工作流](https://n8n.io/workflows/591) 
 此示例使用工作流将使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 [HTTP请求]（/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/）
 -
 编辑图像




 最终的工作流应如下图所示。
 



![具有“编辑图像”节点的工作流](https://d33wubrfki0l68.cloudfront.net/0aef514f4fb781e215b56f2d0c407348fc09aa20/fc206/_images/integrations/builtin/core-nodes/editimage/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. HTTP请求节点
 [#](#2-http-request-node "永久链接")


1. 输入
 `https://docs.n8n.io/assets/img/final-workflow.f380b957.png` 
 在
 ***网址***
 领域
2. 从
 ***响应格式***
 下拉列表。
3. 单击
 *执行节点*
 以运行节点。



![使用HTTP请求节点获取图像](https://d33wubrfki0l68.cloudfront.net/2771f073881b0077184742b64823a46c3213cb2a/f6ae9/_images/integrations/builtin/core-nodes/editimage/httprequest_node.png)



### 
 3. 编辑图像节点
 [#](#3-edit-image-node "永久链接")


1. 从
 ***操作***
 下拉列表。
2. 输入
 `这是n8n`
 在
 ***文本***
 领域
3. 在
 ***字体大小***
 字段。
4. 在
 ***位置X***
 领域
5. 在
 ***位置Y***
 字段。
6. 单击
 *执行节点*
 以运行节点。



![使用“编辑图像”节点向图像添加文本](https://d33wubrfki0l68.cloudfront.net/fba1f00bd5f591e8894b79a14e079719ced1bba6/fa8c6/_images/integrations/builtin/core-nodes/editimage/editimage_node.png)





