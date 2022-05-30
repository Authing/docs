# 复杂注册示例

<LastUpdated/>

阅读此教程之前，确保已经完成了 [开发准备](/reference-new/mobile-and-client-applications/sdk-for-android/develop.md)

在上一个 [基础注册教程](./basic-register.md) 里面，我们构建了一个简单的注册界面，接下来我们尝试构建一个更为复杂的注册界面，它包含一个可以切换注册方式的 Tab，支持邮箱+密码注册以及电话号码+验证码注册

## 放置 RegisterMethodTab

放置一个 RegisterMethodTab

![](./images/registermethodtab.png)

RegisterMethodTab 可以用来切换注册方式，它可以根据控制台设置动态调整显示类容，更多信息请参考 [详细说明](./../basic/register-method-tab.md)

## 放置手机号+验证码登录相关组件

放置一个 PhoneNumberEditText、PasswordEditText、PasswordConfirmEditText、VerifyCodeEditText、GetVerifyCodeButton

![](./images/phone_code_register.png)

![](./images/phone_code_register2.png)

![](./images/phone_code_register3.png)

> 更多 GetVerifyCodeButton 属性设置，请参考 [详细说明](./../basic/get-verify-code-button.md)

运行看看效果：

<img src="./images/run3.png" alt="drawing" width="300"/>

现在可以通过手机号+验证码成功注册！因为 Guard 内部的实现优先选择手机号+验证码的方式。

到目前为止，我们只是简单地将所有控件都放置到了界面上。接下来，我们需要将组件分组，从而实现切换效果。

## 放置 RegisterContainer 并将组件添加到容器里面

放置一个 RegisterContainer，将 EmailEditText 、 PasswordEditText 和 PasswordConfirmEditText 放到里面，设置 type 属性 app:type="emailPassword"。

![](./images/registercontainer1.png)

再放置一个 RegisterContainer，将 PhoneNumberEditText、PasswordEditText、PasswordConfirmEditText、VerifyCodeEditText、GetVerifyCodeButton 放到里面，设置 type 属性 app:type="phoneCodePassword"。

调整位置和间距。可以参考下面布局：

![](./images/registercontainer2.png)

![](./images/registercontainer3.png)

## 完成

<img src="./images/ardone1.png" alt="drawing" width="300"/>

<img src="./images/ardone2.png" alt="drawing" width="300"/>

## 完整示例代码

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <cn.authing.guard.AppLogo
        android:id="@+id/app_logo"
        android:layout_width="68dp"
        android:layout_height="68dp"
        android:layout_marginTop="80dp"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintBottom_toTopOf="@+id/app_name"
        app:layout_constraintVertical_chainStyle="packed"
        android:src="@drawable/ic_authing_default_logo"/>

    <cn.authing.guard.AppName
        android:id="@+id/app_name"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="移动 Guard 示例"
        android:layout_marginTop="20dp"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/app_logo"
        app:layout_constraintBottom_toTopOf="@+id/register_method_tab"
        app:layout_constraintEnd_toEndOf="parent"/>

    <cn.authing.guard.RegisterMethodTab
        android:id="@+id/register_method_tab"
        android:layout_width="match_parent"
        android:layout_height="52dp"
        android:layout_marginTop="32dp"
        android:layout_marginStart="24dp"
        android:layout_marginEnd="24dp"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/app_name"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintBottom_toTopOf="@+id/email_register_container"/>

    <cn.authing.guard.RegisterContainer
        android:id="@+id/email_register_container"
        app:type="emailPassword"
        android:clipChildren="false"
        android:visibility="invisible"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginStart="24dp"
        android:layout_marginEnd="24dp"
        android:layout_marginTop="16dp"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/register_method_tab"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintBottom_toTopOf="@+id/phone_register_container">
        <cn.authing.guard.EmailEditText
            android:id="@+id/email"
            app:pageType="register"
            app:errorEnabled="true"
            android:background="@null"
            app:leftIconDrawable="@drawable/ic_authing_email"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"/>
        <cn.authing.guard.PasswordEditText
            android:id="@+id/password"
            android:background="@null"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            app:leftIconDrawable="@drawable/ic_authing_password"
            app:clearAllEnabled="false"
            app:errorEnabled="true"
            android:layout_marginTop="4dp"/>
        <cn.authing.guard.PasswordConfirmEditText
            android:id="@+id/password_confirm"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:background="@null"
            app:leftIconDrawable="@drawable/ic_authing_password"
            app:clearAllEnabled="false"
            app:errorEnabled="true"
            android:layout_marginTop="4dp"/>
    </cn.authing.guard.RegisterContainer>

    <cn.authing.guard.RegisterContainer
        android:id="@+id/phone_register_container"
        app:type="phoneCodePassword"
        android:clipChildren="false"
        android:visibility="invisible"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginStart="24dp"
        android:layout_marginEnd="24dp"
        android:layout_marginTop="16dp"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/email_register_container"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintBottom_toTopOf="@+id/error_text">
        <cn.authing.guard.PhoneNumberEditText
            android:id="@+id/phone_number"
            android:background="@null"
            app:errorEnabled="true"
            app:leftIconDrawable="@drawable/ic_authing_cellphone"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"/>
        <cn.authing.guard.PasswordEditText
            android:id="@+id/phone_password"
            android:background="@null"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            app:leftIconDrawable="@drawable/ic_authing_password"
            app:clearAllEnabled="false"
            app:errorEnabled="true"
            android:layout_marginTop="4dp"/>
        <cn.authing.guard.PasswordConfirmEditText
            android:id="@+id/phone_password_confirm"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:background="@null"
            app:leftIconDrawable="@drawable/ic_authing_password"
            app:clearAllEnabled="false"
            app:errorEnabled="true"
            android:layout_marginTop="4dp"/>
        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:clipChildren="false"
            android:layout_marginTop="4dp"
            android:gravity="center_vertical">
            <cn.authing.guard.VerifyCodeEditText
                android:id="@+id/phone_verify_code"
                android:layout_width="0dp"
                android:layout_height="wrap_content"
                android:layout_weight="1"
                android:background="@null"
                app:errorEnabled="false"
                app:leftIconDrawable="@drawable/ic_authing_shield_check"/>
            <cn.authing.guard.GetVerifyCodeButton
                android:id="@+id/get_phone_verify_code"
                android:stateListAnimator="@null"
                android:background="@drawable/authing_get_code_button_background"
                android:layout_width="wrap_content"
                android:layout_height="42dp"
                android:paddingStart="4dp"
                android:paddingEnd="4dp"
                android:layout_marginStart="4dp"
                android:textColor="@color/button_text" />
        </LinearLayout>
    </cn.authing.guard.RegisterContainer>

    <cn.authing.guard.ErrorTextView
        android:id="@+id/error_text"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="8dp"
        android:layout_marginStart="24dp"
        android:layout_marginEnd="24dp"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/phone_register_container"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintBottom_toTopOf="@+id/btn_register"/>

    <cn.authing.guard.RegisterButton
        android:id="@+id/btn_register"
        android:layout_width="match_parent"
        android:layout_height="44dp"
        android:layout_marginTop="16dp"
        android:layout_marginStart="24dp"
        android:layout_marginEnd="24dp"
        android:textStyle="bold"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/error_text"
        app:layout_constraintEnd_toEndOf="parent"/>

</androidx.constraintlayout.widget.ConstraintLayout>
```