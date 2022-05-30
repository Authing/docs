# 个人中心

<LastUpdated/>

Guard 提供默认的个人中心界面，包括个人信息修改。分两种常见场景使用：

## Activity

继承 Guard 里面的 UserProfileActivity

```java
public class MeActivity extends UserProfileActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Button btn = findViewById(R.id.btn_logout);
        btn.setOnClickListener(v -> logout());
    }

    private void logout() {
        AuthClient.logout((code, message, data)->{
            // go to your home page which should in turn show login page
        });
    }
}
```

## Fragment

在需要使用个人中心的布局文件里面增加：

```xml
<fragment
    android:id="@+id/fragment_user_profile"
    android:name="cn.authing.guard.activity.UserProfileFragment"
    android:layout_width="match_parent"
    android:layout_height="match_parent" />
```

然后在 activity 里面，增加以下代码：

```java
private UserProfileFragment fragment;

@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    // replace with your activity layout
    setContentView(R.layout.authing_activity_user_profile); 
    fragment = (UserProfileFragment)getSupportFragmentManager().findFragmentById(R.id.fragment_user_profile);
}

@Override
public void onActivityResult(int requestCode, int resultCode, Intent data) {
    super.onActivityResult(requestCode, resultCode, data);

    if (resultCode == RESULT_OK && requestCode == 1000) {
        fragment.uploadAvatar(data.getData());
    }
}
```

> 更新头像需要在 Activity 里面重载 onActivityResult 函数，更新其它个人信息的逻辑已经在 UserProfileFragment 里面处理。