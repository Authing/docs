

# 海外场景

<LastUpdated/>

如果你的应用在海外使用，并且使用的是公有云场景，请在调用 `Authing.init()` 之前调用:

```java
Authing.setIsOverseas();
Authing.init(context, "AUTHING_APP_ID");
```

