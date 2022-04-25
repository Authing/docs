# WebView

<LastUpdated/>

推荐使用 Guard 提供的 WebAuthView 来实现应用内启动 WebView 完成认证。相对于跳转到系统浏览器认证，应用内的 WebView 体验会更好，用户不会离开当前 App，认证成功后，也不会像系统浏览器那样弹出一个对话框询问用户是否要打开 App。

使用之前，确保完成了 [开发准备](./../develop.md)

## 初始化 WebAuthView

在布局文件里面添加：

```xml
<cn.authing.guard.WebAuthView
    android:id="@+id/wv_auth"
    android:layout_width="match_parent"
    android:layout_height="match_parent" />
```

## 设置回调

```java
WebAuthView webView = findViewById(R.id.wv_auth);
webView.setOnLoginCallback((userInfo -> runOnUiThread(()-> {
    if (userInfo != null) {
        // replace MainActivity with your Activity
        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);
        finish();
    }
})));
```

完成认证后，在任何需要用户信息的地方调用：

```java
UserInfo userInfo = Authing.getCurrentUser();
```

## 设置 Scope

如果需要自定义 Scope，请调用：

```java
// scopes are divided by space
webView.setScope("openid profile email phone");
```

> Scope 参数定义请参考 [这里](https://docs.authing.cn/v2/concepts/oidc-common-questions.html#scope-%E5%8F%82%E6%95%B0%E5%AF%B9%E5%BA%94%E7%9A%84%E7%94%A8%E6%88%B7%E4%BF%A1%E6%81%AF)