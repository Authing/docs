# Event subscription API

<LastUpdated/>

## Subscribe events

```java
public static void subEvent(String eventCode, @NotNull Receiver receiver)
```

**Parameter**

* `eventCode` event code

**Example**

```java
AuthClient.subEvent("authing.user.updated", new Receiver() {
    @Override
    public void onOpen() {
    		// Connection successful
    }

    @Override
    public void onReceiverMessage(String s) {
     		// Receive a message
    }

    @Override
    public void onError(String s) {
 				// Connection failure
    }
});
```

<br>

## Publish event

```java
public static void pubEvent(String eventCode, String eventData, @NotNull AuthCallback<JSONObject> callback)
```

**Parameter**

* `eventCode` event code
* `eventData` data

**Example**

```java
AuthClient.pubEvent("authing.user.updated", data, (AuthCallback<JSONObject>) (code, message, data) -> {
    if (code == 200 && data != null) {
        // success
    }
});
```

<br>

