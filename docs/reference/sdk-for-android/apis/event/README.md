# 事件订阅 API

<LastUpdated/>

## 订阅事件

```java
public static void subEvent(String eventCode, @NotNull Receiver receiver)
```

**参数**

* `eventCode` 事件 code

**示例**

```java
AuthClient.subEvent("authing.user.updated", new Receiver() {
    @Override
    public void onOpen() {
    		// 连接成功
    }

    @Override
    public void onReceiverMessage(String s) {
     		// 接受消息
    }

    @Override
    public void onError(String s) {
 				// 连接失败
    }
});
```

<br>

## 发布事件

```java
public static void pubEvent(String eventCode, String eventData, @NotNull AuthCallback<JSONObject> callback)
```

**参数**

* `eventCode` 事件 code
* `eventData` 数据

**示例**

```java
AuthClient.pubEvent("authing.user.updated", data, (AuthCallback<JSONObject>) (code, message, data) -> {
    if (code == 200 && data != null) {
        // 成功
    }
});
```

<br>

