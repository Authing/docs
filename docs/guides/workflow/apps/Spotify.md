


 Spotify（Spotify）（Spotify）
 [#](#spotify "永久链接")
=========================================



[Spotify](https://www.spotify.com/) 
 是一个包含数百万音乐曲目和播客的音乐流服务。Spotify允许用户创建和管理自己的播放列表，通过推荐服务探索新音乐，并按需收听歌曲。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credential/spotify/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*专辑
	+通过URI或ID获取相册。
	+获取新专辑发行列表。
	+通过URI或ID获取专辑的曲目。
	+按关键字搜索相册。
*艺术家
	+通过URI或ID获取艺术家。
	+通过URI或ID获取艺术家的专辑。
	+通过URI或ID获取艺术家的相关艺术家。
	+通过URI或ID获取艺术家的热门曲目。
	+按关键字搜索艺术家。
*图书馆
	+获取用户喜欢的曲目。
*我的数据
	+获取您关注的艺术家。
*玩家
	+将歌曲添加到队列中。
	+获取您当前正在播放的曲目。
	+跳到下一曲目。
	+暂停音乐。
	+跳到上一首歌。
	+获取您最近播放的曲目。
	+在当前活动设备上恢复播放。
	+设置当前活动设备上的音量。
	+开始播放播放列表、艺术家或专辑。
*播放列表
	+按曲目和播放列表URI或ID从播放列表中添加曲目。
	+创建新的播放列表。
	+按URI或ID获取播放列表。
	+通过URI或ID获取播放列表的曲目。
	+获取用户的播放列表。
	+按曲目和播放列表URI或ID从播放列表中删除曲目。
	+按关键字搜索播放列表。
*轨道
	+通过其URI或ID获取跟踪。
	+通过URI或ID获取曲目的音频功能。
	+按关键字搜索曲目



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您在Spotify中将歌曲添加到队列中。您还可以找到
 [工作流](https://n8n.io/workflows/440) 
 在网站上。此示例使用工作流将使用以下两个节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Spotify




 最终的工作流应如下图所示。
 



![带有Spotify节点的工作流](https://d33wubrfki0l68.cloudfront.net/ec3fc6f33fa24800fbeb6931f68782e7ab9d0230/d55c6/_images/integrations/builtin/app-nodes/spotify/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. Spotify节点
 [#](#2-spotify-node "永久链接")


1. 首先，您必须输入Spotify节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credential/spotify/）
 .
2. 将歌曲的URI（或ID）输入到
 *曲目ID*
 领域下面的GIF向您展示了如何在Spotify的UI上查找Track ID。
3. 单击
 *执行节点*
 以运行工作流。



![Spotify URI](https://d33wubrfki0l68.cloudfront.net/2b37c8498cc9dfae1d09358cac55fb7b391c78e9/69b1d/_images/integrations/builtin/app-nodes/spotify/spotifyuri.gif)





