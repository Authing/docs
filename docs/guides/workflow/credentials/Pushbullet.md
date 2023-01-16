


 按钮
 [#](#按钮 "永久链接")
===============================================



 您可以使用这些凭据通过Pushbullet验证以下节点。
 


*[Pushbullet]（/integrations/builtin/app nodes/n8n nodes-base.pushullet/）



 先决条件
 [#](#先决条件 "永久链接")
-----------------------------------------------------



 创建
 [按钮](https://www.pushbullet.com/) 
 账户
 



 使用OAuth
 [#](#使用oauth "永久链接")
-------------------------------------------------


1. 访问
 [创建客户端](https://www.pushbullet.com/create-client) 
 页
2. 在
 ***名称***
 字段。
3. 从n8n中的“创建新凭据”屏幕复制OAuth回调URL，并将其粘贴到
 ***重定向\uri***
 领域
4. 单击
 ***添加新的OAuth客户端***
 按钮
5. 使用提供的
 ***客户端\_id***
 和
 ***客户端安全***
 使用n8n中的Pushbullet OAuth2 API凭据。
6. 单击
 ***连接我的帐户***
 按钮连接到Pushbullet并将凭据保存在n8n中。




 Pushbullet OAuth测试链接
 



 Pushbullet确实在上述客户端创建过程中提供了测试链接。此链接与n8n不兼容。为了验证身份验证是否有效，只需使用
 ***连接我的帐户***
 n8n中的按钮。
 




![获取Pushbullet凭据](https://d33wubrfki0l68.cloudfront.net/d56a8f784333e95c40d26ea58eefc0343a26e6e3/bb7dc/_images/integrations/builtin/credentials/pushbullet/using-oauth.gif)





