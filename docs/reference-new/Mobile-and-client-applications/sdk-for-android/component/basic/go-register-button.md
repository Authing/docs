# GoRegisterButton

<LastUpdated/>

此组件提供跳转按钮的样式和国际化文本

## 示例

<img src="./../images/go_register.png" alt="drawing" width="400"/>

## 创建

放置一个 GoRegisterButton

```xml
<cn.authing.guard.GoRegisterButton
    android:id="@+id/tv_login"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:textColor="@color/authing_main"
    android:gravity="end|center_vertical"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintTop_toTopOf="parent"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintBottom_toBottomOf="parent"/>
```

![](./../images/go_register2.png)

## 特性

在一些场景下，需要在页面上隐藏注册按钮。我们在控制台做如下修改：

![](./../images/go_register3.png)

那么该组件就能自动隐藏

> 如果使用 [快速接入](/reference-new/Mobile-and-client-applications/sdk-for-android/quick.html) 方式，该组件可以自动跳转至注册页面；如果自定义了认证界面和流程，则需要手动处理点击事件

