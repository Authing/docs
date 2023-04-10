# GitLab 登录

<LastUpdated/>

## 准备工作

在 [GitLab](https://gitlab.com/-/profile/applications) 及 [Authing Console 控制台](https://authing.cn/)进行配置，请参阅 [GitLab 接入准备](../../../guides/connections/social/gitlab-mobile/README.md)、[GitLab 官方文档](https://docs.gitlab.cn/jh/api/oauth2.html#pkce-%E6%8E%88%E6%9D%83%E7%A0%81%E6%B5%81%E7%A8%8B)。

:::hint-info
此功能在 android guard sdk 1.5.4 版本新增。
:::

<br>

## 集成步骤

### 第一步：添加依赖

```groovy
implementation 'cn.authing:guard:+'
```

### 第二步：初始化

在应用启动的时候初始化 Guard Android SDK：

```java
// context is application or initial activity
// ”AUTHING_APP_ID“ is obtained from the Authing console
Authing.init(context, "AUTHING_APP_ID");
Authing.setAuthProtocol(Authing.AuthProtocol.EOIDC)
```

### 第三步：分场景使用

- #### 使用托管页
  在需要登录认证的地方启动托管页：
```java
// this is the activity context
AuthFlow.start(this);
```

通过以上步骤即可简单快速地通过配置 Authing 管理控制台后自动拥有 GitLab 登录功能，登录入口会在 Guard 内置登录界面的社会化登录按钮列表中体现。

- #### 使用 GitLab 登录按钮
    如果使用我们提供的 GitLib 登录按钮。

​		1. 布局文件里面加上如下代码：

```xml
 <cn.authing.guard.social.view.GitLabLoginButton
    android:id="@+id/btn_login"
    android:background="@drawable/authing_button_background"
    android:textColor="@color/white"
    android:layout_width="match_parent"
    android:layout_height="wrap_content" />
```

​		2. 然后在代码里面处理事件：

```java
GitLabLoginButton button = findViewById(R.id.btn_login);
button.setOnLoginListener(new AuthCallback<UserInfo>() {
    @Override
    public void call(int code, String message, UserInfo data) {
      	if (code == 200) {
        	// 登录成功，data 是用户信息
       	} else {
        	// 登录失败
      	}
    }
});
```

- #### 使用 GitLab 登录授权类
  如果不想使用我们内置的按钮，想完全自己实现 UI，则可以在按钮的点击事件里面调用 `GitLab` 类的授权函数，此类集成了拉起 GitLab 授权登录的业务逻辑：

```java
GitLab.getInstance().login(appContext, new AuthCallback<UserInfo>() {
    @Override
    public void call(int code, String message, UserInfo data) {
        if (code == 200) {
          // 登录成功，data 是用户信息
        } else {
          // 登录失败
        }
    }
});
```

​	`data` 包含 `idToken` 以及用户信息（`用户名`、`昵称`、`姓名`等）。

**注意：使用 GitLab 登录按钮或者 GitLab 登录授权类时，需要在 Activity 的 onActivityResult 函数中加入如下代码：**

```java
@Override
protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    GitLab.getInstance().onActivityResult(requestCode, resultCode, data);
}
```

- #### 使用 GitLab 登录 API 

  如果想完全自己实现 GitLab 登录 UI 以及获取授权码逻辑，拿到授权码后，可以调用下面 API 换取用户信息：

```java
public static void loginByGitLab(String authCode, @NotNull AuthCallback<UserInfo> callback)
```

**参数**

*`authCode`* GitLab authCode

**示例**

如果你只需要获取到用户信息（`用户名`、`昵称`、`姓名`等）和 `idToken`，调用：

```java
AuthClient.loginByGitLab(authCode, new AuthCallback<UserInfo>() {
    @Override
    public void call(int code, String message, UserInfo data) {
        if (code == 200) {
          // 登录成功，data 是用户信息, 包含 idToken。
        } else {
          // 登录失败
        }
    }
});
```

如果你需要获取到用户信息（`用户名`、`昵称`、`姓名`等）、`idToken`、`accessToken` 和 `refreshToken`，调用：

```java
OIDCClient oidcClient = new OIDCClient();
oidcClient.loginByGitLab(authCode, new AuthCallback<UserInfo>() {
    @Override
    public void call(int code, String message, UserInfo data) {
        if (code == 200) {
          // 登录成功，data 是用户信息, 包含 idToken、accessToke and refreshToken。
        } else {
          // 登录失败
        }
    }
});
```

