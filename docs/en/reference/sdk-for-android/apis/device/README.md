# Device management API

<LastUpdated/>

## Reporting device

```java
public static void createDevice(DeviceInfo deviceInfo, @NotNull AuthCallback<JSONObject> callback)
```

**Parameter**

* `deviceInfo` device infomation

**Example**

```java
DeviceInfo deviceInfo = new DeviceInfo();
deviceInfo.setDeviceUniqueId("");
deviceInfo.setName("");
deviceInfo.setVersion("Android 13");
deviceInfo.setHks("");
deviceInfo.setFde("");
deviceInfo.setHor("");
deviceInfo.setType("Mobile");
deviceInfo.setProducer("");
deviceInfo.setMod("");
deviceInfo.setOs("Android");
deviceInfo.setSn("");
deviceInfo.setImei("");
deviceInfo.setMeid("");
deviceInfo.setDescription("");
AuthClient.createDevice(deviceInfo, (AuthCallback<JSONObject>) (code, message, data) -> {
    if (code == 200 && data != null) {
        // success
    }
});
```

<br>

## Get device information

```java
public void deviceList(int page, int limit, DeviceStatus deviceStatus, String os, String keyword, @NotNull AuthCallback<ArrayList<DeviceData>> callback) 
```

**Parameter**

* `page` page 
* `limit` limit
* `deviceStatus` device status
* `os` os
* `keyword` 

**Example**

```java
AuthClient.deviceList(1, 50, null, "Android", "", (AuthCallback<JSONObject>) (code, message, data) -> {
    if (code == 200 && data != null) {
        // success
    }
});
```

<br>

## Off-line device

```java
public static void logoutByDeviceId(String deviceId, @NotNull AuthCallback<JSONObject> callback)
```

**Parameter**

* `deviceId` device ID

**Example**

```java
AuthClient.logoutByDeviceId("", (AuthCallback<JSONObject>) (code, message, data) -> {
    if (code == 200 && data != null) {
        // success
    }
});
```

<br>

## Remove device

```java
public static void removeDevice(String deviceId, @NotNull AuthCallback<JSONObject> callback)
```

**Parameter**

* `deviceId` device ID

**Example**

```java
AuthClient.removeDevice("", (AuthCallback<JSONObject>) (code, message, data) -> {
    if (code == 200 && data != null) {
        // success
    }
});
```

