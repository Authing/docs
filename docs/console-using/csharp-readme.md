# CSharp

本指南将从 Authing CSharp SDK 的安装开始逐步引导你如何快速为你已有或新开发的应用添加用户认证与管理能力。
<AppDetailSiderBar />

## 安装

```powershell
# Nuget
Install-Package Authing.CSharp.SDK
```

## 认证你的用户

### 初始化 



```c#
// 使用 AppId 、APP_SECRET 、 appHost、redirectUri 进行初始化
using Authing.CSharp.SDK.Models.Authentication;
using Authing.CSharp.SDK.Services;

AuthenticationClient authentication = new AuthenticationClient(new AuthenticationClientInitOptions{
				AppId = "AUTHING_APP_ID",//应用 ID
                AppSecret = "AUTHING_SECRET",//应用 Secret
                Domain = "AUTHING_DOMAIN",// 应用对应的用户池域名
                RediretUri = "AUTHING_REDIRECTURI",//认证完成后的重定向目标 URL
});
```



### 简单认证用户

```c#
//生成认证地址，用户通过认证地址进行登录，并携带 Code 和 state 跳转到指定的 redirectUri
string authUrl = authenticationClient.BuildAuthUrl( scope: "openid profile offline_access");
```



## 管理你的用户

### 初始化

```c#
using Authing.CSharp.SDK.Models;
using Authing.CSharp.SDK.Services;

ManagementClientOptions options = new ManagementClientOptions()
{
	AccessKeyId = "AUTHING_USERPOOL_ID",//用户池 ID
	AccessKeySecret = "AUTHING_USERPOOL_SECRET"//用户池密钥
};

ManagementClient managementClient = new ManagementClient(options);
```

### 简单管理用户

```csharp
//创建用户
UserSingleRespDto  result = await managementClient.CreateUser
          (  new CreateUserReqDto
           {                 
             Status = CreateUserReqDto.status.ACTIVATED,//用户状态
             Username = "test",//用户名
             Password = "passw0rd",//密码
             PasswordEncryptType = CreateUserReqDto.passwordEncryptType.NONE,//密码加密方式
             Options=new CreateUserOptionsDto { }//配置信息
        	},
          });
```

## 错误处理

```c#
UserSingleRespDto userSingleRespDto =await managementClient.GetUser("61c188ccfff26fef0ca6880d");

if (userSingleRespDto.StatusCode !== 200) 
{
	throw new Exception(userSingleRespDto.Message); // 抛出异常，由全局异常捕捉中间件进行异常捕捉
}
```

