


 Redis公司公司
 [#](#redis "永久链接")
=====================================



[Redis](https://redis.io/) 
 是一个开源的内存数据结构存储，用作数据库、缓存和消息代理。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credential/redis/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*从Redis中删除密钥。
*从Redis获取键的值。
*返回有关Redis实例的一般信息。
*原子地将关键点递增1。如果密钥不存在，则创建该密钥。
*返回与模式匹配的所有键。
*在redis中设置键的值。
*将消息发布到redis频道。



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您在Redis中获取键的值。您还可以找到
 [工作流](https://n8n.io/workflows/557) 
 在网站上。此示例使用工作流将使用以下两个节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Redis




 最终的工作流应如下图所示。
 



![带有Redis节点的工作流](https://d33wubrfki0l68.cloudfront.net/2bb1bd1085d64ceee8f22a5b0d569f3327a811ea/43341/_images/integrations/builtin/app-nodes/redis/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. Redis节点
 [#](#2-redis-node "永久链接")


1. 首先，您必须输入Redis节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credential/redis/）
 .
2. 从
 *操作*
 下拉列表。
3. 输入要在
 *键*
 领域
4. 单击
 *执行节点*
 以运行工作流。




