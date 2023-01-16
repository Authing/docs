


 谷歌幻灯片
 [#](#google幻灯片 "永久链接")
=====================================================



[谷歌幻灯片](https://www.google.com/slides) 
 是一个基于web的演示程序，是谷歌办公软件套件的一部分，包含在谷歌硬盘服务中。它允许您创建、编辑和协作。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/google/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*第页
	+获取页面
	+获取缩略图
*演示文稿
	+创建演示文稿
	+获取演示文稿
	+获取演示幻灯片
	+替换演示文稿中的文本



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您获取演示文稿中的所有幻灯片，并获取页面的缩略图。您还可以找到
 [工作流](https://n8n.io/workflows/1035) 
 此示例使用工作流使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 谷歌幻灯片




 最终的工作流应如下图所示。
 



![使用Google幻灯片节点的工作流](https://d33wubrfki0l68.cloudfront.net/63563a15c1e240218bbfc601c0199abd24d44730/880a3/_images/integrations/builtin/app-nodes/googleslides/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下“开始”节点存在。
 


### 
 2. Google幻灯片节点（getSlides:演示）
 [#](#2-google-slides-node-getslides-presentation "永久链接")


#### 
 获取演示ID
 [#](#获取演示id "永久链接")


1. 打开Google幻灯片演示。
2. 复制位于
 `/日期/`
 和
 `/编辑`
 在演示文稿URL中。这个字符串是演示ID，我们将在Google幻灯片节点中使用它。


#### 
 配置Google幻灯片节点
 [#](#配置google幻灯片节点 "永久链接")



 此Google幻灯片节点将获取演示文稿中的所有幻灯片。
 


1. 从
 ***身份验证***
 下拉列表。
2. 首先，您必须输入Google幻灯片节点的凭据。您可以了解如何为此节点输入凭据
 [此处]（/integrations/builtin/credentials/google/）
 .
3. 从
 ***操作***
 下拉列表。
4. 在
 ***演示文稿ID***
 领域
5. 切换
 ***全部返回***
 到
 `真值`
 .
6. 单击
 ***执行节点***
 以运行工作流。



 在下面的屏幕截图中，您将注意到节点返回演示文稿中的所有幻灯片。
 



![使用Google幻灯片节点从演示文稿中获取幻灯片](https://d33wubrfki0l68.cloudfront.net/bc1a97c2f46b465404132340f50c78dd4aeb41f7/b2908/_images/integrations/builtin/app-nodes/googleslides/googleslides_node.png)



### 
 3. 谷歌幻灯片1节点（getThumbnail：页面）
 [#](#3-google-slides1-node-getthumbnail-page "永久链接")



 此节点将返回上一节点返回的页面的缩略图。
 


1. 从
 ***身份验证***
 下拉列表。
2. 选择您在上一个Google幻灯片节点中输入的凭据。
3. 从
 ***资源***
 下拉列表。
4. 从
 ***操作***
 下拉列表。
5. 单击
 ***演示文稿ID***
 字段并单击
 ***添加表达式***
 .
6. 在
 ***变量选择器***
 部分：节点>Google幻灯片>参数>presentationId。还可以添加以下表达式：
 `｛｛$node[“Google幻灯片”].parameter[“presentationId”]｝｝`
 .
7. 单击
 ***页面对象ID***
 字段并单击
 ***添加表达式***
 .
8. 在
 ***变量选择器***
 部分：节点>Google幻灯片>输出数据>JSON>objectId。还可以添加以下表达式：
 `｛｛$json[“objectId”]｝｝`
 .
9. 切换
 ***下载***
 到
 `真值`
 .
10. 单击
 ***执行节点***
 以运行工作流。



 在下面的屏幕截图中，您将注意到该节点返回上一个节点返回的页面的缩略图。
 



![使用Google幻灯片节点获取幻灯片的缩略图](https://d33wubrfki0l68.cloudfront.net/2064815601c31c156954b1aa8cb443b4ccc2abcf/e196a/_images/integrations/builtin/app-nodes/googleslides/googleslides1_node.png)





