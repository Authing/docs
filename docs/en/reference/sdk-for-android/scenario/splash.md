# 闪屏界面

<LastUpdated/>

几乎每个移动 App 都有闪屏界面。闪屏界面除了可以展示 App 的品牌 Logo 外，还有一个非常重要的功能：加载必要的资源。

绝大部分 App 的资源是和用户有关的，比如抖音个人偏好，微信的聊天记录等等。所以，闪屏页面首先需要完成用户认证。这里的认证又分为首次认证和再次认证。首次认证很好理解，即当用户第一次使用 App 时，需要展示登录界面让用户完成认证。“再次认证”则稍微有点复杂。

一般来说，移动端 App 登录之后，除非帐号出现安全风险，就不会再提示用户登录。早期的 App 通过记住用户名和密码来实现自动登录。出于安全考虑，苹果在引入 Keychain 之前的一段时间是不允许记住密码的，因为密码在越狱的手机上可以被黑客拿到，即使有加密。另外一个问题是，现代的认证流程不提倡使用密码，对于使用手机号+验证码或者生物识别的应用无法通过记住密码来实现自动登录。

Guard 的自动登录通过记住 token 来完成。在闪屏页，调用：

```java
Authing.autoLogin((code, message, userInfo) -> {});
```

如果自动登录成功，可以通过下面代码获取用户信息：

```java
Authing.getCurrentUser()
```

考虑到一般的移动闪屏页还需要展示品牌 Logo，闪屏页会有一个最短显示时间。完整逻辑是：

* 当网络比较慢时会等待自动登录请求返回

* 当网络很快时，至少停留 x 秒

* 如果自动登录失败，比如用户首次使用 App，或者 token 过期，则需要跳转到登录界面。

以下是包含 *自动登录/品牌展示/跳转登录* 逻辑的完整闪屏页代码。其中 MainActivity 需要被替换成登录成功后的主页。同时确保应用已经完成了 [开发准备](./../develop.md)。即：

* 添加了 Guard 依赖
* 在应用启动时进行了 Guard 初始化。

```java
import static cn.authing.guard.activity.AuthActivity.OK;
import static cn.authing.guard.activity.AuthActivity.RC_LOGIN;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;

import java.util.Objects;

import cn.authing.guard.Authing;
import cn.authing.guard.flow.AuthFlow;

public class SplashActivity extends AppCompatActivity {

    private int flag;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Objects.requireNonNull(getSupportActionBar()).hide();
        setContentView(R.layout.activity_splash);

        new Handler().postDelayed(()-> next(1), 1000);

        if (Authing.isGettingConfig()) {
            Authing.getPublicConfig(config -> {
                if (config == null) {
                    Toast.makeText(this, cn.authing.guard.R.string.authing_no_network, Toast.LENGTH_LONG).show();
                } else {
                    Authing.autoLogin((code, message, userInfo) -> next(2));
                }
            });
        } else {
            Authing.autoLogin((code, message, userInfo) -> next(2));
        }
    }

    private void next(int f) {
        flag |= f;

        // both condition meets
        if (flag == 3) {
            if (Authing.getCurrentUser() != null) {
                gotoMain();
            } else {
                AuthFlow.start(this);
            }
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == RC_LOGIN && resultCode == OK && data != null) {
            gotoMain();
        }
    }

    private void gotoMain() {
        Intent intent = new Intent(this, MainActivity.class);
        // in MainActivity or anywhere you want UserInfo, call
        // Authing.getCurrentUser()
        startActivity(intent);

        // finish Splash in either case
        finish();
    }
}
```

> Android 12 引入了系统级别的 Splash Screen，开发者需要在应用的首个 Activity 里面做 autoLogin。参考官方文档：[Splash screens](https://developer.android.com/guide/topics/ui/splash-screen/migrate)