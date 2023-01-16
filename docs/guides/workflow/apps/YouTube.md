


 YouTube
 [#](#youtube "永久链接")
=========================================



[YouTube](https://www.youtube.com) 
 是一个在线视频共享平台。YouTube允许用户上传、查看、评分、分享、添加到播放列表、报告、评论视频，以及订阅其他用户。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/google/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*渠道
	+检索频道
	+检索所有频道
	+更新频道
	+上载频道横幅
*播放列表
	+创建播放列表
	+删除播放列表
	+获取播放列表
	+检索所有播放列表
	+更新播放列表
*播放列表项目
	+将项目添加到播放列表
	+从播放列表中删除项目
	+获取播放列表的项目
	+检索所有播放列表项目
*视频
	+删除视频
	+获取视频
	+检索所有视频
	+给视频打分
	+更新视频
	+上载视频
*视频类别
	+检索所有视频类别



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您上载视频、创建播放列表，并将视频添加到YouTube中的播放列表。您还可以找到
 [工作流](https://n8n.io/workflows/638) 
 此示例使用工作流将使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 [读取二进制文件]（/integrations/builtin/core nodes/n8n nodes base.redbinaryfile/）
 -
 YouTube




 最终的工作流应如下图所示。
 



![带有Gmail节点的工作流](https://d33wubrfki0l68.cloudfront.net/7266292f5fad90d56eb2483dce06b658b1b63ea5/f6555/_images/integrations/builtin/app-nodes/youtube/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. 读取二进制文件节点
 [#](#2-read-binary-file-node "永久链接")


1. 在
 ***文件路径***
 字段。
2. 单击
 ***执行节点***
 以运行节点。



![使用“读取二进制文件”节点获取视频](https://d33wubrfki0l68.cloudfront.net/91dc803000536c859d586ae022b9dca8de34b09e/2aa42/_images/integrations/builtin/app-nodes/youtube/readbinaryfile_node.png)



### 
 3. YouTube节点（上传：视频）
 [#](#3-youtube-node-upload-video "永久链接")


1. 首先，您必须输入YouTube节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/google/）
 .
2. 从
 ***资源***
 下拉列表。
3. 从
 ***操作***
 下拉列表。
4. 在
 ***标题***
 领域
5. 从中选择地区代码
 ***地区代码***
 下拉列表。
6. 从
 ***类别ID***
 下拉列表。
7. 单击
 ***执行节点***
 以运行节点。



![使用YouTube节点上传视频](https://d33wubrfki0l68.cloudfront.net/d72733eeef5a2aae4a9c78cc304d266e312087d4/ff316/_images/integrations/builtin/app-nodes/youtube/youtube_node.png)



### 
 4. YouTube1节点（创建：播放列表）
 [#](#4-youtube1-node-create-playlist "永久链接")


1. 选择您在上一个YouTube节点中输入的凭据。
2. 从
 ***资源***
 下拉列表。
3. 从
 ***操作***
 下拉列表。
4. 在
 ***标题***
 领域
5. 单击
 ***执行节点***
 以运行节点。



![使用YouTube节点创建播放列表](https://d33wubrfki0l68.cloudfront.net/4a7644e7705125760954ac9cfe5322a3c146b9ea/e64b7/_images/integrations/builtin/app-nodes/youtube/youtube1_node.png)



### 
 5. YouTube2节点（添加：playlistItem）
 [#](#5-youtube2-node-add-playlistitem "永久链接")


1. 选择您在上一个YouTube节点中输入的凭据。
2. 从
 ***资源***
 下拉列表。
3. 从
 ***播放列表ID***
 下拉列表。
4. 单击
 ***视频ID***
 字段并单击
 ***添加表达式***
 .
5. 在
 ***变量选择器***
 部分：节点>YouTube>输出数据>JSON>id。您还可以添加以下表达式：
 `｛｛$node[“YouTube”].json[“id”]｝｝`
 .
6. 单击
 ***执行节点***
 以运行节点。



![使用YouTube节点将视频添加到播放列表](https://d33wubrfki0l68.cloudfront.net/912feb1cc2083ac10845d7347fcdd6d26137ce78/0b38f/_images/integrations/builtin/app-nodes/youtube/youtube2_node.png)





