


 CoinGecko公司
 [#](#coingecko "永久链接")
=============================================



[硬币壁虎](https://www.coingecko.com) 
 提供了加密市场的基本分析。除了跟踪价格、数量和市值，CoinGecko还跟踪社区增长、开源代码开发、重大事件和链上指标。
 




 资格证书
 



 CoinGecko节点不需要身份验证。
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*硬币
	+获取所选货币的烛台开高收低图表
	+获取硬币的当前数据
	+获取所有硬币
	+获取给定日期的硬币历史数据（名称、价格、市场、统计数据）
	+获取与所选货币匹配的所有交易对的价格和市场相关数据
	+获取历史市场数据，包括价格、市值和24小时成交量（粒度自动）
	+获取您所需的任何其他受支持货币的任何加密货币的当前价格
	+获取硬币自动收报机
*事件
	+获取所有事件



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您使用CoinGecko节点获取BTC的欧元价格，并在价格大于或等于9000欧元时发送短信。您还可以找到
 [工作流](https://n8n.io/workflows/704) 
 此示例使用工作流将使用以下节点。
 


*[调度触发器]（/integrations/builtin/core nodes/n8n nodes base.schedumetrigger/）
*CoinGecko公司
*[IF]（/integrations/builtin/core nodes/n8n nodes base.IF/）
*[Twilio]（/integrations/builtin/app nodes/n8n nodes-base.Twilio/）
*[无操作，不执行任何操作]（/integrations/builtin/core-nodes/n8n-nodes-base.noop/）



 最终的工作流应如下图所示。
 



![使用CoinGecko节点的工作流](https://d33wubrfki0l68.cloudfront.net/12666731d420c6365076498a28858bcd8fd9d94d/dad2c/_images/integrations/builtin/app-nodes/coingecko/workflow.png)



### 
 1. 调度触发器节点
 [#](#1-调度触发器-代码 "永久链接")



 Schedule Trigger节点将每分钟触发一次工作流。
 


1. 单击
 ***添加Cron时间***
 .
2. 从
 ***模式***
 下拉列表。
3. 单击
 ***执行节点***
 以运行节点。



![使用Cron节点触发工作流](https://d33wubrfki0l68.cloudfront.net/f92ea53b26f25af5caa9507df24760772184257d/59692/_images/integrations/builtin/app-nodes/coingecko/cron_node.png)



### 
 2. CoinGecko节点（价格：币）
 [#](#2-coincigecko-node-price-coin "永久链接")



 该节点将使用CoinGecko API获取BTC的欧元价格。请随意选择不同的硬币ID和货币。
1. 从
 ***操作***
 下拉列表。
2. 从
 ***硬币ID***
 下拉列表。
3. 从
 ***货币***
 下拉列表。
4. 单击
 ***执行节点***
 以运行节点。
 



 在下面的屏幕截图中，您将注意到该节点以1 BTC欧元的价格获取。此信息将传递给工作流中的下一个节点。
 



![使用CoinGecko节点获取价格](https://d33wubrfki0l68.cloudfront.net/29c24089f7a50b51401a330173d5bb703c36dee3/e703a/_images/integrations/builtin/app-nodes/coingecko/coingecko_node.png)



### 
 3. IF节点
 [#](#3-if-node "永久链接")



 该节点将比较我们从CoinGecko节点获得的价格。如果价格大于或等于9000，则返回true，否则返回false。
 


1. 单击
 ***添加条件***
 并从下拉列表中选择“数字”。
2. 单击
 ***值1***
 字段并单击
 ***添加表达式***
 .
3. 在
 ***变量选择器***
 部分：节点>CoinGecko>输出数据>JSON>比特币>eur。您还可以添加以下表达式：
 `｛｛$node[“CoinGecko”].json[“bitcoin”][“eur”]｝｝`
 .
4. 从
 ***操作***
 下拉列表。
5. 设置
 ***值2***
 至9000。
6. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您会注意到节点返回了
 **真**
 当价格大于9000时。
 



![使用IF节点检查价格是否大于9000](https://d33wubrfki0l68.cloudfront.net/eaf9a39dd5ff22e8e89a991049e5634372cbe3d3/67be3/_images/integrations/builtin/app-nodes/coingecko/if_node.png)



### 
 4. Twilio节点（发送：sms）
 [#](#4-twilio-node-sensited sms "永久链接")



 当价格大于或等于9000时，此节点向号码发送SMS。
 


1. 将此节点与
 **真**
 IF节点的输出。
2. 您必须输入Twilio节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credential/twilio/）
 .
3. 在
 ***发件人***
 领域
4. 在
 ***收件人***
 领域
5. 单击
 ***消息***
 字段并单击
 ***添加表达式***
 .
6. 输入
 在
 ***表达式***
 领域
7. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您会注意到该节点发送了一条短信，其中包含我们从CoinGecko节点获得的价格。
 



![使用Twilio节点发送短信](https://d33wubrfki0l68.cloudfront.net/3bbecf5ad4325a172526ea49636f44bc658008da/96fb4/_images/integrations/builtin/app-nodes/coingecko/twilio_node.png)



### 
 5. NoOp节点
 [#](#5-noop-node "永久链接")



 在此处添加此节点是可选的，因为缺少此节点不会对工作流的功能产生影响。
 


1. 将此节点与
 **错误**
 IF节点的输出。
2. 单击
 ***执行节点***
 以运行节点。



![使用NoOp节点](https://d33wubrfki0l68.cloudfront.net/fe4b75c3248b6946ebd62f1453bba66a04d5bd07/0ff70/_images/integrations/builtin/app-nodes/coingecko/noop_node.png)





