


 盒子
 [#](#框 "永久链接")
=================================



 您可以使用这些凭据通过Box验证以下节点。
 


*[Box]（/integrations/builtin/app nodes/n8n nodes-base.Box/）
*[Box Trigger]（/integrations/builtin/Trigger nodes/n8n nodes base.boxtrigger/）



 先决条件
 [#](#先决条件 "永久链接")
-----------------------------------------------------



 创建
 [方框](https://www.box.com/) 
 账户
 



 使用OAuth
 [#](#使用oauth "永久链接")
-------------------------------------------------




 n8n云用户注意事项
 



 您只需输入凭据名称并单击OAuth部分中的圆圈按钮即可将Box帐户连接到n8n。
 



1. 访问
 [Box开发者控制台](https://app.box.com/developers/console) 
 .
2. 单击
 *创建新应用程序*
 按钮
3. 选择“自定义应用程序”并单击
 *下一页*
 .
4. 选择“Standard OAuth 2.0（User Authentication）”，然后单击
 *下一页*
 .
5. 输入任何其他必要信息，然后单击
 *创建应用程序*
 按钮。
6. 复制n8n中Box OAuth2 API凭据中提供的“OAuth回调URL”，并将其粘贴到Box应用程序页面的“重定向URI”字段中。
7. 单击
 *保存更改*
 按钮，并将显示的“客户端ID”和“客户端密码”与n8n中的Box OAuth2 API凭据一起使用。
8. 单击OAuth部分中的圆圈按钮，将Box帐户连接到n8n。
9. 单击
 *保存*
 按钮将凭据保存在n8n中。



![获取Box凭据](https://d33wubrfki0l68.cloudfront.net/03be712c7a800024592aa49b0ae6a3614b5ef0fb/1fa6f/_images/integrations/builtin/credentials/box/using-oauth.gif)





