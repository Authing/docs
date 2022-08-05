
# 托管页

<LastUpdated/>

应用程序只需要 1 分钟，即可嵌入 Authing 提供的标准认证流程和界面，在需要认证的地方调用：

```Swift
Authing.start(<#Authing_APPID#>)
AuthFlow().start { [weak self] code, message, userInfo in
}
```

效果如下：

<img src="./images/standard.png" alt="drawing" width="320"/>

登录成功回调：

```java
  @Override
  protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    if (requestCode == RC_LOGIN && resultCode == OK && data != null) {
      //login success，do next task
    }
  }
```

登录成功后获取本地用户数据：

```java
UserInfo userInfo = Authing.getCurrentUser();
```

