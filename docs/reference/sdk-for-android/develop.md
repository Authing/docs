# 托管页

<LastUpdated/>

通过 Guard 托管页提供的标准认证流程和界面，应用程序可以 1 分钟完成接入。 首先确保已经完成了 [开发准备工作](./quick.md)，在需要认证的地方调用：

```java
// this is the activity context
AuthFlow.start(this);
```

> AuthFlow 对象为 Guard 托管页提供入口。

效果如下：

<img src="./images/standard.png" alt="drawing" width="400"/>

登录成功回调：

```java
  @Override
  protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    if (requestCode == AuthActivity.RC_LOGIN && resultCode == AuthActivity.OK && data != null) {
      //login success，do next task
    }
  }
```

登录成功后获取本地用户数据：

```java
UserInfo userInfo = Authing.getCurrentUser();
```

