


 卤代PSA
 [#](#halopsa "永久链接")
=========================================



 您可以使用这些凭据通过HaloPSA对以下节点进行身份验证。
 


*[HaloPSA]（/integrations/builtin/app nodes/n8n nodes-base.HaloPSA/）



 先决条件
 [#](#先决条件 "永久链接")
-----------------------------------------------------



 创建
 [卤代PSA](https://halopsa.com/) 
 账户。
 



 允许应用程序使用API：
 [#](#允许应用程序使用api "永久链接")
------------------------------------------------------------------------------------------------------


1. 访问HaloPSA仪表板。
2. 单击
 **配置**
 链接。
3. 在
 **集成**
 菜单项，单击
 **哈啰PSA API**
 .
4. 在
 **API详细信息**
 找到值的部分
 **资源服务器**
 ,
 **授权服务器**
 ，和
 **租户**
 .
5. 在
 **应用程序**
 部分单击
 **查看应用程序**
 按钮
6. 单击
 **新建**
 按钮注册新应用程序，或单击现有应用程序，然后单击
 **编辑**
 按钮进行编辑。
7. 输入应用程序的名称（例如
 `n8n`
 ).
8. 选择
 `客户端ID和密码（服务）`
 作为
 **身份验证方法**
 .
9. 记下
 **客户端ID**
 以及
 **客户端密码**
 。客户端密码只显示一次，丢失时需要生成一个新的。
10. 选择
 `代理`
 作为您的
 **登录类型**
 还有你的一个特工
 **代理以**身份登录
 领域
11. 在
 **权限**
 制表符，勾号
 `全部`
 并击中
 **保存**
 按钮
12. 在n8n的HaloPSA凭据屏幕上，填写在前面步骤中获得的值。这个
 **租户**
 只有当
 **主机类型**
 设置为
 `Halo的托管解决方案`
 .



![具有HaloPSA节点的工作流](https://d33wubrfki0l68.cloudfront.net/72d31f85184c8f602f0cd4e003aaa339427285c1/f8bcb/_images/integrations/builtin/credentials/halopsa/halopsa-n8n-credentials.jpg)




![“资源服务器”、“授权服务器”和“租户”](https://d33wubrfki0l68.cloudfront.net/fe4ac654832879c86aa741d55579065abd76f3af/3f9ad/_images/integrations/builtin/credentials/halopsa/halopsa-credentials-1.jpg)
![“客户ID”和“客户机密”](https://d33wubrfki0l68.cloudfront.net/ce2fd2c2dace771d82ce7a7e8c5b000385c977ea/d987f/_images/integrations/builtin/credentials/halopsa/halopsa-credentials-2.jpg)





