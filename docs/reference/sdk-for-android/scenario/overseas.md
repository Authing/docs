

# 海外场景

<LastUpdated/>

如果你的应用在海外使用，并且是在 https://console.us.authing.co/ 中创建的自建应用，请在调用 `Authing.init(context, "AUTHING_APP_ID")` 之前调用:

```java
Authing.setIsOverseas();
```

