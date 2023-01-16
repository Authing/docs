


 GitLab公司
 [#](#gitlab "永久链接")
=======================================



 您可以使用这些凭据通过GitLab验证以下节点。
 


*[GitLab]（/integrations/builtin/app nodes/n8n nodes-base.GitLab/）
*[GitLab Trigger]（/integrations/builtin/Trigger-nodes/n8n nodes-base.gitlabtrigger/）



 先决条件
 [#](#先决条件 "永久链接")
-----------------------------------------------------



 创建
 [GitLab](https://gitlab.com/) 
 账户
 



 使用OAuth
 [#](#使用oauth "永久链接")
-------------------------------------------------




 n8n云用户注意事项
 



 您只需输入凭据名称，然后单击OAuth部分的圆圈按钮即可将GitLab帐户连接到n8n。
 



1. 访问GitLab仪表板。
2. 单击右上角的用户图标。
3. 单击“设置”。
4. 单击侧边栏中的“应用程序”。
5. 在
 ***姓名***
 领域
6. 复制n8n中“Gitlab OAuth2 API”凭据中提供的“OAuth回调URL”，并将其粘贴到
 ***重定向URI***
 GitLab应用程序创建页面中的字段。
7. 选择您计划使用的任何范围，然后单击
 ***保存应用程序***
 .
8. 使用
 ***应用程序ID***
 和
 ***秘密***
 使用n8n中的GitLab OAuth2 API凭据。
9. 单击OAuth部分的圆圈按钮，将GitLab帐户连接到n8n。
10. 单击
 ***保存***
 按钮保存凭据。



![获取GitLab OAuth凭据](https://d33wubrfki0l68.cloudfront.net/873f0d22863542d8e275242a8de8adb480024662/8c6d9/_images/integrations/builtin/credentials/gitlab/using-oauth.gif)




 使用访问令牌
 [#](#使用访问令牌 "永久链接")
---------------------------------------------------------------


1. 访问GitLab仪表板。
2. 单击右上角的用户图标。
3. 单击“设置”。
4. 单击侧边栏中的“访问令牌”。
5. 在
 ***姓名***
 字段。
6. 填写接收访问令牌所需的信息。
7. 选择您计划使用的任何范围，然后单击
 ***创建个人访问令牌***
 .
8. 将生成的访问令牌与n8n中的GitLab节点凭据一起使用。
9. 单击
 ***保存***
 按钮保存凭据。



![获取GitLab访问令牌](https://d33wubrfki0l68.cloudfront.net/e19e108f0ff66f951ce4a37eea62056a06872165/bb3ea/_images/integrations/builtin/credentials/gitlab/using-access-token.gif)





