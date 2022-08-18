# 退出登录

<LastUpdated/>

退出登录可调用如下方法：

```Swift
AuthClient().logout() { code, message in
    if code == 200 {
    	//logout success
    }
}
```

